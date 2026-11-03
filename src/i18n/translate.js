// Procura o texto pelo caminho da chave (ex.: 'converter.heading')
// e troca os marcadores {nome} pelos valores recebidos em params.
export function translate(dictionary, key, params = {}) {
  const value = key.split('.').reduce((current, part) => current?.[part], dictionary)

  if (typeof value !== 'string') return key

  return value.replace(/\{(\w+)\}/g, (match, name) =>
    name in params ? String(params[name]) : match
  )
}
