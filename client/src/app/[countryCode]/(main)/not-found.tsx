import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getLocale } from "@lib/data/locale-actions"
import { getT } from "@lib/i18n/server"
import { isSupportedLocale, translate } from "@lib/i18n/translate"
import { ArrowRightMini } from "@medusajs/icons"

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
    <div className="relative min-h-[82vh] w-full flex flex-col items-center justify-center overflow-hidden bg-paper px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[36rem] w-[36rem] rounded-full opacity-[0.035] blur-[150px] bg-[#D9B98C] animate-drift"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[26vw] small:text-[18rem] font-normal leading-none text-ink/[0.035] select-none"
      >
        404
      </span>

      <div className="relative z-10 max-w-xl flex flex-col items-center text-center animate-reveal">
        <p className="eyebrow mb-4">{t("notFound.eyebrow")}</p>
        <h1 className="font-display text-4xl small:text-6xl text-ink font-normal tracking-[-0.02em] leading-[1.05] mb-4">
          {t("notFound.title")}
        </h1>
        <p className="text-sm small:text-base text-ink-muted leading-[1.7] max-w-md mb-8">
          {t("notFound.message")}
        </p>
        <div className="flex flex-col small:flex-row items-center gap-4 w-full justify-center mb-12">
          <LocalizedClientLink
            href="/store"
            className="btn-press inline-flex h-12 w-full small:w-auto items-center justify-center rounded-base bg-ink px-8 text-sm font-medium tracking-[0.04em] text-white transition-colors duration-200 hover:bg-ink-soft"
            data-testid="explore-store-button"
          >
            {t("notFound.exploreStore")}
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="btn-press inline-flex h-12 w-full small:w-auto items-center justify-center rounded-base border border-line bg-card px-7 text-sm font-medium tracking-[0.04em] text-ink transition-colors duration-200 hover:border-ink"
            data-testid="go-home-button"
          >
            {t("notFound.goHome")}
          </LocalizedClientLink>
        </div>
        <div className="w-full max-w-lg border-t border-line pt-8">
          <p className="eyebrow mb-4 text-center">{t("notFound.quickLinks")}</p>
          <div className="grid grid-cols-3 gap-3 w-full text-xs text-ink-muted">
            <LocalizedClientLink
              href="/store"
              className="p-3 border border-line bg-card rounded-base hover:border-ink hover:text-ink transition-all flex items-center justify-between"
            >
              <span>{t("nav.store")}</span>
              <ArrowRightMini className="w-4 h-4" />
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/account"
              className="p-3 border border-line bg-card rounded-base hover:border-ink hover:text-ink transition-all flex items-center justify-between"
            >
              <span>{t("nav.account")}</span>
              <ArrowRightMini className="w-4 h-4" />
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/cart"
              className="p-3 border border-line bg-card rounded-base hover:border-ink hover:text-ink transition-all flex items-center justify-between"
            >
              <span>{t("nav.cart")}</span>
              <ArrowRightMini className="w-4 h-4" />
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}
