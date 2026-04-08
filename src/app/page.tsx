import type { Metadata } from 'next'
import HomePageContent from '@/components/HomePageContent'
import { SITE_URL, siteOpenGraphAlt } from '@/lib/site'

const homeDescription =
  'Discover unforgettable safari tours, gorilla trekking, and African travel experiences with Makalaskas Adventures.'

export const metadata: Metadata = {
  title: { absolute: 'Makalaskas Adventures' },
  description: homeDescription,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Makalaskas Adventures',
    description: homeDescription,
    url: SITE_URL,
    type: 'website',
    locale: 'en_US',
    siteName: 'Makalaskas Adventures',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: siteOpenGraphAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Makalaskas Adventures',
    description: homeDescription,
  },
}

export default function HomePage() {
  return <HomePageContent />
}
