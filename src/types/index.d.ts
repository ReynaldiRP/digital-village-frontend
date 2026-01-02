export interface SidebarItem {
  id: number
  name: string
  icon: {
    active: string
    inactive: string
  }
  link: string
  children?: SidebarItem[]
}
