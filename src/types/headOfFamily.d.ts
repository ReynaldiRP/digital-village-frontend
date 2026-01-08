export interface User {
  id: string
  name: string
  email: string
}

export interface FamilyMember {
  id: string
  user: User
  profile_picture: string
  identify_number: number
  gender: 'male' | 'female'
  birth_date: string
  phone_number: string
  occupation: string
  marital_status: 'single' | 'married' | 'divorced' | 'widowed'
  relation: string
}

export interface HeadOfFamily {
  id: string
  user: User
  identify_number: number
  gender: 'male' | 'female'
  birth_date: string
  age: number
  phone_number: string
  occupation: string
  profile_picture: string
  marital_status: 'single' | 'married' | 'divorced' | 'widowed'
  created_at: string
  family_members_count: number
  family_members: FamilyMember[]
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
