import styles from './PeriodSelector.module.css'

function PeriodSelector({ periods, selected, onChange }) {
  return (
    <div className={styles.group} role="group" aria-label="Período de análise">
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
            {period.label}
          </button>
        )
      })}
    </div>
  )
}

export default PeriodSelector