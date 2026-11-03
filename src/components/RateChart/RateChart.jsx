import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { useLanguage } from '../../hooks/useLanguage'
import { formatDate, formatRate } from '../../utils/format'
import styles from './RateChart.module.css'

const CHART_COLORS = {
  light: { line: '#2563eb', grid: '#e2e8f0', text: '#64748b', surface: '#ffffff' },
  dark: { line: '#60a5fa', grid: '#24324d', text: '#94a3b8', surface: '#111a2e' },
}

function RateChart({ data, fromCurrency, toCurrency, theme }) {
  const { locale } = useLanguage()
  const colors = CHART_COLORS[theme]

  // O Recharts chama os formatadores com (valor, índice). As arrow functions
  // garantem que o segundo argumento seja o locale, e não o índice.
  const formatAxisDate = (value) => formatDate(value, locale)
  const formatAxisRate = (value) => formatRate(value, locale)

  return (
    <div className={styles.wrapper}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis
            dataKey="date"
            tickFormatter={formatAxisDate}
            minTickGap={32}
            stroke={colors.text}
            tick={{ fontSize: 12, fill: colors.text }}
          />
          <YAxis
            domain={['auto', 'auto']}
            tickFormatter={formatAxisRate}
            width={72}
            stroke={colors.text}
            tick={{ fontSize: 12, fill: colors.text }}
          />
          <Tooltip
            labelFormatter={formatAxisDate}
            formatter={(value) => [formatAxisRate(value), `${fromCurrency} → ${toCurrency}`]}
            contentStyle={{ backgroundColor: colors.surface, borderColor: colors.grid }}
            labelStyle={{ color: colors.text }}
          />
          <Line type="monotone" dataKey="rate" stroke={colors.line} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RateChart
