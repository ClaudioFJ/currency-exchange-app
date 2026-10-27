export function parseAmount(text) {
  const normalized = String(text).trim().replace(',', '.')

  if (normalized === '') return null

  const number = Number(normalized)

  if (!Number.isFinite(number) || number <= 0) return null

  return number
}

export function convertAmount(amount, rate) {
  return amount * rate
}