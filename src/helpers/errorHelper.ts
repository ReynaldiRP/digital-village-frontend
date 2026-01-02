import type { AxiosResponse } from 'axios'

export const handleError = (
  response?: AxiosResponse<{
    message: string
  }>,
): string => {
  if (!response) {
    return 'Network error. Please check your internet connection.'
  }

  switch (response.status) {
    case 400:
      return response.data.message || 'Bad Request. Please check your input.'
    case 401:
      return response.data.message || 'Unauthorized. Please log in again.'
    case 403:
      return 'Forbidden. You do not have permission to perform this action.'
    case 404:
      return 'Resource not found. Please check the URL.'
    case 500:
      return 'Internal server error. Please try again later.'
    case 503:
      return 'Service unavailable. Please try again later.'
    default:
      return response.data.message || 'An unexpected error occurred. Please try again later.'
  }
}
