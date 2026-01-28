export interface SidebarItem {
  id: number
  name: string
  icon: {
    active: string
    inactive: string
  }
  link: string
  permission?: string
  children?: SidebarItem[]
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}


