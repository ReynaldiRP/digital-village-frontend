import type { FilterOptions } from '@/components/head-of-family/FilterBar.vue'
import { handleError } from '@/helpers/errorHelper'
import axiosInstance from '@/plugins/axios'
import type { ApiResponse } from '@/types'
import type { HeadOfFamily, HeadOfFamilyPaginatedData, MetaData } from '@/types/headOfFamily'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHeadOfFamilyStore = defineStore('headOfFamily', () => {
  const headOfFamilies = ref<HeadOfFamily[]>([])
  const headOfFamily = ref<HeadOfFamily>(null as unknown as HeadOfFamily)
  const meta = ref<MetaData | null>(null)
  const loading = ref(false)
  const success = ref<string>('')
  const errors = ref<Record<string, string>>({})
  const search = ref<string>('')
  const filters = ref<FilterOptions>()

  const fetchHeadOfFamilies = async (
    rowPerPage: number = 5,
    page: number = 1,
    appliedFilters: FilterOptions | null = null,
  ) => {
    loading.value = true
    errors.value = {}
    try {
      const params = new URLSearchParams({
        row_per_page: rowPerPage.toString(),
        page: page.toString(),
      })

      if (search.value && search.value.length) {
        params.append('search', search.value)
      }

      // Handle filter parameters in backend's expected format: filters[key]=value
      if (appliedFilters) {
        // Handle nested family_members range - filters[family_count_range][min/max]
        if (appliedFilters.family_members) {
          if (appliedFilters.family_members.min !== null) {
            params.append(
              'filters[family_count_range][min]',
              appliedFilters.family_members.min.toString(),
            )
          }
          if (appliedFilters.family_members.max !== null) {
            params.append(
              'filters[family_count_range][max]',
              appliedFilters.family_members.max.toString(),
            )
          }
        }

        // Handle simple filter values - filters[key]=value
        if (appliedFilters.gender) {
          params.append('filters[gender]', appliedFilters.gender)
        }
        if (appliedFilters.marital_status) {
          params.append('filters[marital_status]', appliedFilters.marital_status)
        }
        if (appliedFilters.occupation) {
          params.append('filters[occupation]', appliedFilters.occupation)
        }
        if (appliedFilters.sort_by) {
          params.append('filters[sort_by]', appliedFilters.sort_by)
        }
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

  const fetchHeadOfFamilyById = async (id: string) => {
    loading.value = true
    errors.value = {}
    try {
      const response = await axiosInstance.get<ApiResponse<HeadOfFamily>>(`/head-of-families/${id}`)
      headOfFamily.value = response.data.data
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
    headOfFamily,
    meta,
    loading,
    success,
    errors,
    search,
    filters,
    fetchHeadOfFamilies,
    fetchHeadOfFamilyById,
  }
})
