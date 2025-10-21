<template>
  <div id="Top-Bar" class="relative flex h-[116px] shrink-0">
    <div
      class="top-0 px-6 gap-4 bg-white border-desa-background fixed z-30 flex h-[116px] w-[-webkit-fill-available] items-center border-l py-[30px]"
    >
      <form action="#" class="flex w-full">
        <label
          class="group border-desa-background py-4 px-6 gap-2 bg-white hover:border-desa-dark-green focus-within:border-desa-dark-green transition-setup flex w-full items-center rounded-full border"
        >
          <button type="submit" class="size-6 relative flex shrink-0">
            <img
              src="@/assets/images/icons/search-normal-dark-green.svg"
              class="size-6 transition-setup absolute flex shrink-0 opacity-0 group-focus-within:opacity-100"
              alt="icon"
            />
            <img
              src="@/assets/images/icons/search-normal-secondary-green.svg"
              class="size-6 transition-setup absolute flex shrink-0 opacity-100 group-focus-within:opacity-0"
              alt="icon"
            />
          </button>
          <input
            type="text"
            class="font-medium leading-5 text-desa-black placeholder:placeholder-shown:text-desa-secondary w-full appearance-none outline-none"
            style="background-color: transparent"
            placeholder="Cari nama penduduk, pengajuan, events, dll"
          />
        </label>
      </form>
      <a
        href="#"
        class="size-14 rounded-2xl border-desa-background hover:border-desa-secondary transition-setup flex shrink-0 items-center justify-center border"
      >
        <img
          src="@/assets/images/icons/notification-secondary-green.svg"
          class="size-6"
          alt="icon"
        />
      </a>
      <a
        href="#"
        class="size-14 rounded-2xl border-desa-background hover:border-desa-secondary transition-setup flex shrink-0 items-center justify-center border"
      >
        <img src="@/assets/images/icons/setting-2-secondary-green.svg" class="size-6" alt="icon" />
      </a>
      <div class="gap-4 flex items-center">
        <div class="size-14 bg-desa-foreshadow flex shrink-0 overflow-hidden rounded-full">
          <img
            src="@/assets/images/photos/photo-1.png"
            class="h-full w-full object-cover"
            alt="photo"
          />
        </div>
        <div class="flex w-[120px] shrink-0 flex-col gap-[6px]">
          <p class="font-semibold leading-5 w-[120px] truncate">Bimore W</p>
          <p class="font-medium text-sm text-desa-secondary">Kepala Desa</p>
        </div>
        <button class="size-6 flex shrink-0">
          <img src="@/assets/images/icons/logout-red.svg" class="size-6" alt="logout" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useAuthStore } from '@/stores/authStore'

// const auth = useAuthStore()

// const handleLogout = () => {
//   auth.logout()
// }
</script>

<style scoped></style>
