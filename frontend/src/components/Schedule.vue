<template>
  <div class="schedule">
    <div class="table">
      <div
        class="column"
        v-for="(day, dayOfWeek) in schedule.data"
        v-bind:key="day"
        >
        <div
          class="cell header">
          {{ toDay(dayOfWeek) }}
        </div>

        <div
          v-for="(hour, hourOfDay) in day"
          v-bind:key="hour"
          @mousedown="onMouseDown({day, hour, dayOfWeek, hourOfDay, $event})"
          @mouseenter="onMouseEnter({day, hour, dayOfWeek, hourOfDay, $event})"
          @mouseout="onMouseOut({day, hour, dayOfWeek, hourOfDay, $event})"
          :class="hour.style"
          class="cell body">
            {{ hour.range }}
        </div>

        <div
          class="cell footer">
          {{ toDay(dayOfWeek) }}
        </div>
      </div>
    </div>

    <div v-if="readonly" class="tooltip" :style="tooltipStyle">
      <ol>
        <li v-for="user in tooltip.users">{{ user.name }}#{{ user.id }}</li>
      </ol>
    </div>
  </div>
</template>

<script>
function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.bottom +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left), width: Math.round(box.width) };
}

export default {
  name: 'Schedule',
  props: {
    schedule: Object,
    readonly: Boolean,
  },
  data() {
    return {
      enable: false,
      tooltip: {
        display: "hidden",
        x: 0,
        y: 0,
        users: [],
      }
    }
  },
  computed: {
    tooltipStyle() {
      return {
        display: this.tooltip.display,
        left: `${this.tooltip.left}px`,
        top: `${this.tooltip.top}px`,
        "min-width": `${this.tooltip.width}px`,
      }
    }
  },
  methods: {
    onMouseEnter({ hour, $event }) {
      if (!this.readonly) {
        if ($event.buttons !== 1) return

        this.schedule.set(hour, this.enable)

        return
      }
      
      const users = hour.voters

      if (!users?.length) return

      const pos = getCoords($event.target)

      this.tooltip = {
        display: "block",
        top: pos.top,
        left: pos.left,
        width: pos.width,
        users,
      }

      this.$forceUpdate()
    },
    onMouseOut() {
      this.tooltip = {
        display: "none",
      }

      this.$forceUpdate()
    },
    onMouseDown({ hour, $event }) {
      if (this.readonly || $event.buttons !== 1) return;

      this.enable = hour.votes === 0
      this.schedule.set(hour, this.enable)
    },
    isEnabled(day, hour) {
      if (!this.schedule.data || !this.schedule.data[day] || !this.schedule.data[day][hour]) return false
      return this.schedule.data[day][hour]
    },
    toDay(day) {
      const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ]

      return days[day]
    },
    toHour(hour) {
      const h = this.schedule.start + hour
      let textualHour = (h >= 24 ? h - 24 : h).toString()
      if (textualHour.length <= 1) {
        textualHour = '0' + textualHour
      }

      return `${textualHour}:00`
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.schedule {
  .table {
    margin-top: 2rem;
    margin-bottom: 1rem;
    width: 100%;

    display: flex;

    border: 1px solid black;

    .column {
      display: flex;

      flex: 1 1 auto;
      flex-direction: column;
      
      background: #686868;

      &:nth-child(even) {
        background: #898989;
      }

      .cell {
        flex: 1 1 auto;
        flex-direction: row;

        border: none;
        color: white;
        width: 100%;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        font-size: 16px;

        user-select: none;

        &.none {
          background-color: #FF0D0D;
        }
        &.low {
          background-color: #FF4E11;
        }
        &.medium {
          background-color: #FF8E15;
        }
        &.high {
          background-color: #ACB334;
        }
        &.perfect {
          background-color: #69B34C;
        }
        :hover {
          transform: scale(1.1);
          filter: drop-shadow(0 0 0.75rem black);
        }
      }
    }
  }

  .tooltip {
    pointer-events: none;

    padding: 0.5rem 2rem;
    position: absolute;
    background: white;

    border: 1px solid black;
    border-radius: 4px;
  }
}
</style>
