import { useEffect, useState } from 'react'
import { LanguageContext } from './LanguageContext'
import { LANGUAGES, DEFAULT_LANGUAGE } from './languages'
import { TRANSLATIONS } from './translations'
import { translate } from './translate'
import { readStorage, writeStorage } from '../utils/storage'

const STORAGE_KEY = 'language'

function getInitialLanguage() {
  const saved = readStorage(STORAGE_KEY)
  if (Object.hasOwn(LANGUAGES, saved)) return saved

  const browserLanguage = navigator.language.slice(0, 2)
  return Object.hasOwn(LANGUAGES, browserLanguage) ? browserLanguage : DEFAULT_LANGUAGE
}

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)
  const { locale, csvSeparator } = LANGUAGES[language]

  useEffect(() => {
    document.documentElement.lang = locale
    writeStorage(STORAGE_KEY, language)
  }, [language, locale])

  function t(key, params) {
    return translate(TRANSLATIONS[language], key, params)
  }

  const value = { language, setLanguage, locale, csvSeparator, t }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export default LanguageProvider
