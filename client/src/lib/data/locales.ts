"use server"

import { SUPPORTED_LOCALES } from "@lib/i18n/translations"

export type Locale = {
  code: string
  name: string
}

/**
 * Returns the languages supported by the storefront (pt/es/en).
 */
export const listLocales = async (): Promise<Locale[]> => {
  return SUPPORTED_LOCALES.map((l) => ({ code: l.code, name: l.name }))
}
