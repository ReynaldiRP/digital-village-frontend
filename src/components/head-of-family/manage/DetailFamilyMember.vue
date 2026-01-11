<template>
  <div>
    <section id="Anggota-Keluarga" class="flex flex-col rounded-3xl p-6 gap-6 bg-white">
      <div class="flex items-center justify-between">
        <div class="flex flex-col gap-[6px]">
          <p class="font-semibold text-[32px] leading-10">{{ familyMembers.length }}</p>
          <p class="font-medium leading-5 text-desa-secondary">Anggota Keluarga</p>
        </div>
        <img
          src="@/assets/images/icons/profile-2user-foreshadow-background.svg"
          class="flex size-12 shrink-0"
          alt="icon"
        />
      </div>
      <hr class="border-desa-foreshadow" />
      <div v-if="wifeData" id="Istri" class="flex flex-col gap-[14px]">
        <p class="font-medium leading-5 text-desa-secondary" v-show="wifeCount">
          Istri ({{ wifeCount }})
        </p>
        <template v-for="wife in wifeData" :key="wife.id">
          <div class="card flex flex-col rounded-2xl border border-desa-background p-4 gap-6">
            <div class="flex items-center gap-4">
              <div
                class="flex size-[64px] shrink-0 rounded-full overflow-hidden bg-desa-foreshadow"
              >
                <img
                  src="@/assets/images/photos/kk-photo-2.png"
                  class="w-full h-full object-cover"
                  alt="photo"
                />
              </div>
              <div class="flex flex-col gap-[6px] w-full">
                <p class="font-semibold text-xl line-clamp-1">{{ wife.user?.name }}</p>
                <p class="flex items-center gap-1">
                  <img
                    src="@/assets/images/icons/briefcase-secondary-green.svg"
                    class="flex size-[18px] shrink-0"
                    alt="icon"
                  />
                  <span class="font-medium text-sm text-desa-secondary">{{ wife.occupation }}</span>
                </p>
              </div>
              <p class="font-medium leading-5 text-nowrap">{{ wife.age }} tahun</p>
            </div>
            <hr class="border-desa-background" />
            <div class="flex justify-between items-center">
              <p class="flex items-center gap-1">
                <img
                  src="@/assets/images/icons/keyboard-secondary-green.svg"
                  class="flex size-[18px] shrink-0"
                  alt="icon"
                />
                <span class="font-medium text-sm text-desa-secondary"
                  >Nomor Induk Kependudukan:</span
                >
              </p>
              <p class="font-medium leading-5">{{ wife.identify_number }}</p>
            </div>
          </div>
        </template>
      </div>
      <div v-if="husbandData" id="Suami" class="flex flex-col gap-[14px]">
        <p class="font-medium leading-5 text-desa-secondary" v-show="husbandCount">
          Suami ({{ husbandCount }})
        </p>
        <template v-for="husband in husbandData" :key="husband.id">
          <div class="card flex flex-col rounded-2xl border border-desa-background p-4 gap-6">
            <div class="flex items-center gap-4">
              <div
                class="flex size-[64px] shrink-0 rounded-full overflow-hidden bg-desa-foreshadow"
              >
                <img
                  src="@/assets/images/photos/kk-photo-2.png"
                  class="w-full h-full object-cover"
                  alt="photo"
                />
              </div>
              <div class="flex flex-col gap-[6px] w-full">
                <p class="font-semibold text-xl line-clamp-1">{{ husband.user?.name }}</p>
                <p class="flex items-center gap-1">
                  <img
                    src="@/assets/images/icons/briefcase-secondary-green.svg"
                    class="flex size-[18px] shrink-0"
                    alt="icon"
                  />
                  <span class="font-medium text-sm text-desa-secondary">{{
                    husband.occupation
                  }}</span>
                </p>
              </div>
              <p class="font-medium leading-5 text-nowrap">{{ husband.age }} tahun</p>
            </div>
            <hr class="border-desa-background" />
            <div class="flex justify-between items-center">
              <p class="flex items-center gap-1">
                <img
                  src="@/assets/images/icons/keyboard-secondary-green.svg"
                  class="flex size-[18px] shrink-0"
                  alt="icon"
                />
                <span class="font-medium text-sm text-desa-secondary"
                  >Nomor Induk Kependudukan:</span
                >
              </p>
              <p class="font-medium leading-5">{{ husband.identify_number }}</p>
            </div>
          </div>
        </template>
      </div>
      <div v-if="childrenData" id="Anak" class="flex flex-col gap-[14px]">
        <p class="font-medium leading-5 text-desa-secondary" v-show="childrenCount">
          Anak ({{ childrenCount }})
        </p>
        <template v-for="child in childrenData" :key="child.id">
          <div class="card flex flex-col rounded-2xl border border-desa-background p-4 gap-6">
            <div class="flex items-center gap-4">
              <div
                class="flex size-[64px] shrink-0 rounded-full overflow-hidden bg-desa-foreshadow"
              >
                <img
                  src="@/assets/images/photos/kk-photo-3.png"
                  class="w-full h-full object-cover"
                  alt="photo"
                />
              </div>
              <div class="flex flex-col gap-[6px] w-full">
                <p class="font-semibold text-xl line-clamp-1">{{ child.user?.name }}</p>
                <p class="flex items-center gap-1">
                  <img
                    src="@/assets/images/icons/briefcase-secondary-green.svg"
                    class="flex size-[18px] shrink-0"
                    alt="icon"
                  />
                  <span class="font-medium text-sm text-desa-secondary">{{
                    child.occupation
                  }}</span>
                </p>
              </div>
              <p class="font-medium leading-5 text-nowrap">{{ child.age }} Tahun</p>
            </div>
            <hr class="border-desa-background" />
            <div class="flex justify-between items-center">
              <p class="flex items-center gap-1">
                <img
                  src="@/assets/images/icons/keyboard-secondary-green.svg"
                  class="flex size-[18px] shrink-0"
                  alt="icon"
                />
                <span class="font-medium text-sm text-desa-secondary"
                  >Nomor Induk Kependudukan:</span
                >
              </p>
              <p class="font-medium leading-5">{{ child.identify_number }}</p>
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { FamilyMember } from '@/types/headOfFamily'
import { computed } from 'vue'

const props = defineProps<{
  familyMembers: FamilyMember[]
}>()

const wifeCount = computed(() => {
  return props.familyMembers.filter((member) => member.relation === 'wife').length
})

const husbandCount = computed(() => {
  return props.familyMembers.filter((member) => member.relation === 'husband').length
})

const childrenCount = computed(() => {
  return props.familyMembers.filter((member) => member.relation === 'child').length
})

const wifeData = computed(() => {
  return props.familyMembers.filter((member) => member.relation === 'wife')
})

const husbandData = computed(() => {
  return props.familyMembers.filter((member) => member.relation === 'husband')
})

const childrenData = computed(() => {
  return props.familyMembers.filter((member) => member.relation === 'children')
})
</script>

<style scoped></style>
