import { useAuthStore } from '@/stores/auth'

export const can = (permission: string): boolean => {
  const authStore = useAuthStore()
  const userPermissions = authStore.user?.permissions ?? []
  return userPermissions.includes(permission)
}
