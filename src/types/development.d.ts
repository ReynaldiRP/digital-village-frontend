export interface DevelopmentMaster {
  id: string
  name: string
  description: string
  thumbnail: string
  person_in_charge: string
  start_date: string // YYYY-MM-DD
  duration: number // in days
  budget: number
  is_active: number // 0 | 1
  created_at: string
  updated_at: string
}

export interface DevelopmentApplicant {
  id: string
  development: DevelopmentMaster
  status: 'menunggu' | 'diterima' | 'ditolak'
  applied_at: string
  updated_at: string
}
