import styles from './TableFilters.module.css'

const FIELDS = [
  { name: 'startDate', label: 'Data inicial', type: 'date' },
  { name: 'endDate', label: 'Data final', type: 'date' },
  { name: 'minRate', label: 'Cotação mínima', type: 'text', placeholder: 'Ex.: 5,00' },
  { name: 'maxRate', label: 'Cotação máxima', type: 'text', placeholder: 'Ex.: 5,50' },
]

function TableFilters({ filters, errors, resultCount, onFilterChange, onClear }) {
  const hasFilters = Object.values(filters).some((value) => value !== '')
  const errorMessages = Object.values(errors)

  return (
    <div className={styles.filters}>
      <div className={styles.grid}>
        {FIELDS.map((field) => (
          <label key={field.name} className={styles.field}>
            <span className={styles.label}>{field.label}</span>
            <input
              type={field.type}
              inputMode={field.type === 'text' ? 'decimal' : undefined}
              placeholder={field.placeholder}
              className={styles.input}
              value={filters[field.name]}
              onChange={(event) => onFilterChange(field.name, event.target.value)}
            />
          </label>
        ))}
      </div>

      {errorMessages.length > 0 && (
        <ul className={styles.errors} role="alert">
          {errorMessages.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}

      <div className={styles.footer}>
        <p className={styles.count}>
          {resultCount} {resultCount === 1 ? 'registro encontrado' : 'registros encontrados'}
        </p>
        <button type="button" className={styles.clear} onClick={onClear} disabled={!hasFilters}>
          Limpar filtros
        </button>
      </div>
    </div>
  )
}

export default TableFilters