<template>
  <div>
    <PageHeader
      title="Kepala Rumah"
      show-add-button
      add-button-text="Add New"
      add-button-route="kd-kepala-rumah-add.html"
    />

    <section id="List-Kepala-Rumah" class="flex flex-col gap-[14px]">
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

      <div v-else class="text-center py-8 text-desa-secondary">No data available</div>
    </section>

    <PaginationNav v-if="meta" v-model:current-page="currentPage" :total-pages="meta.last_page" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeMount } from 'vue'
import { useHeadOfFamilyStore } from '@/stores/headOfFamily'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import HeadOfFamilyCard from '@/components/head-of-family/HeadOfFamilyCard.vue'
import PaginationNav from '@/components/common/PaginationNav.vue'
import PageHeader from '@/components/common/PageHeader.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import FilterBar, { type FilterOptions } from '@/components/head-of-family/FilterBar.vue'
import BaseLoading from '@/components/ui/BaseLoading.vue'
import debounce from 'lodash.debounce'

const store = useHeadOfFamilyStore()
const { headOfFamilies, meta, loading, search, filters } = storeToRefs(store)
const { fetchHeadOfFamilies } = store
const route = useRoute()
const router = useRouter()

const entriesPerPage = ref(5)
const currentPage = ref(1)

// Initialize from URL on mount
const initializeFromUrl = () => {
  const query = route.query

  if (query.search) search.value = query.search as string
  if (query.page) currentPage.value = Number(query.page)
  if (query.entries) entriesPerPage.value = Number(query.entries)

  // Initialize filters from URL
  if (
    query.gender ||
    query.marital_status ||
    query.occupation ||
    query.sort_by ||
    query.min_members ||
    query.max_members
  ) {
    filters.value = {
      gender: query.gender as 'male' | 'female' | null,
      marital_status: query.marital_status as 'single' | 'married' | null,
      occupation: query.occupation as string,
      sort_by: query.sort_by as
        | 'name_asc'
        | 'name_desc'
        | 'newest'
        | 'oldest'
        | 'family_asc'
        | 'family_desc',
      family_members: {
        min: query.min_members ? Number(query.min_members) : null,
        max: query.max_members ? Number(query.max_members) : null,
      },
    }
  }
}

// Update URL when parameters change
const updateUrl = () => {
  const query: Record<string, string> = {}

  if (search.value) query.search = search.value
  if (currentPage.value > 1) query.page = currentPage.value.toString()
  if (entriesPerPage.value !== 5) query.entries = entriesPerPage.value.toString()

  if (filters.value) {
    if (filters.value.gender) query.gender = filters.value.gender
    if (filters.value.marital_status) query.marital_status = filters.value.marital_status
    if (filters.value.occupation) query.occupation = filters.value.occupation
    if (filters.value.sort_by) query.sort_by = filters.value.sort_by
    if (filters.value.family_members?.min !== null)
      query.min_members = filters.value.family_members.min.toString()
    if (filters.value.family_members?.max !== null)
      query.max_members = filters.value.family_members.max.toString()
  }

  router.replace({ query })
}

const debounceFetch = debounce(() => {
  updateUrl()
  fetchHeadOfFamilies(entriesPerPage.value, currentPage.value, filters.value)
}, 300)

const handleFilterApply = (appliedFilters: FilterOptions) => {
  filters.value = appliedFilters
  currentPage.value = 1
  debounceFetch()
}

// Watch for changes and refetch data
watch([search, entriesPerPage, currentPage], () => {
  debounceFetch()
})

onBeforeMount(() => {
  debounceFetch.cancel()
})

onMounted(async () => {
  initializeFromUrl()
  await fetchHeadOfFamilies(entriesPerPage.value, currentPage.value, filters.value)
})
</script>

<style scoped></style>
