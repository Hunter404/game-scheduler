export function getHoursBetween(start, end) {
  return (start >= end ? end + 24 : end) - start
}
  
export function getPrintHours(hour) {
  const displayHour = hour + Math.floor(new Date().getTimezoneOffset() / 60)

  let beginHour = displayHour
  let endHour = displayHour + 1
  if (beginHour >= 24) beginHour -= 24
  if (endHour >= 24) endHour -= 24

  return `${beginHour}:00 - ${endHour}:00`
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
