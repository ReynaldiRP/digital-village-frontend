<template>
  <div class="card flex flex-col rounded-2xl border border-desa-background p-4 gap-4">
    <div class="flex items-center justify-between gap-3">
      <div
        class="flex w-20 h-[60px] shrink-0 items-center justify-center rounded-2xl bg-desa-foreshadow overflow-hidden"
      >
        <img :src="applicantThumbnail" class="w-full h-full object-cover" alt="thumbnail" />
      </div>
      <div
        class="badge rounded-full p-3 gap-2 flex w-[100px] justify-center shrink-0"
        :class="badgeClass"
      >
        <span class="font-semibold text-xs text-white uppercase">{{ applicant.status }}</span>
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <p class="font-semibold leading-5">{{ applicant.development?.name }}</p>
      <p class="font-medium leading-5 text-desa-secondary">
        Penanggung jawab:
        <span class="font-semibold text-desa-dark-green">
          {{ applicant.development?.person_in_charge || '-' }}
        </span>
      </p>
    </div>

    <hr class="border-desa-background" />

    <div class="flex items-center gap-3">
      <div
        class="flex size-12 shrink-0 rounded-full bg-desa-foreshadow overflow-hidden items-center justify-center"
      >
        <img src="@/assets/images/icons/calendar-2-dark-green.svg" class="flex size-6" alt="icon" />
      </div>
      <div>
        <p class="font-semibold leading-5 text-desa-dark-green">{{ formattedDate }}</p>
        <p class="font-medium text-sm text-desa-secondary">Tanggal Pelaksanaan</p>
      </div>
    </div>

    <hr class="border-desa-background" />

    <div class="flex items-center gap-3">
      <div
        class="flex size-12 shrink-0 rounded-full bg-desa-foreshadow overflow-hidden items-center justify-center"
      >
        <img src="@/assets/images/icons/timer-dark-green.svg" class="flex size-6" alt="icon" />
      </div>
      <div>
        <p class="font-semibold leading-5 text-desa-dark-green">{{ formattedDuration }}</p>
        <p class="font-medium text-sm text-desa-secondary">Waktu Pelaksanaan</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DevelopmentApplicant } from '@/types/development'

interface Props {
  applicant: DevelopmentApplicant
}

const props = defineProps<Props>()

const badgeStatusColor = {
  menunggu: 'bg-desa-yellow',
  diterima: 'bg-desa-dark-green',
  ditolak: 'bg-desa-red',
} as const

type BadgeStatus = keyof typeof badgeStatusColor

const badgeClass = computed(() => {
  const status = props.applicant.status?.toLowerCase() as BadgeStatus
  return badgeStatusColor[status] || 'bg-desa-gray'
})

const applicantThumbnail = computed(() => {
  // Return the development thumbnail or a default placeholder
  return props.applicant.development?.thumbnail || '/src/assets/images/thumbnails/event-image-1.png'
})

const formattedDate = computed(() => {
  // TODO: Format the actual date from the API
  // For now, using placeholder
  return '3 Jan 2025'
})

const formattedDuration = computed(() => {
  // TODO: Calculate the actual duration from the API
  // For now, using placeholder
  const duration = props.applicant.development?.duration
  return duration ? `${duration} Hari` : '-'
})
</script>

<style scoped></style>
