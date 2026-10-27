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