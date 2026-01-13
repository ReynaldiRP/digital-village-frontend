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

    <div class="flex items-center gap-3">
      <div
        class="flex w-20 h-[60px] shrink-0 items-center justify-center rounded-2xl bg-desa-foreshadow overflow-hidden"
      >
        <img :src="eventThumbnail" class="w-full h-full object-cover" alt="thumbnail" />
      </div>
      <div class="flex flex-col gap-[6px] w-full">
        <p class="font-semibold leading-5 line-clamp-1">{{ event.event?.name }}</p>
        <div class="flex items-center gap-1">
          <img
            src="@/assets/images/icons/profile-2user-orange.svg"
            class="flex size-[18px] shrink-0"
            alt="icon"
          />
          <p class="font-medium text-sm text-desa-orange">
            {{ event.total_participants || 0 }} total partisipasi
          </p>
        </div>
      </div>
    </div>

    <hr class="border-desa-background" />

    <div class="flex items-center justify-between">
      <p class="font-medium text-sm text-desa-secondary">Harga Event:</p>
      <p class="font-medium leading-5 text-desa-red">{{ formattedPrice }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { EventParticipation } from '@/types/event'
import { formatRupiah, formatDate } from '@/helpers/format'

interface Props {
  event: EventParticipation
}

const props = defineProps<Props>()

console.log(props.event)

const formattedDate = computed(() => {
  return formatDate(props.event.event?.date)
})

const eventThumbnail = computed(() => {
  // Return the event thumbnail or a default placeholder
  return props.event.event?.thumbnail || '/src/assets/images/thumbnails/event-image-1.png'
})

const formattedPrice = computed(() => {
  const price = props.event.event?.price
  return price ? `Rp.${formatRupiah(price)}` : 'Gratis'
})
</script>

<style scoped></style>
