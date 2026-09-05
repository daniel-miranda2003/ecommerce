"use client"

import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"
import { getColorHex, needsInset } from "@lib/util/color-swatch"
import { useI18n } from "@lib/i18n/provider"

const SIZES_ORDER = [
  "PP",
  "P",
  "M",
  "G",
  "GG",
  "XG",
  "XXG",
  "EG",
  "XS",
  "S",
  "L",
  "XL",
  "XXL",
]

type Variant = HttpTypes.StoreProductVariant

type Props = {
  product: HttpTypes.StoreProduct
  options: Record<string, string | undefined>
  setOption: (optionId: string, value: string) => void
  disabled?: boolean
}

const isColorOption = (title: string) =>
  ["cor", "color", "couleur", "cores"].some((k) =>
    title.toLowerCase().includes(k)
  )

const isSizeOption = (title: string) =>
  ["tamanho", "talla", "size", "tam", "tamaño"].some((k) =>
    title.toLowerCase().includes(k)
  )

export default function ColorSizeMatrix({
  product,
  options,
  setOption,
  disabled,
}: Props) {
  const { t } = useI18n()
  const variants = product.variants ?? []
  const productOptions = product.options ?? []

  const colorOption = productOptions.find((o) => isColorOption(o.title ?? ""))
  const sizeOption = productOptions.find((o) => isSizeOption(o.title ?? ""))

  if (!colorOption || !sizeOption) return null

  const colors = (colorOption.values ?? []).map((valueOption) => ({
    value: valueOption.value,
    metadata: valueOption.metadata,
  }))
  const sizes = (sizeOption.values ?? [])
    .map((v) => v.value)
    .sort((a, b) => {
      const ia = SIZES_ORDER.indexOf(a.toUpperCase())
      const ib = SIZES_ORDER.indexOf(b.toUpperCase())
      if (ia === -1 && ib === -1) return a.localeCompare(b)
      if (ia === -1) return 1
      if (ib === -1) return -1
      return ia - ib
    })

  const selectedColor = options[colorOption.id]
  const selectedSize = options[sizeOption.id]

  const getVariantForCombo = (
    color: string,
    size: string
  ): Variant | undefined => {
    return variants.find((v) => {
      const varOpts = v.options ?? []
      const matchColor = varOpts.some(
        (o) => o.option_id === colorOption.id && o.value === color
      )
      const matchSize = varOpts.some(
        (o) => o.option_id === sizeOption.id && o.value === size
      )
      return matchColor && matchSize
    })
  }

  const isInStock = (variant?: Variant) => {
    if (!variant) return false
    if (!variant.manage_inventory) return true
    if (variant.allow_backorder) return true
    return (variant.inventory_quantity ?? 0) > 0
  }

  const handleSelect = (color: string, size: string) => {
    const variant = getVariantForCombo(color, size)
    if (!variant || !isInStock(variant)) return
    setOption(colorOption.id, color)
    setOption(sizeOption.id, size)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink">
          {t("product.colorSize")}
        </span>
        {selectedColor && selectedSize && (
          <span className="text-[12px] text-ink-muted">
            {selectedColor} — {selectedSize}
          </span>
        )}
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-[80px] min-w-[80px]" />
              {sizes.map((size) => (
                <th
                  key={size}
                  className={clx(
                    "text-center text-[12px] font-semibold tracking-[0.06em] pb-3 px-2",
                    size === selectedSize ? "text-[#A0522D]" : "text-ink-muted"
                  )}
                >
                  {size}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {colors.map((color, colorIdx) => {
              const hex = getColorHex(color.value, color.metadata) ?? "#cccccc"
              return (
                <tr
                  key={color.value}
                  className={clx(
                    colorIdx % 2 === 0 ? "bg-paper-warm" : "bg-white"
                  )}
                >
                  <td className="py-3 px-3">
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className={clx(
                          "w-9 h-9 rounded-full border-[2px] transition-all duration-200",
                          color.value === selectedColor
                            ? "border-ink scale-105"
                            : "border-transparent"
                        )}
                        style={{
                          backgroundColor: hex,
                          boxShadow: needsInset(hex)
                            ? "inset 0 0 0 1px #ddd"
                            : undefined,
                        }}
                      />
                      <span className="text-[9px] text-ink-muted text-center leading-tight max-w-[60px]">
                        {color.value}
                      </span>
                    </div>
                  </td>
                  {sizes.map((size) => {
                    const variant = getVariantForCombo(color.value, size)
                    const available = isInStock(variant)
                    const isSelected =
                      color.value === selectedColor && size === selectedSize

                    return (
                      <td key={size} className="text-center py-3 px-2">
                        <button
                          onClick={() => handleSelect(color.value, size)}
                          disabled={disabled || !available}
                          className={clx(
                            "w-10 h-10 mx-auto flex flex-col items-center justify-center rounded-base border text-[10px] font-semibold transition-all duration-200",
                            {
                              "border-ink bg-ink text-white scale-105 shadow-sm":
                                isSelected,
                              "border-line bg-white text-ink hover:border-ink hover:scale-105 cursor-pointer":
                                !isSelected && available,
                              "border-transparent bg-transparent text-ink-muted/40 cursor-not-allowed":
                                !available,
                            }
                          )}
                          aria-label={
                        available
                          ? t("product.cellAria", {
                              color: color.value,
                              size,
                            })
                          : t("product.cellAriaSoldOut", {
                              color: color.value,
                              size,
                            })
                      }
                        >
                          {available ? (
                            <span
                              className={clx(
                                "text-[11px] font-bold",
                                isSelected ? "text-white" : "text-[#A0522D]"
                              )}
                            >
                              ✓
                            </span>
                          ) : (
                            <span className="text-[14px] text-ink-muted/30">
                              —
                            </span>
                          )}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-4 text-[10px] text-ink-muted uppercase tracking-[0.06em]">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-ink inline-block" />{" "}
          {t("product.legend.selected")}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm border border-line bg-white inline-block" />{" "}
          {t("product.legend.available")}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-transparent border border-ink-muted/20 inline-block" />{" "}
          {t("product.legend.soldOut")}
        </span>
      </div>
    </div>
  )
}
