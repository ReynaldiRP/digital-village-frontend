import { computed } from 'vue'
import { useRouteQuery } from '@vueuse/router'
import type { FilterOptions } from '@/components/head-of-family/FilterBar.vue'
import { useBaseUrlSync } from './useBaseUrlSync'

/**
 * URL sync composable for Head of Family feature
 * Extends base URL sync with head of family specific filters
 */
export function useHeadOfFamilyUrlSync() {
  const { search, currentPage, entriesPerPage } = useBaseUrlSync()
  const gender = useRouteQuery<'male' | 'female' | null>('gender', null)
  const maritalStatus = useRouteQuery<'single' | 'married' | 'divorced' | 'widowed' | null>(
    'marital_status',
    null,
  )
  const occupation = useRouteQuery<string | null>('occupation', null)
  const sortBy = useRouteQuery<
    'name_asc' | 'name_desc' | 'newest' | 'oldest' | 'family_asc' | 'family_desc'
  >('sort_by', 'newest')

  const minMembers = useRouteQuery<number | null>('min_members', null, {
    transform: (val) => {
      if (val === null || val === undefined) return null
      if (typeof val === 'string' && val === '') return null
      const num = Number(val)
      return isNaN(num) ? null : num
    },
  })

  const maxMembers = useRouteQuery<number | null>('max_members', null, {
    transform: (val) => {
      if (val === null || val === undefined) return null
      if (typeof val === 'string' && val === '') return null
      const num = Number(val)
      return isNaN(num) ? null : num
    },
  })

  // Combine all filters into computed object
  const filters = computed<FilterOptions>(() => ({
    gender: gender.value,
    marital_status: maritalStatus.value,
    occupation: occupation.value,
    sort_by: sortBy.value,
    family_members: {
      min: minMembers.value,
      max: maxMembers.value,
    },
  }))

  const updateFilters = (newFilters: FilterOptions) => {
    gender.value = newFilters.gender
    maritalStatus.value = newFilters.marital_status
    occupation.value = newFilters.occupation
    sortBy.value = newFilters.sort_by || 'newest'
    minMembers.value = newFilters.family_members?.min ?? null
    maxMembers.value = newFilters.family_members?.max ?? null
  }

  const resetFilters = () => {
    gender.value = null
    maritalStatus.value = null
    occupation.value = null
    sortBy.value = 'newest'
    minMembers.value = null
    maxMembers.value = null
  }

  return {
    search,
    currentPage,
    entriesPerPage,
    gender,
    maritalStatus,
    occupation,
    sortBy,
    minMembers,
    maxMembers,
    filters,
    updateFilters,
    resetFilters,
  }
}
