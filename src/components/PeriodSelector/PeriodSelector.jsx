import { useLanguage } from '../../hooks/useLanguage'
import styles from './PeriodSelector.module.css'

function PeriodSelector({ periods, selected, onChange }) {
  const { t } = useLanguage()

  return (
    <div className={styles.group} role="group" aria-label={t('history.periodGroup')}>
      {periods.map((period) => {
        const isActive = period.id === selected

        return (
          <button
            key={period.id}
            type="button"
            className={`${styles.button} ${isActive ? styles.active : ''}`}
            aria-pressed={isActive}
            onClick={() => onChange(period.id)}
          >
            {t(`periods.${period.id}`)}
          </button>
        )
      })}
    </div>
  )
}

export default PeriodSelector
