import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeStringify from 'rehype-stringify'
import type { Options as PrettyCodeOptions } from 'rehype-pretty-code'
import type { Root, Element, RootContent } from 'hast'
import {
  ARTICLES_BRANCH,
  ARTICLES_REPO,
  articlesRawBase,
} from '@/lib/site'

const prettyCodeOptions: PrettyCodeOptions = {
  theme: 'github-dark',
  keepBackground: true,
}

export interface RenderMarkdownOptions {
  /** Directory within the Articles repo that contains this post, e.g. "" or "notes" */
  baseDir?: string
}

function isRelativeUrl(href: string): boolean {
  return (
    !href.startsWith('http://') &&
    !href.startsWith('https://') &&
    !href.startsWith('//') &&
    !href.startsWith('/') &&
    !href.startsWith('#') &&
    !href.startsWith('mailto:')
  )
}

function assetUrl(baseDir: string, relative: string): string {
  const prefix = baseDir ? `${baseDir}/` : ''
  return `${articlesRawBase}/${prefix}${relative}`
}

function rehypeRewriteRepoUrls(baseDir: string) {
  return (tree: Root) => {
    const walk = (nodes: RootContent[]) => {
      for (const node of nodes) {
        if (node.type !== 'element') continue
        const el = node as Element

        if (el.tagName === 'img' && el.properties?.src != null) {
          const src = String(el.properties.src)
          if (isRelativeUrl(src)) {
            el.properties.src = assetUrl(baseDir, src)
            el.properties.loading = 'lazy'
          }
        }

        if (el.tagName === 'a' && el.properties?.href != null) {
          const href = String(el.properties.href)
          if (isRelativeUrl(href)) {
            if (href.toLowerCase().endsWith('.md')) {
              const slug = href.replace(/\.md$/i, '').split('/').pop() ?? href
              el.properties.href = `/blogs/${slug}`
            } else {
              el.properties.href = `https://github.com/${ARTICLES_REPO}/blob/${ARTICLES_BRANCH}/${baseDir ? `${baseDir}/` : ''}${href}`
            }
          }
        }

        if (el.children?.length) walk(el.children as RootContent[])
      }
    }
    walk(tree.children)
  }
}

/** Render a raw markdown string to HTML. Safe to call in a Server Component. */
export async function renderMarkdown(
  markdown: string,
  options: RenderMarkdownOptions = {}
): Promise<string> {
  const baseDir = options.baseDir ?? ''

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: {
        className: ['anchor'],
      },
    })
    .use(rehypePrettyCode, prettyCodeOptions)
    .use(() => rehypeRewriteRepoUrls(baseDir))
    .use(rehypeStringify, { allowDangerousHtml: true })

  const file = await processor.process(markdown)
  return String(file)
}