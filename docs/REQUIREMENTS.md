# Requisitos — Currency Exchange App

> Documento de levantamento de requisitos do Projeto 01.
> Versão 2 (03/11/2026): inclui idioma, modo escuro, estatísticas do período e pares favoritos.

---

## 1. Contexto

Uma empresa de tecnologia financeira percebeu que seus usuários consultam vários sites para ver taxas de câmbio, fazem conversões manualmente e copiam os dados para planilhas. Esse processo é lento, sujeito a erros e não permite analisar o comportamento das moedas ao longo do tempo.

A proposta é centralizar essas tarefas em uma **Single Page Application (SPA) em React**, consumindo dados da **API Frankfurter**.

## 2. Público-alvo

- Pessoas que viajam ou fazem compras internacionais e precisam converter valores rapidamente.
- Profissionais de áreas financeiras, comércio exterior e e-commerce que acompanham a variação cambial.
- Estudantes e analistas que precisam de dados históricos de câmbio para estudos ou relatórios.

## 3. Objetivo

Permitir que o usuário converta valores entre duas moedas, consulte a taxa e a data da cotação, analise o histórico do par de moedas em gráfico e tabela, filtre e ordene os registros e exporte os dados filtrados em CSV, tudo em uma única tela, sem cadastro.

## 4. Escopo

### 4.1 Dentro do escopo

- Conversor de moedas.
- Histórico do par de moedas com gráfico.
- Tabela de cotações com filtros e ordenação.
- Exportação dos registros filtrados em CSV.
- Estados de carregamento, erro e ausência de dados.
- Layout responsivo (desktop e celular).

### 4.2 Fora do escopo

- Autenticação e cadastro de usuários.
- Back-end próprio e banco de dados.
- Pagamentos, compra ou venda real de moedas.

---

## 5. Requisitos funcionais

### Conversor

| ID | Requisito |
| --- | --- |
| RF01 | O sistema deve carregar a lista de moedas disponíveis a partir da API. |
| RF02 | O usuário deve poder selecionar a moeda de origem. |
| RF03 | O usuário deve poder selecionar a moeda de destino. |
| RF04 | O usuário deve poder informar o valor a ser convertido. |
| RF05 | O sistema deve exibir o valor convertido. |
| RF06 | O sistema deve exibir a taxa utilizada na conversão. |
| RF07 | O sistema deve exibir a data efetiva da cotação. |
| RF08 | O usuário deve poder inverter as moedas de origem e destino com um clique. |
| RF09 | O sistema deve validar o valor informado e exibir mensagem quando ele for inválido. |

### Histórico e gráfico

| ID | Requisito |
| --- | --- |
| RF10 | O usuário deve poder escolher o período de análise: 7 dias, 15 dias, 30 dias, 3 meses, 6 meses, 1 ano, 5 anos ou 10 anos. |
| RF11 | O sistema deve buscar na API as cotações do par selecionado no período escolhido. |
| RF12 | O sistema deve exibir o histórico em um gráfico de linha (data × cotação). |
| RF13 | O gráfico deve ser atualizado sempre que o par de moedas ou o período mudar. |

### Tabela

| ID | Requisito |
| --- | --- |
| RF14 | O sistema deve exibir uma tabela com as colunas: data, moeda de origem, moeda de destino e cotação. |
| RF15 | O usuário deve poder filtrar os registros por intervalo de datas (data inicial e data final). |
| RF16 | O usuário deve poder filtrar os registros por cotação mínima e máxima. |
| RF17 | Os filtros devem poder ser combinados entre si. |
| RF18 | O usuário deve poder limpar todos os filtros com uma única ação. |
| RF19 | O usuário deve poder ordenar a tabela por data (crescente/decrescente). |
| RF20 | O usuário deve poder ordenar a tabela por cotação (crescente/decrescente). |
| RF21 | O sistema deve exibir a quantidade de registros encontrados após os filtros. |

### Exportação

| ID | Requisito |
| --- | --- |
| RF22 | O usuário deve poder exportar em CSV os registros resultantes dos filtros. |
| RF23 | O arquivo CSV deve conter uma linha de cabeçalho. |
| RF24 | O arquivo deve ser gerado no próprio navegador, sem back-end. |
| RF25 | O sistema deve impedir a exportação quando não houver registros. |

