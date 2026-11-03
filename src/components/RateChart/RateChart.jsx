import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { formatDate, formatRate } from '../../utils/format'
import styles from './RateChart.module.css'

const CHART_COLORS = {
  light: { line: '#2563eb', grid: '#e2e8f0', text: '#64748b', surface: '#ffffff' },
  dark: { line: '#60a5fa', grid: '#24324d', text: '#94a3b8', surface: '#111a2e' },
}

function RateChart({ data, fromCurrency, toCurrency, theme }) {
  const colors = CHART_COLORS[theme]

  return (
    <div className={styles.wrapper}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            minTickGap={32}
            stroke={colors.text}
            tick={{ fontSize: 12, fill: colors.text }}
          />
          <YAxis
            domain={['auto', 'auto']}
            tickFormatter={formatRate}
            width={72}
            stroke={colors.text}
            tick={{ fontSize: 12, fill: colors.text }}
          />
          <Tooltip
            labelFormatter={formatDate}
            formatter={(value) => [formatRate(value), `${fromCurrency} → ${toCurrency}`]}
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