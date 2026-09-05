import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

import { cursive, display, sans } from "@lib/fonts"
import { getLocale } from "@lib/data/locale-actions"
import { I18nProvider } from "@lib/i18n/provider"
import { isSupportedLocale } from "@lib/i18n/translate"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const locale = isSupportedLocale(await getLocale())

  return (
    <html
      lang={locale}
      data-mode="light"
      className={`${sans.variable} ${display.variable} ${cursive.variable}`}
    >
      <body>
        <I18nProvider locale={locale}>
          <main className="relative">{props.children}</main>
        </I18nProvider>
      </body>
    </html>
  )
}