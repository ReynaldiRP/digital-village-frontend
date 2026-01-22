<template>
  <div>
    <div class="card flex items-center w-full gap-3">
      <div class="flex size-[72px] shrink-0 rounded-2xl bg-desa-foreshadow overflow-hidden">
        <img :src="data.thumbnail" class="w-full h-full object-cover" alt="thumbnail" />
      </div>
      <div class="flex flex-col gap-[6px] w-full">
        <div class="flex items-center gap-[6px]">
          <div class="flex size-8 rounded-full overflow-hidden bg-desa-foreshadow">
            <img :src="data.applicant_photo" class="w-full h-full object-cover" alt="icon" />
          </div>
          <p class="font-medium text-xl leading-[22.5px] line-clamp-1">
            {{ data.applicant_name }}
          </p>
        </div>
        <span class="font-medium text-desa-secondary line-clamp-1">
          Melamar {{ data.project_name }}
        </span>
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
import type { RecentDevelopmentApplicantData } from '@/types/dashboard'

defineProps<{
  data: RecentDevelopmentApplicantData
}>()

const badgeStatusColors = {
  approved: 'bg-desa-dark-green',
  pending: 'bg-desa-yellow',
  rejected: 'bg-desa-orange',
}

type BadgeStatus = keyof typeof badgeStatusColors

const getBadgeStatusColor = (status: string) => {
  return badgeStatusColors[status.toLowerCase() as BadgeStatus] || 'bg-desa-gray'
}
</script>
