import axiosInstance from '@/plugins/axios'
import type { User, AuthCredentials, AuthResponse, checkAuthResponse } from '@/types/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'
import { handleError } from '@/helpers/errorHelper'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import Cookies from 'js-cookie'
import { useToastStore } from '@/stores/toast'

export const useAuthStore = defineStore('user', () => {
  const loading = ref(false)
  const errors = ref<Record<string, string>>({})
  const success = ref<string>('')
  const user = ref<User | null>(null)
  const token = ref<string | null>(Cookies.get('auth_token') || null)

  const login = async (credentials: AuthCredentials) => {
    loading.value = true
    try {
      Cookies.remove('auth_token')
      token.value = null

      const response = await axiosInstance.post<AuthResponse>('/api/login', credentials)

      token.value = response.data.token
      Cookies.set('auth_token', token.value, {
        expires: 1,
        secure: false,
        sameSite: 'lax',
        path: '/',
      })

      success.value = response.data.message

      // Queue toast to show after navigation
      const toastStore = useToastStore()
      toastStore.queueSuccess(success.value)

      router.push({ name: 'dashboard' })
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        errors.value = {
          message: handleError(error.response),
        }
      } else {
        errors.value = {
          message: 'Unexpected error occurred. Please try again later.',
        }
      }

      console.log(errors.value)
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    try {
      await axiosInstance.post('/api/logout')

      token.value = null
      user.value = null
      Cookies.remove('auth_token')

      success.value = 'Logout successful'

      // Queue toast to show after navigation
      const toastStore = useToastStore()
      toastStore.queueSuccess(success.value)

      router.push({ name: 'login' })
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        errors.value = {
          message: handleError(error.response),
        }
      } else {
        errors.value = {
          message: 'Unexpected error occurred. Please try again later.',
        }
      }
    } finally {
      loading.value = false
    }
  }

  const checkAuth = async (): Promise<User | null> => {
    loading.value = true
    try {
      const response = await axiosInstance.get<checkAuthResponse>('/api/me')
      user.value = response.data.user
      return user.value
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        token.value = null
        user.value = null
        Cookies.remove('auth_token')
      }
      return null
    } finally {
      loading.value = false
    }
  }

  const clearMessages = () => {
    errors.value = {}
    success.value = ''
  }

  const resetPassword = async (data: {
    email: string
    password: string
    password_confirmation: string
    token: string
  }) => {
    loading.value = true
    errors.value = {}
    try {
      const response = await axiosInstance.post<{
        success: boolean
        message: string
      }>('/api/reset-password', data)

      success.value = response.data.message

      // Queue toast to show after navigation
      const toastStore = useToastStore()
      toastStore.queueSuccess(success.value)

      router.push({ name: 'login' })
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        errors.value = {
          message: handleError(error.response),
        }
      } else {
        errors.value = {
          message: 'Unexpected error occurred. Please try again later.',
        }
      }

      toast.error(errors.value.message || 'Gagal mereset password.')
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    errors,
    success,
    user,
    token,
    login,
    logout,
    checkAuth,
    clearMessages,
    resetPassword,
  }
})
