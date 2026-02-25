<template>
  <div>
    <PageHeader
      title="Manage Anggota Keluarga"
      show-edit-button
      show-delete-button
      :edit-button-route="`/family-member/${route.params.id}/edit`"
      delete-modal-title="Hapus Anggota Keluarga"
      :breadcrumbs="breadcrumbs"
      @delete="handleDelete(familyMember!.id)"
    />
    <BaseLoading v-if="loading" />
    <div v-else-if="familyMember" class="flex flex-col gap-[14px] mt-4">
      <DetailFamilyMember :family-member="familyMember" />
    </div>
    <BaseEmptyState v-else message="Data tidak ditemukan" />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/common/PageHeader.vue'
import DetailFamilyMember from '@/components/family-member/DetailFamilyMember.vue'
import BaseLoading from '@/components/ui/BaseLoading.vue'
import BaseEmptyState from '@/components/ui/BaseEmptyState.vue'
import { useFamilyMemberStore } from '@/stores/familyMember'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const breadcrumbs = [
  { label: 'Anggota Keluarga', route: '/family-member' },
  { label: 'Manage Anggota Keluarga', route: `/family-member/manage` },
]

const route = useRoute()
const familyMemberStore = useFamilyMemberStore()
const { familyMember, loading } = storeToRefs(familyMemberStore)

onMounted(async () => {
  const id = route.params.id as string
  if (id) {
    await familyMemberStore.fetchFamilyMemberById(id)
  }
})

const handleDelete = async (id: string) => {
  await familyMemberStore.deleteFamilyMemberById(id)
}
</script>

<style scoped></style>
