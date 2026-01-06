<template>
  <div class="filter-bar-container relative">
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-[10px]">
        <span class="font-medium leading-5">Show</span>
        <div class="relative">
          <select
            :value="entriesPerPage"
            @change="handleEntriesChange"
            class="appearance-none outline-none w-full h-14 rounded-2xl ring-[1.5px] ring-desa-background focus:ring-desa-black py-4 px-6 pr-[52px] gap-2 font-medium placeholder:text-desa-secondary transition-all duration-300"
          >
            <option v-for="option in entriesOptions" :key="option" :value="option">
              {{ option }} Entries
            </option>
          </select>
          <img
            src="@/assets/images/icons/arrow-down-black.svg"
            class="flex size-6 shrink-0 absolute transform -translate-y-1/2 top-1/2 right-6"
            alt="icon"
          />
        </div>
      </div>
      <button
        type="button"
        @click="toggleFilter"
        :class="[
          'flex items-center gap-1 h-14 w-fit rounded-2xl border py-4 px-6 transition-all duration-300',
          isFilterOpen
            ? 'border-desa-black bg-desa-black text-white'
            : 'border-desa-background bg-white text-black',
        ]"
      >
        <img :src="filterIconSrc" class="flex size-6 shrink-0" alt="icon" />
        <span class="font-medium leading-5">Filter</span>
      </button>
    </div>

    <!-- Filter Panel - Absolute Positioned Dropdown -->
    <Transition name="filter-expand">
      <div
        v-if="isFilterOpen"
        class="filter-panel absolute right-0 top-[calc(100%+8px)] z-50 w-full max-w-4xl bg-white rounded-2xl border border-desa-background shadow-lg p-6"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Family Members Count Filter -->
          <div class="filter-group">
            <label class="block text-sm font-medium mb-2">Jumlah Anggota Keluarga</label>
            <div class="flex gap-2">
              <select
                v-model="filters.family_members.min"
                class="flex-1 h-12 rounded-xl ring-[1.5px] ring-desa-background focus:ring-desa-black px-4 outline-none transition-all duration-300"
              >
                <option :value="null">Min</option>
                <option v-for="n in 20" :key="`min-${n}`" :value="n">{{ n }}</option>
              </select>
              <span class="flex items-center">-</span>
              <select
                v-model="filters.family_members.max"
                class="flex-1 h-12 rounded-xl ring-[1.5px] ring-desa-background focus:ring-desa-black px-4 outline-none transition-all duration-300"
              >
                <option :value="null">Max</option>
                <option v-for="n in 20" :key="`max-${n}`" :value="n">{{ n }}</option>
              </select>
            </div>
          </div>

          <!-- Gender Filter -->
          <div class="filter-group">
            <label class="block text-sm font-medium mb-2">Jenis Kelamin</label>
            <select
              v-model="filters.gender"
              class="w-full h-12 rounded-xl ring-[1.5px] ring-desa-background focus:ring-desa-black px-4 outline-none transition-all duration-300"
            >
              <option :value="null">Semua</option>
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
            </select>
          </div>

          <!-- Marital Status Filter -->
          <div class="filter-group">
            <label class="block text-sm font-medium mb-2">Status Perkawinan</label>
            <select
              v-model="filters.marital_status"
              class="w-full h-12 rounded-xl ring-[1.5px] ring-desa-background focus:ring-desa-black px-4 outline-none transition-all duration-300"
            >
              <option :value="null">Semua</option>
              <option value="single">Belum Kawin</option>
              <option value="married">Kawin</option>
            </select>
          </div>

          <!-- Occupation Filter -->
          <div class="filter-group">
            <label class="block text-sm font-medium mb-2">Pekerjaan</label>
            <input
              v-model="filters.occupation"
              type="text"
              placeholder="Cari pekerjaan..."
              class="w-full h-12 rounded-xl ring-[1.5px] ring-desa-background focus:ring-desa-black px-4 outline-none transition-all duration-300"
            />
          </div>

          <!-- Sort By Filter -->
          <div class="filter-group">
            <label class="block text-sm font-medium mb-2">Urutkan Berdasarkan</label>
            <select
              v-model="filters.sortBy"
              class="w-full h-12 rounded-xl ring-[1.5px] ring-desa-background focus:ring-desa-black px-4 outline-none transition-all duration-300"
            >
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
              <option value="family_asc">Anggota Keluarga (Rendah ke Tinggi)</option>
              <option value="family_desc">Anggota Keluarga (Tinggi ke Rendah)</option>
              <option value="name_asc">Nama (A-Z)</option>
              <option value="name_desc">Nama (Z-A)</option>
            </select>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-end gap-3 mt-4">
          <button
            type="button"
            @click="handleReset"
            class="h-12 px-6 rounded-xl border border-desa-background bg-white font-medium text-desa-black hover:bg-gray-50 transition-all duration-300"
          >
            Reset
          </button>
          <button
            type="button"
            @click="handleApplyFilter"
            class="h-12 px-6 rounded-xl bg-desa-black font-medium text-white hover:bg-opacity-90 transition-all duration-300"
          >
            Terapkan Filter
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed, onMounted } from 'vue'
import filterBlackIcon from '@/assets/images/icons/filter-black.svg'
import filterWhiteIcon from '@/assets/images/icons/filter-white.svg'

