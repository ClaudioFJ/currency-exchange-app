import { useEffect, useState } from 'react'
import { getRate } from '../services/frankfurterApi'

export function useExchangeRate(from, to) {
  const [rateData, setRateData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const data = await getRate(from, to)
        if (!ignore) setRateData(data)
      } catch {
        if (!ignore) setError('Não foi possível obter a cotação. Tente novamente.')
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    load()

    return () => {
      ignore = true
    }
  }, [from, to])

  return { rateData, loading, error }
}