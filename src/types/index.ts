export * from './vehicle'
export * from './appliance'

export interface FinancingRequest {
  id: number
  full_name: string
  phone: string
  budget_monthly: number
  product_type: 'vehicle' | 'appliance'
  product_id: number
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export interface ContactMessage {
  id: number
  full_name: string
  phone: string
  email?: string
  message: string
  is_read: boolean
  created_at: string
}