interface Props {
  entriesPerPage: number
  entriesOptions?: number[]
}

export interface FilterOptions {
  family_members: {
    min: number | null
    max: number | null
  }
  gender: 'male' | 'female' | null
  marital_status: 'single' | 'married' | 'divorced' | 'widowed' | null
  occupation: string | null
  sortBy: 'newest' | 'oldest' | 'family_asc' | 'family_desc' | 'name_asc' | 'name_desc'
}

interface Emits {
  (e: 'update:entriesPerPage', value: number): void
  (e: 'filter-apply', filters: FilterOptions): void
}

withDefaults(defineProps<Props>(), {
  entriesOptions: () => [5, 10, 20, 30, 40, 50],
})

const emit = defineEmits<Emits>()

const isFilterOpen = ref(false)
const filters = reactive<FilterOptions>({
  family_members: {
    min: null,
    max: null,
  },
  gender: null,
  marital_status: null,
  occupation: null,
  sortBy: 'newest',
})

const initialFilters = { ...filters }

onMounted(() => {
  Object.assign(initialFilters, { ...filters })
})

const filterIconSrc = computed(() => (isFilterOpen.value ? filterWhiteIcon : filterBlackIcon))

const toggleFilter = () => {
  isFilterOpen.value = !isFilterOpen.value
}

const handleEntriesChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:entriesPerPage', Number(target.value))
}

const handleApplyFilter = () => {
  emit('filter-apply', { ...filters })
  isFilterOpen.value = false
}

const handleReset = () => {
  Object.assign(filters, {
    family_members: {
      min: null,
      max: null,
    },
    gender: null,
    marital_status: null,
    occupation: null,
    sortBy: 'newest',
  })
}

// Auto-close filter panel when clicking outside
const closeFilterOnClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (isFilterOpen.value && !target.closest('.filter-panel') && !target.closest('button')) {
    isFilterOpen.value = false
  }
}

watch(isFilterOpen, (newValue) => {
  if (newValue) {
    document.addEventListener('click', closeFilterOnClickOutside)
  } else {
    document.removeEventListener('click', closeFilterOnClickOutside)
  }
})
</script>

<style scoped>
.filter-expand-enter-active,
.filter-expand-leave-active {
  transition: all 0.3s ease-out;
  transform-origin: top right;
}

.filter-expand-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.filter-expand-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.filter-panel {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

/* Custom scrollbar for filter panel */
.filter-panel::-webkit-scrollbar {
  width: 6px;
}

.filter-panel::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.filter-panel::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.filter-panel::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
