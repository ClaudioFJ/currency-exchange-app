import { useLanguage } from '../../hooks/useLanguage'
import styles from './SwapButton.module.css'

function SwapButton({ onClick, disabled }) {
  const { t } = useLanguage()

  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      aria-label={t('converter.swap')}
      title={t('converter.swap')}
    >
      ⇄
    </button>
  )
}

export default SwapButton
