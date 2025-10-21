<template>
  <form action="#" class="flex flex-1 items-center pl-[calc(((100%-1280px)/2)+75px)]">
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
        <div class="bg-red-100 rounded-lg p-4 w-full">
          <p class="font-medium leading-5 text-red-700">Error Section</p>
        </div>
      </header>
      <section id="Select" class="gap-6 grid grid-cols-2">
        <div
          class="group p-5 rounded-2xl bg-white ring-desa-background hover:bg-desa-foreshadow has-[:checked]:bg-desa-foreshadow has-[:checked]:ring-desa-dark-green relative flex items-center justify-between ring-[1px] transition-all duration-300"
        >
          <input
            id="Kepala-Desa"
            required
            type="radio"
            name="role"
            class="peer left-0 right-0 top-0 bottom-0 absolute z-50 opacity-0"
            value="admin"
            v-model="form.role"
          />
          <p
            class="font-medium leading-5 text-desa-secondary group-hover:text-desa-dark-green group-has-[:checked]:text-desa-dark-green transition-all duration-300"
          >
            Kepala Desa
          </p>
          <div class="relative">
            <img
              src="@/assets/images/icons/crown-secondary-green.svg"
              alt="icon"
              class="absolute h-[24px] w-[24px] shrink-0 transition-all duration-300 group-hover:opacity-0 group-has-[:checked]:opacity-0"
            />
            <img
              src="@/assets/images/icons/crown-dark-green.svg"
              alt="icon"
              class="h-[24px] w-[24px] shrink-0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-has-[:checked]:opacity-100"
            />
          </div>
        </div>
        <div
          class="group p-5 rounded-2xl bg-white ring-desa-background hover:bg-desa-foreshadow has-[:checked]:bg-desa-foreshadow has-[:checked]:ring-desa-dark-green relative flex items-center justify-between ring-[1px] transition-all duration-300"
        >
          <input
            id="Kepala-Rumah"
            required
            type="radio"
            name="role"
            class="peer left-0 right-0 top-0 bottom-0 absolute z-50 opacity-0"
            value="head-of-family"
            v-model="form.role"
          />
          <p
            class="font-medium leading-5 text-desa-secondary group-hover:text-desa-dark-green group-has-[:checked]:text-desa-dark-green transition-all duration-300"
          >
            Kepala Rumah
          </p>
          <div class="relative">
            <img
              src="@/assets/images/icons/profile-circle-secondary-green.svg"
              alt="icon"
              class="absolute h-[24px] w-[24px] shrink-0 transition-all duration-300 group-hover:opacity-0 group-has-[:checked]:opacity-0"
            />
            <img
              src="@/assets/images/icons/profile-circle-dark-green.svg"
              alt="icon"
              class="h-[24px] w-[24px] shrink-0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-has-[:checked]:opacity-100"
            />
          </div>
        </div>
      </section>
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
      <button
        type="submit"
        class="bg-desa-dark-green rounded-2xl font-medium leading-5 text-white flex items-center justify-center py-[18px]"
      >
        Masuk
      </button>
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
import Input from '@/components/ui/Input.vue'
import { reactive } from 'vue'

import EmailIcon from '@/assets/images/icons/user-secondary-green.svg'
import EmailFilledIcon from '@/assets/images/icons/user-black.svg'
import PasswordIcon from '@/assets/images/icons/key-secondary-green.svg'
import PasswordFilledIcon from '@/assets/images/icons/key-black.svg'

const form = reactive({
  role: '',
  email: '',
  password: '',
})
</script>

<style scoped></style>
