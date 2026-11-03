import { useLanguage } from '../../hooks/useLanguage'
import { buildCsv, getDateBounds, downloadCsv } from '../../utils/csv'
import styles from './ExportButton.module.css'

function ExportButton({ rows, fromCurrency, toCurrency }) {
  const { t, locale, csvSeparator } = useLanguage()
  const isEmpty = rows.length === 0

  function handleExport() {
    if (isEmpty) return

    const headers = ['date', 'base', 'quote', 'rate'].map((field) => t(`export.headers.${field}`))
    const content = buildCsv(rows, { headers, locale, separator: csvSeparator })

    const { start, end } = getDateBounds(rows)
    const fileName = t('export.fileName', { pair: `${fromCurrency}-${toCurrency}`, start, end })

    downloadCsv(content, fileName)
  }

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleExport}
      disabled={isEmpty}
      title={isEmpty ? t('export.empty') : t('export.title')}
    >
      {t('export.button')}
    </button>
  )
}

export default ExportButton
