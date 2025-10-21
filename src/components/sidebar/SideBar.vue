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
import type { SidebarItem as SidebarItemType } from '@/types/index'
import SidebarItem from './SidebarItem.vue'

// Import sidebar icons
import chartSquareDarkGreen from '@/assets/images/icons/chart-square-dark-green.svg'
import chartSquareSecondaryGreen from '@/assets/images/icons/chart-square-secondary-green.svg'
import crownDarkGreen from '@/assets/images/icons/crown-dark-green.svg'
import crownSecondaryGreen from '@/assets/images/icons/crown-secondary-green.svg'
import bag2DarkGreen from '@/assets/images/icons/bag-2-dark-green.svg'
import bag2SecondaryGreen from '@/assets/images/icons/bag-2-secondary-green.svg'
import accordionLine from '@/assets/images/icons/accodion-line.svg'
import building4DarkGreen from '@/assets/images/icons/building-4-dark-green.svg'
import building4SecondaryGreen from '@/assets/images/icons/building-4-secondary-green.svg'

const sidebarItems: SidebarItemType[] = [
  {
    id: 1,
    name: 'Dashboard',
    icon: {
      active: chartSquareDarkGreen,
      inactive: chartSquareSecondaryGreen,
    },
    link: '/', // Update to use Vue Router path
  },
  {
    id: 2,
    name: 'Kepala Rumah',
    icon: {
      active: crownDarkGreen,
      inactive: crownSecondaryGreen,
    },
    link: '/kepala-rumah', // Update to use Vue Router path
  },
  {
    id: 3,
    name: 'Bantuan Sosial',
    icon: {
      active: bag2DarkGreen,
      inactive: bag2SecondaryGreen,
    },
    link: '#',
    children: [
      {
        id: 4,
        name: 'List Bansos',
        icon: {
          active: accordionLine,
          inactive: accordionLine,
        },
        link: '/bantuan-sosial', // Update to use Vue Router path
      },
      {
        id: 5,
        name: 'Pengajuan Bansos',
        icon: {
          active: accordionLine,
          inactive: accordionLine,
        },
        link: '/pengajuan-bansos', // Update to use Vue Router path
      },
    ],
  },
  {
    id: 6,
    name: 'Jadwal Desa',
    icon: {
      active: bag2DarkGreen,
      inactive: bag2SecondaryGreen,
    },
    link: '#',
    children: [
      {
        id: 7,
        name: 'Pembangunan',
        icon: {
          active: accordionLine,
          inactive: accordionLine,
        },
        link: '/pembangunan-desa', // Update to use Vue Router path
      },
      {
        id: 8,
        name: 'Events Desa',
        icon: {
          active: accordionLine,
          inactive: accordionLine,
        },
        link: '/events-desa', // Update to use Vue Router path
      },
    ],
  },
  {
    id: 9,
    name: 'Profile Desa',
    icon: {
      active: building4DarkGreen,
      inactive: building4SecondaryGreen,
    },
    link: '/profile-desa', // Update to use Vue Router path
  },
]
</script>

<style scoped></style>
