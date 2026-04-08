import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SessionProvider } from '@/components/SessionProvider';
import LayoutWrapper from '@/components/LayoutWrapper';
import OrganizationJsonLd from '@/components/seo/OrganizationJsonLd';
import { SITE_URL, siteOpenGraphAlt } from '@/lib/site';

const defaultDescription =
  'Discover unforgettable safari tours, gorilla trekking, and African travel experiences with Makalaskas Adventures.';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ea580c',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Makalaskas Adventures',
    template: '%s | Makalaskas Adventures',
  },
  description: defaultDescription,
  applicationName: 'Makalaskas Adventures',
  keywords: [
    'East Africa travel',
    'safari tours',
    'gorilla trekking',
    'Uganda tours',
    'Tanzania safaris',
    'Rwanda gorillas',
    'Kenya safari',
    'Ubuntu tourism',
    'Makalaskas Adventures',
  ],
  authors: [{ name: 'Makalaskas Adventures', url: SITE_URL }],
  creator: 'Makalaskas Adventures',
  publisher: 'Makalaskas Adventures',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Makalaskas Adventures',
    title: 'Makalaskas Adventures',
    description: defaultDescription,
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
    description: defaultDescription,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'travel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <OrganizationJsonLd />
        <SessionProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
