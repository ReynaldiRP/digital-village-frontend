<template>
  <div>
    <PageHeader
      title="Ubah Data Kepala Rumah"
      :breadcrumbs="[
        { label: 'Kepala Rumah', route: '/head-of-family' },
        {
          label: 'Manage Kepala Rumah',
          route: `/head-of-family/manage/${route.params.id}`,
        },
        { label: 'Ubah Data Kepala Rumah', route: `/head-of-family/${route.params.id}/edit` },
      ]"
    />
    <BaseLoading v-if="loadingData" />
    <form
      v-else-if="headOfFamilyData"
      class="capitalize mt-4"
      enctype="multipart/form-data"
      @submit.prevent="handleSubmit"
    >
      <section class="shrink-0 rounded-3xl p-6 bg-white flex flex-col gap-6 h-fit">
        <!-- Photo Profile -->
        <BaseFormSection label="Profile Kepala Rumah" direction="row">
          <BaseFormFileUpload
            :model-value="form.profile_picture"
            :preview-url="currentProfilePicture"
            preview-shape="circle"
            preview-size="medium"
            accept="image/*"
            button-text="Upload"
            @update:model-value="(file: File | null) => setFieldValue('profile_picture', file)"
          />
        </BaseFormSection>
        <hr class="border-desa-background" />

        <!-- Nama Kepala Rumah -->
        <BaseFormSection label="Nama Kepala Rumah">
          <BaseFormInput
            v-model="form.name"
            type="text"
            placeholder="Masukan nama lengkap"
            :icon-inactive="UserSecondaryGreenIcon"
            :icon-active="UserBlackIcon"
            :validation-state="getFieldValidationState('name')"
            :error-message="errors.name"
            @blur="handleBlur('name')"
          />
        </BaseFormSection>
        <hr class="border-desa-background" />

        <!-- NIK -->
        <BaseFormSection label="Nomor Induk Kependudukan">
          <BaseFormInput
            v-model="form.identify_number"
            type="text"
            placeholder="Ketik NIK"
            :icon-inactive="KeyboardSecondaryGreenIcon"
            :icon-active="KeyboardBlackIcon"
            :validation-state="getFieldValidationState('identify_number')"
            :error-message="errors.identify_number"
            @blur="handleBlur('identify_number')"
          />
        </BaseFormSection>
        <hr class="border-desa-background" />

        <!-- Phone -->
        <BaseFormSection label="Nomor Handphone">
          <BaseFormInput
            v-model="form.phone_number"
            type="tel"
            placeholder="Masukan No. HP yang aktif"
            :icon-inactive="CallSecondaryGreenIcon"
            :icon-active="CallBlackIcon"
            :validation-state="getFieldValidationState('phone_number')"
            :error-message="errors.phone_number"
            @blur="handleBlur('phone_number')"
          />
        </BaseFormSection>
        <hr class="border-desa-background" />

        <!-- Pekerjaan -->
        <BaseFormSection label="Pekerjaan">
          <BaseFormInput
            v-model="form.occupation"
            type="text"
            placeholder="Masukan nama pekerjaan"
            :icon-inactive="BriefcaseSecondaryGreenIcon"
            :icon-active="BriefcaseBlackIcon"
            :validation-state="getFieldValidationState('occupation')"
            :error-message="errors.occupation"
            @blur="handleBlur('occupation')"
          />
        </BaseFormSection>
        <hr class="border-desa-background" />

        <!-- Tanggal Lahir -->
        <BaseFormSection label="Tanggal Lahir" direction="row">
          <BaseFormDateInput
            v-model="form.birth_date"
            placeholder="Masukan tanggal lahir"
            show-age
            age-label="Umur"
            :validation-state="getFieldValidationState('birth_date')"
            :error-message="errors.birth_date"
            @blur="handleBlur('birth_date')"
          />
        </BaseFormSection>
        <hr class="border-desa-background" />

        <!-- Jenis Kelamin -->
        <BaseFormSection label="Jenis Kelamin" direction="row">
          <BaseFormRadioGroup v-model="form.gender" name="gender" :options="genderOptions" />
        </BaseFormSection>
        <hr class="border-desa-background" />

        <!-- Status -->
        <BaseFormSection label="Status" direction="row">
          <BaseFormRadioGroup
            v-model="form.marital_status"
            name="status"
            :options="maritalStatusOptions"
          />
        </BaseFormSection>

        <hr class="border-desa-background w-[calc(100%+48px)] -mx-6" />
        <p class="font-medium leading-5">Akun Dashboard</p>

        <!-- Email -->
        <BaseFormSection label="Email Address">
          <BaseFormInput
            v-model="form.email"
            type="email"
            placeholder="Masukan Email"
            :icon-inactive="SmsSecondaryGreenIcon"
            :icon-active="SmsBlackIcon"
            :icon-error="SmsRedIcon"
            :validation-state="getFieldValidationState('email')"
            :error-message="errors.email"
            @blur="handleBlur('email')"
          />
        </BaseFormSection>
        <hr class="border-desa-background" />

        <!-- Password Reset Section -->
        <BaseFormSection
          label="Reset Password"
          description="Kirim link reset password ke WhatsApp/Email pengguna"
        >
          <button
            type="button"
            @click="handlePasswordReset"
            :disabled="loading"
            class="flex items-center rounded-2xl py-4 px-6 gap-[10px] bg-desa-soft-green hover:bg-desa-dark-green transition-colors disabled:bg-desa-grey disabled:cursor-not-allowed w-fit"
          >
            <img
              src="@/assets/images/icons/send-square-white.svg"
              class="flex size-6 shrink-0"
              alt="icon"
            />
            <p class="font-medium text-white">Kirim Link Reset Password</p>
          </button>
        </BaseFormSection>
        <hr class="border-desa-background" />

        <!-- Buttons -->
        <section id="Buttons" class="flex items-center justify-end gap-4">
          <router-link :to="`/head-of-family/manage/${route.params.id}`">
            <div
              class="py-[18px] rounded-2xl bg-desa-red w-[180px] text-center flex justify-center font-medium text-white hover:opacity-90 transition-opacity"
            >
              Batal
            </div>
          </router-link>
          <button
            :disabled="!meta.valid || loading"
            type="submit"
            class="py-[18px] rounded-2xl disabled:bg-desa-grey w-[180px] text-center flex justify-center font-medium text-white bg-desa-dark-green hover:bg-desa-soft-green transition-all duration-300"
          >
            <span v-if="!loading">Simpan Perubahan</span>
            <BaseLoading v-else variant="inline" size="small" />
          </button>
        </section>
      </section>
    </form>
    <BaseEmptyState v-else message="Data tidak ditemukan" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import PageHeader from '@/components/common/PageHeader.vue'
