import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wtoko.com'
  
  // 공항 코드 목록
  const airports = ['icn', 'gmp', 'cju', 'cjj']
  
  const airportUrls = airports.map((code) => ({
    url: `${baseUrl}/airport/${code}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...airportUrls,
  ]
}
