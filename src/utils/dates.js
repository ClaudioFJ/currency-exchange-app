export function toISODate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getDateRange(period, today = new Date()) {
  const start = new Date(today)

  if (period.days) start.setDate(start.getDate() - period.days)
  if (period.months) start.setMonth(start.getMonth() - period.months)
  if (period.years) start.setFullYear(start.getFullYear() - period.years)

  return {
    startDate: toISODate(start),
    endDate: toISODate(today),
  }
}