'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import HeroCarousel from '@/components/HeroCarousel'
import DiscoverTiersHero from '@/components/DiscoverTiersHero'
import Testimonials from '@/components/Testimonials'
import { MapPin, Clock, Users, ArrowRight, HeartHandshake, Globe2, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function HomePageContent() {
  const [featuredTrips, setFeaturedTrips] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHomepageAdventures()
  }, [])

  const fetchHomepageAdventures = async () => {
    try {
      const response = await fetch('/api/adventures?featured=true')
      if (response.ok) {
        const data = await response.json()
        const allAdventures = data.adventures || []

        const mapFeatured = (adv: any) => ({
          id: adv.id,
          slug: adv.slug,
          image: adv.image || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          overlayText: adv.shortDescription || adv.title,
          duration: `${adv.duration} days`,
          tripName: adv.title,
          originalPrice: adv.originalPrice ? `$${Number(adv.originalPrice).toLocaleString()}` : `$${Number(adv.price).toLocaleString()}`,
          salePrice: `$${Number(adv.price).toLocaleString()}`,
          location: adv.destination?.name || adv.country.name,
        })

        const slotted = allAdventures
          .filter(
            (adv: any) =>
              adv.homepageFeaturedOrder != null &&
              adv.homepageFeaturedOrder >= 1 &&
              adv.homepageFeaturedOrder <= 5
          )
          .sort((a: any, b: any) => (a.homepageFeaturedOrder || 0) - (b.homepageFeaturedOrder || 0))

        const featuredSource = slotted.length > 0 ? slotted : allAdventures.slice(0, 5)
        const featured = featuredSource.map(mapFeatured)

        setFeaturedTrips(featured)
      }
    } catch (error) {
      console.error('Failed to fetch homepage adventures:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <HeroCarousel />

      <section className="section-padding bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-[0.25em] text-[11px] text-orange-600 mb-3">
              Home of Ubuntu Tourism
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Maka‑Laskas Adventures is the Home of Ubuntu Tourism
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-4">
              Born in Africa and built for the world, we craft journeys where humanity leads travel —
              connecting people, cultures, and wild places through small‑group adventures, founder‑led
              safaris, immersive storytelling, and transformative experiences.
            </p>
            <p className="text-gray-700 font-semibold mb-6">
              Ubuntu is not a slogan. It is how we travel.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
            >
              Explore more
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-lg relative h-40 md:h-48">
              <Image
                src="/img/img5.jpg"
                alt="Community members smiling during a Maka-Laskas cultural experience in East Africa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg relative h-40 md:h-48 mt-6">
              <Image
                src="/img/img3.jpg"
                alt="Travelers connecting with local hosts on a small-group Ubuntu-inspired journey"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="col-span-2 rounded-2xl overflow-hidden shadow-lg relative h-44 md:h-56">
              <Image
                src="/img/img6.jpg"
                alt="Stunning landscapes of East Africa seen on safari and trekking adventures"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <p className="uppercase tracking-[0.25em] text-[11px] text-orange-600 mb-3">
              Travel With Purpose
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Connect Through Ubuntu
            </h2>
            <p className="text-gray-600">
              I am because you are. Together, we explore — every journey designed to unite hearts,
              cultures, and wild places.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Adventures that unite hearts, cultures, and wild places
              </h3>
              <p className="text-gray-600 text-sm">
                Small‑group journeys designed for meaningful human connection, not mass tourism.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <Globe2 className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Born in Africa. Built for the world.
              </h3>
              <p className="text-gray-600 text-sm">
                Locally rooted, globally minded — crafted by East Africans for travelers everywhere.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ubuntu is how we travel
              </h3>
              <p className="text-gray-600 text-sm">
                Every itinerary is built on reciprocity, respect, and shared humanity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div className="animate-fade-in-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Maka‑Laskas Experiences You Won’t Find Anywhere Else
              </h2>
              <div className="w-20 h-1 bg-orange-500 rounded"></div>
            </div>

            <div className="animate-fade-in-right">
              <Link href="/adventures" className="btn-primary inline-flex items-center">
                Explore all experiences
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="bg-gray-200 rounded-xl h-64 animate-pulse" />
              ))}
            </div>
          ) : featuredTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {featuredTrips.map((trip, index) => (
                <Link
                  key={trip.id || trip.tripName}
                  href={`/adventures/${trip.slug}`}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up block"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-48">
                    <Image
                      src={trip.image}
                      alt={trip.tripName ? `Featured adventure: ${trip.tripName}` : 'Featured Maka-Laskas adventure'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 20vw"
                      priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-semibold text-sm line-clamp-2">{trip.overlayText}</h3>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{trip.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="line-clamp-1">{trip.location}</span>
                      </div>
                    </div>

                    <h4 className="font-semibold text-gray-900 mb-3 line-clamp-2">{trip.tripName}</h4>

                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-gray-500 line-through">From USD {trip.originalPrice}</span>
                        <div className="text-lg font-bold text-orange-600">USD {trip.salePrice}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs font-semibold text-orange-600 uppercase">
                          Explore this way
                        </span>
                        <span className="text-[11px] text-gray-500">or book now</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No featured adventures selected. Admin can select adventures from the admin panel.</p>
            </div>
          )}
        </div>
      </section>

      <DiscoverTiersHero />

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="uppercase tracking-[0.25em] text-[11px] text-orange-600 mb-3">
              Why Travel With Maka‑Laskas
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Ubuntu Journeys, Transforming Tourism Across Africa and the World
            </h2>
            <p className="text-gray-600">
              Purpose‑led adventures that centre people, planet, and shared stories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Small‑group, founder‑led journeys</h3>
              <p className="text-sm text-gray-600">
                Intimate trips hosted by local experts who live the Ubuntu way.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Community‑anchored itineraries</h3>
              <p className="text-sm text-gray-600">
                Travel built with, not just through, the communities you meet.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Travel that gives back</h3>
              <p className="text-sm text-gray-600">
                A portion of every journey supports local projects and conservation.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Stories that stay with you</h3>
              <p className="text-sm text-gray-600">
                Circle‑style storytelling, campfires, and reflection woven into each itinerary.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 rounded-2xl overflow-hidden shadow-lg relative h-64 w-full">
              <Image
                src="/img/img4.jpg"
                alt="Ubuntu journeys and community-centered travel with Maka-Laskas"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/40 z-[1]" />
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">
                <p className="uppercase tracking-[0.25em] text-[11px] text-white/80 mb-3">
                  Watch
                </p>
                <h3 className="text-2xl font-bold mb-2">Discover the Ubuntu Way</h3>
                <p className="text-sm text-white/80 max-w-md">
                  A glimpse into how each journey is crafted with care, connection, and community at the centre.
                </p>
              </div>
            </div>
            <div className="flex-1 max-w-md text-center lg:text-left">
              <p className="text-gray-700 mb-4">
                From first enquiry to final goodbye, we walk with you — and alongside the communities who make every
                journey possible.
              </p>
              <Link
                href="/mission"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-900 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition"
              >
                Discover the Ubuntu Way
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <p className="uppercase tracking-[0.25em] text-[11px] text-orange-600 mb-3">
              Explore the Stories
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Every Journey Tells a Story
            </h2>
            <p className="text-gray-600">
              From community circles to wildlife encounters, step into the stories that shape Maka‑Laskas adventures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-lg relative h-64">
              <Image
                src="/img/img2.jpg"
                alt="Travelers connecting with East African communities on a purpose-led trip"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-[1]" />
              <div className="relative z-10 p-6 text-white absolute bottom-0 left-0 right-0">
                <h3 className="text-xl font-semibold mb-1">Travelers Connecting with Communities</h3>
                <p className="text-sm text-white/80">
                  Journey alongside local hosts, cooperatives, and storytellers.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg relative h-64">
              <Image
                src="/img/img1.jpg"
                alt="Wildlife and nature moments on safari with Maka-Laskas Adventures"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/35 z-[1]" />
              <div className="relative z-10 p-4 text-white absolute bottom-0 left-0 right-0">
                <h3 className="text-lg font-semibold">Wildlife & Nature Moments</h3>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg relative h-64">
              <Image
                src="/img/img7.jpg"
                alt="Storytelling circles and campfire reflections on an Ubuntu journey"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/40 z-[1]" />
              <div className="relative z-10 p-4 text-white absolute bottom-0 left-0 right-0">
                <h3 className="text-lg font-semibold">Storytelling Circles & Campfires</h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 max-w-xl">
              From community to wildlife, every journey tells a story worth sharing — through film, photography, and
              first‑hand reflections.
            </p>
            <Link
              href="/media"
              className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-900 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition"
            >
              Read travelers’ stories / Watch videos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-[0.25em] text-[11px] text-orange-300 mb-3">
              Join the Movement
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Travel That Gives Back</h2>
            <p className="text-gray-200 mb-6">
              Each journey supports partnerships, community‑driven projects, and global citizenship initiatives across
              East Africa — from education and youth leadership to conservation and livelihoods.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/join"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transition"
              >
                Join the Movement
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/join#projects"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-white text-white font-semibold hover:bg-white hover:text-gray-900 transition"
              >
                Support a Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden relative h-40 md:h-48">
              <Image
                src="/img/img3.jpg"
                alt="Community partnership supported by responsible travel with Makalaskas"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="rounded-2xl overflow-hidden relative h-40 md:h-48 mt-6">
              <Image
                src="/img/img5.jpg"
                alt="Youth and community engagement through Ubuntu-inspired tourism"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="section-padding bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="container-custom text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Journey With Maka‑Laskas?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join us on Ubuntu‑inspired adventures that connect you to community, wildlife, and the stories that
              shape East Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/adventures" className="bg-white text-orange-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center">
                Book Your Adventure
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center">
                Explore Packages
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
