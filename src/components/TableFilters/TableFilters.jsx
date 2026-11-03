import { useLanguage } from '../../hooks/useLanguage'
import styles from './TableFilters.module.css'

const FIELDS = [
  { name: 'startDate', type: 'date' },
  { name: 'endDate', type: 'date' },
  { name: 'minRate', type: 'text', placeholder: 'filters.minPlaceholder' },
  { name: 'maxRate', type: 'text', placeholder: 'filters.maxPlaceholder' },
]

function TableFilters({ filters, errors, resultCount, onFilterChange, onClear }) {
  const { t } = useLanguage()
  const hasFilters = Object.values(filters).some((value) => value !== '')
  const errorKeys = Object.values(errors)

  return (
    <div className={styles.filters}>
      <div className={styles.grid}>
        {FIELDS.map((field) => (
          <label key={field.name} className={styles.field}>
            <span className={styles.label}>{t(`filters.${field.name}`)}</span>
            <input
              type={field.type}
              inputMode={field.type === 'text' ? 'decimal' : undefined}
              placeholder={field.placeholder ? t(field.placeholder) : undefined}
              className={styles.input}
              value={filters[field.name]}
              onChange={(event) => onFilterChange(field.name, event.target.value)}
            />
          </label>
        ))}
      </div>

      {errorKeys.length > 0 && (
        <ul className={styles.errors} role="alert">
          {errorKeys.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
      )}

      <div className={styles.footer}>
        <p className={styles.count}>
          {t(resultCount === 1 ? 'filters.countOne' : 'filters.countOther', { count: resultCount })}
        </p>
        <button type="button" className={styles.clear} onClick={onClear} disabled={!hasFilters}>
          {t('filters.clear')}
        </button>
      </div>
    </div>
  )
}

export default TableFilters
