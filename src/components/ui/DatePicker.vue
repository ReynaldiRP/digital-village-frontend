<template>
  <div id="Date-Picker" class="flex flex-col gap-4 p-6">
    <div class="flex items-center justify-between">
      <button
        @click="previousMonth"
        class="flex items-center justify-center size-14 rounded-2xl border border-desa-foreshadow hover:border-desa-dark-green"
      >
        <img
          src="@/assets/images/icons/arrow-left-secondary-green.svg"
          class="flex size-6 shrink-0"
          alt="icon"
        />
      </button>
      <p class="font-semibold text-xl">{{ displayedMonth }}</p>
      <button
        @click="nextMonth"
        class="flex items-center justify-center size-14 rounded-2xl border border-desa-foreshadow hover:border-desa-dark-green"
      >
        <img
          src="@/assets/images/icons/arrow-left-secondary-green.svg"
          class="flex size-6 shrink-0 rotate-180"
          alt="icon"
        />
      </button>
    </div>
    <div class="flex justify-between">
      <button
        v-for="day in visibleDays"
        :key="day.fullDate.getTime()"
        @click="selectDate(day.fullDate)"
        class="group flex flex-col items-center w-[46px] h-[76px] shrink-0 gap-3"
        :class="{ active: day.isSelected }"
      >
        <div
          class="flex rounded-full size-[46px] items-center justify-center bg-desa-foreshadow group-[.active]:bg-desa-soft-green"
        >
          <span class="font-medium text-desa-dark-green group-[.active]:text-white">
            {{ day.date }}
          </span>
        </div>
        <span class="font-medium text-sm text-desa-secondary group-[.active]:text-desa-black">
          {{ day.dayName }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface DatePickerEmits {
  (e: 'dateSelected', date: Date): void
}

const emit = defineEmits<DatePickerEmits>()

const currentDate = ref(new Date())
const selectedDate = ref(new Date())

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

const displayedMonth = computed(
  () => `${monthNames[currentDate.value.getMonth()]} ${currentDate.value.getFullYear()}`,
)

const visibleDays = computed(() => {
  const today = new Date()
  const startDate = new Date(currentDate.value)
  startDate.setDate(startDate.getDate() - 3)

  const days = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    const dayOfWeek = date.getDay()
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()

    const isSelected =
      date.getDate() === selectedDate.value.getDate() &&
      date.getMonth() === selectedDate.value.getMonth() &&
      date.getFullYear() === selectedDate.value.getFullYear()

    days.push({
      date: date.getDate(),
      dayName: dayNames[dayOfWeek],
      fullDate: new Date(date),
      isToday,
      isSelected,
    })
  }

  return days
})

const previousMonth = () => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() - 1)
  currentDate.value = newDate
}

const nextMonth = () => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  currentDate.value = newDate
}

const selectDate = (date: Date) => {
  selectedDate.value = new Date(date)
  currentDate.value = new Date(date)
  emit('dateSelected', new Date(date))
}
</script>

<style scoped></style>
