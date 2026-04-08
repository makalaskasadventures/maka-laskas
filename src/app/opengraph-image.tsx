import { ImageResponse } from 'next/og'
import { SITE_URL } from '@/lib/site'

export const runtime = 'edge'

export const alt = 'Makalaskas Adventures — East African safaris and Ubuntu-inspired travel'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: 64,
          background: 'linear-gradient(135deg, #1c1917 0%, #7c2d12 45%, #ea580c 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            maxWidth: 900,
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: '#fed7aa',
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
            }}
          >
            Ubuntu-inspired travel
          </span>
          <span
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.05,
            }}
          >
            Makalaskas Adventures
          </span>
          <span style={{ fontSize: 32, color: 'rgba(255,255,255,0.9)', lineHeight: 1.35 }}>
            Safari tours, gorilla trekking and transformative journeys across East Africa
          </span>
          <span style={{ fontSize: 22, color: 'rgba(255,255,255,0.75)', marginTop: 8 }}>
            {SITE_URL.replace('https://', '')}
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
