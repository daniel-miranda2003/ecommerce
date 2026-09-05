"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { useI18n } from "@lib/i18n/provider"

type ColorSwatch = {
  name: string
  hex: string
}

type LaunchCardProps = {
  product: HttpTypes.StoreProduct
  subtitle: string
  price: string
  colors: ColorSwatch[]
  badge?: string
  index?: number
}

function LaunchCard({ product, subtitle, price, colors, badge, index = 0 }: LaunchCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [activeColor, setActiveColor] = useState(0)
  const router = useRouter()
  const params = useParams()
  const { t } = useI18n()
  const countryCode = (params?.countryCode as string) || "br"

  const image = product.thumbnail || product.images?.[0]?.url || ""
  const secondaryImage = product.images?.[1]?.url || ""

  const handleClick = () => {
    router.push(`/${countryCode}/products/${product.handle}`)
  }

  return (
    <article
      className="group relative flex flex-col cursor-pointer"
      style={{
        animationDelay: `${index * 80}ms`,
        animation: "reveal 600ms cubic-bezier(0.16, 1, 0.3, 1) both",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      aria-label={t("product.viewProductAria", { title: product.title ?? "" })}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-paper-warm">
        {image ? (
          <Image
            src={image}
            alt={product.title ?? ""}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={`object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
          />
        ) : null}
        {secondaryImage ? (
          <Image
            src={secondaryImage}
            alt={t("product.alternateViewAlt", {
              title: product.title ?? "",
            })}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={`object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-[1.05]"
            }`}
          />
        ) : null}
        {badge ? (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block bg-ink text-white text-[10px] font-semibold tracking-[0.08em] uppercase px-2.5 py-1 rounded-soft">
              {badge}
            </span>
          </div>
        ) : null}
        <div
          className={`absolute inset-x-0 bottom-0 z-10 p-4 transition-all duration-300 ease-out ${
            isHovered
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
        >
          <button
            className="w-full bg-white/95 backdrop-blur-sm text-ink text-xs font-semibold uppercase tracking-[0.1em] py-3 rounded-soft hover:bg-white transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation()
              handleClick()
            }}
          >
            {t("product.buy")}
          </button>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-2">
<div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink truncate">
              {product.title}
            </p>
            <p className="text-[11px] uppercase tracking-[0.08em] text-ink-muted mt-0.5">
              {subtitle}
            </p>
          </div>
          <p className="text-sm font-semibold text-ink shrink-0">
            {price}
          </p>
        </div>
        {colors.length > 0 && (
          <div className="flex items-center gap-1.5">
            {colors.map((color, index) => (
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
                aria-label={t("color.ariaLabel", { name: color.name })}
              />
            ))}
            <span className="ml-1 text-[11px] text-ink-muted">
              {colors[activeColor]?.name}
            </span>
          </div>
        )}
      </div>
    </article>
  )
}

export default LaunchCard