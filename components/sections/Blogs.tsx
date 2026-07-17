import Link from 'next/link'
import { getAllBlogs } from '@/lib/blogs'
import BlogCard from '@/components/BlogCard'

export default function Blogs() {
  const latest = getAllBlogs().slice(0, 6)

  return (
    <div id="blogs" className="w-svw min-h-svh flex flex-col justify-center items-center px-8 py-28">
      <section className="w-full md:w-[calc(100%-340px)] flex flex-col gap-16">
        <div className="flex flex-col items-center text-center relative">
          <h1
            className="
              font-weird-word
              bg-[linear-gradient(0deg,#000_11%,#fff_57%)]
              bg-clip-text [-webkit-background-clip:text]
              text-transparent [-webkit-text-fill-color:transparent]
              text-[40px] tracking-normal leading-normal whitespace-nowrap
            "
          >
            Latest Blogs.
          </h1>
          <p className="text-secondary text-[10px] md:text-sm">
            notes on systems, scaling & the craft.
          </p>
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {latest.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/blogs"
            className="text-sm md:text-base text-primary hover:underline"
          >
            View all posts →
          </Link>
        </div>
      </section>
    </div>
  )
}