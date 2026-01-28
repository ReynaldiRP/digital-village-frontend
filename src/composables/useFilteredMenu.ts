import { computed } from 'vue'
import { menuConfig } from '@/config/menuConfig'
import { can } from '@/helpers/permissionHelper'
import type { SidebarItem } from '@/types'

export function useFilteredMenu() {
  const hasPermission = (permission?: string): boolean => {
    if (!permission) return true
    return can(permission)
  }

  const filteredMenu = computed<SidebarItem[]>(() => {
    return menuConfig
      .filter((item) => hasPermission(item.permission))
      .map((item) => ({
        ...item,
        children: item.children?.filter((child) => hasPermission(child.permission)),
      }))
      .filter((item) => !item.children || item.children.length > 0)
  })

  return {
    filteredMenu,
  }
}
