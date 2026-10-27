import { useEffect, useState } from 'react'
import { getCurrencies } from '../services/frankfurterApi'
import { EXCLUDED_CODES } from '../constants/api'

export function useCurrencies() {
  const [currencies, setCurrencies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await getCurrencies()
        const filtered = data.filter((currency) => !EXCLUDED_CODES.includes(currency.iso_code))
        setCurrencies(filtered)
      } catch {
        setError('Não foi possível carregar a lista de moedas.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return { currencies, loading, error }
}