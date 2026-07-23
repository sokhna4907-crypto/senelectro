import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://senelectro.com', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://senelectro.com/vehicles', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://senelectro.com/appliances', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://senelectro.com/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
}
