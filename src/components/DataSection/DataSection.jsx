import { useState } from 'react'
import TableFilters from '../TableFilters/TableFilters'
import RatesTable from '../RatesTable/RatesTable'
import ExportButton from '../ExportButton/ExportButton'
import StatusMessage from '../StatusMessage/StatusMessage'
import { useLanguage } from '../../hooks/useLanguage'
import { filterRates, sortRates, validateFilters } from '../../utils/filters'
import styles from './DataSection.module.css'

const INITIAL_FILTERS = { startDate: '', endDate: '', minRate: '', maxRate: '' }
const INITIAL_SORT = { field: 'date', direction: 'desc' }

function DataSection({ history, fromCurrency, toCurrency, loading, error }) {
  const { t } = useLanguage()
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [sort, setSort] = useState(INITIAL_SORT)

  const errors = validateFilters(filters)
  const visibleRows = sortRates(filterRates(history, filters), sort)

  function handleFilterChange(name, value) {
    setFilters((previous) => ({ ...previous, [name]: value }))
  }

  function handleClear() {
    setFilters(INITIAL_FILTERS)
  }

  function handleSortChange(field) {
    setSort((previous) => {
      if (previous.field === field) {
        return { field, direction: previous.direction === 'asc' ? 'desc' : 'asc' }
      }
      return { field, direction: field === 'date' ? 'desc' : 'asc' }
    })
  }

  function renderContent() {
    if (error) return <StatusMessage type="error" message={t(error)} />
    if (loading) return <StatusMessage type="loading" message={t('data.loading')} />
    if (history.length === 0) {
      return <StatusMessage type="empty" message={t('data.empty')} />
    }

    return (
      <>
        <TableFilters
          filters={filters}
          errors={errors}
          resultCount={visibleRows.length}
          onFilterChange={handleFilterChange}
          onClear={handleClear}
        />

        {visibleRows.length === 0 ? (
          <StatusMessage type="empty" message={t('data.noResults')} />
        ) : (
          <RatesTable rows={visibleRows} sort={sort} onSortChange={handleSortChange} />
        )}
      </>
    )
  }

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.heading}>
          {t('data.heading', { pair: `${fromCurrency} → ${toCurrency}` })}
        </h2>
        <ExportButton rows={visibleRows} fromCurrency={fromCurrency} toCurrency={toCurrency} />
      </div>

      {renderContent()}
    </section>
  )
}

export default DataSection
