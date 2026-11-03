import { useLanguage } from '../../hooks/useLanguage'
import { formatDate, formatPercent, formatRate } from '../../utils/format'
import styles from './StatsCards.module.css'

function StatsCards({ stats }) {
  const { t, locale } = useLanguage()

  const isUp = stats.changePercent > 0
  const isDown = stats.changePercent < 0
  const arrow = isUp ? '▲' : isDown ? '▼' : '•'
  const trendClass = isUp ? styles.up : isDown ? styles.down : ''

  const cards = [
    {
      id: 'min',
      value: formatRate(stats.min.rate, locale),
      detail: t('stats.on', { date: formatDate(stats.min.date, locale) }),
    },
    {
      id: 'max',
      value: formatRate(stats.max.rate, locale),
      detail: t('stats.on', { date: formatDate(stats.max.date, locale) }),
    },
    {
      id: 'average',
      value: formatRate(stats.average, locale),
      detail: t(stats.count === 1 ? 'stats.ratesOne' : 'stats.ratesOther', { count: stats.count }),
    },
    {
      id: 'change',
      value: `${arrow} ${formatPercent(stats.changePercent, locale)}`,
      detail: `${formatRate(stats.first.rate, locale)} → ${formatRate(stats.last.rate, locale)}`,
      className: trendClass,
    },
  ]

  return (
    <dl className={styles.grid}>
      {cards.map((card) => (
        <div key={card.id} className={styles.card}>
          <dt className={styles.label}>{t(`stats.${card.id}`)}</dt>
          <dd className={`${styles.value} ${card.className ?? ''}`}>{card.value}</dd>
          <dd className={styles.detail}>{card.detail}</dd>
        </div>
      ))}
    </dl>
  )
}

export default StatsCards
