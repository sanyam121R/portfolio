import type { MetadataRoute } from 'next'
import { getAllBlogs } from '@/lib/blogs'
import { SITE_URL } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const all = await getAllBlogs()
  const blogs = all.map((blog) => ({
    url: `${SITE_URL}/blogs/${blog.slug}`,
    lastModified: blog.date ? new Date(blog.date) : new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/blogs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...blogs,
  ]
}
