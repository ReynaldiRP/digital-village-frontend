<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-1 items-center pl-[calc(((100%-1280px)/2)+75px)]"
  >
    <div class="rounded-3xl bg-white flex h-fit w-[486px] shrink-0 flex-col gap-[32px] p-[32px]">
      <header class="flex flex-col items-center gap-[32px]">
        <img
          src="@/assets/images/logos/logo-text.svg"
          alt="icon"
          class="h-[38px] w-[197px] shrink-0"
        />
        <div class="gap-2 flex flex-col">
          <h1 class="font-semibold text-center text-[24px] leading-[30px]">Reset Password</h1>
          <p class="font-medium leading-5 text-desa-secondary text-center">
            Silakan masukkan email dan password baru Anda
          </p>
        </div>
        <div v-if="Object.keys(auth.errors).length" class="bg-red-100 rounded-lg p-4 w-full">
          <p class="font-medium leading-5 text-red-700">{{ auth.errors.message }}</p>
        </div>
      </header>

      <section id="Inputs" class="flex flex-col gap-[32px]">
        <!-- Email Address -->
        <div id="Email-Address" class="gap-4 flex flex-col">
          <h2 class="font-medium leading-5 text-desa-secondary">Email Address</h2>
          <Input
            v-model="form.email"
            placeholder="Masukan Email Kamu"
            type="email"
            :icon="EmailIcon"
            :filled-icon="EmailFilledIcon"
            @blur="handleBlur('email')"
            readonly
          />
          <p v-if="errors.email" class="text-sm text-desa-red -mt-2">{{ errors.email }}</p>
        </div>

        <!-- New Password -->
        <div id="Password" class="gap-4 flex flex-col">
          <h2 class="font-medium leading-5 text-desa-secondary">Password Baru</h2>
          <Input
            v-model="form.password"
            placeholder="Masukan Password Baru"
            type="password"
            :icon="PasswordIcon"
            :filled-icon="PasswordFilledIcon"
            @blur="handleBlur('password')"
          />
          <p v-if="errors.password" class="text-sm text-desa-red -mt-2">{{ errors.password }}</p>
        </div>

        <!-- Confirm Password -->
        <div id="Confirm-Password" class="gap-4 flex flex-col">
          <h2 class="font-medium leading-5 text-desa-secondary">Konfirmasi Password</h2>
          <Input
            v-model="form.password_confirmation"
            placeholder="Ulangi Password Baru"
            type="password"
            :icon="PasswordIcon"
            :filled-icon="PasswordFilledIcon"
            @blur="handleBlur('password_confirmation')"
          />
          <p v-if="errors.password_confirmation" class="text-sm text-desa-red -mt-2">
            {{ errors.password_confirmation }}
          </p>
        </div>
      </section>

      <Button
        :disabled="!meta.valid"
        type="submit"
        :loading="auth.loading"
        label="Reset Password"
      />

      <router-link
        to="/login"
        class="text-center font-medium text-desa-dark-green hover:text-desa-soft-green transition-colors"
      >
        Kembali ke Login
      </router-link>
    </div>
  </form>
  <section id="Banner" class="relative flex w-full max-w-[634px]">
    <div class="top-0 pr-3 py-3 fixed h-screen w-full max-w-[634px] overflow-hidden">
      <div class="rounded-3xl gradient-vertical h-full w-[622px] pt-[59px] pb-[60px]">
        <img
          src="@/assets/images/backgrounds/bg-signin.png"
          class="mx-auto h-full w-[542px] object-contain"
          alt="banner"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Input from '@/components/ui/BaseInput.vue'
import Button from '@/components/ui/BaseButton.vue'
import EmailIcon from '@/assets/images/icons/user-secondary-green.svg'
import EmailFilledIcon from '@/assets/images/icons/user-black.svg'
import PasswordIcon from '@/assets/images/icons/key-secondary-green.svg'
import PasswordFilledIcon from '@/assets/images/icons/key-black.svg'
import { useAuthStore } from '@/stores/auth'
import { useZodForm } from '@/composables/useZodForm'
import { passwordResetSchema, passwordResetInitialValues } from '@/schemas'

const auth = useAuthStore()
const route = useRoute()

const {
  values: form,
  errors,
  meta,
  handleBlur,
  handleSubmit,
  setFieldValue,
} = useZodForm({
  schema: passwordResetSchema,
  initialValues: passwordResetInitialValues,
  onSubmit: async (values) => {
    await auth.resetPassword(values)
  },
})

// Get token and email from URL query params on mount
onMounted(() => {
  const token = route.query.token as string
  const email = route.query.email as string

  if (token) {
    setFieldValue('token', token)
  }

  if (email) {
    setFieldValue('email', email)
  }
})
</script>

<style scoped></style>
