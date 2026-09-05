import { Metadata } from "next"
import { Suspense } from "react"

import VerifyAccount from "@modules/account/components/verify-account"
import { getLocale } from "@lib/data/locale-actions"
import { getT } from "@lib/i18n/server"
import { isSupportedLocale, translate } from "@lib/i18n/translate"

export async function generateMetadata(): Promise<Metadata> {
  const locale = isSupportedLocale(await getLocale())

  return {
    title: translate(locale, "metadata.verifyEmail"),
    description: translate(locale, "metadata.verifyEmailDescription"),
  }
}

export default async function VerifyAccountPage() {
  const t = await getT()
  return (
    <div className="w-full flex justify-center px-8 py-12">
      <Suspense
        fallback={
          <p className="text-base-regular text-ink-soft">
            {t("account.verifyingEmail")}
          </p>
        }
      >
        <VerifyAccount />
      </Suspense>
    </div>
  )
}
