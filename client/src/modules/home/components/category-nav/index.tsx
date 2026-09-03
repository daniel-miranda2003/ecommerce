import LocalizedClientLink from "@modules/common/components/localized-client-link"

const categoryLinks = [
  { label: "Novidades Da Semana", handle: "novidades", highlight: true },
  { label: "Conjuntos", handle: "conjuntos" },
  { label: "Macacões", handle: "macacoes" },
  { label: "Vestidos", handle: "vestidos" },
  { label: "Calças", handle: "calcas" },
  { label: "Cropped", handle: "cropped" },
  { label: "Plus Size", handle: "plus-size" },
]

const CategoryNav = () => {
  return (
    <nav
      className="w-full border-b border-t border-line bg-white"
      aria-label="Categorias de productos"
    >
      <div className="content-container">
        <ul className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
          {categoryLinks.map((cat) => (
            <li key={cat.handle} className="shrink-0">
              <LocalizedClientLink
                href={`/store?category=${cat.handle}`}
                className={`
                  group relative flex items-center h-12 px-5 text-[13px] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap
                  ${cat.highlight
                    ? "text-[#9d8f84] hover:text-ink"
                    : "text-ink-muted hover:text-ink"
                  }
                `}
              >
                {cat.label}
                {/* Underline animation on hover */}
                <span className="absolute bottom-0 left-5 right-5 h-[1.5px] bg-ink scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
                {/* Active indicator for highlight */}
                {cat.highlight && (
                  <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-[#9d8f84]" />
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
