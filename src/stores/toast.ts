import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast, type ToastOptions } from 'vue3-toastify'

interface QueuedToast {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  options?: ToastOptions
}

export const useToastStore = defineStore('toast', () => {
  const pendingToasts = ref<QueuedToast[]>([])

  // Queue a toast to be shown after navigation
  const queueToast = (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'success',
    options?: ToastOptions,
  ) => {
    pendingToasts.value.push({ message, type, options })
  }

  // Show all pending toasts (call this after navigation)
  const showPendingToasts = () => {
    while (pendingToasts.value.length > 0) {
      const toastData = pendingToasts.value.shift()
      if (toastData) {
        switch (toastData.type) {
          case 'success':
            toast.success(toastData.message, toastData.options)
            break
          case 'error':
            toast.error(toastData.message, toastData.options)
            break
          case 'warning':
            toast.warning(toastData.message, toastData.options)
            break
          case 'info':
            toast.info(toastData.message, toastData.options)
            break
        }
      }
    }
  }

  // Clear all pending toasts without showing
  const clearPendingToasts = () => {
    pendingToasts.value = []
  }

  // Shorthand methods for queueing specific toast types
  const queueSuccess = (message: string, options?: ToastOptions) => {
    queueToast(message, 'success', options)
  }

  const queueError = (message: string, options?: ToastOptions) => {
    queueToast(message, 'error', options)
  }

  const queueWarning = (message: string, options?: ToastOptions) => {
    queueToast(message, 'warning', options)
  }

  const queueInfo = (message: string, options?: ToastOptions) => {
    queueToast(message, 'info', options)
  }

  return {
    pendingToasts,
    queueToast,
    showPendingToasts,
    clearPendingToasts,
    queueSuccess,
    queueError,
    queueWarning,
    queueInfo,
  }
})
