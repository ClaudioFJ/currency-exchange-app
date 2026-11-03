// Resumo do histórico: menor e maior cotação, média e variação no período.
export function calculateStats(rows) {
  if (rows.length === 0) return null

  // Cópia ordenada por data, para saber qual é a primeira e a última cotação
  const ordered = [...rows].sort((a, b) => a.date.localeCompare(b.date))

  const min = ordered.reduce((lowest, row) => (row.rate < lowest.rate ? row : lowest))
  const max = ordered.reduce((highest, row) => (row.rate > highest.rate ? row : highest))
  const total = ordered.reduce((sum, row) => sum + row.rate, 0)

  const first = ordered[0]
  const last = ordered[ordered.length - 1]

  return {
    min,
    max,
    average: total / ordered.length,
    count: ordered.length,
    first,
    last,
    changePercent: ((last.rate - first.rate) / first.rate) * 100,
  }
}
