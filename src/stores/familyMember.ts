import axiosInstance from '@/plugins/axios'
import type { ApiResponse } from '@/types'
import type { FamilyMember, formFamilyMember, HeadOfFamily } from '@/types/headOfFamily'
import axios from 'axios'
import { defineStore, storeToRefs } from 'pinia'
import { handleError } from '../helpers/errorHelper'
import { ref } from 'vue'
import { useAuthStore } from './auth'
import router from '@/router'

export const useFamilyMemberStore = defineStore('familyMember', () => {
  const headOfFamily = ref<HeadOfFamily | null>(null)
  const loading = ref(false)
  const success = ref<string>('')
  const errors = ref<Record<string, string>>({})
  const auth = useAuthStore()
  const { user } = storeToRefs(auth)

  /**
   * Fetch family members by head of family ID
   * @returns Promise<void>
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

  /**
   * Create a new family member
   * @param formData - Data for the new family member
   *
   * @returns Promise<void>
   */
  const createFamilyMember = async (formData: formFamilyMember) => {
    loading.value = true
    errors.value = {}
    try {
      const data = new FormData()

      // Append form data to FormData object
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          data.append(key, value)
        }
      })

      await axiosInstance.post<ApiResponse<FamilyMember>>(`/api/family-members`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      success.value = 'Family member created successfully.'
      router.push({ name: 'family-member' })
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
    createFamilyMember,
  }
})
