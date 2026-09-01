import { DEFAULT_LOCALE, LocaleCode, messages, Messages } from "./translations"

export type TranslateVars = Record<string, string | number>

export function translate(
  locale: LocaleCode,
  key: string,
  vars?: TranslateVars
): string {
  const table: Messages = messages[locale] || messages[DEFAULT_LOCALE]
  let text = table[key] ?? messages[DEFAULT_LOCALE][key] ?? key

  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.split(`{${k}}`).join(String(v))
    }
  }

  return text
}

export function isSupportedLocale(
  value: string | null | undefined
): LocaleCode {
  if (value && value in messages) {
    return value as LocaleCode
  }
  return DEFAULT_LOCALE
}
