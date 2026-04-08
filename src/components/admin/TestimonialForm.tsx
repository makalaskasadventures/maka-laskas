'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export type TestimonialFormValues = {
  title: string
  content: string
  rating: number
  isVerified: boolean
  isFeatured: boolean
  isPublished: boolean
  userId: string
  guestName: string
  guestLocation: string
  guestImage: string
  adventureId: string
}

const defaultValues: TestimonialFormValues = {
  title: '',
  content: '',
  rating: 5,
  isVerified: true,
  isFeatured: false,
  isPublished: true,
  userId: '',
  guestName: '',
  guestLocation: '',
  guestImage: '',
  adventureId: '',
}

type OptionUser = { id: string; name: string | null; email: string }
type OptionAdventure = { id: string; title: string }

type Props = {
  testimonialId?: string
  initial?: Partial<TestimonialFormValues>
  onSaved: () => void
}

export default function TestimonialForm({ testimonialId, initial, onSaved }: Props) {
  const [values, setValues] = useState<TestimonialFormValues>(() => ({
    ...defaultValues,
    ...initial,
  }))
  const [users, setUsers] = useState<OptionUser[]>([])
  const [adventures, setAdventures] = useState<OptionAdventure[]>([])
  const [loadingOptions, setLoadingOptions] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/admin/testimonials/options')
        if (!res.ok) throw new Error('Failed to load form options')
        const data = await res.json()
        if (!cancelled) {
          setUsers(data.users || [])
          setAdventures(data.adventures || [])
        }
      } catch {
        if (!cancelled) setError('Could not load users and adventures')
      } finally {
        if (!cancelled) setLoadingOptions(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const set = (key: keyof TestimonialFormValues, val: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [key]: val }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const payload = {
        title: values.title.trim() || null,
        content: values.content.trim(),
        rating: values.rating,
        isVerified: values.isVerified,
        isFeatured: values.isFeatured,
        isPublished: values.isPublished,
        userId: values.userId.trim() || null,
        guestName: values.guestName.trim() || null,
        guestLocation: values.guestLocation.trim() || null,
        guestImage: values.guestImage.trim() || null,
        adventureId: values.adventureId.trim() || null,
      }

      const url = testimonialId
        ? `/api/admin/testimonials/${testimonialId}`
        : '/api/admin/testimonials'
      const res = await fetch(url, {
        method: testimonialId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        const msg =
          typeof data.error === 'string'
            ? data.code
              ? `${data.error} (${data.code})`
              : data.error
            : 'Save failed'
        setError(msg)
        return
      }
      onSaved()
    } catch {
      setError('Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (loadingOptions) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Quote title (optional)</label>
        <input
          type="text"
          value={values.title}
          onChange={(e) => set('title', e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder="e.g. Life-changing experience"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Testimonial <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={6}
          value={values.content}
          onChange={(e) => set('content', e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder="What the customer said…"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <select
            value={values.rating}
            onChange={(e) => set('rating', parseInt(e.target.value, 10))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} star{n !== 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Related adventure (optional)</label>
          <select
            value={values.adventureId}
            onChange={(e) => set('adventureId', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500"
          >
            <option value="">— None —</option>
            {adventures.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <p className="text-sm font-medium text-gray-900 mb-3">Customer</p>
        <p className="text-xs text-gray-500 mb-4">
          Link a registered user <em>or</em> enter a customer name for guests. If both are set, the
          name you enter below is shown first on the site.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Registered user</label>
            <select
              value={values.userId}
              onChange={(e) => set('userId', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500"
            >
              <option value="">— None —</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {(u.name || u.email) + ' · ' + u.email}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer name (guest)</label>
            <input
              type="text"
              value={values.guestName}
              onChange={(e) => set('guestName', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500"
              placeholder="e.g. Sarah Johnson"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location (optional)</label>
            <input
              type="text"
              value={values.guestLocation}
              onChange={(e) => set('guestLocation', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500"
              placeholder="e.g. New York, USA"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL (optional)</label>
            <input
              type="url"
              value={values.guestImage}
              onChange={(e) => set('guestImage', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-500"
              placeholder="HTTPS link from Admin → Media (do not paste image files)"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={values.isPublished}
            onChange={(e) => set('isPublished', e.target.checked)}
            className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
          />
          Published (visible on site)
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={values.isFeatured}
            onChange={(e) => set('isFeatured', e.target.checked)}
            className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
          />
          Featured (sort boost on homepage)
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={values.isVerified}
            onChange={(e) => set('isVerified', e.target.checked)}
            className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
          />
          Verified
        </label>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-lg bg-orange-600 text-white px-5 py-2.5 text-sm font-medium hover:bg-orange-700 disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving…
            </>
          ) : testimonialId ? (
            'Update testimonial'
          ) : (
            'Add testimonial'
          )}
        </button>
        <Link
          href="/admin/testimonials"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}
