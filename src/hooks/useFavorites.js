import { useEffect, useState } from 'react'
import { readStorage, writeStorage } from '../utils/storage'
import { toggleItem } from '../utils/favorites'

const STORAGE_KEY = 'favorites'

function getInitialFavorites() {
  const saved = readStorage(STORAGE_KEY, [])

  // Protege contra um valor salvo que não seja uma lista de textos
  return Array.isArray(saved) ? saved.filter((pair) => typeof pair === 'string') : []
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(getInitialFavorites)

  useEffect(() => {
    writeStorage(STORAGE_KEY, favorites)
  }, [favorites])

  function toggleFavorite(pair) {
    setFavorites((current) => toggleItem(current, pair))
  }

  function removeFavorite(pair) {
    setFavorites((current) => current.filter((item) => item !== pair))
  }

  return { favorites, toggleFavorite, removeFavorite }
}
