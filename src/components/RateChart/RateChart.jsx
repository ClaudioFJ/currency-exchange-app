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

function RateChart({ data, fromCurrency, toCurrency }) {
  return (
    <div className={styles.wrapper}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            minTickGap={32}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            domain={['auto', 'auto']}
            tickFormatter={formatRate}
            width={72}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            labelFormatter={formatDate}
            formatter={(value) => [formatRate(value), `${fromCurrency} → ${toCurrency}`]}
          />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RateChart