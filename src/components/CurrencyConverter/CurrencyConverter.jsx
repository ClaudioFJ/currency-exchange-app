import CurrencySelect from '../CurrencySelect/CurrencySelect'
import SwapButton from '../SwapButton/SwapButton'
import AmountInput from '../AmountInput/AmountInput'
import ConversionResult from '../ConversionResult/ConversionResult'
import StatusMessage from '../StatusMessage/StatusMessage'
import { parseAmount, convertAmount } from '../../utils/conversion'
import styles from './CurrencyConverter.module.css'

function CurrencyConverter({
  currencies,
  fromCurrency,
  toCurrency,
  amount,
  rateData,
  loading,
  error,
  onFromChange,
  onToChange,
  onAmountChange,
  onSwap,
}) {
  const parsedAmount = parseAmount(amount)
  const amountError =
    parsedAmount === null ? 'Informe um valor numérico maior que zero.' : null

  const canShowResult = !loading && !error && parsedAmount !== null && rateData

  return (
    <section className={styles.card}>
      <h2 className={styles.heading}>Conversor</h2>

      <div className={styles.currencies}>
        <CurrencySelect
          id="from-currency"
          label="De"
          currencies={currencies}
          value={fromCurrency}
          onChange={onFromChange}
        />
        <SwapButton onClick={onSwap} />
        <CurrencySelect
          id="to-currency"
          label="Para"
          currencies={currencies}
          value={toCurrency}
          onChange={onToChange}
        />
      </div>

      <AmountInput value={amount} onChange={onAmountChange} error={amountError} />

      {error && <StatusMessage type="error" message={error} />}

      {!error && loading && <StatusMessage type="loading" message="Buscando cotação..." />}

      {canShowResult && (
        <ConversionResult
          amount={parsedAmount}
          convertedValue={convertAmount(parsedAmount, rateData.rate)}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          rate={rateData.rate}
          date={rateData.date}
        />
      )}
    </section>
  )
}

export default CurrencyConverter