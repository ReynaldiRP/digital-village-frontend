<template>
  <div class="flex flex-col gap-6 p-6 bg-white rounded-3xl">
    <h2 class="font-medium leading-5 text-desa-secondary">
      {{ cardTitle }} ({{ familyMembers.length }})
    </h2>
    <div class="flex flex-col gap-4">
      <div
        v-for="member in familyMembers"
        :key="member.id"
        class="data rounded-2xl border border-desa-background p-6 flex justify-between"
      >
        <div class="name flex items-center gap-3 min-w-[240px]">
          <div class="flex size-[64px] shrink-0 rounded-full overflow-hidden bg-desa-foreshadow">
            <img
              :src="member.profile_picture || '/src/assets/images/photos/kk-photo-1.png'"
              class="w-full h-full object-cover"
              alt="photo"
            />
          </div>
          <div class="flex flex-col gap-[6px]">
            <h3 class="font-semibold text-lg leading-[22.5px] line-clamp-1">
              {{ member.name }}
            </h3>
            <div class="flex items-center gap-1">
              <img
                src="@/assets/images/icons/briefcase-secondary-green.svg"
                alt="icon"
                class="size-[18px] shrink-0"
              />
              <p class="font-medium leading-5 text-desa-secondary line-clamp-1">
                {{ member.occupation }}
              </p>
            </div>
          </div>
        </div>
        <div class="nik flex flex-col gap-[6px] min-w-[155px]">
          <div class="flex items-center gap-1">
            <img
              src="@/assets/images/icons/keyboard-secondary-green.svg"
              alt="icon"
              class="size-[18px] shrink-0"
            />
            <h3 class="font-medium leading-[17.5px] text-sm text-desa-secondary">NIK</h3>
          </div>
          <p class="font-semibold leading-5">{{ member.identity_number }}</p>
        </div>
        <div class="umur flex flex-col gap-[6px] min-w-[92px]">
          <div class="flex items-center gap-1">
            <img
              src="@/assets/images/icons/timer-secondary-green.svg"
              alt="icon"
              class="size-[18px] shrink-0"
            />
            <h3 class="font-medium leading-[17.5px] text-sm text-desa-secondary">Umur</h3>
          </div>
          <p class="font-semibold leading-5">{{ member.age }} Tahun</p>
        </div>
        <div class="rounded-2xl px-6 py-[18px] bg-desa-black font-medium leading-5 text-white">
          Manage
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FamilyMember, HeadOfFamily } from '@/types/headOfFamily'

interface Props {
  cardTitle: string
  familyMembers: (FamilyMember | HeadOfFamily)[]
}

withDefaults(defineProps<Props>(), {
  cardTitle: 'Anggota Keluarga',
  familyMembers: () => [],
})
</script>

<style scoped></style>
