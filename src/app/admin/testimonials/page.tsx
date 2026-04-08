'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Star, Search, Eye, EyeOff } from 'lucide-react'
import { testimonialDisplayName } from '@/lib/testimonial-display'

type Row = {
  id: string
  title: string | null
  content: string
  rating: number
  isVerified: boolean
  isFeatured: boolean
  isPublished: boolean
  guestName: string | null
  user: { name: string | null; email: string } | null
  adventure: { title: string } | null
}

export default function AdminTestimonialsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }
    if (session.user.role !== 'ADMIN') {
      router.push('/')
      return
    }
    load()
  }, [session, status, router])

  const load = async () => {
    try {
      const res = await fetch('/api/admin/testimonials')
      if (res.ok) {
        const data = await res.json()
        setRows(data.testimonials || [])
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' })
      if (res.ok) setRows((prev) => prev.filter((r) => r.id !== id))
    } catch (e) {
      console.error(e)
    }
  }

  const togglePublished = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !current }),
      })
      if (res.ok) {
        setRows((prev) =>
          prev.map((r) => (r.id === id ? { ...r, isPublished: !current } : r))
        )
      }
    } catch (e) {
      console.error(e)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null
  }

  const filtered = rows.filter((r) => {
    const name = testimonialDisplayName({
      guestName: r.guestName,
      user: r.user,
    }).toLowerCase()
    const q = search.toLowerCase()
    return (
      name.includes(q) ||
      r.content.toLowerCase().includes(q) ||
      (r.title?.toLowerCase().includes(q) ?? false) ||
      (r.adventure?.title.toLowerCase().includes(q) ?? false)
    )
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
            <p className="text-gray-600 mt-1">Add and manage customer reviews</p>
          </div>
          <Link
            href="/admin/testimonials/new"
            className="inline-flex items-center justify-center rounded-lg bg-orange-600 text-white px-4 py-2 text-sm font-medium hover:bg-orange-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add testimonial
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search by name, quote, adventure…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Quote
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                      No testimonials yet. Add one to show traveler stories on the homepage.
                    </td>
                  </tr>
                )}
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">
                      <div className="font-medium text-gray-900">
                        {testimonialDisplayName({ guestName: r.guestName, user: r.user })}
                      </div>
                      {r.adventure && (
                        <div className="text-xs text-gray-500 mt-0.5">{r.adventure.title}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 max-w-md">
                      <span className="line-clamp-2">{r.content}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex text-yellow-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < r.rating ? 'fill-current' : 'text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm space-y-1">
                      <button
                        type="button"
                        onClick={() => togglePublished(r.id, r.isPublished)}
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                          r.isPublished
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {r.isPublished ? (
                          <>
                            <Eye className="w-3 h-3" /> Live
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" /> Draft
                          </>
                        )}
                      </button>
                      {r.isFeatured && (
                        <div className="text-xs text-orange-600 font-medium">Featured</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      <Link
                        href={`/admin/testimonials/edit/${r.id}`}
                        className="inline-flex items-center text-orange-600 hover:text-orange-700 mr-3"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(r.id)}
                        className="inline-flex items-center text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
