export const ADVENTURE_TIER_VALUES = [
  'EDUCATION',
  'EMBARK_AND_DISCOVER',
  'ENGAGE_AND_GROW',
  'LUXURY_AND_IMPACT',
] as const

export type AdventureTier = (typeof ADVENTURE_TIER_VALUES)[number]

export const ADVENTURE_TIER_OPTIONS: { value: AdventureTier; label: string }[] = [
  { value: 'EDUCATION', label: 'Education' },
  { value: 'EMBARK_AND_DISCOVER', label: 'Embark and Discover' },
  { value: 'ENGAGE_AND_GROW', label: 'Engage and Grow' },
  { value: 'LUXURY_AND_IMPACT', label: 'Luxury and Impact' },
]

export function isAdventureTier(v: string): v is AdventureTier {
  return ADVENTURE_TIER_VALUES.includes(v as AdventureTier)
}
