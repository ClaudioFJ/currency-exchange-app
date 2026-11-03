# Uso de IA no projeto

> Registro de como a inteligência artificial foi usada no desenvolvimento do Currency Exchange App.

## Ferramenta utilizada

**Claude (Anthropic)**, usado como assistente durante todo o projeto, de 13/10/2026 a 27/10/2026.

## Como a IA foi usada

| Etapa | Uso da IA | O que eu fiz |
| --- | --- | --- |
| Planejamento | Montar o roteiro de etapas a partir do briefing e consultar a documentação da API Frankfurter (v2). | Defini a ordem de trabalho seguindo as aulas. |
| Requisitos | Gerar o rascunho do `REQUIREMENTS.md` (requisitos, regras de negócio e critérios de aceite). | _descrever o que revisou ou alterou_ |
| Setup | Orientação para instalar o Node.js, criar o projeto com Vite e configurar Git, GitHub e a branch `dev`. | Executei os comandos e resolvi os erros com ajuda (npm, upstream da branch). |
| Postman | Sugestão das requisições, dos testes automáticos e da estrutura do `API_TESTS.md`. | Montei a collection, rodei os testes e registrei os resultados reais. Corrigi o erro de URL (`get https:`). |
| Arquitetura | Proposta da árvore de componentes e de onde cada estado deve ficar (`COMPONENTS.md`). | _descrever o que revisou ou alterou_ |
| Código | Código dos componentes, hooks, serviço da API e funções utilitárias, entregue em etapas, com explicação de cada conceito. | Criei os arquivos, testei cada etapa no navegador, corrigi erros de nome de arquivo e fiz os commits. |
| Testes | Script de testes das funções (`npm run test:functions`) e o `FUNCTION_TESTS.md`. | Rodei os testes e validei a aplicação manualmente. |
| Documentação | Rascunho do `README.md` e deste documento. | Completei com nome, link do repositório e imagens. |

## Conceitos que aprendi com a ajuda da IA

- **Input controlado:** a diferença entre `defaultValue` e `value` + `onChange`, e por que o conversor não atualizava antes do `useState`.
- **Lifting state up:** por que o par de moedas e o período ficam no `App`, e os filtros no `DataSection`.
- **Função de limpeza do `useEffect`:** a variável `ignore` evita que uma resposta antiga da API sobrescreva a mais recente.
- **`key` para reiniciar estado:** trocar a `key` de um componente faz o React recriá-lo, o que limpa os filtros ao trocar o par ou o período.
- **Fuso horário:** `new Date('AAAA-MM-DD')` e `toISOString()` usam UTC e podem mostrar o dia errado no Brasil.
- **Imutabilidade:** copiar o array com `[...rows]` antes de usar `sort`.
- **Ponto flutuante:** `100 × 5.0698` dá `506.97999999999996` em JavaScript.
- **CSV para Excel:** separador `;` e o caractere BOM (`﻿`) para os acentos aparecerem corretamente.

## Validação

Todo o código sugerido foi colado, executado e testado por mim antes de cada commit. Os resultados dos testes da API e dos testes manuais registrados na documentação são os que obtive na minha máquina.

## Limitações percebidas

- _Exemplo: a IA não conseguiu abrir a página do Notion, então o conteúdo do briefing precisou ser colado no chat._
- _Acrescente outras situações em que a sugestão precisou ser corrigida ou adaptada._
