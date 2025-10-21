import {useAuthStore} from '@/stores/authStore';

export const can = (permission: string): boolean => {
  const authStore = useAuthStore();
  const userPermissions = authStore.user?.getUserPermissions ?? [];
  return userPermissions.includes(permission);
}