import { useLanguage } from '../../hooks/useLanguage'
import { LANGUAGES } from '../../i18n/languages'
import styles from './LanguageSelect.module.css'

function LanguageSelect() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <select
      className={styles.select}
      value={language}
      onChange={(event) => setLanguage(event.target.value)}
      aria-label={t('language.label')}
      title={t('language.label')}
    >
      {Object.entries(LANGUAGES).map(([code, config]) => (
        <option key={code} value={code}>
          {config.label}
        </option>
      ))}
    </select>
  )
}

export default LanguageSelect
