<template>
  <div>
    <div class="card flex items-center w-full gap-3">
      <div
        class="flex size-[72px] shrink-0 rounded-2xl bg-desa-foreshadow items-center justify-center"
      >
        <img
          src="@/assets/images/icons/money-dark-green.svg"
          class="flex size-9 shrink-0"
          alt="icon"
        />
      </div>
      <div class="flex flex-col gap-[6px] w-full">
        <p class="font-semibold text-xl leading-[25px]">Rp.{{ formatRupiah(data.amount) }}</p>
        <div class="flex items-center gap-0.5 font-medium text-desa-secondary">
          <img
            src="@/assets/images/icons/profile-secondary-green.svg"
            class="flex size-[18px] shrink-0"
            alt="icon"
          />
          <span class="line-clamp-1"> Diberikan oleh {{ data.recipient_name }} </span>
        </div>
      </div>
      <div
        class="badge rounded-full p-3 gap-2 flex w-[100px] justify-center shrink-0"
        :class="getBadgeStatusColor(data.status)"
      >
        <span class="font-semibold text-xs text-white uppercase">
          {{ data.status }}
        </span>
      </div>
    </div>
    <hr class="border-desa-foreshadow last-of-type:hidden" />
  </div>
</template>

<script setup lang="ts">
import type { RecentSocialAssistanceData } from '@/types/dashboard'

defineProps<{
  data: RecentSocialAssistanceData
}>()

const formatRupiah = (value: number) => {
  return value.toLocaleString('id-ID')
}

const getBadgeStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    accepted: 'bg-desa-dark-green',
    pending: 'bg-desa-yellow',
    rejected: 'bg-desa-orange',
  }
  return colors[status.toLowerCase()] || 'bg-desa-gray'
}
</script>
