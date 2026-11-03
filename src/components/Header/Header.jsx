import ThemeToggle from '../ThemeToggle/ThemeToggle'
import LanguageSelect from '../LanguageSelect/LanguageSelect'
import { useLanguage } from '../../hooks/useLanguage'
import styles from './Header.module.css'

function Header({ theme, onToggleTheme }) {
  const { t } = useLanguage()

  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>Currency Exchange App</h1>
        <p className={styles.subtitle}>{t('app.subtitle')}</p>
      </div>

      <div className={styles.actions}>
        <LanguageSelect />
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  )
}

export default Header
