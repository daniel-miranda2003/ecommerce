"use client"

import { createContext, useContext, useMemo, type ReactNode } from "react"
import { LocaleCode } from "./translations"
import { translate, TranslateVars } from "./translate"

type I18nContextValue = {
  locale: LocaleCode
  t: (key: string, vars?: TranslateVars) => string
}

const I18nContext = createContext<I18nContextValue>({
  locale: "pt",
  t: (key) => key,
})

type I18nProviderProps = {
  locale: LocaleCode | string
  children: ReactNode
}

export function I18nProvider({ locale, children }: I18nProviderProps) {
  const value = useMemo<I18nContextValue>(() => {
    const normalized =
      locale === "pt" || locale === "es" || locale === "en" ? locale : "pt"
    return {
      locale: normalized,
      t: (key, vars) => translate(normalized, key, vars),
    }
  }, [locale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  return useContext(I18nContext)
}
