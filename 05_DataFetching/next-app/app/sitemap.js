// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap() {
  return [
    {
      url: 'https://localhost:3000',
      lastModified: new Date(),
    },
  ]
}