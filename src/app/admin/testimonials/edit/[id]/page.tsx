'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import TestimonialForm, { TestimonialFormValues } from '@/components/admin/TestimonialForm'

export default function EditTestimonialPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const id = typeof params.id === 'string' ? params.id : ''
  const [initial, setInitial] = useState<Partial<TestimonialFormValues> | null>(null)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }
    if (session.user.role !== 'ADMIN') {
      router.push('/')
    }
  }, [session, status, router])

  useEffect(() => {
    if (!id || status !== 'authenticated' || session?.user.role !== 'ADMIN') return
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(`/api/admin/testimonials/${id}`)
        const data = await res.json()
        if (!res.ok) {
          setLoadError(data.error || 'Not found')
          return
        }
        const t = data.testimonial
        if (!cancelled && t) {
          setInitial({
            title: t.title ?? '',
            content: t.content ?? '',
            rating: t.rating ?? 5,
            isVerified: Boolean(t.isVerified),
            isFeatured: Boolean(t.isFeatured),
            isPublished: Boolean(t.isPublished),
            userId: t.userId ?? '',
            guestName: t.guestName ?? '',
            guestLocation: t.guestLocation ?? '',
            guestImage: t.guestImage ?? '',
            adventureId: t.adventureId ?? '',
          })
        }
      } catch {
        if (!cancelled) setLoadError('Failed to load')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [id, status, session?.user.role])

  if (status === 'loading' || (session?.user.role === 'ADMIN' && !loadError && !initial)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null
  }

  if (loadError || !initial) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <p className="text-gray-600">{loadError || 'Not found'}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Edit testimonial</h1>
        <p className="text-gray-600 mb-6">Update copy, customer details, or visibility.</p>
        <TestimonialForm
          testimonialId={id}
          initial={initial}
          onSaved={() => router.push('/admin/testimonials')}
        />
      </div>
    </div>
  )
}
