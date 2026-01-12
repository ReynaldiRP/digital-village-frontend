export interface SocialAssistanceMaster {
  id: string
  thumbnail: string
  name: string
  category: SocialAssistanceCategory
  amount: number
  provider: string
  description: string
  is_available: number // 0 | 1
}

export interface SocialAssistance {
  id: string
  social_assistance: SocialAssistanceMaster
  amount: number
  reason: string
  bank: string
  account_number: number
  proof: string
  status: SocialAssistanceStatus
}
