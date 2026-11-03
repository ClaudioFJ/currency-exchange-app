import PeriodSelector from '../PeriodSelector/PeriodSelector'
import RateChart from '../RateChart/RateChart'
import StatsCards from '../StatsCards/StatsCards'
import StatusMessage from '../StatusMessage/StatusMessage'
import { useLanguage } from '../../hooks/useLanguage'
import { PERIODS } from '../../constants/periods'
import { calculateStats } from '../../utils/stats'
import styles from './HistorySection.module.css'

function HistorySection({ history, period, onPeriodChange, fromCurrency, toCurrency, loading, error, theme }) {
  const { t } = useLanguage()

  function renderContent() {
    if (error) return <StatusMessage type="error" message={t(error)} />
    if (loading) return <StatusMessage type="loading" message={t('history.loading')} />
    if (history.length === 0) {
      return <StatusMessage type="empty" message={t('history.empty')} />
    }

    return (
      <>
        <StatsCards stats={calculateStats(history)} />
        <RateChart data={history} fromCurrency={fromCurrency} toCurrency={toCurrency} theme={theme} />
      </>
    )
  }

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.heading}>
          {t('history.heading', { pair: `${fromCurrency} → ${toCurrency}` })}
        </h2>
        <PeriodSelector periods={PERIODS} selected={period} onChange={onPeriodChange} />
      </div>

      {renderContent()}
    </section>
  )
}

export default HistorySection
