import MainLayout from '@/layouts/app/MainLayout.vue'
import AuthenticateLayout from '@/layouts/auth/AuthenticateLayout.vue'
import LoginSection from '@/views/auth/LoginSection.vue'
import DashboardSection from '@/views/DashboardSection.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
        },
      ],
    },
  ],
})

export default router
