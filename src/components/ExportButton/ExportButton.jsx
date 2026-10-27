import { buildCsv, buildFileName, downloadCsv } from '../../utils/csv'
import styles from './ExportButton.module.css'

function ExportButton({ rows, fromCurrency, toCurrency }) {
  const isEmpty = rows.length === 0

  function handleExport() {
    if (isEmpty) return

    const content = buildCsv(rows)
    const fileName = buildFileName(fromCurrency, toCurrency, rows)
    downloadCsv(content, fileName)
  }

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleExport}
      disabled={isEmpty}
      title={isEmpty ? 'Não há registros para exportar' : 'Exportar registros filtrados'}
    >
      Exportar CSV
    </button>
  )
}

export default ExportButton