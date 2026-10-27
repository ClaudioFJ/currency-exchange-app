import styles from './CurrencySelect.module.css'

function CurrencySelect({ id, label, currencies, value, onChange, disabled }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select
        id={id}
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
      >
        {currencies.map((currency) => (
          <option key={currency.iso_code} value={currency.iso_code}>
            {currency.iso_code} — {currency.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CurrencySelect