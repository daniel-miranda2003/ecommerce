import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { getT } from "@lib/i18n/server"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const t = await getT()
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-[68px] mx-auto border-b border-line bg-paper">
        <nav className="content-container text-small-regular flex items-center justify-between w-full h-full">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full flex items-center">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="masthead text-[22px] leading-none hover:text-ink-soft transition-colors duration-200"
              data-testid="nav-store-link"
            >
              {t("brand.name")}
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-5 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-5 h-full">
              <LocalizedClientLink
                className="eyebrow text-ink-muted hover:text-ink transition-colors duration-200"
                href="/store"
                data-testid="nav-store-link-all"
              >
                {t("nav.store")}
              </LocalizedClientLink>
              <LocalizedClientLink
                className="eyebrow text-ink-muted hover:text-ink transition-colors duration-200"
                href="/account"
                data-testid="nav-account-link"
              >
                {t("nav.account")}
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="eyebrow text-ink-muted hover:text-ink transition-colors duration-200"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  {t("nav.cart", { totalItems: 0 })}
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}