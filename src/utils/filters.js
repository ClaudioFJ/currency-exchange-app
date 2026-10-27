function toNumber(text) {
  const normalized = String(text).trim().replace(',', '.')
  if (normalized === '') return null

  const number = Number(normalized)
  return Number.isFinite(number) ? number : null
}

export function validateFilters(filters) {
  const errors = {}
  const min = toNumber(filters.minRate)
  const max = toNumber(filters.maxRate)

  if (filters.minRate.trim() !== '' && min === null) {
    errors.minRate = 'Cotação mínima inválida.'
  }
  if (filters.maxRate.trim() !== '' && max === null) {
    errors.maxRate = 'Cotação máxima inválida.'
  }
  if (filters.startDate && filters.endDate && filters.startDate > filters.endDate) {
    errors.date = 'A data inicial não pode ser posterior à data final.'
  }
  if (min !== null && max !== null && min > max) {
    errors.rate = 'A cotação mínima não pode ser maior que a máxima.'
  }

  return errors
}

export function filterRates(rows, filters) {
  const min = toNumber(filters.minRate)
  const max = toNumber(filters.maxRate)

  return rows.filter((row) => {
    if (filters.startDate && row.date < filters.startDate) return false
    if (filters.endDate && row.date > filters.endDate) return false
    if (min !== null && row.rate < min) return false
    if (max !== null && row.rate > max) return false
    return true
  })
}

export function sortRates(rows, sort) {
  const direction = sort.direction === 'asc' ? 1 : -1

  return [...rows].sort((a, b) => {
    if (sort.field === 'rate') return (a.rate - b.rate) * direction
    return a.date.localeCompare(b.date) * direction
  })
}