// A API devolve os nomes das moedas em inglês. O Intl.DisplayNames,
// nativo do JavaScript, traduz o código ISO (ex.: 'BRL') para o idioma escolhido.
export function localizeCurrencyNames(currencies, locale) {
  const displayNames = new Intl.DisplayNames([locale], { type: 'currency' })

  return currencies.map((currency) => {
    const translated = displayNames.of(currency.iso_code)
    const name = translated && translated !== currency.iso_code ? translated : currency.name

    return { ...currency, name }
  })
}
