<template>
  <div class="card flex items-center justify-between rounded-3xl p-6 bg-white">
    <div class="flex items-center gap-3 w-[260px]">
      <div class="flex size-16 shrink-0 rounded-full overflow-hidden bg-desa-foreshadow">
        <img :src="displayPhoto" class="w-full h-full object-cover" alt="photo" />
      </div>
      <div class="flex flex-col gap-[6px]">
        <p class="font-semibold text-lg leading-[22.5px] w-[184px] truncate">
          {{ headOfFamily.name || headOfFamily.user?.name }}
        </p>
        <p class="flex items-center gap-1">
          <img
            src="@/assets/images/icons/briefcase-secondary-green.svg"
            class="flex size-[18px] shrink-0"
            alt="icon"
          />
          <span class="font-medium text-sm text-desa-secondary">{{ headOfFamily.occupation }}</span>
        </p>
      </div>
    </div>
    <div class="flex flex-col gap-1 w-[180px] shrink-0">
      <p class="flex items-center gap-1">
        <img
          src="@/assets/images/icons/keyboard-secondary-green.svg"
          class="flex size-[18px] shrink-0"
          alt="icon"
        />
        <span class="font-medium text-sm text-desa-secondary">NIK</span>
      </p>
      <p class="font-semibold leading-5">
        {{ headOfFamily.identity_number || headOfFamily.identify_number }}
      </p>
    </div>
    <p
      class="flex items-center rounded-full w-[224px] shrink-0 py-[14px] px-4 gap-1 bg-desa-blue/10"
    >
      <img
        src="@/assets/images/icons/profile-2user-blue.svg"
        class="flex size-[18px] shrink-0"
        alt="icon"
      />
      <span class="font-medium text-desa-blue">
        {{ headOfFamily.family_members_count }} Anggota Keluarga
      </span>
    </p>
    <button
      @click="redirectToManage(headOfFamily.id)"
      class="flex items-center shrink-0 gap-[10px] rounded-2xl py-4 px-6 bg-desa-black"
    >
      <span class="font-medium text-white">Manage</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HeadOfFamily } from '@/types/headOfFamily'
import { useRouter } from 'vue-router'

interface Props {
  headOfFamily: HeadOfFamily
}

const props = defineProps<Props>()
const router = useRouter()

const displayPhoto = computed(() => {
  return props.headOfFamily.profile_picture || '@/assets/images/photos/default-avatar.png'
})

const redirectToManage = async (id: string) => {
  router.push(`/head-of-family/manage/${id}`)
}
</script>

<style scoped></style>
