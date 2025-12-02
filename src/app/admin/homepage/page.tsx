'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Save, ArrowLeft, Star, Tag, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface Adventure {
  id: string
  title: string
  slug: string
  image: string | null
  duration: number
  price: number
  originalPrice: number | null
  country: { name: string }
  destination: { name: string } | null
  homepageFeaturedOrder?: number | null
  homepageSaleOrder?: number | null
  isActive: boolean
}

export default function HomepageManagementPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [adventures, setAdventures] = useState<Adventure[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

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

    fetchAdventures()
  }, [session, status, router])

  const fetchAdventures = async () => {
    try {
      const response = await fetch('/api/admin/adventures')
      if (response.ok) {
        const data = await response.json()
        setAdventures(data.adventures || [])
      }
    } catch (error) {
      console.error('Failed to fetch adventures:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFeaturedChange = (adventureId: string, order: number | null) => {
    setAdventures(prev =>
      prev.map(adv => {
        if (adv.id === adventureId) {
          return { ...adv, homepageFeaturedOrder: order }
        }
        // Clear order if another adventure has the same order
        if (adv.homepageFeaturedOrder === order && order !== null) {
          return { ...adv, homepageFeaturedOrder: null }
        }
        return adv
      })
    )
  }

  const handleSaleChange = (adventureId: string, order: number | null) => {
    setAdventures(prev =>
      prev.map(adv => {
        if (adv.id === adventureId) {
          return { ...adv, homepageSaleOrder: order }
        }
        // Clear order if another adventure has the same order
        if (adv.homepageSaleOrder === order && order !== null) {
          return { ...adv, homepageSaleOrder: null }
        }
        return adv
      })
    )
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      // Get featured and sale adventures
      const featuredAdventures = adventures
        .filter(adv => adv.homepageFeaturedOrder !== null)
        .map(adv => ({
          id: adv.id,
          order: adv.homepageFeaturedOrder!,
        }))
        .sort((a, b) => a.order - b.order)

      const saleAdventures = adventures
        .filter(adv => adv.homepageSaleOrder !== null)
        .map(adv => ({
          id: adv.id,
          order: adv.homepageSaleOrder!,
        }))
        .sort((a, b) => a.order - b.order)

      // Validate max 5 for each
      if (featuredAdventures.length > 5) {
        setMessage({ type: 'error', text: 'Maximum 5 adventures allowed for "Only Maka-Laskas experiences" section' })
        setSaving(false)
        return
      }

      if (saleAdventures.length > 5) {
        setMessage({ type: 'error', text: 'Maximum 5 adventures allowed for "East Africa Sale" section' })
        setSaving(false)
        return
      }

      // Update all adventures
      const updates = adventures.map(adv => ({
        id: adv.id,
        homepageFeaturedOrder: adv.homepageFeaturedOrder ?? null,
        homepageSaleOrder: adv.homepageSaleOrder ?? null,
      }))

      // Update each adventure
      await Promise.all(
        updates.map(update =>
          fetch(`/api/admin/adventures/${update.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              homepageFeaturedOrder: update.homepageFeaturedOrder,
              homepageSaleOrder: update.homepageSaleOrder,
            }),
          })
        )
      )

      setMessage({ type: 'success', text: 'Homepage featured adventures updated successfully!' })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      console.error('Failed to save:', error)
      setMessage({ type: 'error', text: 'Failed to save changes. Please try again.' })
    } finally {
      setSaving(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const featuredAdventures = adventures
    .filter(adv => adv.homepageFeaturedOrder !== null)
    .sort((a, b) => (a.homepageFeaturedOrder || 0) - (b.homepageFeaturedOrder || 0))

  const saleAdventures = adventures
    .filter(adv => adv.homepageSaleOrder !== null)
    .sort((a, b) => (a.homepageSaleOrder || 0) - (b.homepageSaleOrder || 0))

  const availableFeaturedSlots = [1, 2, 3, 4, 5].filter(
    slot => !featuredAdventures.some(adv => adv.homepageFeaturedOrder === slot)
  )

  const availableSaleSlots = [1, 2, 3, 4, 5].filter(
    slot => !saleAdventures.some(adv => adv.homepageSaleOrder === slot)
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Homepage Featured Adventures</h1>
          <p className="text-gray-600 mt-2">
            Select up to 5 adventures for each homepage section. Adventures will appear in the order you assign.
          </p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 mr-2" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-2" />
            )}
            {message.text}
          </div>
        )}

        {/* Only Maka-Laskas Experiences Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Star className="w-6 h-6 mr-2 text-orange-600" />
                Only Maka-Laskas experiences
              </h2>
              <p className="text-gray-600 mt-1">
                Selected: {featuredAdventures.length}/5 adventures
              </p>
            </div>
          </div>

          {/* Selected Adventures */}
          {featuredAdventures.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Adventures (in order)</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map(slot => {
                  const adventure = featuredAdventures.find(adv => adv.homepageFeaturedOrder === slot)
                  return (
                    <div
                      key={slot}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[200px] flex flex-col"
                    >
                      <div className="text-sm font-semibold text-gray-500 mb-2">Position {slot}</div>
                      {adventure ? (
                        <div className="flex-1">
                          {adventure.image && (
                            <img
                              src={adventure.image}
                              alt={adventure.title}
                              className="w-full h-24 object-cover rounded mb-2"
                            />
                          )}
                          <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                            {adventure.title}
                          </h4>
                          <p className="text-xs text-gray-600 mb-2">
                            {adventure.destination?.name || adventure.country.name}
                          </p>
                          <button
                            onClick={() => handleFeaturedChange(adventure.id, null)}
                            className="text-xs text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                          Empty
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Available Adventures */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Adventures</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {adventures
                .filter(adv => adv.isActive)
                .map(adventure => (
                  <div
                    key={adventure.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {adventure.image && (
                        <img
                          src={adventure.image}
                          alt={adventure.title}
                          className="w-20 h-20 object-cover rounded flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                          {adventure.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2">
                          {adventure.destination?.name || adventure.country.name} • {adventure.duration} days
                        </p>
                        <select
                          value={adventure.homepageFeaturedOrder || ''}
                          onChange={(e) =>
                            handleFeaturedChange(adventure.id, e.target.value ? parseInt(e.target.value) : null)
                          }
                          className="w-full text-xs border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="">Not featured</option>
                          {availableFeaturedSlots.map(slot => (
                            <option key={slot} value={slot}>
                              Position {slot}
                            </option>
                          ))}
                          {adventure.homepageFeaturedOrder && (
                            <option value={adventure.homepageFeaturedOrder}>
                              Position {adventure.homepageFeaturedOrder} (current)
                            </option>
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* East Africa Sale Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Tag className="w-6 h-6 mr-2 text-red-600" />
                East Africa Sale
              </h2>
              <p className="text-gray-600 mt-1">
                Selected: {saleAdventures.length}/5 adventures
              </p>
            </div>
          </div>

          {/* Selected Adventures */}
          {saleAdventures.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Adventures (in order)</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map(slot => {
                  const adventure = saleAdventures.find(adv => adv.homepageSaleOrder === slot)
                  return (
                    <div
                      key={slot}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[200px] flex flex-col"
                    >
                      <div className="text-sm font-semibold text-gray-500 mb-2">Position {slot}</div>
                      {adventure ? (
                        <div className="flex-1">
                          {adventure.image && (
                            <img
                              src={adventure.image}
                              alt={adventure.title}
                              className="w-full h-24 object-cover rounded mb-2"
                            />
                          )}
                          <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                            {adventure.title}
                          </h4>
                          <p className="text-xs text-gray-600 mb-2">
                            {adventure.destination?.name || adventure.country.name}
                          </p>
                          <button
                            onClick={() => handleSaleChange(adventure.id, null)}
                            className="text-xs text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                          Empty
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Available Adventures */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Adventures</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {adventures
                .filter(adv => adv.isActive)
                .map(adventure => (
                  <div
                    key={adventure.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {adventure.image && (
                        <img
                          src={adventure.image}
                          alt={adventure.title}
                          className="w-20 h-20 object-cover rounded flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                          {adventure.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2">
                          {adventure.destination?.name || adventure.country.name} • {adventure.duration} days
                        </p>
                        <select
                          value={adventure.homepageSaleOrder || ''}
                          onChange={(e) =>
                            handleSaleChange(adventure.id, e.target.value ? parseInt(e.target.value) : null)
                          }
                          className="w-full text-xs border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="">Not in sale</option>
                          {availableSaleSlots.map(slot => (
                            <option key={slot} value={slot}>
                              Position {slot}
                            </option>
                          ))}
                          {adventure.homepageSaleOrder && (
                            <option value={adventure.homepageSaleOrder}>
                              Position {adventure.homepageSaleOrder} (current)
                            </option>
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 inline-flex items-center disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

