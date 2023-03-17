export function getHoursBetween(start, end) {
  return (start >= end ? end + 24 : end) - start
}

export function getPrintHour(hour) {
  let displayHour = (hour + Math.floor(new Date().getTimezoneOffset() / 60)) % 24

  return `${String(displayHour).padStart(2, '0')}:00`
}

export function getPrintHours(hour) {
  return `${getPrintHour(hour)} - ${getPrintHour(hour + 1)}`
}

export function getStyle(fraction) {
  if (fraction < 0.05) {
    return "none"
  }
  if (fraction < 0.2) {
    return "low"
  }
  if (fraction < 0.6) {
    return "medium"
  }
  if (fraction < 0.8) {
    return "high"
  }
  if (fraction > 0.95) {
    return "perfect"
  }
}
