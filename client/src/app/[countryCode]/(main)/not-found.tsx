import { Metadata } from "next"

import InteractiveLink from "@modules/common/components/interactive-link"
import { getLocale } from "@lib/data/locale-actions"
import { getT } from "@lib/i18n/server"
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
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">{t("notFound.title")}</h1>
      <p className="text-small-regular text-ui-fg-base">
        {t("notFound.message")}
      </p>
      <InteractiveLink href="/">{t("notFound.goHome")}</InteractiveLink>
    </div>
  )
}