### Estados da interface

| ID | Requisito |
| --- | --- |
| RF26 | O sistema deve exibir indicador de carregamento durante as consultas à API. |
| RF27 | O sistema deve exibir mensagem amigável quando a API falhar. |
| RF28 | O sistema deve exibir mensagem quando não houver dados para o período ou filtros escolhidos. |

### Personalização (versão 2)

| ID | Requisito |
| --- | --- |
| RF29 | O usuário deve poder escolher o idioma da interface: português, inglês ou espanhol. |
| RF30 | Números e datas devem ser exibidos no formato do idioma escolhido. |
| RF31 | Os nomes das moedas devem aparecer no idioma escolhido. |
| RF32 | O usuário deve poder alternar entre modo claro e modo escuro. |

### Estatísticas do período (versão 2)

| ID | Requisito |
| --- | --- |
| RF33 | O sistema deve exibir a cotação mínima, a máxima (com as datas) e a média do período selecionado. |
| RF34 | O sistema deve exibir a variação percentual entre a primeira e a última cotação do período. |

### Pares favoritos (versão 2)

| ID | Requisito |
| --- | --- |
| RF35 | O usuário deve poder salvar o par de moedas atual como favorito. |
| RF36 | O usuário deve poder selecionar um par favorito com um clique. |
| RF37 | O usuário deve poder remover um par dos favoritos. |

---

## 6. Requisitos não funcionais

| ID | Requisito |
| --- | --- |
| RNF01 | A aplicação deve ser uma SPA construída com React (componentes funcionais) e Vite. |
| RNF02 | Os estilos devem ser organizados com CSS Modules. |
| RNF03 | O consumo da API deve usar `fetch` com `async/await`. |
| RNF04 | A lógica de consulta à API deve ficar isolada em `services/` e em hooks customizados (`hooks/`). |
| RNF05 | A interface deve ser responsiva e utilizável em telas a partir de 360 px de largura. |
| RNF06 | A aplicação não deve exigir chave de API nem cadastro. |
| RNF07 | O código deve ser versionado com Git, com commits pequenos e semânticos, e publicado em repositório público no GitHub. |
| RNF08 | O projeto deve poder ser instalado e executado seguindo apenas as instruções do README. |
| RNF09 | Os valores e datas devem seguir o formato do idioma escolhido (ex.: `1.234,56` e `20/10/2026` em português; `1,234.56` e `10/20/2026` em inglês). |
| RNF10 | O idioma, o tema e os favoritos devem ser lembrados entre visitas, no próprio navegador (`localStorage`). |

---

## 7. Regras de negócio

| ID | Regra |
| --- | --- |
| RN01 | A conversão é calculada pela aplicação: **valor convertido = valor informado × taxa**. A API fornece apenas a taxa. |
| RN02 | O valor informado deve ser numérico e maior que zero. Campo vazio, zero, negativo ou texto não numérico é inválido. |
| RN03 | O valor aceita vírgula ou ponto como separador decimal. |
| RN04 | Moeda de origem e moeda de destino devem ser diferentes. |
| RN05 | A data exibida no conversor é a **data retornada pela API**, que pode ser diferente da data da consulta (ex.: fins de semana e feriados em que o provedor não publica cotação). |
| RN06 | O valor convertido é exibido com 2 casas decimais; a taxa, com 4 casas decimais. |
| RN07 | O período do histórico é calculado a partir da data atual: data final = hoje; data inicial = hoje − período escolhido. |
| RN08 | O histórico mostra apenas as datas que a API retornou. Datas sem cotação não são preenchidas nem estimadas. |
| RN09 | Ao inverter as moedas, o valor informado é mantido e a conversão e o histórico são atualizados. |
| RN10 | No filtro de datas, a data inicial não pode ser posterior à data final. |
| RN11 | No filtro de cotação, o valor mínimo não pode ser maior que o máximo. |
| RN12 | Filtros combinados funcionam como "E": o registro só aparece se atender a todos os filtros preenchidos. Filtros vazios são ignorados. |
| RN13 | A ordenação padrão da tabela é por data, da mais recente para a mais antiga. |
| RN14 | O CSV contém exatamente os registros visíveis após filtros e ordenação. |
| RN15 | O CSV usa `;` como separador em português e espanhol (compatível com o Excel nesses idiomas) e `,` em inglês. As cotações vão sem separador de milhar. |
| RN16 | O nome do arquivo segue o padrão `cotacoes_ORIGEM-DESTINO_DATAINICIAL_a_DATAFINAL.csv` (ex.: `cotacoes_USD-BRL_2026-10-13_a_2026-10-20.csv`), traduzido conforme o idioma (`exchange-rates_..._to_...` em inglês, `cotizaciones_..._a_...` em espanhol). |
| RN17 | Ao trocar o par de moedas ou o período, os filtros da tabela são limpos. |
| RN18 | No primeiro acesso, o idioma segue o do navegador (se for português, inglês ou espanhol); nos outros casos, português. |
| RN19 | No primeiro acesso, o tema segue a preferência do sistema operacional. |
| RN20 | As estatísticas usam todo o histórico do período, sem os filtros da tabela. A variação é `(última − primeira) ÷ primeira × 100`. |
| RN21 | Um par de moedas aparece no máximo uma vez na lista de favoritos. |

