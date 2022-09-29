<template>
  <v-container>
    <h1>It's <span class="glitch" data-text="Barotrauma">Baro<span>trauma</span></span> time</h1>

    <v-form>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="12">
            <Schedule @changed="setSchedule($event)" :schedule="scheduleStore"/>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            md="8">
            <v-text-field
              v-model="form.name"
              label="Discord Name">
            </v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="4">
            <v-text-field
              v-model="form.id"
              prefix="#"
              label="Discord Id">
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn
              :disabled="!canSubmit"
              color="success"
              class="mr-4"
              @click="submit"
            >
              Submit
            </v-btn>

            <v-btn
              color="error"
              class="mr-4"
              @click="reset"
            >
              Reset
            </v-btn>

            <v-btn
              color="warning"
              @click="showResults"
            >
              Results
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import { useScheduleStore } from '@/stores/scheduleStore.js'
import { useRoute } from 'vue-router'

import Schedule from '@/components/Schedule.vue'
import Meme from '@/components/Meme.vue'

export default {
  name: 'Register',
  components: {
    Schedule,
    Meme,
  },
  data: () => ({
    form: {
      name: "",
      id: "",
    }
  }),
  setup(props, context) {
    const scheduleStore = useScheduleStore();

    scheduleStore.newSchedule(7, 17, 23);

    const scheduleId = useRoute().params.id
    
    return {
      scheduleStore,
      scheduleId,
    }
  },
  computed: {
    canSubmit() {
      return this.form.name.length > 1 && this.form.name.length < 255 && this.form.id.length === 4
    },
  },
  methods: {
    async submit() {
      await this.scheduleStore.submitSchedule(this.scheduleId, this.form)
      this.$router.push({ name: 'schedule.results', params: { id: this.scheduleId } })
    },
    reset() {
      this.schedule.newSchedule(this.schedule.days, this.schedule.start, this.schedule.end)
    },
    showResults() {
      this.$router.push({ name: 'schedule.results', params: { id: this.scheduleId } })
    },
  },
}
</script>

<style lang="scss">
.v-form {
  background: white;
  border-radius: 0.1rem;
}
</style>