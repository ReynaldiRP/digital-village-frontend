import type { FilterOptions } from '@/components/head-of-family/FilterBar.vue'
import { handleError } from '@/helpers/errorHelper'
import axiosInstance from '@/plugins/axios'
import router from '@/router'
import type { ApiResponse } from '@/types'
import type {
  FormHeadOfFamily,
  HeadOfFamily,
  HeadOfFamilyPaginatedData,
  MetaData,
} from '@/types/headOfFamily'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

export const useHeadOfFamilyStore = defineStore('headOfFamily', () => {
  const headOfFamilies = ref<HeadOfFamily[]>([])
  const headOfFamily = ref<HeadOfFamily>(null as unknown as HeadOfFamily)
  const meta = ref<MetaData | null>(null)
  const loading = ref(false)
  const success = ref<string>('')
  const errors = ref<Record<string, string>>({})

  /**
   * Fetch paginated list of head of families
   *
   * @param rowPerPage - Number of items per page
   * @param page - Current page number
   * @param searchQuery - Search term for name or NIK
   * @param appliedFilters - Filter options (gender, status, etc.)
   */
  const fetchHeadOfFamilies = async (
    rowPerPage: number = 5,
    page: number = 1,
    searchQuery: string = '',
    appliedFilters: FilterOptions | null = null,
  ) => {
    loading.value = true
    errors.value = {}
    try {
      const params = new URLSearchParams({
        row_per_page: rowPerPage.toString(),
        page: page.toString(),
      })

      if (searchQuery && searchQuery.length) {
        params.append('search', searchQuery)
      }

      if (appliedFilters) {
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
        `/api/head-of-families/all/paginated?${params.toString()}`,
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

  /**
   * Fetch a single head of family by ID
   *
   * @param id - Head of family ID
   */
  const fetchHeadOfFamilyById = async (id: string) => {
    loading.value = true
    errors.value = {}
    try {
      const response = await axiosInstance.get<ApiResponse<HeadOfFamily>>(
        `/api/head-of-families/${id}`,
      )
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

  /**
   * Create a new head of family
   * @param formData - Data for the new head of family
   *
   * @returns Promise<void>
   */
  const createNewHeadOfFamily = async (formData: FormHeadOfFamily) => {
    loading.value = true
    errors.value = {}
    try {
      const data = new FormData()

      // Append all fields
      data.append('name', formData.name)
      data.append('identify_number', formData.identify_number)
      data.append('phone_number', formData.phone_number)
      data.append('occupation', formData.occupation)
      data.append('birth_date', formData.birth_date)
      data.append('gender', formData.gender)
      data.append('marital_status', formData.marital_status)
      data.append('email', formData.email)
      data.append('password', formData.password)

      // Append file only if it exists
      if (formData.profile_picture instanceof File) {
        data.append('profile_picture', formData.profile_picture)
      }

      const response = await axiosInstance.post<ApiResponse<HeadOfFamily>>(
        '/api/head-of-families',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      success.value = response.data.message
      router.push({ name: 'head-of-family' })
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

      toast.error(errors.value.message || 'Failed to create head of family.')
    } finally {
      loading.value = false
    }
  }

  /**
   * Delete a head of family by ID
   *
   * @param id - Head of family ID to delete
   */
  const deleteHeadOfFamilyById = async (id: string) => {
    loading.value = true
    errors.value = {}
    try {
      const response = await axiosInstance.delete<ApiResponse<null>>(`/api/head-of-families/${id}`)
      success.value = response.data.message
      router.push({ name: 'head-of-family' })
    } catch (error) {
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
   * Update an existing head of family
   * @param id - Head of family ID to update
   * @param formData - Updated data for the head of family
   *
   * @returns Promise<void>
   */
  const updateHeadOfFamily = async (id: string, formData: Omit<FormHeadOfFamily, 'password'>) => {
    loading.value = true
    errors.value = {}
    try {
      const data = new FormData()

      // Append all fields except password
      data.append('name', formData.name)
      data.append('identify_number', formData.identify_number)
      data.append('phone_number', formData.phone_number)
      data.append('occupation', formData.occupation)
      data.append('birth_date', formData.birth_date)
      data.append('gender', formData.gender)
      data.append('marital_status', formData.marital_status)
      data.append('email', formData.email)

      // Append file only if it's a new file
      if (formData.profile_picture instanceof File) {
        data.append('profile_picture', formData.profile_picture)
      }

      // Use _method override for Laravel PUT request with FormData
      data.append('_method', 'PUT')

      const response = await axiosInstance.post<ApiResponse<HeadOfFamily>>(
        `/api/head-of-families/${id}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      success.value = response.data.message
      router.push({ name: 'head-of-family' })
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

      toast.error(errors.value.message || 'Failed to update head of family.')
    } finally {
      loading.value = false
    }
  }

  /**
   * Send password reset link to head of family
   * @param id - Head of family ID
   *
   * @returns Promise<void>
   */
  const sendPasswordReset = async (id: string) => {
    loading.value = true
    errors.value = {}
    try {
      // First fetch the head of family to get their email
      if (!headOfFamily.value || headOfFamily.value.id !== id) {
        await fetchHeadOfFamilyById(id)
      }

      const email = headOfFamily.value?.user?.email

      if (!email) {
        throw new Error('Email tidak ditemukan untuk pengguna ini.')
      }

      // Send reset link using the email
      const response = await axiosInstance.post<ApiResponse<null>>('/api/send-reset-link', {
        email,
      })

      success.value = response.data.message
      toast.success(response.data.message || 'Link reset password telah dikirim ke email pengguna.')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        errors.value = {
          message: handleError(error.response),
        }
      } else {
        errors.value = {
          message:
            error instanceof Error
              ? error.message
              : 'Unexpected error occurred. Please try again later.',
        }
      }

      toast.error(errors.value.message || 'Gagal mengirim link reset password.')
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
    fetchHeadOfFamilies,
    fetchHeadOfFamilyById,
    createNewHeadOfFamily,
    updateHeadOfFamily,
    sendPasswordReset,
    deleteHeadOfFamilyById,
  }
})