---

## 8. Critérios de aceite

### Conversor

- **Dado** que escolhi USD → BRL e digitei `100`, **quando** a cotação carregar, **então** vejo o valor convertido, a taxa usada e a data da cotação.
- **Dado** que escolhi USD → BRL, **quando** clico em inverter, **então** a origem passa a ser BRL, o destino passa a ser USD e o resultado é recalculado.
- **Dado** que digitei `-5`, `0`, `abc` ou deixei o campo vazio, **então** vejo uma mensagem de valor inválido e nenhuma conversão é exibida.
- **Dado** que digitei `10,50`, **então** o valor é aceito e convertido normalmente.

### Histórico e gráfico

- **Dado** um par selecionado, **quando** escolho cada um dos 8 períodos, **então** o gráfico e a tabela mostram dados reais daquele intervalo.
- **Dado** que o gráfico está exibido, **quando** troco uma das moedas, **então** o gráfico é atualizado para o novo par.
- **Enquanto** os dados carregam, **então** vejo um indicador de carregamento.
- **Se** a API falhar, **então** vejo uma mensagem de erro e a aplicação continua funcionando.

### Tabela

- **Dado** o histórico carregado, **quando** preencho data inicial e final, **então** só vejo registros dentro do intervalo e o contador é atualizado.
- **Dado** o histórico carregado, **quando** preencho cotação mínima e máxima, **então** só vejo registros dentro da faixa.
- **Quando** combino filtro de data e de cotação, **então** só vejo registros que atendem aos dois.
- **Quando** clico em limpar filtros, **então** todos os registros voltam a aparecer.
- **Quando** clico no cabeçalho de data ou de cotação, **então** a ordenação alterna entre crescente e decrescente.
- **Se** nenhum registro atender aos filtros, **então** vejo a mensagem "Nenhum registro encontrado".

### Exportação CSV

- **Dado** que há registros filtrados, **quando** clico em exportar, **então** é baixado um arquivo CSV com cabeçalho, apenas com os registros filtrados e com nome no padrão da RN16.
- **Dado** que não há registros, **então** o botão de exportar fica desabilitado ou exibe aviso, e nenhum arquivo é gerado.

### Responsividade

- **Dado** que acesso pelo celular (360 px), **então** todos os elementos ficam visíveis e utilizáveis sem rolagem horizontal.

### Personalização, estatísticas e favoritos (versão 2)

- **Quando** escolho "English" no seletor de idioma, **então** todos os textos, números, datas, nomes de moedas e o CSV passam para o inglês.
- **Quando** recarrego a página, **então** o idioma, o tema e os favoritos continuam como deixei.
- **Quando** clico no botão de tema, **então** a página inteira, incluindo o gráfico, alterna entre claro e escuro.
- **Dado** um período carregado, **então** vejo a mínima e a máxima com as datas, a média e a variação com seta e cor (alta ou queda).
- **Quando** clico na ☆, **então** o par atual aparece nos favoritos e a estrela fica preenchida.
- **Quando** clico num favorito, **então** o conversor, o gráfico e a tabela passam para aquele par.
- **Quando** clico no × de um favorito, **então** ele sai da lista.
