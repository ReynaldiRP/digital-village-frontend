<template>
  <div class="flex flex-col">
    <!-- Social Assistance Tab -->
    <section v-if="tabContent === 'Bansos'" class="flex flex-col gap-6">
      <template v-if="socialAssistances && socialAssistances.length > 0">
        <SocialAssistanceCard
          v-for="socialAssistance in socialAssistances"
          :key="socialAssistance.id"
          :social-assistance="socialAssistance"
        />
      </template>
      <BaseEmptyState v-else message="Belum ada data bantuan sosial yang diajukan." />
    </section>

    <!-- Events Tab -->
    <section v-else-if="tabContent === 'Events'" class="flex flex-col gap-6">
      <template v-if="events && events.length > 0">
        <EventParticipationCard v-for="event in events" :key="event.id" :event="event" />
      </template>
      <BaseEmptyState v-else message="Belum ada event yang diikuti." />
    </section>

    <!-- Development Applicants Tab -->
    <section v-else-if="tabContent === 'Applicants'" class="flex flex-col gap-6">
      <template v-if="developmentApplicants && developmentApplicants.length > 0">
        <DevelopmentApplicantCard
          v-for="applicant in developmentApplicants"
          :key="applicant.id"
          :applicant="applicant"
        />
      </template>
      <BaseEmptyState v-else message="Belum ada pengajuan pembangunan." />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { EventParticipation } from '@/types/event'
import type { SocialAssistance } from '@/types/socialAssistance'
import type { DevelopmentApplicant } from '@/types/development'
import BaseEmptyState from '@/components/ui/BaseEmptyState.vue'
import SocialAssistanceCard from './SocialAssistanceCard.vue'
import EventParticipationCard from './EventParticipationCard.vue'
import DevelopmentApplicantCard from './DevelopmentApplicantCard.vue'

interface Props {
  /**
   * The active tab content identifier
   * @example 'bansos', 'events', 'applicants'
   */
  tabContent: string
  /**
   * List of social assistance applications
   */
  socialAssistances: SocialAssistance[]
  /**
   * List of event participations
   */
  events: EventParticipation[]
  /**
   * List of development applicants
   */
  developmentApplicants: DevelopmentApplicant[]
}

defineProps<Props>()
</script>

<style scoped></style>
