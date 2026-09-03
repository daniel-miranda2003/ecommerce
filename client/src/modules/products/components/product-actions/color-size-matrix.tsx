"use client"

import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"

// Map of color names to hex values
const COLOR_MAP: Record<string, string> = {
  preto: "#1a1a1a",
  negro: "#1a1a1a",
  black: "#1a1a1a",
  branco: "#FAFAFA",
  "off-white": "#FAF9F6",
  offwhite: "#FAF9F6",
  white: "#FAFAFA",
  marfim: "#F5F0E8",
  areia: "#C9B49A",
  nude: "#D4B8A0",
  bege: "#F5F5DC",
  camel: "#C19A6B",
  caramelo: "#C68642",
  terracota: "#A0522D",
  marrom: "#8B4513",
  rose: "#D4A5A5",
  "rosa bebê": "#F4C2C2",
  "rosa bebe": "#F4C2C2",
  rosa: "#F4C2C2",
  sage: "#8FAF8B",
  verde: "#8FAF8B",
  "verde bb": "#9BC4A2",
  azul: "#6EA3D0",
  marinho: "#1a2a6c",
  cinza: "#808080",
  vinho: "#722F37",
  bordo: "#800020",
  amarelo: "#F4E285",
  "amarelo bebe": "#FFFACD",
  laranja: "#FF8C00",
  coral: "#FF6B6B",
  lilás: "#C8A2C8",
  lilas: "#C8A2C8",
}

const getColorHex = (value: string): string => {
  const key = value.toLowerCase().trim()
  return COLOR_MAP[key] ?? "#cccccc"
}

const SIZES_ORDER = ["PP", "P", "M", "G", "GG", "XG", "XXG", "EG", "XS", "S", "L", "XL", "XXL"]

type Variant = HttpTypes.StoreProductVariant

type Props = {
  product: HttpTypes.StoreProduct
  options: Record<string, string | undefined>
  setOption: (optionId: string, value: string) => void
  disabled?: boolean
}

const isColorOption = (title: string) =>
  ["cor", "color", "couleur", "cores"].some((k) => title.toLowerCase().includes(k))

const isSizeOption = (title: string) =>
  ["tamanho", "talla", "size", "tam", "tamaño"].some((k) => title.toLowerCase().includes(k))

export default function ColorSizeMatrix({ product, options, setOption, disabled }: Props) {
  const variants = product.variants ?? []
  const productOptions = product.options ?? []

  const colorOption = productOptions.find((o) => isColorOption(o.title ?? ""))
  const sizeOption = productOptions.find((o) => isSizeOption(o.title ?? ""))

  // If we don't have both color and size, fall back to null (parent handles generic rendering)
  if (!colorOption || !sizeOption) return null

  const colors = (colorOption.values ?? []).map((v) => v.value)
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

  // Check if a specific color+size combination has a variant (and if it's in stock)
  const getVariantForCombo = (color: string, size: string): Variant | undefined => {
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
          Cor & Tamanho
        </span>
        {selectedColor && selectedSize && (
          <span className="text-[12px] text-ink-muted">
            {selectedColor} — {selectedSize}
          </span>
        )}
      </div>

      {/* Matrix table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {/* Empty corner cell */}
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
              const hex = getColorHex(color)
              return (
                <tr
                  key={color}
                  className={clx(colorIdx % 2 === 0 ? "bg-[#F9F7F5]" : "bg-white")}
                >
                  {/* Color swatch cell */}
                  <td className="py-3 px-3">
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className={clx(
                          "w-9 h-9 rounded-full border-[2px] transition-all duration-200",
                          color === selectedColor
                            ? "border-ink scale-110 shadow-md"
                            : "border-transparent"
                        )}
                        style={{
                          backgroundColor: hex,
                          boxShadow:
                            hex === "#FAFAFA" || hex === "#FAF9F6"
                              ? "inset 0 0 0 1px #ddd"
                              : undefined,
                        }}
                      />
                      <span className="text-[9px] text-ink-muted text-center leading-tight max-w-[60px]">
                        {color}
                      </span>
                    </div>
                  </td>

                  {/* Size cells */}
                  {sizes.map((size) => {
                    const variant = getVariantForCombo(color, size)
                    const available = isInStock(variant)
                    const isSelected = color === selectedColor && size === selectedSize

                    return (
                      <td key={size} className="text-center py-3 px-2">
                        <button
                          onClick={() => handleSelect(color, size)}
                          disabled={disabled || !available}
                          className={clx(
                            "w-10 h-10 mx-auto flex flex-col items-center justify-center rounded-[4px] border text-[10px] font-semibold transition-all duration-200",
                            {
                              // Selected cell
                              "border-ink bg-ink text-white scale-105 shadow-sm": isSelected,
                              // Available, not selected
                              "border-line bg-white text-ink hover:border-ink hover:scale-105 cursor-pointer":
                                !isSelected && available,
                              // Out of stock / not available
                              "border-transparent bg-transparent text-ink-muted/40 cursor-not-allowed":
                                !available,
                            }
                          )}
                          aria-label={`${color} tamanho ${size}${!available ? " — esgotado" : ""}`}
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
                            <span className="text-[14px] text-ink-muted/30">—</span>
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

      {/* Legend */}
      <div className="flex items-center gap-4 text-[10px] text-ink-muted uppercase tracking-[0.06em]">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-ink inline-block" /> Selecionado
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm border border-line bg-white inline-block" /> Disponível
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-transparent border border-ink-muted/20 inline-block" /> Esgotado
        </span>
      </div>
    </div>
  )
}
