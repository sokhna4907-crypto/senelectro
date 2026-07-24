export interface Vehicle {
  id: number
  name: string
  brand: string
  model: string
  year: number
  km: number
  fuel: string
  transmission: string
  type: string
  price: number
  monthly_price: number
  badge: string
  description: string
  photos: string[]
  is_available: boolean
  created_at: string
}

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
