import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { getT } from "@lib/i18n/server"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import AnnouncementBar from "@modules/layout/components/announcement-bar"
import StickyNavWrapper from "@modules/layout/components/sticky-nav-wrapper"

const categoryLinks = [
  { label: "NOVIDADES DA SEMANA", handle: "novidades" },
  { label: "CONJUNTOS", handle: "conjuntos" },
  { label: "MACACÕES", handle: "macacoes" },
  { label: "VESTIDOS", handle: "vestidos" },
  { label: "CALÇAS", handle: "calcas" },
  { label: "CROPPED", handle: "cropped" },
  { label: "PLUS SIZE", handle: "plus-size" },
]

export default async function Nav() {
  const t = await getT()
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <>
      <AnnouncementBar />
      <StickyNavWrapper>
        <header className="relative h-[86px] group-[.is-scrolled]/header:h-[60px] transition-all duration-300 mx-auto border-b border-line bg-white">
        <nav className="content-container flex items-center w-full h-full">
          
          {/* Mobile Side Menu & Desktop scrolled Side Menu */}
          <div className="flex-1 basis-0 h-full flex items-center large:hidden large:group-[.is-scrolled]/header:flex transition-all duration-300">
            <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
          </div>

          {/* Left: Logo */}
          <div className="flex items-center h-full large:group-[.is-scrolled]/header:flex-1 large:group-[.is-scrolled]/header:justify-center transition-all duration-300">
            <LocalizedClientLink
              href="/"
              className="font-display text-[38px] group-[.is-scrolled]/header:text-[28px] tracking-tight leading-none text-ink hover:text-ink-soft transition-all duration-300"
              data-testid="nav-store-link"
            >
              CARVAN
            </LocalizedClientLink>
          </div>

          {/* Center-Left: Categories (Desktop only) */}
          <div className="hidden large:flex items-center h-full ml-16 group-[.is-scrolled]/header:!hidden transition-all duration-300">
            <ul className="flex items-center gap-7">
              {categoryLinks.map((cat) => (
                <li key={cat.handle} className="h-full flex items-center">
                  <LocalizedClientLink
                    href={`/store?category=${cat.handle}`}
                    className="group/cat relative inline-flex items-center text-[12px] font-medium tracking-[0.05em] text-ink-muted hover:text-ink transition-colors duration-200"
                  >
                    {cat.label}
                    {/* Animated underline */}
                    <span className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] bg-ink scale-x-0 group-hover/cat:scale-x-100 transition-transform duration-300 ease-out origin-left" />
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Account & Cart */}
          <div className="flex items-center gap-x-5 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-5 h-full">
              <LocalizedClientLink
                className="text-ink-muted hover:text-ink transition-colors duration-200 p-1 flex items-center"
                href="/account"
                data-testid="nav-account-link"
                aria-label={t("nav.account")}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="text-[11px] font-medium tracking-[0.05em] uppercase text-ink-muted hover:text-ink transition-colors duration-200"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  {t("nav.cart", { totalItems: 0 })}
                </LocalizedClientLink>
              }
            >
              <div className="text-[11px] font-medium tracking-[0.05em] uppercase text-ink-muted [&_a]:!text-[11px] [&_a]:!font-medium [&_a]:!tracking-[0.05em] [&_a]:!uppercase [&_a]:!text-ink-muted hover:[&_a]:!text-ink">
                <CartButton />
              </div>
            </Suspense>
          </div>
        </nav>
      </header>
    </StickyNavWrapper>
    </>
  )
}