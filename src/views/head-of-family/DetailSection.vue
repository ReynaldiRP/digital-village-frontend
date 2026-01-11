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
          <div id="Tabs-Content" class="flex flex-col">
            <div id="Bansos" class="flex flex-col gap-6">
              <div class="card flex flex-col rounded-2xl border border-desa-background p-4 gap-4">
                <div class="flex items-center justify-between">
                  <p class="font-medium text-sm text-desa-secondary">Tue, 31 Dec 2024</p>
                  <img
                    src="@/assets/images/icons/calendar-2-secondary-green.svg"
                    class="flex size-[18px] shrink-0"
                    alt="icon"
                  />
                </div>
                <hr class="border-desa-background" />
                <p class="font-semibold text-lg">Bantuan Untuk Rakyat Kurang Mampu</p>
                <div class="flex items-center gap-3">
                  <div
                    class="flex size-[52px] shrink-0 items-center justify-center rounded-2xl bg-desa-foreshadow"
                  >
                    <img src="@/assets/images/icons/money-dark-green.svg" alt="icon" />
                  </div>
                  <div class="flex flex-col gap-[6px] w-full">
                    <p class="font-semibold text-lg leading-5">Rp120.000.000</p>
                    <p class="font-medium text-sm text-desa-secondary">Nominal Pengajuan</p>
                  </div>
                  <div
                    class="badge rounded-full p-3 gap-2 flex w-[100px] justify-center shrink-0 bg-desa-yellow"
                  >
                    <span class="font-semibold text-xs text-white uppercase">Menunggu</span>
                  </div>
                </div>
                <hr class="border-desa-background" />
                <div class="flex items-center justify-between">
                  <p class="font-medium text-sm text-desa-secondary">Nominal Pengajuan:</p>
                  <p class="font-medium leading-5 text-desa-red">Rp2.500.000</p>
                </div>
              </div>
              <div class="card flex flex-col rounded-2xl border border-desa-background p-4 gap-4">
                <div class="flex items-center justify-between">
                  <p class="font-medium text-sm text-desa-secondary">Tue, 25 Dec 2024</p>
                  <img
                    src="@/assets/images/icons/calendar-2-secondary-green.svg"
                    class="flex size-[18px] shrink-0"
                    alt="icon"
                  />
                </div>
                <hr class="border-desa-background" />
                <p class="font-semibold text-lg">Bantuan Pangan Sehari-hari</p>
                <div class="flex items-center gap-3">
                  <div
                    class="flex size-[52px] shrink-0 items-center justify-center rounded-2xl bg-desa-foreshadow"
                  >
                    <img src="@/assets/images/icons/bag-2-dark-green.svg" alt="icon" />
                  </div>
                  <div class="flex flex-col gap-[6px] w-full">
                    <p class="font-semibold text-lg leading-5">Beras 200 Ton</p>
                    <p class="font-medium text-sm text-desa-secondary">Bahan Pokok</p>
                  </div>
                  <div
                    class="badge rounded-full p-3 gap-2 flex w-[100px] justify-center shrink-0 bg-desa-dark-green"
                  >
                    <span class="font-semibold text-xs text-white uppercase">Diterima</span>
                  </div>
                </div>
                <hr class="border-desa-background" />
                <div class="flex items-center justify-between">
                  <p class="font-medium text-sm text-desa-secondary">Nominal Pengajuan:</p>
                  <p class="font-medium leading-5 text-desa-red">Beras 2kg</p>
                </div>
              </div>
              <div class="card flex flex-col rounded-2xl border border-desa-background p-4 gap-4">
                <div class="flex items-center justify-between">
                  <p class="font-medium text-sm text-desa-secondary">Tue, 12 Dec 2024</p>
                  <img
                    src="@/assets/images/icons/calendar-2-secondary-green.svg"
                    class="flex size-[18px] shrink-0"
                    alt="icon"
                  />
                </div>
                <hr class="border-desa-background" />
                <p class="font-semibold text-lg">Bantuan Untuk anak kurang gizi</p>
                <div class="flex items-center gap-3">
                  <div
                    class="flex size-[52px] shrink-0 items-center justify-center rounded-2xl bg-desa-foreshadow"
                  >
                    <img src="@/assets/images/icons/bag-2-dark-green.svg" alt="icon" />
                  </div>
                  <div class="flex flex-col gap-[6px] w-full">
                    <p class="font-semibold text-lg leading-5">Susu 200 Liter</p>
                    <p class="font-medium text-sm text-desa-secondary">Bahan Pokok</p>
                  </div>
                  <div
                    class="badge rounded-full p-3 gap-2 flex w-[100px] justify-center shrink-0 bg-desa-red"
                  >
                    <span class="font-semibold text-xs text-white uppercase">Ditolak</span>
                  </div>
                </div>
                <hr class="border-desa-background" />
                <div class="flex items-center justify-between">
                  <p class="font-medium text-sm text-desa-secondary">Nominal Pengajuan:</p>
                  <p class="font-medium leading-5 text-desa-red">Susu 200ml</p>
                </div>
              </div>
            </div>
            <div id="Events" class="flex flex-col gap-6 hidden">
              <div class="card flex flex-col rounded-2xl border border-desa-background p-4 gap-4">
                <div class="flex items-center justify-between">
                  <p class="font-medium text-sm text-desa-secondary">Fri, 3 Jan 2025</p>
                  <img
                    src="@/assets/images/icons/calendar-2-secondary-green.svg"
                    class="flex size-[18px] shrink-0"
                    alt="icon"
                  />
                </div>
                <hr class="border-desa-background" />
                <div class="flex items-center gap-3">
                  <div
                    class="flex w-20 h-[60px] shrink-0 items-center justify-center rounded-2xl bg-desa-foreshadow overflow-hidden"
                  >
                    <img
                      src="@/assets/images/thumbnails/event-image-1.png"
                      class="w-full h-full object-cover"
                      alt="thumbnail"
                    />
                  </div>
                  <div class="flex flex-col gap-[6px] w-full">
                    <p class="font-semibold leading-5 line-clamp-1">Belajar HTML Dasar Bersama</p>
                    <div class="flex items-center gap-1">
                      <img
                        src="@/assets/images/icons/profile-2user-orange.svg"
                        class="flex size-[18px] shrink-0"
                        alt="icon"
                      />
                      <p class="font-medium text-sm text-desa-orange">9210 total partisipasi</p>
                    </div>
                  </div>
                </div>
                <hr class="border-desa-background" />
                <div class="flex items-center justify-between">
                  <p class="font-medium text-sm text-desa-secondary">Harga Event:</p>
                  <p class="font-medium leading-5 text-desa-red">Rp49.000</p>
                </div>
              </div>
              <div class="card flex flex-col rounded-2xl border border-desa-background p-4 gap-4">
                <div class="flex items-center justify-between">
                  <p class="font-medium text-sm text-desa-secondary">Wed, 1 Jan 2025</p>
                  <img
                    src="@/assets/images/icons/calendar-2-secondary-green.svg"
                    class="flex size-[18px] shrink-0"
                    alt="icon"
                  />
                </div>
                <hr class="border-desa-background" />
                <div class="flex items-center gap-3">
                  <div
                    class="flex w-20 h-[60px] shrink-0 items-center justify-center rounded-2xl bg-desa-foreshadow overflow-hidden"
                  >
                    <img
                      src="@/assets/images/thumbnails/kk-dashboard-2.png"
                      class="w-full h-full object-cover"
                      alt="thumbnail"
                    />
                  </div>
                  <div class="flex flex-col gap-[6px] w-full">
                    <p class="font-semibold leading-5 line-clamp-1">
                      Dari Desa ke dunia digital: workshop
                    </p>
                    <div class="flex items-center gap-1">
                      <img
                        src="@/assets/images/icons/profile-2user-orange.svg"
                        class="flex size-[18px] shrink-0"
                        alt="icon"
                      />
                      <p class="font-medium text-sm text-desa-orange">9210 total partisipasi</p>
                    </div>
                  </div>
                </div>
                <hr class="border-desa-background" />
                <div class="flex items-center justify-between">
                  <p class="font-medium text-sm text-desa-secondary">Harga Event:</p>
                  <p class="font-medium leading-5 text-desa-red">Rp49.000</p>
                </div>
              </div>
              <div class="card flex flex-col rounded-2xl border border-desa-background p-4 gap-4">
                <div class="flex items-center justify-between">
                  <p class="font-medium text-sm text-desa-secondary">Sun, 21 Dec 2024</p>
                  <img
                    src="@/assets/images/icons/calendar-2-secondary-green.svg"
                    class="flex size-[18px] shrink-0"
                    alt="icon"
                  />
                </div>
                <hr class="border-desa-background" />
                <div class="flex items-center gap-3">
                  <div
                    class="flex w-20 h-[60px] shrink-0 items-center justify-center rounded-2xl bg-desa-foreshadow overflow-hidden"
                  >
                    <img
                      src="@/assets/images/thumbnails/kk-event-desa-3.png"
                      class="w-full h-full object-cover"
                      alt="thumbnail"
                    />
                  </div>
                  <div class="flex flex-col gap-[6px] w-full">
                    <p class="font-semibold leading-5 line-clamp-1">
                      Mengenal AI: Menjelajah dunia Kecerdasan
                    </p>
                    <div class="flex items-center gap-1">
                      <img
                        src="@/assets/images/icons/profile-2user-orange.svg"
                        class="flex size-[18px] shrink-0"
                        alt="icon"
                      />
                      <p class="font-medium text-sm text-desa-orange">9210 total partisipasi</p>
                    </div>
                  </div>
                </div>
                <hr class="border-desa-background" />
                <div class="flex items-center justify-between">
                  <p class="font-medium text-sm text-desa-secondary">Harga Event:</p>
                  <p class="font-medium leading-5 text-desa-red">Rp49.000</p>
                </div>
              </div>
            </div>
            <div id="Applicants" class="flex flex-col gap-6 hidden">
              <div class="card flex flex-col rounded-2xl border border-desa-background p-4 gap-4">
                <div class="flex items-center justify-between gap-3">
                  <div
                    class="flex w-20 h-[60px] shrink-0 items-center justify-center rounded-2xl bg-desa-foreshadow overflow-hidden"
                  >
                    <img
                      src="@/assets/images/thumbnails/event-image-1.png"
                      class="w-full h-full object-cover"
                      alt="thumbnail"
                    />
                  </div>
                  <div
                    class="badge rounded-full p-3 gap-2 flex w-[100px] justify-center shrink-0 bg-desa-yellow"
                  >
                    <span class="font-semibold text-xs text-white uppercase">Menunggu</span>
                  </div>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="font-semibold leading-5">Pembangunan Jalanan Utama</p>
                  <p class="font-medium leading-5 text-desa-secondary">
                    Penanggung jawab:
                    <span class="font-semibold text-desa-dark-green"> Uzumaki Asep </span>
                  </p>
                </div>
                <hr class="border-desa-background" />
                <div class="flex items-center gap-3">
                  <div
                    class="flex size-12 shrink-0 rounded-full bg-desa-foreshadow overflow-hidden items-center justify-center"
                  >
                    <img
                      src="@/assets/images/icons/calendar-2-dark-green.svg"
                      class="flex size-6"
                      alt="icon"
                    />
                  </div>
                  <div>
                    <p class="font-semibold leading-5 text-desa-dark-green">3 Jan 2025</p>
                    <p class="font-medium text-sm text-desa-secondary">Tanggal Pelaksanaan</p>
                  </div>
                </div>
                <hr class="border-desa-background" />
                <div class="flex items-center gap-3">
                  <div
                    class="flex size-12 shrink-0 rounded-full bg-desa-foreshadow overflow-hidden items-center justify-center"
                  >
                    <img
                      src="@/assets/images/icons/timer-dark-green.svg"
                      class="flex size-6"
                      alt="icon"
                    />
                  </div>
                  <div>
                    <p class="font-semibold leading-5 text-desa-dark-green">24 Hari</p>
                    <p class="font-medium text-sm text-desa-secondary">Waktu Pelaksanaan</p>
                  </div>
                </div>
              </div>
              <div class="card flex flex-col rounded-2xl border border-desa-background p-4 gap-4">
                <div class="flex items-center justify-between gap-3">
                  <div
                    class="flex w-20 h-[60px] shrink-0 items-center justify-center rounded-2xl bg-desa-foreshadow overflow-hidden"
                  >
                    <img
                      src="@/assets/images/thumbnails/event-image-1.png"
                      class="w-full h-full object-cover"
                      alt="thumbnail"
                    />
                  </div>
                  <div
                    class="badge rounded-full p-3 gap-2 flex w-[100px] justify-center shrink-0 bg-desa-dark-green"
                  >
                    <span class="font-semibold text-xs text-white uppercase">Diterima</span>
                  </div>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="font-semibold leading-5">Pembangunan Jalanan Utama</p>
                  <p class="font-medium leading-5 text-desa-secondary">
                    Penanggung jawab:
                    <span class="font-semibold text-desa-dark-green"> Uzumaki Asep </span>
                  </p>
                </div>
                <hr class="border-desa-background" />
                <div class="flex items-center gap-3">
                  <div
                    class="flex size-12 shrink-0 rounded-full bg-desa-foreshadow overflow-hidden items-center justify-center"
                  >
                    <img
                      src="@/assets/images/icons/calendar-2-dark-green.svg"
                      class="flex size-6"
                      alt="icon"
                    />
                  </div>
                  <div>
                    <p class="font-semibold leading-5 text-desa-dark-green">3 Jan 2025</p>
                    <p class="font-medium text-sm text-desa-secondary">Tanggal Pelaksanaan</p>
                  </div>
                </div>
                <hr class="border-desa-background" />
                <div class="flex items-center gap-3">
                  <div
                    class="flex size-12 shrink-0 rounded-full bg-desa-foreshadow overflow-hidden items-center justify-center"
                  >
                    <img
                      src="@/assets/images/icons/timer-dark-green.svg"
                      class="flex size-6"
                      alt="icon"
                    />
                  </div>
                  <div>
                    <p class="font-semibold leading-5 text-desa-dark-green">24 Hari</p>
                    <p class="font-medium text-sm text-desa-secondary">Waktu Pelaksanaan</p>
                  </div>
                </div>
              </div>
              <div class="card flex flex-col rounded-2xl border border-desa-background p-4 gap-4">
                <div class="flex items-center justify-between gap-3">
                  <div
                    class="flex w-20 h-[60px] shrink-0 items-center justify-center rounded-2xl bg-desa-foreshadow overflow-hidden"
                  >
                    <img
                      src="@/assets/images/thumbnails/event-image-1.png"
                      class="w-full h-full object-cover"
                      alt="thumbnail"
                    />
                  </div>
                  <div
                    class="badge rounded-full p-3 gap-2 flex w-[100px] justify-center shrink-0 bg-desa-red"
                  >
                    <span class="font-semibold text-xs text-white uppercase">Ditolak</span>
                  </div>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="font-semibold leading-5">Pembangunan Jalanan Utama</p>
                  <p class="font-medium leading-5 text-desa-secondary">
                    Penanggung jawab:
                    <span class="font-semibold text-desa-dark-green"> Uzumaki Asep </span>
                  </p>
                </div>
                <hr class="border-desa-background" />
                <div class="flex items-center gap-3">
                  <div
                    class="flex size-12 shrink-0 rounded-full bg-desa-foreshadow overflow-hidden items-center justify-center"
                  >
                    <img
                      src="@/assets/images/icons/calendar-2-dark-green.svg"
                      class="flex size-6"
                      alt="icon"
                    />
                  </div>
                  <div>
                    <p class="font-semibold leading-5 text-desa-dark-green">3 Jan 2025</p>
                    <p class="font-medium text-sm text-desa-secondary">Tanggal Pelaksanaan</p>
                  </div>
                </div>
                <hr class="border-desa-background" />
                <div class="flex items-center gap-3">
                  <div
                    class="flex size-12 shrink-0 rounded-full bg-desa-foreshadow overflow-hidden items-center justify-center"
                  >
                    <img
                      src="@/assets/images/icons/timer-dark-green.svg"
                      class="flex size-6"
                      alt="icon"
                    />
                  </div>
                  <div>
                    <p class="font-semibold leading-5 text-desa-dark-green">24 Hari</p>
                    <p class="font-medium text-sm text-desa-secondary">Waktu Pelaksanaan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div v-else class="text-center py-8 text-desa-secondary">Data not found</div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/common/PageHeader.vue'
import DetailHeadOfFamily from '@/components/head-of-family/manage/DetailHeadOfFamily.vue'
import { useHeadOfFamilyStore } from '@/stores/headOfFamily'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import BaseLoading from '@/components/ui/BaseLoading.vue'
import DetailFamilyMember from '@/components/head-of-family/manage/DetailFamilyMember.vue'
import TabButtonContainer from '@/components/ui/TabButtonContainer.vue'

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
