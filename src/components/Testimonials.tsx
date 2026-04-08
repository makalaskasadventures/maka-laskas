'use client'

import { useEffect, useState } from 'react'
import { motion as m } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import {
  testimonialDisplayImage,
  testimonialDisplayLocation,
  testimonialDisplayName,
} from '@/lib/testimonial-display'

type ApiTestimonial = {
  id: string
  title: string | null
  content: string
  rating: number
  guestName: string | null
  guestLocation: string | null
  guestImage: string | null
  user: { name: string | null; avatar: string | null } | null
  adventure: { title: string; slug: string } | null
}

const PLACEHOLDER =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect fill="#f97316" width="96" height="96" rx="48"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="system-ui" font-size="36" font-weight="bold">?</text></svg>`
  )

const Testimonials = () => {
  const [items, setItems] = useState<ApiTestimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/testimonials', { cache: 'no-store' })
        if (res.ok) {
          const data = await res.json()
          if (!cancelled) setItems(data.testimonials || [])
        }
      } catch {
        if (!cancelled) setItems([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
        }`}
      />
    ))
  }

  if (loading) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container-custom flex justify-center py-16">
          <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    )
  }

  if (items.length === 0) {
    return null
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our <span className="text-gradient">Travelers Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people who have experienced the transformative power of our
            Ubuntu-inspired adventures across East Africa.
          </p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((testimonial, index) => {
            const display = {
              guestName: testimonial.guestName,
              guestLocation: testimonial.guestLocation,
              guestImage: testimonial.guestImage,
              user: testimonial.user,
            }
            const name = testimonialDisplayName(display)
            const location = testimonialDisplayLocation(display)
            const imageUrl = testimonialDisplayImage(display) || PLACEHOLDER
            const adventureLabel = testimonial.adventure?.title || 'Maka-Laskas experience'

            return (
              <m.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative">
                  <div className="absolute top-6 right-6 text-orange-200">
                    <Quote className="w-8 h-8" />
                  </div>

                  <div className="flex items-center mb-4">{renderStars(testimonial.rating)}</div>

                  <blockquote className="text-gray-700 mb-6 text-lg leading-relaxed">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>

                  {testimonial.title && (
                    <p className="text-sm font-semibold text-gray-800 mb-4">{testimonial.title}</p>
                  )}

                  <div className="mb-6">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                      {adventureLabel}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <img
                      src={imageUrl}
                      alt={name}
                      className="w-12 h-12 rounded-full object-cover mr-4 bg-orange-50"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{name}</div>
                      {location && <div className="text-sm text-gray-500">{location}</div>}
                    </div>
                  </div>
                </div>
              </m.div>
            )
          })}
        </div>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-2">5000+</div>
            <div className="text-gray-600">Happy Travelers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
            <div className="text-gray-600">Would Recommend</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-2">16+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Create Your Own Story?</h3>
          <button type="button" className="btn-primary text-lg px-8 py-4">
            Start Your Adventure
          </button>
        </m.div>
      </div>
    </section>
  )
}

export default Testimonials
