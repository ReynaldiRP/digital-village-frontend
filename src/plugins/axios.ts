// src/services/api.ts
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import axios from 'axios'
import Cookies from 'js-cookie'
import { storeToRefs } from 'pinia'
import { toast } from 'vue3-toastify'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token')
    if (token) {
      const decodedToken = decodeURIComponent(token)
      config.headers.Authorization = `Bearer ${decodedToken}`
    } else {
      console.log('No token found in cookie')
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401) {
      const isAuthRoute =
        error.config.url?.includes('/login') || error.config.url?.includes('/register')

      if (!isAuthRoute && !originalRequest._retry) {
        originalRequest._retry = true

        const auth = useAuthStore()
        auth.user = null
        auth.token = null
        Cookies.remove('auth_token')

        const toastStore = useToastStore()
        toastStore.queueError('Session expired. Please log in again.')

        router.push({ name: 'login', query: { expired: 'true' } })

        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
