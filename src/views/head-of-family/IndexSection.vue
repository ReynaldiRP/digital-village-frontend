<template>
  <div>
    <PageHeader
      title="Kepala Rumah"
      show-add-button
      add-button-text="Add New"
      add-button-route="kd-kepala-rumah-add.html"
    />

    <section id="List-Kepala-Rumah" class="flex flex-col gap-[14px] mt-4">
      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between gap-4">
          <SearchInput v-model="search" placeholder="Cari nama Kepala Rumah atau NIK" />
          <FilterBar v-model:entries-per-page="entriesPerPage" @filter-apply="handleFilterApply" />
        </div>
      </div>

      <BaseLoading v-if="loading" />

      <template v-else-if="headOfFamilies && headOfFamilies.length > 0">
        <HeadOfFamilyCard
          v-for="family in headOfFamilies"
          :key="family.id"
          :head-of-family="family"
        />
      </template>

      <BaseEmptyState v-else message="No data available" />
    </section>

    <PaginationNav v-if="meta" v-model:current-page="currentPage" :total-pages="meta.last_page" />
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted, onBeforeUnmount, onUnmounted } from 'vue'
import { useHeadOfFamilyStore } from '@/stores/headOfFamily'
import { storeToRefs } from 'pinia'
import HeadOfFamilyCard from '@/components/head-of-family/HeadOfFamilyCard.vue'
import PaginationNav from '@/components/common/PaginationNav.vue'
import PageHeader from '@/components/common/PageHeader.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import FilterBar, { type FilterOptions } from '@/components/head-of-family/FilterBar.vue'
import BaseLoading from '@/components/ui/BaseLoading.vue'
import BaseEmptyState from '@/components/ui/BaseEmptyState.vue'
import debounce from 'lodash.debounce'
import { toast } from 'vue3-toastify'
import { useHeadOfFamilyUrlSync } from '@/composables/useHeadOfFamilyUrlSync'

const store = useHeadOfFamilyStore()
const { headOfFamilies, meta, loading, success } = storeToRefs(store)
const { fetchHeadOfFamilies } = store
const { search, currentPage, entriesPerPage, filters, updateFilters } = useHeadOfFamilyUrlSync()

onBeforeUnmount(() => {
  debounceFetch.cancel()
})

onMounted(async () => {
  if (success.value !== '' && success.value !== null) {
    toast.success(success.value)
  }

  await fetchHeadOfFamilies(entriesPerPage.value, currentPage.value, search.value, filters.value)
})

onUnmounted(() => {
  success.value = ''
})

const debounceFetch = debounce(() => {
  fetchHeadOfFamilies(entriesPerPage.value, currentPage.value, search.value, filters.value)
}, 300)

const handleFilterApply = (appliedFilters: FilterOptions) => {
  updateFilters(appliedFilters)
  currentPage.value = 1
  debounceFetch()
}

watch(
  [search, entriesPerPage, currentPage, filters],
  () => {
    debounceFetch()
  },
  { deep: true },
)
</script>

<style scoped></style>
