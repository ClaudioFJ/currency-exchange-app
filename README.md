# Currency Exchange App

Single Page Application em React para **MoneyMap**, consumindo a [API Frankfurter](https://frankfurter.dev).

Projeto individual desenvolvido de forma incremental, aplicando os conteúdos das aulas: componentização, props, eventos, `useState`, lifting state up, `useEffect`, hooks customizados, consumo de API, manipulação de arrays e objetos, gráficos, filtros, ordenação e exportação CSV.


---

## Funcionalidades

**Conversor de moedas**
- Seleção da moeda de origem e de destino (lista carregada da API).
- Conversão calculada pela aplicação: `valor × taxa`.
- Exibição da taxa utilizada e da data efetiva da cotação.
- Botão para inverter as moedas.
- Validação do valor: aceita vírgula ou ponto; rejeita vazio, zero, negativo e texto.

**Histórico e gráfico**
- Períodos de 7 dias, 15 dias, 30 dias, 3 meses, 6 meses, 1 ano, 5 anos e 10 anos.
- Gráfico de linha atualizado ao trocar o par de moedas ou o período.
- Períodos longos agrupados por semana (5 anos) e por mês (10 anos).

**Tabela de dados**
- Colunas de data, moeda de origem, moeda de destino e cotação.
- Filtro por intervalo de datas e por cotação mínima e máxima, que podem ser combinados.
- Botão para limpar os filtros e contador de registros encontrados.
- Ordenação por data e por cotação, crescente ou decrescente.

**Exportação CSV**
- Exporta apenas os registros filtrados, na ordem exibida.
- Arquivo com cabeçalho e acentuação compatível com o Excel (separador `;` em português e espanhol, `,` em inglês).
- Nome identificável e traduzido: `cotacoes_USD-BRL_2026-09-27_a_2026-10-27.csv`.
- Botão desabilitado quando não há registros.

**Estatísticas do período**
- Cotação mínima e máxima (com as datas), média e variação % do período, com seta e cor de alta ou queda.

**Pares favoritos**
- Estrela para salvar o par atual e atalhos para trocar de par com um clique.
- Os favoritos ficam salvos no navegador.

**Idioma e tema**
- Interface em português, inglês e espanhol, com números, datas, nomes das moedas e CSV no formato de cada idioma.
- Modo claro e escuro. O idioma e o tema escolhidos são lembrados na próxima visita.

**Estados da interface**
- Mensagens de carregamento, erro da API e ausência de dados.
- Layout responsivo para desktop e celular.

---

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| React | Componentes funcionais e hooks |
| Vite | Ambiente de desenvolvimento e build |
| CSS Modules | Estilos isolados por componente |
| Recharts | Gráfico do histórico |
| Context API | Idioma compartilhado por toda a aplicação |
| Intl (JavaScript) | Formatação de números, datas e nomes de moedas por idioma |
| localStorage | Idioma, tema e favoritos salvos no navegador |
| Fetch API + async/await | Consumo da API Frankfurter |
| Postman | Investigação e testes dos endpoints |
| Git + GitHub | Versionamento |

---

## Como executar

**Pré-requisitos:** [Node.js](https://nodejs.org) 20.19+ ou 22.12+ (o npm já vem junto) e Git.

```bash
# 1. Clonar o repositório
git clone https://github.com/ClaudioFJ/currency-exchange-app.git
cd currency-exchange-app

# 2. Instalar as dependências
npm install

# 3. Rodar em modo de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador. A API Frankfurter é pública e não exige chave.

### Outros comandos

| Comando | Descrição |
| --- | --- |
| `npm run build` | Gera a versão de produção na pasta `dist/` |
| `npm run preview` | Serve localmente a versão de produção |
| `npm run test:functions` | Roda os testes das funções utilitárias |

---

## Arquitetura

```
src/
├── components/     Componentes React, cada um com seu .jsx e .module.css
├── hooks/          Hooks customizados (API, tema, idioma e favoritos)
├── i18n/           Idiomas, dicionário de traduções e Context
├── services/       Comunicação com a API Frankfurter
├── utils/          Funções puras: conversão, formatação, datas, filtros e CSV
├── constants/      URL da API, períodos e configurações
├── App.jsx         Componente raiz com os estados compartilhados
└── main.jsx        Ponto de entrada
docs/               Documentação do projeto
scripts/            Script de testes das funções
```

### Componentes

```
LanguageProvider
└── App
├── Header
│   ├── LanguageSelect
│   └── ThemeToggle
├── CurrencyConverter
│   ├── FavoriteButton
│   ├── FavoritesBar
│   ├── CurrencySelect (origem)
│   ├── SwapButton
│   ├── CurrencySelect (destino)
│   ├── AmountInput
│   └── ConversionResult
├── HistorySection
│   ├── PeriodSelector
│   ├── StatsCards
│   └── RateChart
└── DataSection
    ├── TableFilters
    ├── RatesTable
    └── ExportButton
```

`StatusMessage` é reutilizado nas três seções para loading, erro e ausência de dados.

### Fluxo de dados

- O **par de moedas**, o **valor** e o **período** ficam no `App` (*lifting state up*), porque o conversor, o gráfico e a tabela dependem deles.
- Os hooks `useCurrencies`, `useExchangeRate` e `useHistoricalRates` usam `useEffect` para buscar os dados sempre que o par ou o período mudam, e devolvem `{ dados, loading, error }`.
- O **idioma** fica num Context (`LanguageProvider`). Qualquer componente lê os textos com o hook `useLanguage`, sem precisar receber props.
- O **tema** e os **favoritos** também ficam no `App`, em hooks próprios (`useTheme` e `useFavorites`) que salvam a escolha no `localStorage`.
- **Filtros e ordenação** ficam no `DataSection`, o único que usa esses estados. A mesma lista filtrada alimenta a tabela, o contador e a exportação.
- O `DataSection` recebe uma `key` formada pelo par e pelo período; ao trocar qualquer um deles, o React recria o componente e os filtros são limpos.

Detalhes de cada componente em [`docs/COMPONENTS.md`](docs/COMPONENTS.md).

### Endpoints utilizados

| Endpoint | Uso |
| --- | --- |
| `GET /v2/currencies` | Lista de moedas |
| `GET /v2/rate/{origem}/{destino}` | Taxa atual do conversor |
| `GET /v2/rates?base=&quotes=&from=&to=&group=` | Histórico do par |

---

## Documentação

| Documento | Conteúdo |
| --- | --- |
| [REQUIREMENTS.md](docs/REQUIREMENTS.md) | Requisitos, regras de negócio e critérios de aceite |
| [COMPONENTS.md](docs/COMPONENTS.md) | Arquitetura e responsabilidade dos componentes |
| [API_TESTS.md](docs/API_TESTS.md) | Investigação e testes da API no Postman |
| [FUNCTION_TESTS.md](docs/FUNCTION_TESTS.md) | Testes das funções JavaScript |
| [AI_USAGE.md](docs/AI_USAGE.md) | Registro do uso de IA no projeto |
| [Collection do Postman](docs/postman/currency-exchange.postman_collection.json) | Requisições e testes exportados |

---

## Autor

Desenvolvido por **Claudio junior** como Projeto 01 da disciplina.
