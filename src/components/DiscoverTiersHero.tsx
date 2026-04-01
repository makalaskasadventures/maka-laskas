'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Pause, Play } from 'lucide-react'

export type DiscoverTierSlide = {
  id: string
  /** Small label above the main headline (reference: region line) */
  kicker: string
  /** Large condensed headline — shown in ALL CAPS in UI */
  headline: string
  /** Tag under the decorative line on the thumbnail card */
  cardTag: string
  description: string
  image: string
  imageAlt: string
  href: string
}

const AUTOPLAY_MS = 7000

const defaultTiers: DiscoverTierSlide[] = [
  {
    id: 'educational',
    kicker: 'Discover tier · Learning',
    headline: 'Educational',
    cardTag: 'Schools & universities',
    description:
      'Curriculum-aligned journeys that connect classrooms to East African communities, conservation, and real stories in the field.',
    image: '/img/education.jpeg',
    imageAlt: 'Travelers learning alongside local communities',
    href: '/adventures',
  },
  {
    id: 'embark',
    kicker: 'Discover tier · First steps',
    headline: 'Embark and Discover',
    cardTag: 'Iconic East Africa',
    description:
      'Warm, guided introductions to the region — wildlife, landscapes, and hosts who make every first journey feel like home.',
    image: '/img/discover.jpeg',
    imageAlt: 'Open savanna and acacia trees at golden hour',
    href: '/adventures',
  },
  {
    id: 'engage',
    kicker: 'Discover tier · Depth',
    headline: 'Engage and Grow',
    cardTag: 'Immersion & exchange',
    description:
      'Hands-on partnership with cooperatives, youth projects, and conservation teams — travel that reshapes how you see the world.',
    image: '/img/grow.jpeg',
    imageAlt: 'Group collaboration and community engagement',
    href: '/adventures',
  },
  {
    id: 'luxury',
    kicker: 'Discover tier · Elevated',
    headline: 'Luxury and Impact',
    cardTag: 'Private · Purpose-led',
    description:
      'Exceptional lodges, private pacing, and itineraries where comfort and contribution are never traded away.',
    image: '/img/luxury.jpeg',
    imageAlt: 'Boutique lodge overlooking wild landscapes',
    href: '/adventures',
  },
]

function BackgroundLayer({
  image,
  imageAlt,
  activeKey,
}: {
  image: string
  imageAlt: string
  activeKey: string
}) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={activeKey}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover"
          initial={{ scale: 1.18 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default function DiscoverTiersHero({ tiers = defaultTiers }: { tiers?: DiscoverTierSlide[] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const safeIndex = tiers.length ? active % tiers.length : 0
  const current = tiers[safeIndex]

  const goNext = useCallback(() => {
    setActive(i => (tiers.length ? (i + 1) % tiers.length : 0))
  }, [tiers.length])

  useEffect(() => {
    if (paused || tiers.length <= 1) return
    const id = window.setInterval(goNext, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [paused, goNext, tiers.length])

  if (!tiers.length || !current) return null

  return (
    <section
      id="discover-tiers"
      className="relative min-h-[min(100svh,56rem)] w-full overflow-hidden bg-black"
      aria-labelledby="discover-tiers-heading"
    >
      <BackgroundLayer image={current.image} imageAlt={current.imageAlt} activeKey={current.id} />

      {/* Readability gradient — reference: dark left, lighter toward cards */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(105deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 42%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.35) 100%)',
        }}
      />

      <div className="relative z-[2] flex min-h-[min(100svh,56rem)] flex-col justify-end px-4 pb-10 pt-24 sm:px-6 md:px-10 lg:px-14 xl:px-16">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          {/* Left: active tier story */}
          <div className="max-w-xl lg:max-w-lg xl:max-w-xl lg:pb-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/75">
              Explore the wonders of East Africa
            </p>
            <div className="mb-5 mt-3 h-px w-12 bg-white/60" aria-hidden />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-white/80">{current.kicker}</p>
                <h2
                  id="discover-tiers-heading"
                  className="font-extrabold uppercase leading-[0.95] tracking-tight text-white text-[clamp(2rem,6vw,4rem)]"
                >
                  {current.headline}
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-white/85 md:text-lg">{current.description}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setPaused(p => !p)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-white/60"
                aria-label={paused ? 'Resume autoplay' : 'Pause autoplay'}
              >
                {paused ? <Play className="h-4 w-4 fill-current" /> : <Pause className="h-4 w-4" />}
              </button>
              <Link
                href={current.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/5 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Discover this tier
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* Right: vertical thumbnail cards */}
          <div className="flex shrink-0 gap-2 sm:gap-3 md:gap-4 lg:justify-end overflow-x-auto pb-2 lg:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tiers.map((tier, index) => {
              const isActive = index === safeIndex
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`group relative flex h-[13.5rem] w-[6.75rem] shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-300 sm:h-[17rem] sm:w-[8.25rem] md:h-[19rem] md:w-[9.25rem] ${
                    isActive
                      ? 'border-white shadow-[0_0_0_1px_rgba(255,255,255,0.4)] ring-2 ring-white/30 scale-[1.02]'
                      : 'border-white/15 opacity-80 hover:opacity-100 hover:border-white/40'
                  }`}
                  aria-pressed={isActive}
                  aria-label={`Show ${tier.headline}`}
                >
                  <img
                    src={tier.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/25 backdrop-blur-[2px]">
                        <Play className="h-5 w-5 text-white drop-shadow-md fill-white" aria-hidden />
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 z-[1] p-3 text-left">
                    <div className={`mb-2 h-0.5 w-6 ${isActive ? 'bg-white' : 'bg-white/60'}`} />
                    <p className="text-[10px] font-medium uppercase tracking-wider text-white/80 line-clamp-2">
                      {tier.cardTag}
                    </p>
                    <p className="mt-1 text-[11px] font-bold uppercase leading-snug tracking-wide text-white line-clamp-3">
                      {tier.headline}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
