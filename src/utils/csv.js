import { formatDate } from './format.js'

export function buildCsv(rows, { headers, locale = 'pt-BR', separator = ';' }) {
  const lines = rows.map((row) =>
    [
      formatDate(row.date, locale),
      row.base,
      row.quote,
      // sem separador de milhar, para não confundir com o separador de colunas
      row.rate.toLocaleString(locale, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
        useGrouping: false,
      }),
    ].join(separator)
  )

  return [headers.join(separator), ...lines].join('\n')
}

export function getDateBounds(rows) {
  const dates = rows.map((row) => row.date).sort()

  return { start: dates[0], end: dates[dates.length - 1] }
}

export function downloadCsv(content, fileName) {
  const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()

  URL.revokeObjectURL(url)
}
