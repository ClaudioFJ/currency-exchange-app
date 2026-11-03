import { useLanguage } from '../../hooks/useLanguage'
import { parsePairKey } from '../../utils/favorites'
import styles from './FavoritesBar.module.css'

function FavoritesBar({ favorites, currentPair, onSelect, onRemove }) {
  const { t } = useLanguage()

  return (
    <div className={styles.bar}>
      <span className={styles.title}>{t('favorites.title')}</span>

      {favorites.length === 0 ? (
        <p className={styles.empty}>{t('favorites.empty')}</p>
      ) : (
        <ul className={styles.list}>
          {favorites.map((pair) => {
            const { from, to } = parsePairKey(pair)
            const label = `${from} → ${to}`
            const isCurrent = pair === currentPair

            return (
              <li key={pair} className={`${styles.chip} ${isCurrent ? styles.current : ''}`}>
                <button
                  type="button"
                  className={styles.select}
                  onClick={() => onSelect(pair)}
                  aria-pressed={isCurrent}
                >
                  {label}
                </button>
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => onRemove(pair)}
                  aria-label={t('favorites.removeItem', { pair: label })}
                  title={t('favorites.removeItem', { pair: label })}
                >
                  ×
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default FavoritesBar
