import { useEffect, useState } from 'react'
import { getHistory } from '../services/frankfurterApi'
import { PERIODS } from '../constants/periods'
import { getDateRange } from '../utils/dates'

export function useHistoricalRates(from, to, periodId) {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const period = PERIODS.find((item) => item.id === periodId)
        const { startDate, endDate } = getDateRange(period)
        const data = await getHistory(from, to, startDate, endDate, period.group)

        if (!ignore) setHistory(data)
      } catch {
        if (!ignore) {
          setHistory([])
          setError('Não foi possível carregar o histórico. Tente novamente.')
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    load()

    return () => {
      ignore = true
    }
  }, [from, to, periodId])

  return { history, loading, error }
}