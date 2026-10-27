import { BASE_URL } from '../constants/api'

async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao consultar a API.`)
  }

  return response.json()
}

export function getCurrencies() {
  return request('/currencies')
}

export function getRate(from, to) {
  return request(`/rate/${from.toLowerCase()}/${to.toLowerCase()}`)
}

export function getHistory(from, to, startDate, endDate, group) {
  const params = new URLSearchParams({
    base: from.toLowerCase(),
    quotes: to.toLowerCase(),
    from: startDate,
    to: endDate,
  })

  if (group) params.set('group', group)

  return request(`/rates?${params}`)
}