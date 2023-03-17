<template>
  <v-container>
    <h1>It's <span class="glitch" data-text="Barotrauma">Baro<span>trauma</span></span> time</h1>

    <v-form>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="12">
            <v-range-slider
              v-model="form.range"
              strict
              max="36"
              min="0"
              step="1"
            >
            </v-range-slider>

            <v-label
              class="center"
            >
            Starting {{ this.starting }} for {{ this.ending }} hours
            </v-label>
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
              Create
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import { getPrintHour } from './../utility/hour'
import { useScheduleStore } from '@/stores/scheduleStore.js'
import { useRoute } from 'vue-router'

export default {
  name: 'Create',
  props: {
  },
  data() {
    return {
      form: {
        range: [12, 18],
      }
    }
  },
  setup(props, context) {
    const scheduleStore = useScheduleStore()

    return {
      scheduleStore,
    }
  },
  computed: {
    starting() {
      return getPrintHour(this.form.range[0])
    },
    ending() {
      return this.form.range[1] - this.form.range[0]
    },
    canSubmit() {
      if (this.form.range[1] - this.form.range[0] < 1) return false

      return true
    }
  },
  methods: {
    async submit() {
      const form = {
        days: 7,
        hourStart: this.form.range[0],
        hourLength: this.form.range[1] - this.form.range[0]
      }
      const scheduleId = await this.scheduleStore.submitNewSchedule(form)
      console.log(scheduleId)

      this.$router.push({ name: 'schedule.register', params: { id: scheduleId } })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.center {
  text-align: center;
}

.v-form {
  background: white;
  border-radius: 0.1rem;
}
</style>
