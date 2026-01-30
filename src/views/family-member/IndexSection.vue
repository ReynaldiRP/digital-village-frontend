<template>
  <div>
    <PageHeader
      title="Anggota Keluarga"
      show-add-button
      add-button-text="Tambah Baru"
      add-button-route="family-member/create"
    />

    <BaseLoading v-if="loading" />

    <section v-else class="flex flex-col gap-[14px] mt-4">
      <FamilyMemberCard
        v-if="headOfFamily"
        card-title="Kepala Keluarga"
        :family-members="[headOfFamily]"
      />

      <FamilyMemberCard v-if="wifeData.length > 0" card-title="Istri" :family-members="wifeData" />

      <FamilyMemberCard v-if="childData.length > 0" card-title="Anak" :family-members="childData" />

      <BaseEmptyState v-if="!hasAnyMembers" message="Belum ada data anggota keluarga" />
    </section>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/common/PageHeader.vue'
import FamilyMemberCard from '@/components/family-member/FamilyMemberCard.vue'
import BaseLoading from '@/components/ui/BaseLoading.vue'
import BaseEmptyState from '@/components/ui/BaseEmptyState.vue'
import { useFamilyMemberStore } from '@/stores/familyMember'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import type { FamilyMember } from '@/types/headOfFamily'

const familyMemberStore = useFamilyMemberStore()
const { headOfFamily, loading } = storeToRefs(familyMemberStore)

onMounted(async () => {
  await familyMemberStore.fetchFamilyMembers()
})

const husbandData = computed<FamilyMember[]>(() => {
  return headOfFamily.value?.family_members?.filter((member) => member.relation === 'husband') ?? []
})

const wifeData = computed<FamilyMember[]>(() => {
  return headOfFamily.value?.family_members?.filter((member) => member.relation === 'wife') ?? []
})

const childData = computed<FamilyMember[]>(() => {
  return headOfFamily.value?.family_members?.filter((member) => member.relation === 'child') ?? []
})

const hasAnyMembers = computed(() => {
  return (
    !!headOfFamily.value ||
    husbandData.value.length > 0 ||
    wifeData.value.length > 0 ||
    childData.value.length > 0
  )
})
</script>

<style scoped></style>
