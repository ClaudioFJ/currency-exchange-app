// Testes das funções utilitárias (funções puras, sem React).
// Como rodar: npm run test:functions

import { parseAmount, convertAmount } from '../src/utils/conversion.js'
import { formatCurrency, formatRate, formatDate } from '../src/utils/format.js'
import { toISODate, getDateRange } from '../src/utils/dates.js'
import { filterRates, sortRates, validateFilters } from '../src/utils/filters.js'
import { buildCsv, buildFileName } from '../src/utils/csv.js'

let passed = 0
let failed = 0

function test(id, description, received, expected) {
  const ok = JSON.stringify(received) === JSON.stringify(expected)

  if (ok) {
    passed++
    console.log(`PASS  ${id}  ${description}`)
  } else {
    failed++
    console.log(`FAIL  ${id}  ${description}`)
    console.log(`        esperado: ${JSON.stringify(expected)}`)
    console.log(`        recebido: ${JSON.stringify(received)}`)
  }
}

// Dados de exemplo no mesmo formato retornado pela API
const ROWS = [
  { date: '2026-10-13', base: 'USD', quote: 'BRL', rate: 5.0017 },
  { date: '2026-10-14', base: 'USD', quote: 'BRL', rate: 5.02 },
  { date: '2026-10-15', base: 'USD', quote: 'BRL', rate: 5.0425 },
  { date: '2026-10-16', base: 'USD', quote: 'BRL', rate: 5.0698 },
]
const NO_FILTERS = { startDate: '', endDate: '', minRate: '', maxRate: '' }
const dates = (rows) => rows.map((row) => row.date)

// conversion.js
test('FT01', 'parseAmount aceita número inteiro', parseAmount('100'), 100)
test('FT02', 'parseAmount aceita vírgula decimal', parseAmount('10,50'), 10.5)
test('FT03', 'parseAmount aceita ponto decimal', parseAmount('10.50'), 10.5)
test('FT04', 'parseAmount ignora espaços nas pontas', parseAmount('  25 '), 25)
test('FT05', 'parseAmount rejeita campo vazio', parseAmount(''), null)
test('FT06', 'parseAmount rejeita zero', parseAmount('0'), null)
test('FT07', 'parseAmount rejeita negativo', parseAmount('-5'), null)
test('FT08', 'parseAmount rejeita texto', parseAmount('abc'), null)
// 100 × 5.0698 dá 506.97999999999996 (ponto flutuante); por isso
// comparamos o valor formatado, que é o que aparece na tela.
test('FT09', 'convertAmount multiplica valor pela taxa', formatCurrency(convertAmount(100, 5.0698)), '506,98')

// format.js
test('FT10', 'formatCurrency usa 2 casas e padrão BR', formatCurrency(1234.5), '1.234,50')
test('FT11', 'formatRate usa 4 casas', formatRate(5.0698), '5,0698')
test('FT12', 'formatDate converte AAAA-MM-DD para DD/MM/AAAA', formatDate('2026-10-19'), '19/10/2026')

// dates.js (data fixa para o resultado ser sempre o mesmo)
const TODAY = new Date(2026, 9, 27) // 27/10/2026 (mês começa em 0)
test('FT13', 'toISODate usa a data local', toISODate(TODAY), '2026-10-27')
test('FT14', 'getDateRange 7 dias', getDateRange({ days: 7 }, TODAY), { startDate: '2026-10-20', endDate: '2026-10-27' })
test('FT15', 'getDateRange 3 meses', getDateRange({ months: 3 }, TODAY), { startDate: '2026-07-27', endDate: '2026-10-27' })
test('FT16', 'getDateRange 10 anos', getDateRange({ years: 10 }, TODAY), { startDate: '2016-10-27', endDate: '2026-10-27' })

// filters.js
test('FT17', 'filterRates sem filtros devolve tudo', filterRates(ROWS, NO_FILTERS).length, 4)
test('FT18', 'filterRates por intervalo de datas',
  dates(filterRates(ROWS, { ...NO_FILTERS, startDate: '2026-10-14', endDate: '2026-10-15' })),
  ['2026-10-14', '2026-10-15'])
test('FT19', 'filterRates por cotação mínima com vírgula',
  dates(filterRates(ROWS, { ...NO_FILTERS, minRate: '5,04' })),
  ['2026-10-15', '2026-10-16'])
test('FT20', 'filterRates combina data e cotação',
  dates(filterRates(ROWS, { startDate: '2026-10-14', endDate: '', minRate: '', maxRate: '5.05' })),
  ['2026-10-14', '2026-10-15'])
test('FT21', 'filterRates sem resultado devolve array vazio',
  filterRates(ROWS, { ...NO_FILTERS, minRate: '10' }), [])
test('FT22', 'sortRates por data decrescente',
  dates(sortRates(ROWS, { field: 'date', direction: 'desc' })),
  ['2026-10-16', '2026-10-15', '2026-10-14', '2026-10-13'])
test('FT23', 'sortRates por cotação crescente',
  sortRates(ROWS, { field: 'rate', direction: 'asc' }).map((row) => row.rate),
  [5.0017, 5.02, 5.0425, 5.0698])
const original = dates(ROWS)
sortRates(ROWS, { field: 'date', direction: 'desc' })
test('FT24', 'sortRates não altera o array original', dates(ROWS), original)
test('FT25', 'validateFilters sem erros', validateFilters(NO_FILTERS), {})
test('FT26', 'validateFilters data inicial depois da final',
  Object.keys(validateFilters({ ...NO_FILTERS, startDate: '2026-10-20', endDate: '2026-10-10' })), ['date'])
test('FT27', 'validateFilters mínima maior que máxima',
  Object.keys(validateFilters({ ...NO_FILTERS, minRate: '6', maxRate: '5' })), ['rate'])
test('FT28', 'validateFilters cotação não numérica',
  Object.keys(validateFilters({ ...NO_FILTERS, minRate: 'abc' })), ['minRate'])

// csv.js
const csv = buildCsv(ROWS.slice(0, 2)).split('\n')
test('FT29', 'buildCsv gera cabeçalho com ;', csv[0], 'Data;Moeda de origem;Moeda de destino;Cotação')
test('FT30', 'buildCsv gera uma linha por registro', csv.length, 3)
test('FT31', 'buildCsv formata data e cotação no padrão BR', csv[1], '13/10/2026;USD;BRL;5,0017')
test('FT32', 'buildFileName usa par e datas dos registros',
  buildFileName('USD', 'BRL', sortRates(ROWS, { field: 'date', direction: 'desc' })),
  'cotacoes_USD-BRL_2026-10-13_a_2026-10-16.csv')

console.log(`\n${passed} passaram, ${failed} falharam`)
if (failed > 0) process.exit(1)
