import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { SITE_URL } from '@/lib/site'

const staticPaths = [
  '',
  '/about',
  '/adventures',
  '/contact',
  '/donate',
  '/join',
  '/media',
  '/mission',
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/adventures' ? 0.9 : 0.7,
  }))

  try {
    const adventures = await prisma.adventure.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    })

    const adventureEntries: MetadataRoute.Sitemap = adventures.map((a) => ({
      url: `${SITE_URL}/adventures/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }))

    return [...staticEntries, ...adventureEntries]
  } catch {
    return staticEntries
  }
}
