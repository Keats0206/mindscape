// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://genspoai.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/private/',
        '/login',
        '/signup',
        '/pricing',
      ]
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}