import { computed } from 'vue'
import { useRouteQuery } from '@vueuse/router'
import type { FilterOptions } from '@/components/head-of-family/FilterBar.vue'
import { useBaseUrlSync } from './useBaseUrlSync'

export function useFamilyMemberUrlSync() {
    const { search, currentPage, entriesPerPage } = useBaseUrlSync()
}
