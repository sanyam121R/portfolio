import matter from 'gray-matter'
import { format, parseISO } from 'date-fns'
import { ARTICLES_BRANCH, ARTICLES_REPO } from '@/lib/site'

export type BlogType = 'markdown' | 'html'

export interface BlogMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  readTime: string
  type: BlogType
  link: string
  content?: string
  htmlUrl?: string
  formattedDate?: string
  draft?: boolean
  /** Path within the Articles repo, e.g. cloudflare.md */
  repoPath?: string
}

const HTML_BLOGS: BlogMeta[] = [
  {
    slug: 'deep-customer-problem',
    title: 'When the CEO was the customer — and didn’t know it yet',
    date: '2024-09-01',
    description:
      'An interview story: how I spotted a leadership intake bottleneck at CloudEQ and built an event-driven Saga Orchestrator to unblock the C-suite.',
    tags: [
      'Event-Driven Architecture',
      'Salesforce CDC',
      'BullMQ',
      'AWS Lambda',
      'MongoDB',
      'Saga Pattern',
    ],
    readTime: '6 min read',
    type: 'html',
    htmlUrl: '/blogs/deep-customer-problem.html',
    link: '',
  },
]

const FETCH_OPTS = {
  next: { revalidate: 3600, tags: ['articles'] as string[] },
} as const

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  const token = process.env.GITHUB_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

function slugFromRepoPath(repoPath: string): string {
  const base = repoPath.replace(/\.md$/i, '')
  const parts = base.split('/')
  return parts[parts.length - 1] ?? base
}

function repoDir(repoPath: string): string {
  const idx = repoPath.lastIndexOf('/')
  return idx === -1 ? '' : repoPath.slice(0, idx)
}

function estimateReadTime(markdownBody: string): string {
  const words = markdownBody.trim().split(/\s+/).filter(Boolean).length
  const mins = Math.max(1, Math.ceil(words / 230))
  return `${mins} min read`
}

function stripLeadingH1(content: string): { title?: string; body: string } {
  const trimmed = content.replace(/^\uFEFF/, '').trimStart()
  const match = trimmed.match(/^#\s+(.+)\n+([\s\S]*)$/)
  if (!match) return { body: content }
  return { title: match[1].trim(), body: match[2] }
}

function parseDateMs(date: string): number {
  if (!date) return 0
  try {
    return parseISO(date).getTime()
  } catch {
    return 0
  }
}

async function listMarkdownPaths(): Promise<string[]> {
  const url = `https://api.github.com/repos/${ARTICLES_REPO}/git/trees/${ARTICLES_BRANCH}?recursive=1`
  const res = await fetch(url, { headers: githubHeaders(), ...FETCH_OPTS })
  if (!res.ok) {
    throw new Error(`GitHub tree ${res.status}: ${await res.text()}`)
  }
  const json = (await res.json()) as {
    tree?: { path: string; type: string }[]
  }
  return (json.tree ?? [])
    .filter((e) => e.type === 'blob' && e.path.endsWith('.md'))
    .map((e) => e.path)
    .filter((p) => p.toLowerCase() !== 'readme.md')
}

async function fetchMarkdownFile(repoPath: string): Promise<string> {
  const url = `https://raw.githubusercontent.com/${ARTICLES_REPO}/${ARTICLES_BRANCH}/${repoPath}`
  const res = await fetch(url, { headers: githubHeaders(), ...FETCH_OPTS })
  if (!res.ok) {
    throw new Error(`GitHub raw ${repoPath} ${res.status}`)
  }
  return res.text()
}

/** Last commit that touched this path on the articles branch (YYYY-MM-DD). */
async function fetchLastUpdated(repoPath: string): Promise<string> {
  const q = new URLSearchParams({
    path: repoPath,
    sha: ARTICLES_BRANCH,
    per_page: '1',
  })
  const url = `https://api.github.com/repos/${ARTICLES_REPO}/commits?${q}`
  const res = await fetch(url, { headers: githubHeaders(), ...FETCH_OPTS })
  if (!res.ok) return ''
  const commits = (await res.json()) as {
    commit?: { committer?: { date?: string } }
  }[]
  const iso = commits[0]?.commit?.committer?.date
  return iso ? iso.slice(0, 10) : ''
}

async function readGithubMarkdownBlogs(): Promise<BlogMeta[]> {
  try {
    const paths = await listMarkdownPaths()
    const posts = await Promise.all(
      paths.map(async (repoPath) => {
        const [raw, date] = await Promise.all([
          fetchMarkdownFile(repoPath),
          fetchLastUpdated(repoPath),
        ])
        const { data, content: rawBody } = matter(raw)
        const { title: h1Title, body } = stripLeadingH1(rawBody)

        const title =
          (data.title ? String(data.title) : undefined) ??
          h1Title ??
          slugFromRepoPath(repoPath)

        return {
          slug: slugFromRepoPath(repoPath),
          title,
          date,
          description: data.description ? String(data.description) : '',
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
          readTime:
            (data.readTime ? String(data.readTime) : undefined) ??
            estimateReadTime(body),
          type: 'markdown' as const,
          link: data.link != null ? String(data.link) : '',
          draft: data.draft === true,
          content: body,
          repoPath,
        }
      })
    )
    return posts
  } catch (err) {
    console.error('[blogs] Failed to load from GitHub Articles repo:', err)
    return []
  }
}

function decorate(meta: BlogMeta): BlogMeta {
  let formattedDate: string | undefined
  if (meta.date) {
    try {
      formattedDate = format(parseISO(meta.date), 'MMMM d, yyyy')
    } catch {
      formattedDate = meta.date
    }
  }
  return { ...meta, formattedDate }
}

/** All blogs (GitHub markdown + local HTML), newest first. */
export async function getAllBlogs(): Promise<BlogMeta[]> {
  const markdown = await readGithubMarkdownBlogs()
  const all = [...markdown, ...HTML_BLOGS]
  return all
    .filter((b) => !b.draft)
    .sort((a, b) => parseDateMs(b.date) - parseDateMs(a.date))
    .map(decorate)
}

export async function getBlogBySlug(slug: string): Promise<BlogMeta | undefined> {
  const blogs = await getAllBlogs()
  return blogs.find((b) => b.slug === slug)
}

export async function getAllSlugs(): Promise<string[]> {
  const blogs = await getAllBlogs()
  return blogs.map((b) => b.slug)
}

export function repoDirForBlog(blog: BlogMeta): string {
  if (!blog.repoPath) return ''
  return repoDir(blog.repoPath)
}