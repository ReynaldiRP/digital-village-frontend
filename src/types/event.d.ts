export type PaymentStatus = 'pending' | 'completed' | 'failed'

export interface EventMaster {
  id: string
  thumbnail: string
  name: string
  description: string
  price: number
  date: string // YYYY-MM-DD
  time: string // HH:mm:ss
  total_participants?: number
  is_active: number // 0 | 1
  created_at: string
  updated_at: string
}

export interface EventParticipation {
  id: string
  event: EventMaster
  quantity: number
  total_price: number
  payment_status: PaymentStatus
}
