// app/sitemap.ts
import { MetadataRoute } from 'next'
import { categoryData } from '@/data/featuredCategories'
import { Category } from '@/types'

// Define static routes with their priorities
const STATIC_ROUTES = [
  { path: '', priority: 1.0 },
  { path: 'login', priority: 0.8 },
  { path: 'signup', priority: 0.8 },
  { path: 'explore', priority: 0.9 },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://genspoai.com'
  const currentDate = new Date()

  // Static pages with standardized structure
  const staticPages: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, priority }) => ({
    url: `${baseUrl}${path ? `/${path}` : ''}`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority,
  }))

  // Category pages with error handling for malformed slugs
  const categoryPages: MetadataRoute.Sitemap = categoryData
    .filter((category: Category) => category.slug) // Ensure slug exists
    .map((category: Category) => ({
      url: `${baseUrl}/explore/${category.slug.toLowerCase().trim()}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    }))

  return [...staticPages, ...categoryPages]
}