<template>
  <v-container>
    <h1>It's <span class="glitch" data-text="Barotrauma">Barotrauma</span> time</h1>
    <Schedule :schedule="scheduleStore" readonly/>
    <Meme/>
  </v-container>
</template>

<script>
import { useScheduleStore } from '@/stores/scheduleStore.js'
import { useRoute } from 'vue-router'

import Schedule from '@/components/Schedule.vue'
import Meme from '@/components/Meme.vue'

export default {
  name: 'Results',
  components: {
    Schedule,
    Meme,
  },
  data: () => ({

  }),
  setup(props, context) {
    const scheduleStore = useScheduleStore();
    const scheduleId = useRoute().params.id

    scheduleStore.fetchSchedule(scheduleId);
    
    return {
      scheduleStore,
      scheduleId,
    }
  },
  computed: {
  }
}
</script>

<style>
</style>