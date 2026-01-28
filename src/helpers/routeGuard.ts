import { can } from './permissionHelper'
import type { RouteLocationNormalized } from 'vue-router'

/**
 * Check if user has permission to access the route
 * @param to - The route being navigated to
 * @returns true if user has permission or no permission is required
 */
export const checkRoutePermission = (to: RouteLocationNormalized): boolean => {
  // Check if route requires permission
  const requiredPermission = to.meta.permission as string | undefined

  // If no permission required, allow access
  if (!requiredPermission) return true

  // Check if user has permission
  return can(requiredPermission)
}

/**
 * Check if user has any of the required permissions
 * @param permissions - Array of permissions to check
 * @returns true if user has at least one permission
 */
export const hasAnyPermission = (permissions: string[]): boolean => {
  return permissions.some((permission) => can(permission))
}

/**
 * Check if user has all of the required permissions
 * @param permissions - Array of permissions to check
 * @returns true if user has all permissions
 */
export const hasAllPermissions = (permissions: string[]): boolean => {
  return permissions.every((permission) => can(permission))
}
