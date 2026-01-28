<template>
  <div class="flex min-h-screen items-center justify-center bg-desa-background px-4 py-12">
    <div class="text-center max-w-lg w-full">
      <!-- Icon/Illustration -->
      <div class="mb-8 flex justify-center">
        <div
          class="flex items-center justify-center w-48 h-48 rounded-full bg-desa-red/10 relative"
        >
          <svg
            class="w-24 h-24 text-desa-red"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
      </div>

      <!-- Error Code -->
      <h1 class="mb-3 text-[80px] font-bold text-desa-black leading-none">403</h1>

      <!-- Title -->
      <h2 class="mb-3 text-2xl font-semibold text-desa-black leading-7">Akses Ditolak</h2>

      <!-- Message -->
      <p class="mb-8 text-base font-medium leading-6 text-desa-secondary px-4">
        Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. Silakan hubungi administrator
        jika Anda memerlukan akses.
      </p>

      <!-- Action Buttons -->
      <div class="flex justify-center gap-3 flex-wrap mt-4">
        <button
          @click="goBack"
          class="px-6 py-[18px] rounded-2xl font-medium text-sm leading-5 bg-white border border-desa-background text-desa-secondary hover:border-desa-secondary transition-all"
        >
          Kembali
        </button>
        <router-link
          to="/"
          class="px-6 py-[18px] rounded-2xl font-medium text-sm leading-5 bg-desa-dark-green text-white hover:bg-desa-soft-green transition-all inline-block"
        >
          Ke Dashboard
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<style scoped></style>
