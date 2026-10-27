import { formatCurrency, formatRate, formatDate } from '../../utils/format'
import styles from './ConversionResult.module.css'

function ConversionResult({ amount, convertedValue, fromCurrency, toCurrency, rate, date }) {
  return (
    <div className={styles.result}>
      <p className={styles.from}>
        {formatCurrency(amount)} {fromCurrency} =
      </p>
      <p className={styles.value}>
        {formatCurrency(convertedValue)} {toCurrency}
      </p>
      <p className={styles.details}>
        1 {fromCurrency} = {formatRate(rate)} {toCurrency} · Cotação de {formatDate(date)}
      </p>
    </div>
  )
}

export default ConversionResult