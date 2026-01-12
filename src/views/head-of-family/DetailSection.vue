<template>
  <div>
    <PageHeader title="Manage Kepala Rumah" show-delete-button :breadcrumbs="breadcrumbs" />
    <BaseLoading v-if="loading" />
    <div v-else-if="headOfFamily" class="flex gap-[14px] mt-4">
      <div class="flex flex-col w-[calc(525/1000*100%)] shrink-0 gap-[14px]">
        <DetailHeadOfFamily :head-of-family="headOfFamily" />
        <DetailFamilyMember :family-members="headOfFamily.family_members" />
      </div>
      <div class="flex flex-col flex-1 shrink-0 gap-[14px]">
        <section id="Recent-Activity" class="flex flex-col rounded-3xl p-6 gap-6 bg-white">
          <p class="font-medium leading-5 text-desa-secondary">Recent Activity</p>
          <TabButtonContainer v-model="selectedTab" />
          <DetailEvent
            :tab-content="selectedTab"
            :social-assistances="headOfFamily.social_assistances || []"
            :events="headOfFamily.events || []"
            :development-applicants="headOfFamily.development_applicants || []"
          />
        </section>
      </div>
    </div>
    <BaseEmptyState v-else message="Data not found" />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/common/PageHeader.vue'
import DetailHeadOfFamily from '@/components/head-of-family/manage/DetailHeadOfFamily.vue'
import DetailEvent from '@/components/head-of-family/manage/DetailEvent.vue'
import { useHeadOfFamilyStore } from '@/stores/headOfFamily'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import BaseLoading from '@/components/ui/BaseLoading.vue'
import DetailFamilyMember from '@/components/head-of-family/manage/DetailFamilyMember.vue'
import TabButtonContainer from '@/components/ui/TabButtonContainer.vue'
import BaseEmptyState from '@/components/ui/BaseEmptyState.vue'

const breadcrumbs = [
  { label: 'Kepala Rumah', route: '/head-of-family' },
  { label: 'Manage Kepala Rumah', route: `/head-of-family/manage` },
]

const route = useRoute()
const headOfFamilyStore = useHeadOfFamilyStore()
const { headOfFamily, loading } = storeToRefs(headOfFamilyStore)
const selectedTab = ref<string>('Bansos')

onMounted(async () => {
  const id = route.params.id as string
  if (id) {
    await headOfFamilyStore.fetchHeadOfFamilyById(id)
  }
})
</script>

<style scoped></style>
