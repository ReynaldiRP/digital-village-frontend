<template>
  <div>
    <h1 class="font-semibold text-2xl">Desa Statistics</h1>
    <div id="Row-1" class="flex gap-[14px]">
      <div
        class="flex flex-col w-[calc(389/1000*100%)] h-[358px] rounded-2xl p-6 gap-6 gradient-vertical"
      >
        <img
          src="@/assets/images/icons/gift-orange-background.svg"
          class="flex size-[86px] shrink-0"
          alt="icon"
        />
        <div class="flex flex-col gap-3">
          <p class="font-medium text-sm text-desa-lime">— Bantuan Sosial</p>
          <p class="font-semibold text-2xl text-white text-nowrap">Dari Desa untuk Warga ❤️</p>
          <p class="text-white">
            Wujudkan kesejahteraan desa dengan bantuan sosial yang tepat sasaran.
          </p>
        </div>
        <a href="#" class="flex items-center justify-between rounded-2xl p-4 gap-[10px] bg-white">
          <span class="font-medium text-desa-dark-green leading-5">Bikin Bantuan Sosial</span>
          <img
            src="@/assets/images/icons/add-square-dark-green.svg"
            class="flex size-6 shrink-0"
            alt="icon"
          />
        </a>
      </div>
      <section id="Statistics" class="grid grid-cols-2 flex-1 shrink-0 gap-[14px]">
        <template v-for="statistic in statistics" :key="statistic.id">
          <CardStatistic
            :label="statistic.label"
            :value="statistic.value"
            :icon="statistic.icon"
            :trend-icon="TrendUpIcon"
          />
        </template>
      </section>
    </div>
    <div id="Row-2" class="flex gap-[14px]">
      <section
        id="Bantuan-Sosial"
        class="flex flex-col w-[calc(497/1000*100%)] shrink-0 rounded-2xl bg-white"
      >
        <CardStatistic
          label="Bantuan Sosial"
          :value="dashboardData?.social_assistances || 0"
          :icon="Bag2ForeshadowBackgroundIcon"
          :trend-icon="TrendUpIcon"
          variant="plain"
        />
        <hr class="border-desa-foreshadow" />
        <RecentListSection title="Bansos Terakhir">
          <RecentSocialAssistanceItem
            v-for="recentSocialAssistance in recentSocialAssistanceData"
            :key="recentSocialAssistance.id"
            :data="recentSocialAssistance"
          />
        </RecentListSection>
      </section>
      <section id="Event" class="flex flex-col flex-1 shrink-0 rounded-2xl bg-white">
        <DatePicker @date-selected="handleDateSelected" />
        <div id="Events" class="flex flex-col flex-1 gap-4 p-6">
          <div class="flex items-center justify-between">
            <button>
              <img
                src="@/assets/images/icons/arrow-left-secondary-green.svg"
                class="flex size-6 shrink-0"
                alt="icon"
              />
            </button>
            <span class="font-medium text-desa-secondary">Upcoming Events (2)</span>
            <button>
              <img
                src="@/assets/images/icons/arrow-left-secondary-green.svg"
                class="flex size-6 shrink-0 rotate-180"
                alt="icon"
              />
            </button>
          </div>
          <div
            class="event-card relative flex w-full h-[365px] shrink-0 rounded-2xl bg-desa-background overflow-hidden"
          >
            <img
              src="@/assets/images/thumbnails/event-image-1.png"
              class="w-full h-full object-cover object-top"
              alt="thumbnails"
            />
            <div
              class="absolute inset-3 top-auto text-white flex flex-col rounded-[18px] border border-white/20 p-4 gap-[6px] backdrop-blur-xl bg-white/[2%]"
            >
              <p class="font-semibold text-xl leading-[25px]">Belajar Coding Bersama</p>
              <div class="flex items-center gap-1">
                <img
                  src="@/assets/images/icons/clock-white.svg"
                  class="flex size-[18px] shrink-0"
                  alt="icon"
                />
                <p class="font-medium">11:30 WIB</p>
              </div>
            </div>
          </div>
          <BaseEmptyState
            class="event-empty-state hidden m-auto"
            size="large"
            icon="/src/assets/images/icons/calendar-remove-secondary-green.svg"
            message="Ups, nampaknya belum ada event"
          />
        </div>
      </section>
    </div>
    <div id="Row-3" class="flex gap-[14px]">
      <section id="Total-Aplicants" class="flex flex-col gap-[14px] w-[calc(603/1000*100%)]">
        <div class="flex flex-col flex-1 shrink-0 rounded-2xl bg-white">
          <div class="flex flex-col gap-3 p-6">
            <div class="flex items-center justify-between">
              <p class="font-medium text-desa-secondary">Total Applicants</p>
              <img
                src="@/assets/images/icons/document-text-foreshadow-background.svg"
                class="flex size-12 shrink-0"
                alt="icon"
              />
            </div>
            <div class="flex flex-col gap-[6px]">
              <p class="font-semibold text-[32px] leading-10">1.200</p>
              <div class="flex items-center gap-0.5">
                <img
                  src="@/assets/images/icons/trend-up-dark-green-fill.svg"
                  class="flex size-[18px] shrink-0"
                  alt="icon"
                />
                <p class="font-medium text-sm text-desa-secondary">
                  <span class="text-desa-dark-green">+12%</span>
                  dari bulan sebelumnya
                </p>
              </div>
            </div>
          </div>
          <hr class="border-desa-foreshadow" />
          <RecentListSection title="Applicant Terakhir">
            <RecentDevelopmentApplicantItem
              v-for="recentDevelopmentApplicant in recentDevelopmentApplicantData"
              :key="recentDevelopmentApplicant.id"
              :data="recentDevelopmentApplicant"
            />
          </RecentListSection>
        </div>
        <div
          class="flex items-center justify-between h-[125px] rounded-2xl p-8 gap-4 gradient-horizontal"
        >
          <div class="flex flex-col gap-[6px]">
            <p class="font-medium text-sm text-desa-lime">— Unduh Data Desa</p>
            <p class="font-semibold text-2xl text-white text-nowrap">Data Desa Terkini</p>
          </div>
          <a href="#" class="flex items-center flex-nowrap rounded-2xl p-4 gap-[10px] bg-white">
            <span class="font-medium text-desa-dark-green">Download Laporan</span>
            <img
              src="@/assets/images/icons/receive-square-dark-green.svg"
              class="flex size-6 shrink-0"
              alt="icon"
            />
          </a>
        </div>
      </section>
      <section
        id="statistik-Penduduk"
        class="flex flex-col flex-1 shrink-0 gap-4 p-6 rounded-2xl bg-white"
      >
        <div class="flex items-center justify-between">
          <p class="font-medium text-desa-secondary">Statistics Penduduk</p>
          <img
            src="@/assets/images/icons/profile-2user-foreshadow-background.svg"
            class="flex size-12 shrink-0"
            alt="icon"
          />
        </div>
        <div class="relative">
          <div class="absolute flex flex-col gap-1 justify-center items-center text-center inset-0">
            <p class="font-semibold text-[32px] leading-10">243.000</p>
            <p class="font-medium text-sm text-desa-secondary">Jumlah Penduduk</p>
          </div>
          <canvas id="myChart" class="size-[288px] mx-auto"></canvas>
        </div>
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <div class="flex flex-col gap-1">
              <p class="font-medium leading-5 flex">
                <span class="block size-2 rounded-full my-auto bg-desa-dark-green mr-[6px]"></span>
                Pria
              </p>
              <p class="font-medium text-sm text-desa-secondary">Rentang usia: 32-36 tahun</p>
            </div>
            <p class="flex items-center font-medium leading-5">
              114.210
              <img
                src="@/assets/images/icons/user-black.svg"
                class="flex size-[18px] shrink-0 ml-0.5"
                alt="icon"
              />
            </p>
          </div>
          <hr class="border-desa-foreshadow" />
          <div class="flex items-center justify-between">
            <div class="flex flex-col gap-1">
              <p class="font-medium leading-5 flex">
                <span class="block size-2 rounded-full my-auto bg-desa-soft-green mr-[6px]"></span>
                Wanita
              </p>
              <p class="font-medium text-sm text-desa-secondary">Rentang usia: 26-31 tahun</p>
            </div>
            <p class="flex items-center font-medium leading-5">
              97.200
              <img
                src="@/assets/images/icons/user-black.svg"
                class="flex size-[18px] shrink-0 ml-0.5"
                alt="icon"
              />
            </p>
          </div>
          <hr class="border-desa-foreshadow" />
          <div class="flex items-center justify-between">
            <div class="flex flex-col gap-1">
              <p class="font-medium leading-5 flex">
                <span class="block size-2 rounded-full my-auto bg-desa-orange mr-[6px]"></span>
                Anak-anak
              </p>
              <p class="font-medium text-sm text-desa-secondary">Rentang usia: 6-12 tahun</p>
            </div>
            <p class="flex items-center font-medium leading-5">
              24.300
              <img
                src="@/assets/images/icons/user-black.svg"
                class="flex size-[18px] shrink-0 ml-0.5"
                alt="icon"
              />
            </p>
          </div>
          <hr class="border-desa-foreshadow" />
          <div class="flex items-center justify-between">
            <div class="flex flex-col gap-1">
              <p class="font-medium leading-5 flex">
                <span class="block size-2 rounded-full my-auto bg-desa-yellow mr-[6px]"></span>
                Balita
              </p>
              <p class="font-medium text-sm text-desa-secondary">Rentang usia: 0-5 tahun</p>
            </div>
            <p class="flex items-center font-medium leading-5">
              7.290
              <img
                src="@/assets/images/icons/user-black.svg"
                class="flex size-[18px] shrink-0 ml-0.5"
                alt="icon"
              />
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboard'
import { ArcElement, Chart, DoughnutController, Legend, Tooltip } from 'chart.js'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import CardStatistic from '@/components/dashboard/home/CardStatistic.vue'
import DatePicker from '@/components/ui/DatePicker.vue'
import Profil2userForeshadowBackgroundIcon from '@/assets/images/icons/profil-2user-foreshadow-background.svg'
import CrownForeshadowBackgroundIcon from '@/assets/images/icons/crown-foreshadow-background.svg'
import Calendar2ForeshadowBackgroundIcon from '@/assets/images/icons/calendar-2-foreshadow-background.svg'
import TrendUpIcon from '@/assets/images/icons/trend-up-dark-green-fill.svg'
import BuildingForeshadowBackgroundIcon from '@/assets/images/icons/building-foreshadow-background.svg'
import Bag2ForeshadowBackgroundIcon from '@/assets/images/icons/bag-2-foreshadow-background.svg'
import RecentListSection from '@/components/dashboard/home/RecentListSection.vue'
import RecentSocialAssistanceItem from '@/components/dashboard/home/RecentSocialAssistanceItem.vue'
import RecentDevelopmentApplicantItem from '@/components/dashboard/home/RecentDevelopmentApplicantItem.vue'
import BaseEmptyState from '@/components/ui/BaseEmptyState.vue'

