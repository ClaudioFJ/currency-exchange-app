import { useState } from 'react'
import TableFilters from '../TableFilters/TableFilters'
import RatesTable from '../RatesTable/RatesTable'
import StatusMessage from '../StatusMessage/StatusMessage'
import { filterRates, sortRates, validateFilters } from '../../utils/filters'
import styles from './DataSection.module.css'
import ExportButton from '../ExportButton/ExportButton'

const INITIAL_FILTERS = { startDate: '', endDate: '', minRate: '', maxRate: '' }
const INITIAL_SORT = { field: 'date', direction: 'desc' }

function DataSection({ history, fromCurrency, toCurrency, loading, error }) {
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
    if (error) return <StatusMessage type="error" message={error} />
    if (loading) return <StatusMessage type="loading" message="Carregando dados..." />
    if (history.length === 0) {
      return <StatusMessage type="empty" message="Nenhuma cotação disponível para este período." />
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
          <StatusMessage type="empty" message="Nenhum registro encontrado com os filtros aplicados." />
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
          Dados {fromCurrency} → {toCurrency}
        </h2>
        <ExportButton rows={visibleRows} fromCurrency={fromCurrency} toCurrency={toCurrency} />
      </div>

      {renderContent()}
    </section>
  )
}

export default DataSection