<template>
  <div>
    <section id="Kepala-Rumah" class="flex flex-col rounded-3xl p-6 gap-6 bg-white">
      <p class="font-medium leading-5 text-desa-secondary">Kepala Rumah</p>
      <div class="flex items-center gap-4">
        <div class="flex size-[76px] shrink-0 rounded-full overflow-hidden bg-desa-foreshadow">
          <img
            :src="headOfFamily.profile_picture ?? '@/assets/images/photos/default-photo.png'"
            class="w-full h-full object-cover"
            alt="photo"
          />
        </div>
        <div class="flex flex-col gap-[6px] w-full">
          <p class="font-semibold text-xl line-clamp-1">{{ headOfFamily.user?.name }}</p>
          <p class="flex items-center gap-1">
            <img
              src="@/assets/images/icons/briefcase-secondary-green.svg"
              class="flex size-[18px] shrink-0"
              alt="icon"
            />
            <span class="font-medium text-sm text-desa-secondary">{{
              headOfFamily.occupation
            }}</span>
          </p>
        </div>
        <div
          class="badge rounded-full p-3 gap-2 flex w-[100px] justify-center shrink-0 bg-desa-soft-green"
        >
          <span class="font-semibold text-xs text-white uppercase">{{
            headOfFamily.marital_status
          }}</span>
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
          <p class="font-semibold text-xl leading-[22.5px]">{{ headOfFamily.identify_number }}</p>
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
          <p class="font-semibold text-xl leading-[22.5px]">{{ headOfFamily.age }} Tahun</p>
          <span class="font-medium text-desa-secondary"> Umur Kepala Rumah </span>
        </div>
      </div>
      <hr class="border-desa-foreshadow" />
      <div class="flex items-center w-full gap-3">
        <div
          class="flex size-[52px] shrink-0 rounded-2xl bg-desa-foreshadow items-center justify-center"
        >
          <img
            src="@/assets/images/icons/man-dark-green.svg"
            class="flex size-6 shrink-0"
            alt="icon"
          />
        </div>
        <div class="flex flex-col gap-1 w-full">
          <p class="font-semibold text-xl leading-[22.5px]">{{ genderLabel }}</p>
          <span class="font-medium text-desa-secondary"> Jenis Kelamin </span>
        </div>
      </div>
      <hr class="border-desa-foreshadow" />
      <div class="flex items-center w-full gap-3">
        <div
          class="flex size-[52px] shrink-0 rounded-2xl bg-desa-foreshadow items-center justify-center"
        >
          <img
            src="@/assets/images/icons/sms-dark-green.svg"
            class="flex size-6 shrink-0"
            alt="icon"
          />
        </div>
        <div class="flex flex-col gap-1 w-full">
          <p class="font-semibold text-xl leading-[22.5px]">{{ headOfFamily.user?.email }}</p>
          <span class="font-medium text-desa-secondary"> Email Address </span>
        </div>
      </div>
      <hr class="border-desa-foreshadow" />
      <div class="flex items-center w-full gap-3">
        <div
          class="flex size-[52px] shrink-0 rounded-2xl bg-desa-foreshadow items-center justify-center"
        >
          <img
            src="@/assets/images/icons/call-dark-green.svg"
            class="flex size-6 shrink-0"
            alt="icon"
          />
        </div>
        <div class="flex flex-col gap-1 w-full">
          <p class="font-semibold text-xl leading-[22.5px]">{{ headOfFamily.phone_number }}</p>
          <span class="font-medium text-desa-secondary"> Nomor Hp </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { HeadOfFamily } from '@/types/headOfFamily'
import { computed } from 'vue'

const props = defineProps<{
  headOfFamily: HeadOfFamily
}>()

const genderLabel = computed(() => {
  return props.headOfFamily.gender === 'male' ? 'Laki-laki' : 'Perempuan'
})
</script>

<style scoped></style>
