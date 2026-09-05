"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useState } from "react"
import { useI18n } from "@lib/i18n/provider"

type ImageGalleryClientProps = {
  images: HttpTypes.StoreProductImage[]
  productTitle: string
}

export default function ImageGalleryClient({
  images,
  productTitle,
}: ImageGalleryClientProps) {
  const { t } = useI18n()
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images.length) return null

  const activeImage = images[activeIndex]

  return (
    <div className="flex gap-3 small:gap-4 h-full">
      {images.length > 1 && (
        <div className="flex flex-col gap-2 w-[72px] small:w-[88px] shrink-0 max-h-[600px] overflow-y-auto scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={img.id ?? idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-[3/4] w-full overflow-hidden rounded-base border-[1.5px] transition-all duration-200 shrink-0 ${
                idx === activeIndex
                  ? "border-ink"
                  : "border-transparent opacity-60 hover:opacity-90 hover:border-ink/30"
              }`}
              aria-label={t("product.thumbnailAria", { index: idx + 1 })}
            >
              {!!img.url && (
                <Image
                  src={img.url}
                  alt={t("product.thumbnailAlt", {
                  title: productTitle,
                  index: idx + 1,
                })}
                  fill
                  sizes="88px"
                  className="object-cover object-center"
                />
              )}
            </button>
          ))}
        </div>
      )}
      <div className="relative flex-1 aspect-[3/4] overflow-hidden rounded-base bg-paper-warm">
        {!!activeImage?.url && (
          <Image
            src={activeImage.url}
            alt={productTitle}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover object-center transition-opacity duration-300"
          />
        )}
      </div>
    </div>
  )
}
