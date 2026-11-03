import Logo from '../Logo/Logo'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import LanguageSelect from '../LanguageSelect/LanguageSelect'
import { useLanguage } from '../../hooks/useLanguage'
import { APP_NAME } from '../../constants/app'
import styles from './Header.module.css'

function Header({ theme, onToggleTheme }) {
  const { t } = useLanguage()

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Logo />
        <div>
          <h1 className={styles.title}>{APP_NAME}</h1>
          <p className={styles.subtitle}>{t('app.subtitle')}</p>
        </div>
      </div>

      <div className={styles.actions}>
        <LanguageSelect />
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  )
}

export default Header