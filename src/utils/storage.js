// Leitura e escrita no localStorage protegidas contra erro
// (janela anônima, armazenamento bloqueado ou valor corrompido).
export function readStorage(key, fallback = null) {
  try {
    const value = localStorage.getItem(key)
    return value === null ? fallback : JSON.parse(value)
  } catch {
    return fallback
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // sem armazenamento, o valor só não é lembrado na próxima visita
  }
}
