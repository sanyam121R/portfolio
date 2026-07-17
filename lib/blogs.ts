import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format, parseISO } from 'date-fns'

export type BlogType = 'markdown' | 'html'

export interface BlogMeta {
  slug: string
  title: string
  date: string // ISO string
  description: string
  tags: string[]
  readTime: string
  type: BlogType
  link: string
  /** Only present for markdown blogs — raw markdown body */
  content?: string
  /** Only present for html blogs — public path to the standalone HTML file */
  htmlUrl?: string
  /**
   * Reading order helper: human-friendly formatted date.
   * Computed lazily so build output stays deterministic.
   */
  formattedDate?: string
}

const BLOGS_DIR = path.join(process.cwd(), 'blogs')

/**
 * The deep-customer-problem blog is authored as a standalone, fully-styled
 * HTML document (served from /public/blogs). We surface it as a first-class
 * blog entry of type "html" so it shows up in listings and gets its own route
 * that renders the document inside an iframe (preserving its exact styling).
 */
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
    link: ''
  },
]

function readMarkdownBlogs(): BlogMeta[] {
  if (!fs.existsSync(BLOGS_DIR)) return []

  return fs
    .readdirSync(BLOGS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(BLOGS_DIR, file), 'utf-8')
      const { data, content } = matter(raw)

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ? String(data.date) : '1970-01-01',
        description: data.description ?? '',
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        readTime: data.readTime ?? '5 min read',
        type: 'markdown' as const,
        link: data.link,
        content,
      }
    })
}

function decorate(meta: BlogMeta): BlogMeta {
  let formattedDate: string | undefined
  try {
    formattedDate = format(parseISO(meta.date), 'MMMM d, yyyy')
  } catch {
    formattedDate = meta.date
  }
  return { ...meta, formattedDate }
}

/** All blogs (markdown + html), newest first. */
export function getAllBlogs(): BlogMeta[] {
  const all = [...readMarkdownBlogs(), ...HTML_BLOGS]
  return all
    .sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime())
    .map(decorate)
}

export function getBlogBySlug(slug: string): BlogMeta | undefined {
  return getAllBlogs().find((b) => b.slug === slug)
}

/** Slugs for static generation. */
export function getAllSlugs(): string[] {
  return getAllBlogs().map((b) => b.slug)
}