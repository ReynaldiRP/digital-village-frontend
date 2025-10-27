import { handleError } from '@/helpers/errorHelper'
import axiosInstance from '@/plugins/axios'
import type {
  RecentSocialAssistanceData,
  DashboardData,
  DashboardResponse,
  RecentDevelopmentApplicantData,
} from '@/types/dashboard'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDashboardStore = defineStore('dashboard', () => {
  const loading = ref(false)
  const dashboardData = ref<DashboardData | null>(null)
  const recentSocialAssistanceData = ref<RecentSocialAssistanceData[]>([])
  const recentDevelopmentApplicantData = ref<RecentDevelopmentApplicantData[]>([])
  const errors = ref<Record<string, string>>({})
  const success = ref<string>('')

  const fetchDashboardData = async () => {
    loading.value = true
    try {
      const response = await axiosInstance.get<DashboardResponse>('/dashboard/get-dashboard-data')
      dashboardData.value = response.data.data
    } catch (error) {
      errors.value = { message: handleError(error.response) }
    } finally {
      loading.value = false
    }
  }

  const fetchRecentSocialAssistance = async () => {
    loading.value = true
    try {
      const response = await axiosInstance.get<{
        message: string
        data: RecentSocialAssistanceData[]
      }>('/dashboard/get-recent-social-assistances')
      recentSocialAssistanceData.value = response.data.data
    } catch (error) {
      errors.value = { message: handleError(error.response) }
    } finally {
      loading.value = false
    }
  }

  const fetchRecentDevelopmentApplicants = async () => {
    loading.value = true
    try {
      const response = await axiosInstance.get<{
        message: string
        data: RecentDevelopmentApplicantData[]
      }>('/dashboard/get-recent-development-applicants')
      recentDevelopmentApplicantData.value = response.data.data
    } catch (error) {
      errors.value = { message: handleError(error.response) }
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    dashboardData,
    recentSocialAssistanceData,
    recentDevelopmentApplicantData,
    errors,
    success,
    fetchDashboardData,
    fetchRecentSocialAssistance,
    fetchRecentDevelopmentApplicants,
  }
})
