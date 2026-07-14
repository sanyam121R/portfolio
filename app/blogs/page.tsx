import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllBlogs } from '@/lib/blogs'
import BlogCard from '@/components/BlogCard'

export const metadata: Metadata = {
  title: 'Blogs — Sanyam Rathore',
  description: 'Notes on systems, scaling, and the craft of software.',
}

export default function BlogsPage() {
  const blogs = getAllBlogs()

  return (
    <main className="min-h-svh w-svw bg-[#090909] text-primary px-6 md:px-8 py-24">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        <header className="flex flex-col gap-6">
          <Link
            href="/"
            className="text-tertiary text-sm hover:text-primary transition-colors w-max"
          >
            ← Back to home
          </Link>
          <h2 className="font-inter italic">
            Blogs
          </h2>
          <p>
          technical insights, project breakdowns, and development experiences. i occasionally write and share details about what i've implemented and how i've done it.
          </p>
        </header>

        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      </div>
    </main>
  )
}