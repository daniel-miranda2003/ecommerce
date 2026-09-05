import { Metadata } from "next"

import InteractiveLink from "@modules/common/components/interactive-link"
import { getT } from "@lib/i18n/server"
import { getLocale } from "@lib/data/locale-actions"
import { isSupportedLocale, translate } from "@lib/i18n/translate"

export async function generateMetadata(): Promise<Metadata> {
  const locale = isSupportedLocale(await getLocale())

  return {
    title: "404",
    description: translate(locale, "error.somethingWentWrong"),
  }
}

export default async function NotFound() {
  const t = await getT()

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ink-soft">{t("notFound.title")}</h1>
      <p className="text-small-regular text-ink-soft">{t("notFound.cartTitle")}</p>
      <InteractiveLink href="/">{t("notFound.goHome")}</InteractiveLink>
    </div>
  )
}