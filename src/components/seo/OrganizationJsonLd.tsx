import { SITE_URL } from '@/lib/site'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  '@id': `${SITE_URL}/#organization`,
  name: 'Makalaskas Adventures',
  alternateName: 'Maka-Laskas Adventures',
  url: SITE_URL,
  description:
    'Discover unforgettable safari tours, gorilla trekking, and African travel experiences with Makalaskas Adventures.',
  logo: `${SITE_URL}/opengraph-image`,
  image: `${SITE_URL}/opengraph-image`,
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'East Africa',
  },
}

export default function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
