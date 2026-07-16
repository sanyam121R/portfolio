import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllSlugs, getBlogBySlug } from '@/lib/blogs'
import { renderMarkdown } from '@/lib/markdown'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(
  props: PageProps<'/blogs/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params
  const blog = getBlogBySlug(slug)
  if (!blog) return { title: 'Blog not found — Sanyam Rathore' }

  return {
    title: `${blog.title} — Sanyam Rathore`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: 'article',
      tags: blog.tags,
    },
  }
}

export default async function BlogPostPage(
  props: PageProps<'/blogs/[slug]'>
) {
  const { slug } = await props.params
  const blog = getBlogBySlug(slug)
  if (!blog) notFound()

  const html =
    blog.type === 'markdown' && blog.content
      ? await renderMarkdown(blog.content)
      : null

  return (
    <main className="min-h-svh w-svw bg-[#090909] text-primary px-6 md:px-8 py-24">
      <article className="max-w-3xl mx-auto flex flex-col gap-10">
        <header className="flex flex-col gap-6">
          <Link
            href="/blogs"
            className="text-tertiary text-sm hover:text-primary transition-colors w-max"
          >
            ← Back to home
          </Link>
          <h1 className="font-inter text-5xl md:text-6xl">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-tertiary text-[13px]">
            <span>{blog.formattedDate}</span>
            <span aria-hidden>·</span>
            <span>{blog.readTime}</span>
          </div>
          <p className="text-secondary text-[15px] leading-7">
            {blog.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-tertiary text-[12px] py-1 px-3 border border-primary-border rounded-[8px] whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {blog.type === 'html' && blog.htmlUrl ? (
          <div className="w-full rounded-2xl overflow-hidden border border-primary-border">
            <iframe
              src={blog.htmlUrl}
              title={blog.title}
              className="w-full min-h-[1200px] bg-[#f5f0e8]"
            />
          </div>
        ) : (
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: html ?? '' }}
          />
        )}
      </article>
    </main>
  )
}