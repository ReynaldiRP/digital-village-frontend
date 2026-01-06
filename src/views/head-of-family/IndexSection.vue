<template>
  <div>
    <PageHeader
      title="Kepala Rumah"
      show-add-button
      add-button-text="Add New"
      add-button-route="kd-kepala-rumah-add.html"
    />

    <section id="List-Kepala-Rumah" class="flex flex-col gap-[14px]">
      <form id="Page-Search" class="flex items-center justify-between">
        <SearchInput v-model="search" placeholder="Cari nama Kepala Rumah atau NIK" />
        <FilterBar v-model:entries-per-page="entriesPerPage" @filter-click="handleFilterClick" />
      </form>

      <BaseLoading v-if="loading" />

      <template v-else-if="headOfFamilies && headOfFamilies.length > 0">
        <HeadOfFamilyCard
          v-for="family in headOfFamilies"
          :key="family.id"
          :head-of-family="family"
        />
      </template>

      <div v-else class="text-center py-8 text-desa-secondary">No data available</div>
    </section>

    <PaginationNav v-if="meta" v-model:current-page="currentPage" :total-pages="meta.last_page" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeMount } from 'vue'
import { useHeadOfFamilyStore } from '@/stores/headOfFamily'
import { storeToRefs } from 'pinia'
import HeadOfFamilyCard from '@/components/head-of-family/HeadOfFamilyCard.vue'
import PaginationNav from '@/components/common/PaginationNav.vue'
import PageHeader from '@/components/common/PageHeader.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import FilterBar from '@/components/head-of-family/FilterBar.vue'
import BaseLoading from '@/components/ui/BaseLoading.vue'
import debounce from 'lodash.debounce'

const store = useHeadOfFamilyStore()
const { headOfFamilies, meta, loading, search } = storeToRefs(store)
const { fetchHeadOfFamilies } = store

const entriesPerPage = ref(5)
const currentPage = ref(1)
const debounceFetch = debounce(() => {
  fetchHeadOfFamilies(entriesPerPage.value)
}, 300)

const handleFilterClick = () => {
  // TODO: Implement filter functionality
  console.log('Filter clicked')
}

// Watch for changes and refetch data
watch([search, entriesPerPage, currentPage], () => {
  debounceFetch()
})

onBeforeMount(() => {
  debounceFetch.cancel()
})

onMounted(async () => {
  await fetchHeadOfFamilies(entriesPerPage.value)
})
</script>

<style scoped></style>
