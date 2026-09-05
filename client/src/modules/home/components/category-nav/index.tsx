import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getT } from "@lib/i18n/server"

const categoryLinks: {
  labelKey: string | null
  label?: string
  handle: string
  highlight?: boolean
}[] = [
  { labelKey: "nav.cat.novidades", handle: "novidades", highlight: true },
  { labelKey: "nav.cat.conjuntos", handle: "conjuntos" },
  { labelKey: "nav.cat.macacoes", handle: "macacoes" },
  { labelKey: "nav.cat.vestidos", handle: "vestidos" },
  { labelKey: "nav.cat.calcas", handle: "calcas" },
  { labelKey: "nav.cat.cropped", handle: "cropped" },
  { labelKey: null, label: "Plus Size", handle: "plus-size" },
]

const CategoryNav = async () => {
  const t = await getT()

  return (
    <nav
      className="w-full border-b border-t border-line bg-white"
      aria-label={t("nav.categoryAria")}
    >
      <div className="content-container">
        <ul className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
          {categoryLinks.map((cat) => (
            <li key={cat.handle} className="shrink-0">
              <LocalizedClientLink
                href={`/store?category=${cat.handle}`}
                className={`
                  group relative flex items-center h-12 px-5 text-[13px] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap
                  ${
                    cat.highlight
                      ? "text-ink-muted hover:text-ink"
                      : "text-ink-muted hover:text-ink"
                  }
                `}
              >
                {cat.labelKey ? t(cat.labelKey) : cat.label}
                <span className="absolute bottom-0 left-5 right-5 h-[1.5px] bg-ink scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
                {cat.highlight && (
                  <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-ink-muted" />
                )}
              </LocalizedClientLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default CategoryNav
