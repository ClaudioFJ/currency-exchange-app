function formatNumber(value, decimals) {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export const formatCurrency = (value) => formatNumber(value, 2)

export const formatRate = (value) => formatNumber(value, 4)

export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-')
  return `${day}/${month}/${year}`
}