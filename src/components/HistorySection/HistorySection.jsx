import PeriodSelector from '../PeriodSelector/PeriodSelector'
import RateChart from '../RateChart/RateChart'
import StatusMessage from '../StatusMessage/StatusMessage'
import { PERIODS } from '../../constants/periods'
import styles from './HistorySection.module.css'

function HistorySection({ history, period, onPeriodChange, fromCurrency, toCurrency, loading, error, theme }) {
  function renderContent() {
    if (error) return <StatusMessage type="error" message={error} />
    if (loading) return <StatusMessage type="loading" message="Carregando histórico..." />
    if (history.length === 0) {
      return <StatusMessage type="empty" message="Nenhuma cotação encontrada para este período." />
    }

    return <RateChart data={history} fromCurrency={fromCurrency} toCurrency={toCurrency} theme={theme} />
  }

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.heading}>
          Histórico {fromCurrency} → {toCurrency}
        </h2>
        <PeriodSelector periods={PERIODS} selected={period} onChange={onPeriodChange} />
      </div>

      {renderContent()}
    </section>
  )
}

export default HistorySection