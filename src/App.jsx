import { useState } from 'react'
import Header from './components/Header/Header'
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter'
import { useCurrencies } from './hooks/useCurrencies'
import { useExchangeRate } from './hooks/useExchangeRate'
import styles from './App.module.css'

function App() {
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('BRL')
  const [amount, setAmount] = useState('100')

  const { currencies, error: currenciesError } = useCurrencies()
  const {
    rateData,
    loading: rateLoading,
    error: rateError,
  } = useExchangeRate(fromCurrency, toCurrency)

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
      <Header title="Currency Exchange App" subtitle="Conversão e análise de moedas" />

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
      </main>
    </div>
  )
}

export default App