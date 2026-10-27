import { formatDate, formatRate } from './format.js'

const HEADERS = ['Data', 'Moeda de origem', 'Moeda de destino', 'Cotação']

export function buildCsv(rows) {
  const lines = rows.map((row) =>
    [formatDate(row.date), row.base, row.quote, formatRate(row.rate)].join(';')
  )

  return [HEADERS.join(';'), ...lines].join('\n')
}

export function buildFileName(from, to, rows) {
  const dates = rows.map((row) => row.date).sort()
  const firstDate = dates[0]
  const lastDate = dates[dates.length - 1]

  return `cotacoes_${from}-${to}_${firstDate}_a_${lastDate}.csv`
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