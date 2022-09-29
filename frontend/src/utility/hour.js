export function getHoursBetween(start, end) {
  return (start >= end ? end + 24 : end) - start
}
  
export function getPrintHours(hour) {
  if (hour >= 24) hour -= 24

  return `${hour}:00 - ${hour + 1}:00`
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