export interface Appliance {
  id: number
  name: string
  brand: string
  category: string
  price: number
  stock_count: number
  description: string
  photos: string[]
  is_available: boolean
  created_at: string
}
