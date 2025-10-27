export interface DashboardData {
  residents: number
  head_of_families: number
  social_assistances: number
  events: number
  developments: number
}

export interface RecentSocialAssistanceData {
  id: string
  thumbnail: string
  recipient_name: string
  amount: number
  status: string
  date: string
}

export interface RecentDevelopmentApplicantData {
  id: string
  applicant_name: string
  project_name: string
  amount_requested: number
  status: string
  applied_at: string
}

export interface DashboardResponse {
  message: string
  data: DashboardData
}
