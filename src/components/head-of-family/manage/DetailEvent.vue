<template>
  <div class="flex flex-col">
    <section v-if="tab_content === 'bansos'" class="flex flex-col gap-6">
      <template v-if="social_assistances && social_assistances.length !== 0">
        <template v-for="social_assistance in social_assistances" :key="social_assistance.id">
          <div class="card flex flex-col rounded-2xl border border-desa-background p-4 gap-4">
            <div class="flex items-center justify-between">
              <p class="font-medium text-sm text-desa-secondary">Tue, 31 Dec 2024</p>
              <img
                src="@/assets/images/icons/calendar-2-secondary-green.svg"
                class="flex size-[18px] shrink-0"
                alt="icon"
              />
            </div>
            <hr class="border-desa-background" />
            <p class="font-semibold text-lg">{{ social_assistance.social_assistance?.name }}</p>
            <div class="flex items-center gap-3">
              <div
                class="flex size-[52px] shrink-0 items-center justify-center rounded-2xl bg-desa-foreshadow"
              >
                <img src="@/assets/images/icons/money-dark-green.svg" alt="icon" />
              </div>
              <div class="flex flex-col gap-[6px] w-full">
                <p class="font-semibold text-lg leading-5">
                  {{ formatRupiah(social_assistance.social_assistance?.amount) }}
                </p>
                <p class="font-medium text-sm text-desa-secondary">Nominal Pengajuan</p>
              </div>
              <div
                class="badge rounded-full p-3 gap-2 flex w-[100px] justify-center shrink-0"
                :class="getBadgeStatusColor(social_assistance.status)"
              >
                <span class="font-semibold text-xs text-white uppercase">{{
                  social_assistance.status
                }}</span>
              </div>
            </div>
            <hr class="border-desa-background" />
            <div class="flex items-center justify-between">
              <p class="font-medium text-sm text-desa-secondary">Nominal Pengajuan:</p>
              <p class="font-medium leading-5 text-desa-red">
                {{ formatRupiah(social_assistance.amount) }}
              </p>
            </div>
          </div>
        </template>
      </template>
      <BaseEmptyState v-else message="Belum ada data bantuan sosial yang diajukan." />
    </section>
    <section></section>
    <section></section>
  </div>
</template>

<script setup lang="ts">
import type { EventParticipation } from '@/types/event'
import type { SocialAssistance } from '@/types/socialAssistance'
import { formatRupiah } from '@/helpers/format'
import BaseEmptyState from '@/components/ui/BaseEmptyState.vue'

interface Props {
  tab_content: string
  social_assistances: SocialAssistance[]
  events: EventParticipation[]
}

defineProps<Props>()

const badgeStatusColor = {
  menunggu: 'bg-desa-yellow',
  diterima: 'bg-desa-dark-green',
  ditolak: 'bg-desa-red',
}

type BadgeStatus = keyof typeof badgeStatusColor

const getBadgeStatusColor = (status: string) => {
  return badgeStatusColor[status.toLowerCase() as BadgeStatus] || 'bg-desa-gray'
}
</script>

<style scoped></style>
