<template>
  <div>
    <section id="Anggota-Keluarga" class="flex flex-col rounded-3xl p-6 gap-6 bg-white">
      <p class="font-medium leading-5 text-desa-secondary">Anggota Keluarga</p>
      <div class="flex items-center gap-4">
        <div class="flex size-[76px] shrink-0 rounded-full overflow-hidden bg-desa-foreshadow">
          <img
            :src="familyMember.profile_picture || '/src/assets/images/photos/kk-photo-1.png'"
            class="w-full h-full object-cover"
            alt="photo"
          />
        </div>
        <div class="flex flex-col gap-[6px] w-full">
          <p class="font-semibold text-xl line-clamp-1">{{ familyMember.user?.name }}</p>
          <p class="flex items-center gap-1">
            <img
              src="@/assets/images/icons/briefcase-secondary-green.svg"
              class="flex size-[24px] shrink-0"
              alt="icon"    
            />
            <span class="font-medium text-lg text-desa-secondary">{{
              familyMember.occupation
            }}</span>
          </p>
        </div>
        <div
          class="badge rounded-full p-3 gap-2 flex w-[100px] justify-center shrink-0 bg-desa-soft-green"
        >
          <span class="font-semibold text-xs text-white uppercase">{{ relationLabel }}</span>
        </div>
      </div>
      <hr class="border-desa-foreshadow" />
      <div class="flex items-center w-full gap-3">
        <div
          class="flex size-[52px] shrink-0 rounded-2xl bg-desa-foreshadow items-center justify-center"
        >
          <img
            src="@/assets/images/icons/keyboard-dark-green.svg"
            class="flex size-6 shrink-0"
            alt="icon"
          />
        </div>
        <div class="flex flex-col gap-1 w-full">
          <p class="font-semibold text-xl leading-[22.5px]">{{ familyMember.identify_number }}</p>
          <span class="font-medium text-desa-secondary"> Nomor Induk Kependudukan </span>
        </div>
      </div>
      <hr class="border-desa-foreshadow" />
      <div class="flex items-center w-full gap-3">
        <div
          class="flex size-[52px] shrink-0 rounded-2xl bg-desa-foreshadow items-center justify-center"
        >
          <img
            src="@/assets/images/icons/user-square-dark-green.svg"
            class="flex size-6 shrink-0"
            alt="icon"
          />
        </div>
        <div class="flex flex-col gap-1 w-full">
          <p class="font-semibold text-xl leading-[22.5px]">{{ familyMember.age }} Tahun</p>
          <span class="font-medium text-desa-secondary"> Umur </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { FamilyMember } from '@/types/headOfFamily'
import { computed } from 'vue'

const props = defineProps<{
  familyMember: FamilyMember
}>()

const relationLabel = computed(() => {
  const labels: Record<string, string> = {
    wife: 'Istri',
    husband: 'Suami',
    child: 'Anak',
  }
  return labels[props.familyMember.relation] || props.familyMember.relation
})

console.log(props.familyMember)
</script>

<style scoped></style>
