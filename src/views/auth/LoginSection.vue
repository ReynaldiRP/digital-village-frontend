<template>
  <form
    @submit.prevent="handleLogin"
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
          <h1 class="font-semibold text-center text-[24px] leading-[30px]">
            Halo🙌🏻 , Selamat Datang!
          </h1>
          <p class="font-medium leading-5 text-desa-secondary text-center">
            Silahkan masuk untuk melanjutkan
          </p>
        </div>
        <div v-if="Object.keys(auth.errors).length" class="bg-red-100 rounded-lg p-4 w-full">
          <p class="font-medium leading-5 text-red-700">{{ auth.errors.message }}</p>
        </div>
      </header>
      <section id="Inputs" class="flex flex-col gap-[32px]">
        <div id="Email-Address" class="gap-4 flex flex-col">
          <h2 class="font-medium leading-5 text-desa-secondary">Email Address</h2>
          <Input
            :model-value="form.email"
            placeholder="Masukan Email Kamu"
            type="email"
            :icon="EmailIcon"
            :filled-icon="EmailFilledIcon"
            v-on:update:model-value="form.email = $event"
          />
        </div>
        <div id="Password" class="gap-4 flex flex-col">
          <h2 class="font-medium leading-5 text-desa-secondary">Password</h2>
          <Input
            :model-value="form.password"
            placeholder="Masukan Password Kamu"
            type="password"
            :icon="PasswordIcon"
            :filled-icon="PasswordFilledIcon"
            v-on:update:model-value="form.password = $event"
          />
        </div>
      </section>
      <Button type="submit" :loading="auth.loading" label="Masuk" />
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
import Input from '@/components/ui/BaseInput.vue'
import { reactive } from 'vue'
import EmailIcon from '@/assets/images/icons/user-secondary-green.svg'
import EmailFilledIcon from '@/assets/images/icons/user-black.svg'
import PasswordIcon from '@/assets/images/icons/key-secondary-green.svg'
import PasswordFilledIcon from '@/assets/images/icons/key-black.svg'
import { useAuthStore } from '@/stores/auth'
import Button from '@/components/ui/BaseButton.vue'

const auth = useAuthStore()

const form = reactive({
  email: '',
  password: '',
})

const handleLogin = (): void => {
  auth.login(form)
}
</script>

<style scoped></style>