import {
  BaseFormSection,
  BaseFormInput,
  BaseFormRadioGroup,
  BaseFormFileUpload,
  BaseFormDateInput,
  type RadioOption,
} from '@/components/form'
import BaseLoading from '@/components/ui/BaseLoading.vue'
import BaseEmptyState from '@/components/ui/BaseEmptyState.vue'
import { useZodForm } from '@/composables/useZodForm'
import { headOfFamilyFormSchema } from '@/schemas'
import { useHeadOfFamilyStore } from '@/stores/headOfFamily'

// Icons
import UserSecondaryGreenIcon from '@/assets/images/icons/user-secondary-green.svg'
import UserBlackIcon from '@/assets/images/icons/user-black.svg'
import KeyboardSecondaryGreenIcon from '@/assets/images/icons/keyboard-secondary-green.svg'
import KeyboardBlackIcon from '@/assets/images/icons/keyboard-black.svg'
import CallSecondaryGreenIcon from '@/assets/images/icons/call-secondary-green.svg'
import CallBlackIcon from '@/assets/images/icons/call-black.svg'
import BriefcaseSecondaryGreenIcon from '@/assets/images/icons/briefcase-secondary-green.svg'
import BriefcaseBlackIcon from '@/assets/images/icons/briefcase-black.svg'
import SmsSecondaryGreenIcon from '@/assets/images/icons/sms-secondary-green.svg'
import SmsBlackIcon from '@/assets/images/icons/sms-black.svg'
import SmsRedIcon from '@/assets/images/icons/sms-red.svg'
import ManSecondaryGreenIcon from '@/assets/images/icons/man-secondary-green.svg'
import ManDarkGreenIcon from '@/assets/images/icons/man-dark-green.svg'
import WomanSecondaryGreenIcon from '@/assets/images/icons/woman-secondary-green.svg'
import WomanDarkGreenIcon from '@/assets/images/icons/woman-dark-green.svg'
import ProfileSecondaryGreenIcon from '@/assets/images/icons/profile-secondary-green.svg'
import ProfileDarkGreenIcon from '@/assets/images/icons/profile-dark-green.svg'
import Profile2userSecondaryGreenIcon from '@/assets/images/icons/profile-2user-secondary-green.svg'
import Profile2userDarkGreenIcon from '@/assets/images/icons/profile-2user-dark-green.svg'

