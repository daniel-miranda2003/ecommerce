import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"

import ServicesBanner from "@modules/home/components/services-banner"
import LaunchSection from "@modules/home/components/launch-section"
import BestSellersSection from "@modules/home/components/best-sellers-section"
import ReviewsSection from "@modules/home/components/reviews-section"
import { getRegion } from "@lib/data/regions"
import { getLocale } from "@lib/data/locale-actions"
import { isSupportedLocale, translate } from "@lib/i18n/translate"
import { getT } from "@lib/i18n/server"
import Reveal from "@modules/common/components/reveal"

export async function generateMetadata(): Promise<Metadata> {
  const locale = isSupportedLocale(await getLocale())

  return {
    title: translate(locale, "metadata.home"),
    description: translate(locale, "metadata.homeDescription"),
  }
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const t = await getT()

  const { countryCode } = params

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  return (
    <>
      <Hero />
      <ServicesBanner />
      <LaunchSection region={region} />
      <BestSellersSection region={region} />
      <ReviewsSection />
      <div className="content-container py-16 small:py-28">
        <Reveal>
          <div className="grid gap-12 small:grid-cols-[1.1fr_1fr] small:items-center">
            <div>
              <p className="eyebrow mb-6">{t("home.issue.eyebrow")}</p>
              <h2 className="font-display text-[3rem] small:text-[4rem] leading-[0.96] tracking-[-0.03em] text-ink">
                {t("home.issue.title")}
              </h2>
            </div>
            <p className="text-base leading-[1.8] text-ink-muted max-w-lg">
              {t("home.issue.text")}
            </p>
          </div>
        </Reveal>
        <div className="mt-16 small:mt-24 w-full border-t border-line" />
      </div>
    </>
  )
}
