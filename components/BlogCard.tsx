import Link from 'next/link'
import type { BlogMeta } from '@/lib/blogs'

export default function BlogCard({ blog }: { blog: BlogMeta }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="
        group flex
        min-h-[300px]
        border border-primary-border rounded-3xl smooth-corners
        p-6
        bg-[#111]
        transition-all duration-300 ease-out
        hover:shadow-[0_0_10px_4px] hover:shadow-toggle
        hover:-translate-y-1
        hover:border-tertiary
        flex-col justify-between gap-6
      "
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-tertiary text-[12px] uppercase tracking-widest">
            {blog.type === 'html' ? 'Case Study' : 'Article'}
          </span>
          <span className="text-tertiary text-[12px]">{blog.readTime}</span>
        </div>

        <h3 className="text-[16px] md:text-[20px] leading-tight text-primary">
          {blog.title}
        </h3>

        <p className="text-tertiary text-[14px] leading-6 line-clamp-3">
          {blog.description}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {blog.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-tertiary text-[12px] py-1 px-3 border border-primary-border rounded-[8px] whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
          {blog.tags.length > 4 && (
            <span className="text-tertiary text-[12px] py-1 px-3 border border-primary-border rounded-[8px] whitespace-nowrap">
              +{blog.tags.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-tertiary text-[13px]">
            {blog.formattedDate}
          </span>
          <span className="text-sm text-primary transition-transform duration-300 group-hover:translate-x-1">
            Read →
          </span>
        </div>
      </div>
    </Link>
  )
}