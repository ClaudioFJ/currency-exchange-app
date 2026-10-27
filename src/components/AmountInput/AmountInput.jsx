import styles from './AmountInput.module.css'

function AmountInput({ value, onChange, error }) {
  return (
    <div className={styles.field}>
      <label htmlFor="amount" className={styles.label}>
        Valor
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
        placeholder="Ex.: 100 ou 10,50"
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