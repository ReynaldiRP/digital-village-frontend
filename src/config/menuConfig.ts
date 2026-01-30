import chartSquareDarkGreen from '@/assets/images/icons/chart-square-dark-green.svg'
import chartSquareSecondaryGreen from '@/assets/images/icons/chart-square-secondary-green.svg'
import crownDarkGreen from '@/assets/images/icons/crown-dark-green.svg'
import crownSecondaryGreen from '@/assets/images/icons/crown-secondary-green.svg'
import bag2DarkGreen from '@/assets/images/icons/bag-2-dark-green.svg'
import bag2SecondaryGreen from '@/assets/images/icons/bag-2-secondary-green.svg'
import accordionLine from '@/assets/images/icons/accodion-line.svg'
import building4DarkGreen from '@/assets/images/icons/building-4-dark-green.svg'
import building4SecondaryGreen from '@/assets/images/icons/building-4-secondary-green.svg'
import type { SidebarItem } from '@/types'

interface MenuConfig extends SidebarItem {
  permission?: string
}

export const menuConfig: MenuConfig[] = [
  {
    id: 1,
    name: 'Dashboard',
    icon: {
      active: chartSquareDarkGreen,
      inactive: chartSquareSecondaryGreen,
    },
    link: '/',
    // Added to match router permission
  },
  {
    id: 2,
    name: 'Kepala Rumah',
    icon: {
      active: crownDarkGreen,
      inactive: crownSecondaryGreen,
    },
    link: '/head-of-family', // Update to use Vue Router path
    permission: 'head-of-family-menu',
  },
  {
    id: 3,
    name: 'Anggota Keluarga',
    icon: {
      active: crownDarkGreen,
      inactive: crownSecondaryGreen,
    },
    link: '/family-member',
    permission: 'family-member-menu',
  },
  {
    id: 4,
    name: 'Bantuan Sosial',
    icon: {
      active: bag2DarkGreen,
      inactive: bag2SecondaryGreen,
    },
    link: '#',
    children: [
      {
        id: 5,
        name: 'List Bansos',
        icon: {
          active: accordionLine,
          inactive: accordionLine,
        },
        link: '/bantuan-sosial',
        permission: 'social-assistance-menu',
      },
      {
        id: 6,
        name: 'Pengajuan Bansos',
        icon: {
          active: accordionLine,
          inactive: accordionLine,
        },
        link: '/pengajuan-bansos', // Update to use Vue Router path
        permission: 'social-assistance-recipient-menu',
      },
    ],
  },
  {
    id: 7,
    name: 'Jadwal Desa',
    icon: {
      active: bag2DarkGreen,
      inactive: bag2SecondaryGreen,
    },
    link: '#',
    children: [
      {
        id: 8,
        name: 'Pembangunan',
        icon: {
          active: accordionLine,
          inactive: accordionLine,
        },
        link: '/pembangunan-desa', // Update to use Vue Router path
        permission: 'development-menu',
      },
      {
        id: 9,
        name: 'Events Desa',
        icon: {
          active: accordionLine,
          inactive: accordionLine,
        },
        link: '/events-desa', // Update to use Vue Router path
        permission: 'events-menu',
      },
    ],
  },
  {
    id: 10,
    name: 'Profile Desa',
    icon: {
      active: building4DarkGreen,
      inactive: building4SecondaryGreen,
    },
    link: '/profile-desa', // Update to use Vue Router path
    permission: 'profile-menu',
  },
]
