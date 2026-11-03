import { useLanguage } from '../../hooks/useLanguage'
import styles from './ThemeToggle.module.css'

function ThemeToggle({ theme, onToggle }) {
  const { t } = useLanguage()
  const isDark = theme === 'dark'
  const label = isDark ? t('theme.toLight') : t('theme.toDark')

  return (
    <button
      type="button"
      className={styles.button}
      onClick={onToggle}
      aria-label={label}
      title={label}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}

export default ThemeToggle
