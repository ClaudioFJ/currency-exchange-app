import CurrencySelect from '../CurrencySelect/CurrencySelect'
import SwapButton from '../SwapButton/SwapButton'
import AmountInput from '../AmountInput/AmountInput'
import ConversionResult from '../ConversionResult/ConversionResult'
import StatusMessage from '../StatusMessage/StatusMessage'
import FavoriteButton from '../FavoriteButton/FavoriteButton'
import FavoritesBar from '../FavoritesBar/FavoritesBar'
import { useLanguage } from '../../hooks/useLanguage'
import { parseAmount, convertAmount } from '../../utils/conversion'
import { localizeCurrencyNames } from '../../utils/currencyNames'
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
  favorites,
  currentPair,
  onToggleFavorite,
  onSelectFavorite,
  onRemoveFavorite,
}) {
  const { t, locale } = useLanguage()

  const localizedCurrencies = localizeCurrencyNames(currencies, locale)
  const parsedAmount = parseAmount(amount)
  const amountError = parsedAmount === null ? t('converter.amountError') : null

  const canShowResult = !loading && !error && parsedAmount !== null && rateData

  return (
    <section className={styles.card}>
      <div className={styles.headingRow}>
        <h2 className={styles.heading}>{t('converter.heading')}</h2>
        <FavoriteButton active={favorites.includes(currentPair)} onToggle={onToggleFavorite} />
      </div>

      <FavoritesBar
        favorites={favorites}
        currentPair={currentPair}
        onSelect={onSelectFavorite}
        onRemove={onRemoveFavorite}
      />

      <div className={styles.currencies}>
        <CurrencySelect
          id="from-currency"
          label={t('converter.from')}
          currencies={localizedCurrencies}
          value={fromCurrency}
          onChange={onFromChange}
        />
        <SwapButton onClick={onSwap} />
        <CurrencySelect
          id="to-currency"
          label={t('converter.to')}
          currencies={localizedCurrencies}
          value={toCurrency}
          onChange={onToChange}
        />
      </div>

      <AmountInput value={amount} onChange={onAmountChange} error={amountError} />

      {error && <StatusMessage type="error" message={t(error)} />}

      {!error && loading && <StatusMessage type="loading" message={t('converter.loading')} />}

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
