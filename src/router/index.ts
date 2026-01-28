import MainLayout from '@/layouts/app/MainLayout.vue'
import AuthenticateLayout from '@/layouts/auth/AuthenticateLayout.vue'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import { checkRoutePermission } from '@/helpers/routeGuard'
import LoginSection from '@/views/auth/LoginSection.vue'
import ResetPasswordSection from '@/views/auth/ResetPasswordSection.vue'
import DashboardSection from '@/views/DashboardSection.vue'
import ErrorSection from '@/views/error/ErrorSection.vue'
import CreateSection from '@/views/head-of-family/CreateSection.vue'
import DetailSection from '@/views/head-of-family/DetailSection.vue'
import EditSection from '@/views/head-of-family/EditSection.vue'
import IndexSection from '@/views/head-of-family/IndexSection.vue'
import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresUnauth?: boolean
    permission?: string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardSection,
          meta: { requiresAuth: true, permission: 'dashboard-menu' },
        },
        {
          path: 'head-of-family',
          name: 'head-of-family',
          component: () => IndexSection,
          meta: { requiresAuth: true, permission: 'head-of-family-menu' },
        },
        {
          path: 'head-of-family/create',
          name: 'head-of-family-create',
          component: () => CreateSection,
          meta: { requiresAuth: true, permission: 'head-of-family-create' },
        },
        {
          path: 'head-of-family/manage/:id',
          name: 'head-of-family-manage',
          component: () => DetailSection,
          meta: { requiresAuth: true, permission: 'head-of-family-read' },
        },
        {
          path: 'head-of-family/:id/edit',
          name: 'head-of-family-edit',
          component: () => EditSection,
          meta: { requiresAuth: true, permission: 'head-of-family-update' },
        },
      ],
    },
    {
      path: '/login',
      component: AuthenticateLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: LoginSection,
          meta: { requiresUnauth: true },
        },
      ],
    },
    {
      path: '/reset-password',
      component: AuthenticateLayout,
      children: [
        {
          path: '',
          name: 'reset-password',
          component: ResetPasswordSection,
        },
      ],
    },
    {
      path: '/403',
      name: 'Error 403',
      component: ErrorSection,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  const { user } = storeToRefs(auth)

  // Handle routes that require authentication
  if (to.meta.requiresAuth) {
    if (!user.value) {
      const authenticatedUser = await auth.checkAuth()
      if (!authenticatedUser) {
        next({ name: 'login' })
        return
      }
    }

    // Check if user has permission for this route
    if (!checkRoutePermission(to)) {
      next({ name: 'Error 403' })
      return
    }

    next()
  } else if (to.meta.requiresUnauth && user.value) {
    // Redirect authenticated users away from login/register pages
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

// Show pending toasts after navigation completes
router.afterEach(() => {
  const toastStore = useToastStore()
  // Small delay to ensure the new page is rendered
  setTimeout(() => {
    toastStore.showPendingToasts()
  }, 100)
})

export default router
