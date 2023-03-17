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
  if (fraction < 0.1) {
    return "none"
  }
  if (fraction < 0.25) {
    return "low"
  }
  if (fraction < 0.65) {
    return "medium"
  }
  if (fraction < 0.9) {
    return "high"
  }
  return "perfect"
}
