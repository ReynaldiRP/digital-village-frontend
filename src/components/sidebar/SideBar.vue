<template>
  <aside
    id="Sidebar"
    class="bg-white border-desa-foreshadow relative flex min-h-screen w-[280px] shrink-0 overflow-hidden border-r"
  >
    <div class="top-0 bg-white fixed z-20 flex h-full w-[280px] flex-1 shrink-0">
      <div class="gap-6 px-6 flex h-full w-full flex-col pt-[30px]">
        <div class="flex items-center justify-between">
          <img
            src="@/assets/images/logos/logo-text.svg"
            class="flex h-[30px] shrink-0"
            alt="logo"
          />
          <button
            class="size-11 rounded-2xl border-desa-background hover:border-desa-secondary transition-setup flex items-center justify-center border"
          >
            <img src="@/assets/images/icons/menu-secondary-green.svg" class="size-6" alt="icon" />
          </button>
        </div>
        <div class="gap-6 hide-scrollbar flex flex-1 flex-col overflow-y-scroll">
          <nav class="gap-2 pb-12 flex flex-col">
            <p class="font-medium text-sm text-desa-secondary">Main Menu</p>
            <ul class="gap-2 flex flex-col">
              <SidebarItem v-for="item in sidebarItems" :key="item.id" :item="item" />
            </ul>
          </nav>
          <div
            class="rounded-2xl p-5 mb-4 gap-3 bg-desa-black flex h-[84px] items-center justify-between"
          >
            <div class="gap-1 flex flex-col">
              <p class="font-semibold leading-5 text-white">Beralih ke Pro</p>
              <a
                href="#"
                class="font-medium text-sm text-desa-soft-green flex items-center hover:underline"
              >
                Upgrade Plan
                <img
                  src="@/assets/images/icons/arrow-right-soft-green.png"
                  class="size-3 ml-0.5 flex shrink-0"
                  alt="icon"
                />
              </a>
            </div>
            <img
              src="@/assets/images/icons/crown-soft-green-background.svg"
              class="size-11 flex shrink-0"
              alt="icon"
            />
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useFilteredMenu } from '@/composables/useFilteredMenu'
import SidebarItem from './SidebarItem.vue'

const { filteredMenu: sidebarItems } = useFilteredMenu()
</script>

<style scoped></style>