const dashboardStore = useDashboardStore()
const { dashboardData, recentSocialAssistanceData, recentDevelopmentApplicantData } =
  storeToRefs(dashboardStore)
const { fetchDashboardData, fetchRecentSocialAssistance, fetchRecentDevelopmentApplicants } =
  dashboardStore

const handleDateSelected = (date: Date) => {
  // Handle the selected date, e.g., fetch events for this date
  console.log('Selected date:', date)
}

onMounted(async () => {
  await fetchDashboardData()
  await fetchRecentSocialAssistance()
  await fetchRecentDevelopmentApplicants()
  getResidentsStatistic()
})

Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

const getResidentsStatistic = () => {
  const chart = document.getElementById('myChart') as HTMLCanvasElement
  new Chart(chart, {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: [114210, 97200, 24300, 7290],
          backgroundColor: ['#14532D', '#22C55E', '#F97316', '#EAB308'],
          spacing: 2,
          borderRadius: 6,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      cutout: '69%',
    },
  })
}

const statistics = computed(() => [
  {
    id: 1,
    label: 'Jumlah Penduduk',
    value: dashboardData.value?.residents ?? 0,
    icon: Profil2userForeshadowBackgroundIcon,
  },
  {
    id: 2,
    label: 'Pembangunan',
    value: dashboardData.value?.developments ?? 0,
    icon: BuildingForeshadowBackgroundIcon,
  },
  {
    id: 3,
    label: 'Kepala Rumah',
    value: dashboardData.value?.head_of_families ?? 0,
    icon: CrownForeshadowBackgroundIcon,
  },
  {
    id: 4,
    label: 'Total Events',
    value: dashboardData.value?.events ?? 0,
    icon: Calendar2ForeshadowBackgroundIcon,
  },
])
</script>

<style scoped></style>
