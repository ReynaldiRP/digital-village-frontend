import type { EventParticipation } from './event'
import type { SocialAssistance } from './socialAssistance'
import type { DevelopmentApplicant } from './development'

export interface User {
  id: string
  name: string
  email: string
}

/**
 * Base member interface with common fields
 */
interface BaseMember {
  id: string
  name: string
  occupation: string
  identify_number: number
  age: number
  profile_picture?: string
}

/**
 * Family member with relation field
 */
export interface FamilyMember extends BaseMember {
  relation: string
  user?: User
}

/**
 * Head of family response from API
 */
export interface HeadOfFamily extends BaseMember {
  email?: string
  gender?: 'male' | 'female'
  birth_date?: string
  phone_number?: string
  profile_picture?: string
  marital_status?: 'single' | 'married' | 'divorced' | 'widowed'
  created_at?: string
  family_members_count?: number
  family_members?: FamilyMember[]
  social_assistances?: SocialAssistance[]
  events?: EventParticipation[]
  development_applicants?: DevelopmentApplicant[]
  // Legacy fields for backward compatibility
  user?: User
  identify_number?: number
}

export interface MetaData {
  current_page: number
  last_page: number
  from: number
  to: number
  per_page: number
  path: string
  total: number
}

export interface HeadOfFamilyPaginatedData {
  items: HeadOfFamily[]
  meta: MetaData
}

export interface FormHeadOfFamily {
  name: string
  email: string
  password: string
  identify_number: string
  phone_number: string
  occupation: string
  birth_date: string
  gender: 'male' | 'female'
  marital_status: 'single' | 'married'
  profile_picture?: File | null
}

export interface formFamilyMember {
  name: string
  email: string
  phone_number: string
  birth_date: string
  identify_number: string
  occupation: string
  relation: string
  profile_picture?: File | null
  relation: 'wife' | 'husband' | 'child'
  marital_status: 'single' | 'married'
}
