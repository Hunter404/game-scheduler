import { defineStore } from 'pinia'
import { fetchWrapper } from '@/utility/fetchWrapper'
import { getHoursBetween, getPrintHours, getStyle } from '@/utility/hour'

export const useScheduleStore = defineStore('schedule', {
  state() {
    const days = 7
    const start = 17
    const end = 23
    const hours = getHoursBetween(start, end)

    return {
      readonly: false,
      days,
      start,
      end,
      hours,
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
      hour.style = value ? 'perfect' : 'none'
    },
    newSchedule(days, hourStart, hourEnd) {
      if (!days || !hourStart || !hourEnd) {
        throw new Error("Cannot be undefined")
      }

      const start = hourStart
      const end = hourEnd
      const hours = getHoursBetween(start, end)
      const data = new Array(days).fill().map(_ => new Array(hours).fill().map((_, i) => ({
        range: getPrintHours(start + i),
        voters: null,
        votes: 0,
        style: 'none',
      })))

      this.$patch({
        days,
        start,
        end,
        hours,
        data,
      })
    },
    async submitSchedule(id, user) {
      const data = new Array(this.days)
        .fill()
        .map((_, x) => new Array(this.hours)
          .fill()
          .map((_, y) => this.data[x][y].votes !== 0))

      fetchWrapper.post(`http://127.0.0.1:8000/schedule/${id}`, {
        user,
        data
      })
    },
    async fetchSchedule(id) {
      const body = await fetchWrapper.get(`http://127.0.0.1:8000/schedule/${id}`)

      const days = body.days
      const hours = body.hours
      const start = body.startHour
      const end = body.endHour

      const data = new Array(days)
        .fill()
        .map((_) => new Array(hours)
          .fill()
          .map((_, i) => ({
            range: getPrintHours(start + i),
            voters: [],
            votes: 0,
            style: 'none',
          })))

      const users = body.data.map(x => x.user)

      body.data.forEach((item, i) => {
        for (let x = 0; x < days; x++) {
          for (let y = 0; y < hours; y++) {
            if (!item.schedule[x][y]) continue

            data[x][y].voters.push(item.user)
            data[x][y].votes++
          }
        }
      })

      for (let x = 0; x < days; x++) {
        for (let y = 0; y < hours; y++) {
          const fraction = data[x][y].votes / body.data.length

          data[x][y].style = getStyle(fraction)
        }
      }

      this.$patch({
        days,
        start,
        end,
        hours,
        data,
        users,
      })
    }
  }
})
