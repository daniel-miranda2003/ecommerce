"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useParams } from "next/navigation"

type ColorSwatch = {
  name: string
  hex: string
}

type LaunchProduct = {
  id: string
  title: string
  subtitle: string
  price: string
  image: string
  hoverImage: string
  handle: string
  colors: ColorSwatch[]
  badge?: string
}

// Placeholder data — will be replaced with real Medusa products
const LAUNCH_PRODUCTS: LaunchProduct[] = [
  {
    id: "1",
    title: "Conjunto Moletinho Premium",
    subtitle: "Conjunto · SS26",
    price: "R$ 329,00",
    image: "https://imagedelivery.net/qN-QMB_G8zYq9c8s18HwtQ/fcc9bc55-87bd-4ba8-9c16-ccf3b2023500/public",
    hoverImage: "/hero-bg.png",
    handle: "conjunto-moletinho-premium-2",
    badge: "Novo",
    colors: [
      { name: "Rose", hex: "#D4A5A5" },
      { name: "Marfim", hex: "#F5F0E8" },
      { name: "Areia", hex: "#C9B49A" },
    ],
  },
  {
    id: "2",
    title: "Macacão Terra",
    subtitle: "Macacão · SS26",
    price: "R$ 349",
    image: "/launch-2.png",
    hoverImage: "/category-1.png",
    handle: "macacao-terra",
    badge: "Exclusivo",
    colors: [
      { name: "Terracota", hex: "#A0522D" },
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Caramelo", hex: "#C68642" },
    ],
  },
  {
    id: "3",
    title: "Vestido Sage",
    subtitle: "Vestido · SS26",
    price: "R$ 319",
    image: "/launch-3.png",
    hoverImage: "/category-2.png",
    handle: "vestido-sage",
    badge: "Quase Esgotando",
    colors: [
      { name: "Sage", hex: "#8FAF8B" },
      { name: "Marfim", hex: "#F5F0E8" },
      { name: "Nude", hex: "#D4B8A0" },
    ],
  },
  {
    id: "4",
    title: "Calça Camel",
    subtitle: "Calças · SS26",
    price: "R$ 259",
    image: "/launch-4.png",
    hoverImage: "/hero-bg.png",
    handle: "calca-camel",
    colors: [
      { name: "Camel", hex: "#C19A6B" },
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Off-White", hex: "#FAF9F6" },
    ],
  },
]

function LaunchCard({ product }: { product: LaunchProduct }) {
  const [isHovered, setIsHovered] = useState(false)
  const [activeColor, setActiveColor] = useState(0)
  const router = useRouter()
  const params = useParams()
  const countryCode = (params?.countryCode as string) || "br"

  const handleClick = () => {
    router.push(`/${countryCode}/products/${product.handle}`)
  }

  return (
    <article
      className="group relative flex flex-col cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      aria-label={`Ver produto ${product.title}`}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-paper-warm">
        {/* Base image */}
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={`object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
        />

        {/* Hover image — "GIF" effect switching images */}
        <Image
          src={product.hoverImage}
          alt={`${product.title} — vista alternativa`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={`object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-[1.05]"
          }`}
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block bg-ink text-white text-[10px] font-semibold tracking-[0.08em] uppercase px-2.5 py-1 rounded-[2px]">
              {product.badge}
            </span>
          </div>
        )}

        {/* Quick CTA overlay on hover */}
        <div
          className={`absolute inset-x-0 bottom-0 z-10 p-4 transition-all duration-300 ease-out ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <button
            className="w-full bg-white/95 backdrop-blur-sm text-ink text-xs font-semibold uppercase tracking-[0.1em] py-3 rounded-[2px] hover:bg-white transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation()
              handleClick()
            }}
          >
            Comprar
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="mt-3 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink truncate">{product.title}</p>
            <p className="text-[11px] uppercase tracking-[0.08em] text-ink-muted mt-0.5">
              {product.subtitle}
            </p>
          </div>
          <p className="text-sm font-semibold text-ink shrink-0">{product.price}</p>
        </div>

        {/* Color swatches */}
        <div className="flex items-center gap-1.5">
          {product.colors.map((color, index) => (
            <button
              key={color.name}
              title={color.name}
              onClick={(e) => {
                e.stopPropagation()
                setActiveColor(index)
              }}
              className={`h-4 w-4 rounded-full border-[1.5px] transition-all duration-200 hover:scale-110 ${
                activeColor === index
                  ? "border-ink scale-110 shadow-sm"
                  : "border-transparent hover:border-ink/30"
              }`}
              style={{ backgroundColor: color.hex }}
              aria-label={`Color ${color.name}`}
            />
          ))}
          <span className="ml-1 text-[11px] text-ink-muted">
            {product.colors[activeColor]?.name}
          </span>
        </div>
      </div>
    </article>
  )
}

export default function LaunchSection() {
  return (
    <section className="w-full border-t border-line">
      <div className="content-container py-16 small:py-24">
        {/* Section header */}
        <div className="mb-10 small:mb-14 flex items-baseline justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9d8f84] mb-3">
              LANÇAMENTOS
            </p>
            <h2 className="font-display text-[2.4rem] small:text-[3rem] leading-[0.95] tracking-[-0.03em] text-ink">
              Veja o que acabou<br className="hidden small:block" /> de chegar!
            </h2>
          </div>
          <a
            href="/store"
            className="hidden small:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-ink-muted hover:text-ink transition-colors duration-200 group"
          >
            Ver todos
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 small:grid-cols-4 gap-x-5 small:gap-x-8 gap-y-12">
          {LAUNCH_PRODUCTS.map((product, index) => (
            <div
              key={product.id}
              style={{
                animationDelay: `${index * 80}ms`,
                animation: "reveal 600ms cubic-bezier(0.16, 1, 0.3, 1) both",
              }}
            >
              <LaunchCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile "ver todos" link */}
        <div className="mt-10 flex justify-center small:hidden">
          <a
            href="/store"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-ink border border-line rounded-[2px] px-8 py-3 hover:bg-ink hover:text-white transition-all duration-200"
          >
            Ver todos os lançamentos
          </a>
        </div>
      </div>
    </section>
  )
}
