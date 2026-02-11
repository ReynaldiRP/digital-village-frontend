<template>
  <div>
    <PageHeader
      title="Tambah Kepala Rumah Baru"
      :breadcrumbs="[
        { label: 'Kepala Rumah', route: '/head-of-family' },
        { label: 'Tambah Kepala Rumah Baru', route: `/head-of-family/create` },
      ]"
    />
    <form class="capitalize mt-4" enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <section class="shrink-0 rounded-3xl p-6 bg-white flex flex-col gap-6 h-fit">
        <!-- Photo Profile -->
        <BaseFormSection label="Profile Kepala Rumah" direction="row">
          <BaseFormFileUpload
            :model-value="form.profile_picture"
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
            :icon-inactive="icons.UserSecondaryGreenIcon"
            :icon-active="icons.UserBlackIcon"
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
            :icon-inactive="icons.KeyboardSecondaryGreenIcon"
            :icon-active="icons.KeyboardBlackIcon"
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
            :icon-inactive="icons.CallSecondaryGreenIcon"
            :icon-active="icons.CallBlackIcon"
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
            :icon-inactive="icons.BriefcaseSecondaryGreenIcon"
            :icon-active="icons.BriefcaseBlackIcon"
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
            :icon-inactive="icons.SmsSecondaryGreenIcon"
            :icon-active="icons.SmsBlackIcon"
            :icon-error="icons.SmsRedIcon"
            :validation-state="getFieldValidationState('email')"
            :error-message="errors.email"
            @blur="handleBlur('email')"
          />
        </BaseFormSection>
        <hr class="border-desa-background" />

        <!-- Password -->
        <BaseFormSection label="Passwords">
          <BaseFormInput
            v-model="form.password"
            type="password"
            placeholder="Masukan Password"
            :icon-inactive="icons.KeySecondaryGreenIcon"
            :icon-active="icons.KeyBlackIcon"
            :icon-error="icons.KeySecondaryGreenIcon"
            :validation-state="getFieldValidationState('password')"
            :error-message="errors.password"
            @blur="handleBlur('password')"
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
            :disabled="!meta.valid"
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
import { icons } from '@/assets/icons'
import PageHeader from '@/components/common/PageHeader.vue'
import {
  BaseFormSection,
  BaseFormInput,
  BaseFormRadioGroup,
  BaseFormFileUpload,
  BaseFormDateInput,
  type RadioOption,
} from '@/components/form'
import { useZodForm } from '@/composables/useZodForm'
import { headOfFamilyFormSchema, headOfFamilyInitialValues } from '@/schemas'
import { useHeadOfFamilyStore } from '@/stores/headOfFamily'

const headOfFamily = useHeadOfFamilyStore()

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
  schema: headOfFamilyFormSchema,
  initialValues: headOfFamilyInitialValues,
  onSubmit: async (values) => {
    console.log('Form submitted:', values)
    await headOfFamily.createNewHeadOfFamily(values)
  },
})

// Radio Options
const genderOptions: RadioOption[] = [
  {
    label: 'Pria',
    value: 'male',
    iconInactive: icons.ManSecondaryGreenIcon,
    iconActive: icons.ManDarkGreenIcon,
  },
  {
    label: 'Wanita',
    value: 'female',
    iconInactive: icons.WomanSecondaryGreenIcon,
    iconActive: icons.WomanDarkGreenIcon,
  },
]

const maritalStatusOptions: RadioOption[] = [
  {
    label: 'Belum Menikah',
    value: 'single',
    iconInactive: icons.ProfileSecondaryGreenIcon,
    iconActive: icons.ProfileDarkGreenIcon,
  },
  {
    label: 'Sudah Menikah',
    value: 'married',
    iconInactive: icons.Profile2userSecondaryGreenIcon,
    iconActive: icons.Profile2userDarkGreenIcon,
  },
]
</script>

<style scoped></style>
