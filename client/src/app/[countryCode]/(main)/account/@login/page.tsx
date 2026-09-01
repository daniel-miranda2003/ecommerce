import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"
import { getLocale } from "@lib/data/locale-actions"
import { isSupportedLocale, translate } from "@lib/i18n/translate"

export async function generateMetadata(): Promise<Metadata> {
  const locale = isSupportedLocale(await getLocale())

  return {
    title: translate(locale, "metadata.signIn"),
    description: translate(locale, "metadata.signInDescription"),
  }
}

export default function Login() {
  return <LoginTemplate />
}
