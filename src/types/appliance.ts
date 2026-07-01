export interface Appliance {
  id: number
  name: string
  brand: string
  category: 'television' | 'refrigerateur' | 'climatiseur' | 'lave-linge' | 'micro-ondes' | 'audio' | 'autre'
  price: number
  stock_count: number
  photos: string[]
  description?: string
  is_available: boolean
  created_at: string
}
