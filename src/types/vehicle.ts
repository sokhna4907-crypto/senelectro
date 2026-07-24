export interface Vehicle {
  id: number
  name: string
  brand: string
  model: string
  year: number
  km: number
  fuel: 'essence' | 'diesel' | 'hybride' | 'electrique'
  transmission: 'automatique' | 'manuelle'
  type: 'berline' | 'suv' | '4x4' | 'utilitaire'
  price: number
  monthly_price: number
  badge?: 'nouveau' | 'promo' | 'arrivage' | 'top_vente' | null
  description?: string
  photos: string[]
  is_available: boolean
  created_at: string
}

export interface VehicleFilters {
  brand?: string
  type?: string
  max_price?: number
  fuel?: string
}
