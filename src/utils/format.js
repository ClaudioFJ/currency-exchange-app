const DEFAULT_LOCALE = 'pt-BR'

function formatNumber(value, decimals, locale) {
  return value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export const formatCurrency = (value, locale = DEFAULT_LOCALE) => formatNumber(value, 2, locale)

export const formatRate = (value, locale = DEFAULT_LOCALE) => formatNumber(value, 4, locale)

export function formatDate(isoDate, locale = DEFAULT_LOCALE) {
  const [year, month, day] = isoDate.split('-').map(Number)

  // A data é montada e formatada em UTC para nunca mudar de dia por causa do fuso
  const date = new Date(Date.UTC(year, month - 1, day))

  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

// Recebe o valor em pontos percentuais (ex.: 1.5 para 1,5%) e mostra o sinal
export function formatPercent(value, locale = DEFAULT_LOCALE) {
  return (value / 100).toLocaleString(locale, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: 'exceptZero',
  })
}
