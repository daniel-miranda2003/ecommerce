import { getT } from "@lib/i18n/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const t = await getT()
  return (
    <div className="w-full bg-paper relative small:min-h-screen">
      <div className="h-16 bg-paper border-b border-line">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi text-ink-soft flex items-center gap-x-2 uppercase flex-1 basis-0"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block eyebrow text-ink-muted hover:text-ink">
              {t("checkoutLayout.backToCart")}
            </span>
            <span className="mt-px block small:hidden eyebrow text-ink-muted hover:text-ink">
              {t("checkoutLayout.back")}
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="masthead text-[20px] leading-none text-ink hover:text-ink-soft transition-colors duration-200"
            data-testid="store-link"
          >
            {t("brand.name")}
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">{children}</div>
      <div className="py-10 w-full flex items-center justify-center">
        <p className="eyebrow text-ink-faint">
          © {new Date().getFullYear()} {t("brand.name")}
        </p>
      </div>
    </div>
  )
}
