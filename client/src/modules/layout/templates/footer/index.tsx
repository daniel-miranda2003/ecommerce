import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { getT } from "@lib/i18n/server"
import { Text, clx } from "@modules/common/components/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const t = await getT()
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="w-full bg-paper">
      <div className="border-t border-line bg-paper/50">
        <div className="content-container py-16 small:py-24">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h3 className="font-display text-3xl tracking-tight text-ink">
              {t("footer.newsletter.title")}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              {t("footer.newsletter.text")}
            </p>
            <form className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder={t("footer.newsletter.placeholder")}
                className="flex-1 rounded-base border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink/30"
                required
              />
              <button
                type="submit"
                className="btn-press rounded-base bg-ink px-8 py-3 text-sm font-medium uppercase tracking-[0.04em] text-white transition-colors hover:bg-ink-soft"
              >
                {t("footer.newsletter.subscribe")}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="content-container flex flex-col w-full">
          <div className="flex flex-col gap-y-12 xsmall:flex-row items-start justify-between py-16 small:py-20">
            <div className="shrink-0 max-w-[280px]">
              <LocalizedClientLink
                href="/"
                className="masthead text-[24px] leading-none text-ink hover:text-ink-soft transition-colors duration-200"
              >
                {t("brand.name")}
              </LocalizedClientLink>
              <p className="mt-6 text-sm leading-[1.8] text-ink-muted">
                {t("footer.tagline")}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <a
                  href="#"
                  className="text-ink hover:text-ink-muted transition-colors"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-ink hover:text-ink-muted transition-colors"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
            <div className="text-small-regular gap-10 md:gap-x-20 grid grid-cols-2 sm:grid-cols-3">
              {productCategories && productCategories?.length > 0 && (
                <div className="flex flex-col gap-y-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-ink">
                    {t("footer.categories")}
                  </span>
                  <ul
                    className="grid grid-cols-1 gap-3"
                    data-testid="footer-categories"
                  >
                    {productCategories?.slice(0, 6).map((c) => {
                      if (c.parent_category) {
                        return null
                      }

                      const children =
                        c.category_children?.map((child) => ({
                          name: child.name,
                          handle: child.handle,
                          id: child.id,
                        })) || null

                      return (
                        <li
                          className="flex flex-col gap-2 text-ink-muted text-[13.5px]"
                          key={c.id}
                        >
                          <LocalizedClientLink
                            className={clx(
                              "hover:text-ink transition-colors duration-200",
                              children && "font-medium text-ink-soft"
                            )}
                            href={`/categories/${c.handle}`}
                            data-testid="category-link"
                          >
                            {c.name}
                          </LocalizedClientLink>
                          {children && (
                            <ul className="grid grid-cols-1 ml-3 gap-2">
                              {children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ink transition-colors duration-200"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              {collections && collections.length > 0 && (
                <div className="flex flex-col gap-y-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-ink">
                    {t("footer.collections")}
                  </span>
                  <ul
                    className={clx(
                      "grid grid-cols-1 gap-3 text-ink-muted text-[13.5px]",
                      {
                        "grid-cols-2": (collections?.length || 0) > 3,
                      }
                    )}
                  >
                    {collections?.slice(0, 6).map((c) => (
                      <li key={c.id}>
                        <LocalizedClientLink
                          className="hover:text-ink transition-colors duration-200"
                          href={`/collections/${c.handle}`}
                        >
                          {c.title}
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col gap-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-ink">
                  {t("footer.service")}
                </span>
                <ul className="grid grid-cols-1 gap-y-3 text-ink-muted text-[13.5px]">
                  <li>
                    <a
                      href="mailto:hola@carvan.example"
                      className="hover:text-ink transition-colors duration-200"
                    >
                      {t("footer.contact")}
                    </a>
                  </li>
                  <li>
                    <LocalizedClientLink
                      href="/account"
                      className="hover:text-ink transition-colors duration-200"
                    >
                      {t("footer.account")}
                    </LocalizedClientLink>
                  </li>
                  <li>
                    <LocalizedClientLink
                      href="/store"
                      className="hover:text-ink transition-colors duration-200"
                    >
                      {t("footer.store")}
                    </LocalizedClientLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex w-full mb-8 justify-between items-center border-t border-line pt-8 text-ink-muted">
            <Text className="text-xs">
              {t("nav.footer.copyright", { year: new Date().getFullYear() })}
            </Text>
            <p className="text-xs uppercase tracking-widest">{t("footer.studios")}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