const route = useRoute()
const headOfFamilyStore = useHeadOfFamilyStore()
const { headOfFamily: headOfFamilyData, loading } = storeToRefs(headOfFamilyStore)
const loadingData = ref(true)

// Current profile picture URL for preview
const currentProfilePicture = computed(() => {
  return headOfFamilyData.value?.profile_picture || ''
})

// Form Setup with Zod
const {
  values: form,
  errors,
  meta,
  getFieldValidationState,
  handleBlur,
  handleSubmit,
  setFieldValue,
} = useZodForm({
  schema: headOfFamilyFormSchema.omit({ password: true }),
  initialValues: {
    name: '',
    identify_number: '',
    phone_number: '',
    occupation: '',
    birth_date: '',
    gender: 'male' as 'male' | 'female',
    marital_status: 'single' as 'single' | 'married',
    email: '',
    profile_picture: null as File | null,
  },
  onSubmit: async (values) => {
    const id = route.params.id as string
    await headOfFamilyStore.updateHeadOfFamily(id, values)
  },
})

// Radio Options
const genderOptions: RadioOption[] = [
  {
    label: 'Pria',
    value: 'male',
    iconInactive: ManSecondaryGreenIcon,
    iconActive: ManDarkGreenIcon,
  },
  {
    label: 'Wanita',
    value: 'female',
    iconInactive: WomanSecondaryGreenIcon,
    iconActive: WomanDarkGreenIcon,
  },
]

const maritalStatusOptions: RadioOption[] = [
  {
    label: 'Belum Menikah',
    value: 'single',
    iconInactive: ProfileSecondaryGreenIcon,
    iconActive: ProfileDarkGreenIcon,
  },
  {
    label: 'Sudah Menikah',
    value: 'married',
    iconInactive: Profile2userSecondaryGreenIcon,
    iconActive: Profile2userDarkGreenIcon,
  },
]

// Fetch data and populate form on mount
onMounted(async () => {
  const id = route.params.id as string
  if (id) {
    await headOfFamilyStore.fetchHeadOfFamilyById(id)

    // Pre-fill form with existing data
    if (headOfFamilyData.value) {
      // Use setFieldValue for each field
      setFieldValue('name', headOfFamilyData.value.user.name || '')
      setFieldValue('identify_number', headOfFamilyData.value.identify_number?.toString() || '')
      setFieldValue('phone_number', headOfFamilyData.value.phone_number || '')
      setFieldValue('occupation', headOfFamilyData.value.occupation || '')
      setFieldValue('birth_date', headOfFamilyData.value.birth_date || '')
      setFieldValue('gender', headOfFamilyData.value.gender || 'male')
      // Map all marital status types to form values (divorced/widowed -> single for simplicity)
      const maritalStatus = headOfFamilyData.value.marital_status
      setFieldValue('marital_status', maritalStatus === 'married' ? 'married' : 'single')
      setFieldValue('email', headOfFamilyData.value.user.email || '')
      setFieldValue('profile_picture', null) // Will show existing image via preview-url
    }

    loadingData.value = false
  }
})

const handlePasswordReset = async () => {
  const id = route.params.id as string
  if (id) {
    await headOfFamilyStore.sendPasswordReset(id)
  }
}
</script>

<style scoped></style>
