import { useLanguage } from '../../hooks/useLanguage'
import styles from './AmountInput.module.css'

function AmountInput({ value, onChange, error }) {
  const { t } = useLanguage()

  return (
    <div className={styles.field}>
      <label htmlFor="amount" className={styles.label}>
        {t('converter.amount')}
      </label>
      <input
        id="amount"
        type="text"
        inputMode="decimal"
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'amount-error' : undefined}
        placeholder={t('converter.amountPlaceholder')}
      />
      {error && (
        <span id="amount-error" className={styles.error}>
          {error}
        </span>
      )}
    </div>
  )
}

export default AmountInput
