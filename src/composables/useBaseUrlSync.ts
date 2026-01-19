import { useRouteQuery } from '@vueuse/router'

/**
 * Base URL sync composable for common list parameters
 * Provides search, pagination, and entries per page
 * Use this as foundation for feature-specific URL sync composables
 */
export function useBaseUrlSync() {
  const search = useRouteQuery('search', '', {
    transform: String,
  })

  const currentPage = useRouteQuery('page', 1, {
    transform: Number,
  })

  const entriesPerPage = useRouteQuery('entries', 5, {
    transform: Number,
  })

  return {
    search,
    currentPage,
    entriesPerPage,
  }
}
