<template>
  <div>
    <PageHeader
      title="Tambah Anggota Keluarga Baru"
      :breadcrumbs="[
        { label: 'Anggota Keluarga', route: '/family-member' },
        { label: 'Tambah Anggota Keluarga Baru', route: `/family-member/create` },
      ]"
    />
    <form class="capitalize mt-4" enctype="multipart/form-data">
      <section class="shrink-0 rounded-3xl p-6 bg-white flex flex-col gap-6 h-fit">
        <!-- Photo Profile -->
        <BaseFormSection label="Profile Anggota Keluarga" direction="row">
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

        <!-- Jenis Kelamin -->
        <BaseFormSection label="Jenis Kelamin" direction="row">
          <BaseFormRadioGroup v-model="form.gender" name="gender" :options="genderOptions" />
        </BaseFormSection>
        <hr class="border-desa-background" />

        <!-- Nama Anggota Keluarga -->
        <BaseFormSection label="Nama Anggota Keluarga">
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

        <!-- Status Pernikahan -->
        <BaseFormSection label="Status Pernikahan" direction="row">
          <BaseFormRadioGroup
            v-model="form.marital_status"
            name="status"
            :options="maritalStatusOptions"
          />
        </BaseFormSection>
        <hr class="border-desa-background" />

        <!-- Hubungan Dengan Kepala Keluarga -->
        <BaseFormSection label="Hubungan Dengan Kepala Keluarga" direction="row">
          <BaseFormRadioGroup
            v-model="form.relation_to_head"
            name="relation"
            :options="relationOptions"
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
      </section>
    </form>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/common/PageHeader.vue'
import BaseFormFileUpload from '@/components/form/BaseFormFileUpload.vue'
import BaseFormRadioGroup, { type RadioOption } from '@/components/form/BaseFormRadioGroup.vue'
import BaseFormSection from '@/components/form/BaseFormSection.vue'
import { useZodForm } from '@/composables/useZodForm'
import { familyMemberFormSchema, familyMemberInitialValues } from '@/schemas/familyMemberSchema'
import { icons } from '@/assets/icons'
import BaseFormInput from '@/components/form/BaseFormInput.vue'
import BaseFormDateInput from '@/components/form/BaseFormDateInput.vue'

const {
  values: form,
  errors,
  handleBlur,
  setFieldValue,
  getFieldValidationState,
} = useZodForm({
  schema: familyMemberFormSchema,
  initialValues: familyMemberInitialValues,
  onSubmit: (values) => {
    console.log('Form submitted with values:', values)
  },
})

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

const relationOptions: RadioOption[] = [
  {
    label: 'Anak',
    value: 'child',
  },
  {
    label: 'Istri',
    value: 'wife',
  },
  {
    label: 'Suami',
    value: 'husband',
  },
]
</script>

<style scoped></style>
