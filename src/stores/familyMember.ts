import axiosInstance from '@/plugins/axios'
import type { ApiResponse } from '@/types'
import type { HeadOfFamily } from '@/types/headOfFamily'
import axios from 'axios'
import { defineStore, storeToRefs } from 'pinia'
import { handleError } from '../helpers/errorHelper'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useFamilyMemberStore = defineStore('familyMember', () => {
  const headOfFamily = ref<HeadOfFamily | null>(null)
  const loading = ref(false)
  const success = ref<string>('')
  const errors = ref<Record<string, string>>({})
  const auth = useAuthStore()
  const { user } = storeToRefs(auth)

  /**
   * Fetch family members by head of family ID
   */
  const fetchFamilyMembers = async () => {
    loading.value = true
    errors.value = {}
    try {
      const headOfFamilyId = user.value?.head_of_family_id
      const response = await axiosInstance.get<ApiResponse<HeadOfFamily[]>>(
        `/api/family-members/by-head-of-family/${headOfFamilyId}`,
      )

      const data = response.data.data
      headOfFamily.value = Array.isArray(data) ? (data[0] ?? null) : data
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

  return {
    headOfFamily,
    loading,
    success,
    errors,
    fetchFamilyMembers,
  }
})
