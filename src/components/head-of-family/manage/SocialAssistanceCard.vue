<template>
  <div class="card flex flex-col rounded-2xl border border-desa-background p-4 gap-4">
    <div class="flex items-center justify-between">
      <p class="font-medium text-sm text-desa-secondary">{{ formattedDate }}</p>
      <img
        src="@/assets/images/icons/calendar-2-secondary-green.svg"
        class="flex size-[18px] shrink-0"
        alt="icon"
      />
    </div>

    <hr class="border-desa-background" />

    <p class="font-semibold text-lg">{{ socialAssistance.social_assistance?.name }}</p>

    <div class="flex items-center gap-3">
      <div class="flex size-[72px] shrink-0 rounded-2xl bg-desa-foreshadow overflow-hidden">
        <img
          :src="socialAssistance.social_assistance?.thumbnail"
          class="w-full h-full object-cover"
          alt="thumbnail"
        />
      </div>
      <div class="flex flex-col gap-[6px] w-full">
        <p class="font-semibold text-lg leading-5">Rp.{{ formattedAmount }}</p>
        <p class="font-medium text-sm text-desa-secondary">{{ assistanceTypeLabel }}</p>
      </div>
      <div
        class="badge rounded-full p-3 gap-2 flex w-[100px] justify-center shrink-0"
        :class="badgeClass"
      >
        <span class="font-semibold text-xs text-white uppercase">{{
          socialAssistance.status
        }}</span>
      </div>
    </div>

    <hr class="border-desa-background" />

    <div class="flex items-center justify-between">
      <p class="font-medium text-sm text-desa-secondary">Nominal Pengajuan:</p>
      <p class="font-medium leading-5 text-desa-red">Rp.{{ formattedRequestAmount }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SocialAssistance } from '@/types/socialAssistance'
import { formatRupiah, formatDate } from '@/helpers/format'

interface Props {
  socialAssistance: SocialAssistance
}

const props = defineProps<Props>()

const badgeStatusColor = {
  menunggu: 'bg-desa-yellow',
  diterima: 'bg-desa-dark-green',
  ditolak: 'bg-desa-red',
} as const

type BadgeStatus = keyof typeof badgeStatusColor

const badgeClass = computed(() => {
  const status = props.socialAssistance.status?.toLowerCase() as BadgeStatus
  return badgeStatusColor[status] || 'bg-desa-gray'
})

const formattedDate = computed(() => {
  return formatDate(props.socialAssistance.social_assistance?.applied_at)
})

const assistanceTypeLabel = computed(() => {
  // You can customize this based on the assistance type
  return 'Nominal Pengajuan'
})

const formattedAmount = computed(() => {
  const amount = props.socialAssistance.social_assistance?.amount
  return amount ? formatRupiah(amount) : '-'
})

const formattedRequestAmount = computed(() => {
  const amount = props.socialAssistance.amount
  return amount ? formatRupiah(amount) : '-'
})
</script>

<style scoped></style>
