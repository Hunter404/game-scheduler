import { defineStore } from 'pinia'
import { fetchWrapper } from '@/utility/fetchWrapper'
import { getHoursBetween, getPrintHours, getStyle } from '@/utility/hour'

export const useScheduleStore = defineStore('schedule', {
  state() {
    const days = 7
    const hourStart = 17
    const hourLength = 9

    return {
      readonly: false,
      days,
      hourStart,
      hourLength,
      data: [],
      users: {}
    }
  },
  getters: {
    schedule: (state) => state.data,
  },
  actions: {
    set(hour, value) {
      hour.votes = value ? 1 : 0
      hour.style = value ? 'perfect' : ''
    },
    newSchedule(days, hourStart, hourLength) {
      if (!days || !hourStart || !hourLength) {
        throw new Error("Cannot be undefined")
      }

      const hours = getHoursBetween(hourStart, hourStart + hourLength)
      const data = new Array(days).fill().map(_ => new Array(hours).fill().map((_, i) => ({
        range: getPrintHours(hourStart + i),
        voters: null,
        votes: 0,
        style: 'none',
      })))

      this.$patch({
        days,
        hourStart,
        hourLength,
        hours,
        data,
      })
    },
    async submitNewSchedule(form) {
      const body = await fetchWrapper.post(`/api/schedule/create`, {
        form
      })

      return body.id
    },
    async submitSchedule(id, user) {
      const data = new Array(this.days)
        .fill()
        .map((_, x) => new Array(this.hourLength)
          .fill()
          .map((_, y) => this.data[x][y].votes !== 0))

      fetchWrapper.post(`/api/schedule/${id}`, {
        user,
        data
      })
    },
    async fetchSchedule(id) {
      const body = await fetchWrapper.get(`/api/schedule/${id}`)

      const days = body.days
      const hourStart = body.hourStart
      const hourLength = body.hourLength

      const data = new Array(days)
        .fill()
        .map((_) => new Array(hourLength)
          .fill()
          .map((_, i) => ({
            range: getPrintHours(hourStart + i),
            voters: [],
            votes: 0,
            style: 'none',
          })))

      const users = body.data.map(x => x.user)

      body.data.forEach((item, i) => {
        for (let x = 0; x < days; x++) {
          for (let y = 0; y < hourLength; y++) {
            if (!item.schedule[x][y]) continue

            data[x][y].voters.push(item.user)
            data[x][y].votes++
          }
        }
      })

      for (let x = 0; x < days; x++) {
        for (let y = 0; y < hourLength; y++) {
          const fraction = data[x][y].votes / body.data.length

          data[x][y].style = this.readonly ? '' : getStyle(fraction)
        }
      }

      this.$patch({
        days,
        hourStart,
        hourLength,
        data,
        users,
      })
    }
  }
})
