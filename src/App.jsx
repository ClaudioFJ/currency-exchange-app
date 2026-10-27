import { useState } from 'react'
import Header from './components/Header/Header'
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter'
import { MOCK_CURRENCIES, MOCK_RATE } from './constants/mockData'
import styles from './App.module.css'

function App() {
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('BRL')
  const [amount, setAmount] = useState('100')

  function handleSwap() {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  // RN04: origem e destino devem ser diferentes.
  // Se o usuário escolher a mesma moeda do outro lado, as moedas são trocadas.
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
          currencies={MOCK_CURRENCIES}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          amount={amount}
          rateData={MOCK_RATE}
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