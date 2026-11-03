# Testes das funções JavaScript

> Validação das funções utilitárias da pasta `src/utils/`. São funções puras: recebem dados e devolvem um resultado, sem depender do React nem da API. Por isso podem ser testadas isoladamente com Node.js.

## 1. Como rodar

```bash
npm run test:functions
```

O script fica em [`scripts/test-functions.js`](../scripts/test-functions.js). Ele não usa nenhuma biblioteca de testes: cada caso compara o resultado da função com o valor esperado e imprime `PASS` ou `FAIL`. No final, mostra o total e encerra com erro se algum teste falhar.

Os testes de data usam uma data fixa (27/10/2026), para que o resultado seja sempre o mesmo, independente do dia em que forem executados.

## 2. Resultado

**32 testes — 32 passaram, 0 falharam** (Node.js v22, executado em 27/10/2026).

Os testes também foram executados com o fuso horário em UTC, além do horário de Brasília, para garantir que as funções de data não mudam de dia por causa do fuso.

## 3. Casos de teste

### `conversion.js`

| # | Função | Entrada | Esperado | Regra | Resultado |
| --- | --- | --- | --- | --- | --- |
| FT01 | `parseAmount` | `'100'` | `100` | RN02 | PASS |
| FT02 | `parseAmount` | `'10,50'` | `10.5` | RN03 | PASS |
| FT03 | `parseAmount` | `'10.50'` | `10.5` | RN03 | PASS |
| FT04 | `parseAmount` | `'  25 '` | `25` | RN02 | PASS |
| FT05 | `parseAmount` | `''` | `null` (inválido) | RN02 | PASS |
| FT06 | `parseAmount` | `'0'` | `null` (inválido) | RN02 | PASS |
| FT07 | `parseAmount` | `'-5'` | `null` (inválido) | RN02 | PASS |
| FT08 | `parseAmount` | `'abc'` | `null` (inválido) | RN02 | PASS |
| FT09 | `convertAmount` | `100`, taxa `5.0698` | `'506,98'` (formatado) | RN01 | PASS |

### `format.js`

| # | Função | Entrada | Esperado | Regra | Resultado |
| --- | --- | --- | --- | --- | --- |
| FT10 | `formatCurrency` | `1234.5` | `'1.234,50'` | RN06, RNF09 | PASS |
| FT11 | `formatRate` | `5.0698` | `'5,0698'` | RN06 | PASS |
| FT12 | `formatDate` | `'2026-10-19'` | `'19/10/2026'` | RNF09 | PASS |

### `dates.js`

| # | Função | Entrada | Esperado | Regra | Resultado |
| --- | --- | --- | --- | --- | --- |
| FT13 | `toISODate` | 27/10/2026 | `'2026-10-27'` | — | PASS |
| FT14 | `getDateRange` | 7 dias | `2026-10-20` a `2026-10-27` | RN07 | PASS |
| FT15 | `getDateRange` | 3 meses | `2026-07-27` a `2026-10-27` | RN07 | PASS |
| FT16 | `getDateRange` | 10 anos | `2016-10-27` a `2026-10-27` | RN07 | PASS |

### `filters.js`

Dados de teste: 4 cotações USD → BRL de 13/10 a 16/10/2026, no mesmo formato retornado pela API.

| # | Função | Entrada | Esperado | Regra | Resultado |
| --- | --- | --- | --- | --- | --- |
| FT17 | `filterRates` | sem filtros | 4 registros | RN12 | PASS |
| FT18 | `filterRates` | datas 14/10 a 15/10 | 14/10 e 15/10 | RF15 | PASS |
| FT19 | `filterRates` | mínima `'5,04'` | 15/10 e 16/10 | RF16, RN03 | PASS |
| FT20 | `filterRates` | data inicial 14/10 + máxima `5.05` | 14/10 e 15/10 | RF17, RN12 | PASS |
| FT21 | `filterRates` | mínima `10` | array vazio | RF28 | PASS |
| FT22 | `sortRates` | data, decrescente | 16 → 13/10 | RF19, RN13 | PASS |
| FT23 | `sortRates` | cotação, crescente | menor → maior | RF20 | PASS |
| FT24 | `sortRates` | — | array original não é alterado | — | PASS |
| FT25 | `validateFilters` | filtros vazios | sem erros | — | PASS |
| FT26 | `validateFilters` | inicial 20/10, final 10/10 | erro `date` | RN10 | PASS |
| FT27 | `validateFilters` | mínima 6, máxima 5 | erro `rate` | RN11 | PASS |
| FT28 | `validateFilters` | mínima `'abc'` | erro `minRate` | — | PASS |

### `csv.js`

| # | Função | Entrada | Esperado | Regra | Resultado |
| --- | --- | --- | --- | --- | --- |
| FT29 | `buildCsv` | 2 registros | cabeçalho `Data;Moeda de origem;Moeda de destino;Cotação` | RF23, RN15 | PASS |
| FT30 | `buildCsv` | 2 registros | 3 linhas (cabeçalho + 2) | RN14 | PASS |
| FT31 | `buildCsv` | 13/10, rate `5.0017` | `13/10/2026;USD;BRL;5,0017` | RN15 | PASS |
| FT32 | `buildFileName` | USD, BRL, registros ordenados de forma decrescente | `cotacoes_USD-BRL_2026-10-13_a_2026-10-16.csv` | RN16 | PASS |

> A função `downloadCsv` não entra neste script porque depende do navegador (`Blob`, `document`, `URL.createObjectURL`). Ela foi testada manualmente na aplicação (seção 5).

## 4. Descobertas durante os testes

- **Ponto flutuante (FT09):** na primeira execução, o teste comparava `convertAmount(100, 5.0698)` com `506.98` e falhou, porque o JavaScript calcula `506.97999999999996`. A função está correta: números decimais não têm representação exata em binário. Como a interface sempre exibe o valor com `formatCurrency` (2 casas), o teste passou a comparar o valor formatado, que é o que o usuário vê.
- **Fuso horário:** `toISODate` e `formatDate` não usam `toISOString()` nem `new Date('AAAA-MM-DD')`, que trabalham em UTC. No horário de Brasília, isso faria datas aparecerem com um dia de diferença. Os testes rodaram em dois fusos com o mesmo resultado.
- **Imutabilidade (FT24):** `sortRates` cria uma cópia com `[...rows]` antes de ordenar, porque o `sort` altera o array original. O teste confirma que os dados de entrada continuam iguais.

## 5. Testes manuais na aplicação

> Marque conforme for validando no navegador.

| Teste | Resultado |
| --- | --- |
| Conversão entre duas moedas | _preencher_ |
| Inversão das moedas | _preencher_ |
| Atualização dos dados ao alterar o par | _preencher_ |
| Todos os 8 períodos históricos | _preencher_ |
| Gráfico com dados reais | _preencher_ |
| Tabela com dados reais | _preencher_ |
| Filtros individuais e combinados | _preencher_ |
| Ordenação por data e por cotação | _preencher_ |
| Exportação CSV (abre corretamente no Excel) | _preencher_ |
| Exportação bloqueada sem registros | _preencher_ |
| Entradas inválidas no conversor e nos filtros | _preencher_ |
| Falha na API (DevTools → Network → Offline) | _preencher_ |
| Estados de loading | _preencher_ |
| Responsividade em celular (DevTools → modo dispositivo, 360 px) | _preencher_ |
