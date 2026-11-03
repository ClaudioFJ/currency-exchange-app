import styles from './ThemeToggle.module.css'

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'
  const label = isDark ? 'Ativar modo claro' : 'Ativar modo escuro'

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