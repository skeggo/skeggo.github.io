import { createContext, useContext, useState, type ReactNode } from 'react'
import { translations, type Lang, type Translations } from '../i18n/translations'

interface LanguageContextType {
  lang: Lang
  t: Translations
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextType>(null!)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  return (
    <LanguageContext.Provider
      value={{
        lang,
        t: translations[lang],
        toggle: () => setLang(l => (l === 'en' ? 'fr' : 'en')),
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useTranslation = () => useContext(LanguageContext)
