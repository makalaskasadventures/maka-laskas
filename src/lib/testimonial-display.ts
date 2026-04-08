type MinimalUser = { name?: string | null; avatar?: string | null }

export type TestimonialDisplayInput = {
  guestName?: string | null
  guestLocation?: string | null
  guestImage?: string | null
  user?: MinimalUser | null
}

export function testimonialDisplayName(t: TestimonialDisplayInput): string {
  const g = t.guestName?.trim()
  if (g) return g
  return t.user?.name?.trim() || 'Traveler'
}

export function testimonialDisplayInitial(t: TestimonialDisplayInput): string {
  const n = testimonialDisplayName(t)
  return n.charAt(0).toUpperCase() || 'T'
}

export function testimonialDisplayImage(t: TestimonialDisplayInput): string | null {
  const gi = t.guestImage?.trim()
  if (gi) return gi
  const a = t.user?.avatar?.trim()
  return a || null
}

export function testimonialDisplayLocation(t: TestimonialDisplayInput): string {
  return t.guestLocation?.trim() || ''
}
