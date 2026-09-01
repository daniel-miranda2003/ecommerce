import { getLocale } from "@lib/data/locale-actions"
import { LocaleCode } from "./translations"
import { translate, TranslateVars } from "./translate"

export type TFunction = (key: string, vars?: TranslateVars) => string

export async function getT(): Promise<TFunction> {
  const locale = (await getLocale()) as LocaleCode | null
  return (key: string, vars?: TranslateVars) =>
    translate(locale ?? "pt", key, vars)
}
