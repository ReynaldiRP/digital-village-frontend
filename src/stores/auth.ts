import axiosInstance from '@/plugins/axios'
import type { User, AuthCredentials, AuthResponse, checkAuthResponse } from '@/types/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import Cookies from 'js-cookie'
import router from '@/router'
import { handleError } from '@/helpers/errorHelper'

export const useAuthStore = defineStore('user', () => {
  const loading = ref(false)
  const errors = ref<Record<string, string>>({})
  const success = ref<string>('')
  const user = ref<User | null>(null)
  const token = ref<string | null>(Cookies.get('auth_token') || null)

  const login = async (credentials: AuthCredentials) => {
    loading.value = true
    try {
      const response = await axiosInstance.post<AuthResponse>('/login', credentials)
      token.value = response.data.token
      Cookies.set('auth_token', token.value)
      success.value = response.data.message
      router.push({ name: 'dashboard' })
    } catch (error) {
      errors.value = { message: handleError(error.response) }
      console.log(errors.value)
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    try {
      await axiosInstance.post('/logout')
      token.value = null
      Cookies.remove('auth_token')
      user.value = null
      success.value = 'Logout successful'
      router.push({ name: 'login' })
    } catch (error) {
      errors.value = { message: handleError(error.response) }
      console.log(errors.value)
    } finally {
      loading.value = false
    }
  }

  const checkAuth = async (): Promise<User | null> => {
    loading.value = true
    try {
      const response = await axiosInstance.get<checkAuthResponse>('/me')
      user.value = response.data.user
      return user.value
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await logout()
      }
      return null
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
  }
})
