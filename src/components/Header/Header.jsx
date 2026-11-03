import ThemeToggle from '../ThemeToggle/ThemeToggle'
import styles from './Header.module.css'

function Header({ title, subtitle, theme, onToggleTheme }) {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.actions}>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  )
}

export default Header