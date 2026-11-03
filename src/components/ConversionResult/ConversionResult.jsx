import { useLanguage } from '../../hooks/useLanguage'
import { formatCurrency, formatRate, formatDate } from '../../utils/format'
import styles from './ConversionResult.module.css'

function ConversionResult({ amount, convertedValue, fromCurrency, toCurrency, rate, date }) {
  const { t, locale } = useLanguage()

  return (
    <div className={styles.result}>
      <p className={styles.from}>
        {formatCurrency(amount, locale)} {fromCurrency} =
      </p>
      <p className={styles.value}>
        {formatCurrency(convertedValue, locale)} {toCurrency}
      </p>
      <p className={styles.details}>
        1 {fromCurrency} = {formatRate(rate, locale)} {toCurrency} ·{' '}
        {t('converter.quotedOn', { date: formatDate(date, locale) })}
      </p>
    </div>
  )
}

export default ConversionResult
