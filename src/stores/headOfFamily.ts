import { handleError } from '@/helpers/errorHelper'
import axiosInstance from '@/plugins/axios'
import type { ApiResponse } from '@/types'
import type { HeadOfFamily, HeadOfFamilyPaginatedData, MetaData } from '@/types/headOfFamily'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHeadOfFamilyStore = defineStore('headOfFamily', () => {
  const headOfFamilies = ref<HeadOfFamily[]>([])
  const meta = ref<MetaData | null>(null)
  const loading = ref(false)
  const success = ref<string>('')
  const errors = ref<Record<string, string>>({})
  const search = ref<string>('')

  const fetchHeadOfFamilies = async (rowPerPage: number = 5) => {
    loading.value = true
    errors.value = {}
    try {
      const params = new URLSearchParams({
        row_per_page: rowPerPage.toString(),
      })

      if (search.value && search.value.length) {
        params.append('search', search.value)
      }

      const response = await axiosInstance.get<ApiResponse<HeadOfFamilyPaginatedData>>(
        `/head-of-families/all/paginated?${params.toString()}`,
      )

      headOfFamilies.value = response.data.data.items
      meta.value = response.data.data.meta
      success.value = response.data.message
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
    headOfFamilies,
    meta,
    loading,
    success,
    errors,
    search,
    fetchHeadOfFamilies,
  }
})
