import MainLayout from '@/layouts/app/MainLayout.vue'
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
  ],
})

export default router
