import { useLanguage } from '../../hooks/useLanguage'
import styles from './FavoriteButton.module.css'

function FavoriteButton({ active, onToggle }) {
  const { t } = useLanguage()
  const label = active ? t('favorites.remove') : t('favorites.add')

  return (
    <button
      type="button"
      className={`${styles.button} ${active ? styles.active : ''}`}
      onClick={onToggle}
      aria-pressed={active}
      aria-label={label}
      title={label}
    >
      {active ? '★' : '☆'}
    </button>
  )
}

export default FavoriteButton
