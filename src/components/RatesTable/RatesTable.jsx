import { useLanguage } from '../../hooks/useLanguage'
import { formatDate, formatRate } from '../../utils/format'
import styles from './RatesTable.module.css'

const COLUMNS = [
  { field: 'date', sortable: true },
  { field: 'base' },
  { field: 'quote' },
  { field: 'rate', sortable: true, numeric: true },
]

function RatesTable({ rows, sort, onSortChange }) {
  const { t, locale } = useLanguage()

  function getArrow(field) {
    if (sort.field !== field) return '↕'
    return sort.direction === 'asc' ? '↑' : '↓'
  }

  function getAriaSort(field) {
    if (sort.field !== field) return undefined
    return sort.direction === 'asc' ? 'ascending' : 'descending'
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {COLUMNS.map((column) => (
              <th
                key={column.field}
                scope="col"
                className={column.numeric ? styles.numeric : undefined}
                aria-sort={getAriaSort(column.field)}
              >
                {column.sortable ? (
                  <button
                    type="button"
                    className={styles.sortButton}
                    onClick={() => onSortChange(column.field)}
                  >
                    {t(`table.${column.field}`)}{' '}
                    <span aria-hidden="true">{getArrow(column.field)}</span>
                  </button>
                ) : (
                  t(`table.${column.field}`)
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.date}>
              <td>{formatDate(row.date, locale)}</td>
              <td>{row.base}</td>
              <td>{row.quote}</td>
              <td className={styles.numeric}>{formatRate(row.rate, locale)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RatesTable
