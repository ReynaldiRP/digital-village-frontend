import MainLayout from '@/layouts/app/MainLayout.vue'
import AuthenticateLayout from '@/layouts/auth/AuthenticateLayout.vue'
import { useAuthStore } from '@/stores/auth'
import LoginSection from '@/views/auth/LoginSection.vue'
import DashboardSection from '@/views/DashboardSection.vue'
import ErrorSection from '@/views/error/ErrorSection.vue'
import DetailSection from '@/views/head-of-family/DetailSection.vue'
import IndexSection from '@/views/head-of-family/IndexSection.vue'
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
          path: 'head-of-family/manage/:id',
          name: 'head-of-family-manage',
          component: () => DetailSection,
          meta: { requiresAuth: true, permission: 'head-of-family-read' },
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
          meta: { requiresUnauth: true, permission: 'dashboard-home' },
        },
      ],
    },
    {
      path: '/403',
      name: 'Error 403',
      component: ErrorSection,
      meta: { requiresAuth: true, permission: 'dashboard-home' },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth) {
    if (auth.token) {
      try {
        if (!auth.user) {
          await auth.checkAuth()
        }

        const userPermissions = auth.user?.permissions || []

        if (to.meta.permission && !userPermissions.includes(to.meta.permission as string)) {
          next({ name: 'Error 403' })
          return
        }

        next()
      } catch (error) {
        next({ name: 'login' })
      }
    } else {
      next({ name: 'login' })
    }
  } else if (to.meta.requiresUnauth && auth.token) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
