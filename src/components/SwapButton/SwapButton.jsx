import styles from './SwapButton.module.css'

function SwapButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      aria-label="Inverter moedas"
      title="Inverter moedas"
    >
      ⇄
    </button>
  )
}

export default SwapButton