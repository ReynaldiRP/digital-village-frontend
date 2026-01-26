<template>
  <div>
    <PageHeader
      title="Tambah Kepala Rumah Baru"
      :breadcrumbs="[
        { label: 'Kepala Rumah', route: '/head-of-family' },
        { label: 'Tambah Kepala Rumah Baru', route: `/head-of-family/create` },
      ]"
    />
    <form class="capitalize mt-4" @submit.prevent="handleSubmit">
      <section class="shrink-0 rounded-3xl p-6 bg-white flex flex-col gap-6 h-fit">
        <!-- Photo Profile -->
        <BaseFormSection label="Profile Kepala Rumah" direction="row">
          <BaseFormFileUpload
            v-model="form.photo"
            preview-shape="circle"
            preview-size="medium"
            accept="image/*"
            button-text="Upload"
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
            :validation-state="getValidationState('name')"
          />
        </BaseFormSection>
        <hr class="border-desa-background" />

        <!-- NIK -->
        <BaseFormSection label="Nomor Induk Kependudukan">
          <BaseFormInput
            v-model="form.nik"
            type="number"
            placeholder="Ketik NIK"
            :icon-inactive="KeyboardSecondaryGreenIcon"
            :icon-active="KeyboardBlackIcon"
            :validation-state="getValidationState('nik')"
          />
        </BaseFormSection>
        <hr class="border-desa-background" />

        <!-- Phone -->
        <BaseFormSection label="Nomor Handphone">
          <BaseFormInput
            v-model="form.phone"
            type="text"
            placeholder="Masukan No. HP yang aktif"
            :icon-inactive="CallSecondaryGreenIcon"
            :icon-active="CallBlackIcon"
            :validation-state="getValidationState('phone')"
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
            :validation-state="getValidationState('occupation')"
          />
        </BaseFormSection>
        <hr class="border-desa-background" />

        <!-- Tanggal Lahir -->
        <BaseFormSection label="Tanggal Lahir" direction="row">
          <BaseFormDateInput
            v-model="form.birthdate"
            placeholder="Masukan tanggal lahir"
            show-age
            age-label="Umur"
            :validation-state="getValidationState('birthdate')"
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
            v-model="form.maritalStatus"
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
            :validation-state="getValidationState('email')"
            :error-message="errors.email"
          />
        </BaseFormSection>
        <hr class="border-desa-background" />

        <!-- Password -->
        <BaseFormSection label="Passwords">
          <BaseFormInput
            v-model="form.password"
            type="password"
            placeholder="Masukan Password"
            :icon-inactive="KeySecondaryGreenIcon"
            :icon-active="KeyBlackIcon"
            :validation-state="getValidationState('password')"
          />
        </BaseFormSection>
        <hr class="border-desa-background" />

        <!-- Buttons -->
        <section id="Buttons" class="flex items-center justify-end gap-4">
          <router-link to="/head-of-family">
            <div
              class="py-[18px] rounded-2xl bg-desa-red w-[180px] text-center flex justify-center font-medium text-white"
            >
              Batal, Tidak jadi
            </div>
          </router-link>
          <button
            :disabled="!isFormValid"
            type="submit"
            class="py-[18px] rounded-2xl disabled:bg-desa-grey w-[180px] text-center flex justify-center font-medium text-white bg-desa-dark-green transition-all duration-300"
          >
            Create Now
          </button>
        </section>
      </section>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import PageHeader from '@/components/common/PageHeader.vue'
import {
  BaseFormSection,
  BaseFormInput,
  BaseFormRadioGroup,
  BaseFormFileUpload,
  BaseFormDateInput,
  type RadioOption,
} from '@/components/form'

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
import KeySecondaryGreenIcon from '@/assets/images/icons/key-secondary-green.svg'
import KeyBlackIcon from '@/assets/images/icons/key-black.svg'
import ManSecondaryGreenIcon from '@/assets/images/icons/man-secondary-green.svg'
import ManDarkGreenIcon from '@/assets/images/icons/man-dark-green.svg'
import WomanSecondaryGreenIcon from '@/assets/images/icons/woman-secondary-green.svg'
import WomanDarkGreenIcon from '@/assets/images/icons/woman-dark-green.svg'
import ProfileSecondaryGreenIcon from '@/assets/images/icons/profile-secondary-green.svg'
import ProfileDarkGreenIcon from '@/assets/images/icons/profile-dark-green.svg'
import Profile2userSecondaryGreenIcon from '@/assets/images/icons/profile-2user-secondary-green.svg'
import Profile2userDarkGreenIcon from '@/assets/images/icons/profile-2user-dark-green.svg'

// Form State
const form = reactive({
  photo: null as File | null,
  name: '',
  nik: '',
  phone: '',
  occupation: '',
  birthdate: '',
  gender: '',
  maritalStatus: '',
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
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

// Validation Helper
const getValidationState = (field: keyof typeof form): 'valid' | 'invalid' | 'default' => {
  const value = form[field]

  // Check for specific error
  if (field === 'email' && errors.email) {
    return 'invalid'
  }

  // If field has value, mark as valid
  if (value && String(value).length > 0) {
    return 'valid'
  }

  return 'default'
}

// Form Validation
const isFormValid = computed(() => {
  return (
    form.name.trim().length > 0 &&
    form.nik !== '' &&
    form.phone.trim().length > 0 &&
    form.occupation.trim().length > 0 &&
    form.birthdate.length > 0 &&
    form.gender.length > 0 &&
    form.maritalStatus.length > 0 &&
    form.email.trim().length > 0 &&
    form.password.length > 0
  )
})

// Form Submit
const handleSubmit = () => {
  // TODO: Implement form submission
  console.log('Form submitted:', form)
}
</script>

<style scoped></style>
