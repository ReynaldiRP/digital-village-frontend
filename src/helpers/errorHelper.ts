import type { ErrorResponse } from '@/types/index'

export const handleError = (error: ErrorResponse): string => {
  if (error && error.status === 422) {
    return error.data.message
  } else if (error && error.status === 401) {
    return error.data.message
  } else if (error && error.status === 400) {
    return error.data.message
  } else if (error && error.status === 500) {
    return error.data.message
  }

  return 'An unexpected error occurred. Please try again later.'
}
