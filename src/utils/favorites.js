// Um par de moedas é guardado como texto: 'USD-BRL'
export function makePairKey(from, to) {
  return `${from}-${to}`
}

export function parsePairKey(pair) {
  const [from, to] = pair.split('-')
  return { from, to }
}

// Adiciona o item se ele não estiver na lista; remove se já estiver
export function toggleItem(list, item) {
  return list.includes(item) ? list.filter((current) => current !== item) : [...list, item]
}
