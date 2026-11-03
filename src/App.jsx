import { useState } from 'react'
import Header from './components/Header/Header'
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter'
import HistorySection from './components/HistorySection/HistorySection'
import DataSection from './components/DataSection/DataSection'
import { useCurrencies } from './hooks/useCurrencies'
import { useExchangeRate } from './hooks/useExchangeRate'
import { useHistoricalRates } from './hooks/useHistoricalRates'
import { useTheme } from './hooks/useTheme'
import { DEFAULT_PERIOD } from './constants/periods'
import styles from './App.module.css'

function App() {
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('BRL')
  const [amount, setAmount] = useState('100')
  const [period, setPeriod] = useState(DEFAULT_PERIOD)

  const { theme, toggleTheme } = useTheme()
  const { currencies, error: currenciesError } = useCurrencies()
  const {
    rateData,
    loading: rateLoading,
    error: rateError,
  } = useExchangeRate(fromCurrency, toCurrency)
  const {
    history,
    loading: historyLoading,
    error: historyError,
  } = useHistoricalRates(fromCurrency, toCurrency, period)

  function handleSwap() {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  function handleFromChange(code) {
    if (code === toCurrency) setToCurrency(fromCurrency)
    setFromCurrency(code)
  }

  function handleToChange(code) {
    if (code === fromCurrency) setFromCurrency(toCurrency)
    setToCurrency(code)
  }

  return (
    <div className={styles.container}>
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className={styles.main}>
        <CurrencyConverter
          currencies={currencies}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          amount={amount}
          rateData={rateData}
          loading={rateLoading}
          error={currenciesError || rateError}
          onFromChange={handleFromChange}
          onToChange={handleToChange}
          onAmountChange={setAmount}
          onSwap={handleSwap}
        />

        <HistorySection
          history={history}
          period={period}
          onPeriodChange={setPeriod}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          loading={historyLoading}
          error={historyError}
          theme={theme}
        />

        <DataSection
          key={`${fromCurrency}-${toCurrency}-${period}`}
          history={history}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          loading={historyLoading}
          error={historyError}
        />
      </main>
    </div>
  )
}

export default App
