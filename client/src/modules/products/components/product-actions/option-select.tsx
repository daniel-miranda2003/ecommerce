import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"
import React from "react"
import { useI18n } from "@lib/i18n/provider"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

// Detect if an option value looks like a color name
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
  rose: "#D4A5A5",
  "rosa bebê": "#F4C2C2",
  "rosa bebe": "#F4C2C2",
  rosa: "#F4C2C2",
  sage: "#8FAF8B",
  verde: "#8FAF8B",
  "verde bb": "#9BC4A2",
  azul: "#6EA3D0",
  marinho: "#000080",
  cinza: "#808080",
  vinho: "#722F37",
  amarelo: "#F4E285",
  "amarelo bebe": "#FFFACD",
}

const getColorHex = (value: string): string | null => {
  const key = value.toLowerCase().trim()
  return COLOR_MAP[key] || null
}

const SIZES_ORDER = ["PP", "P", "M", "G", "GG", "XG", "XXG", "EG"]

const isSizeOption = (title: string) =>
  ["tamanho", "talla", "size", "tam"].some((k) =>
    title.toLowerCase().includes(k)
  )

const isColorOption = (title: string) =>
  ["cor", "color", "couleur"].some((k) => title.toLowerCase().includes(k))

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const { t } = useI18n()
  const values = (option.values ?? []).map((v) => v.value)

  const isColor = isColorOption(title)
  const isSize = isSizeOption(title)

  // Color swatch picker
  if (isColor) {
    return (
      <div className="flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink">
            {title}
          </span>
          {current && (
            <span className="text-[12px] text-ink-muted capitalize">{current}</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2.5" data-testid={dataTestId}>
          {values.map((v) => {
            const hex = getColorHex(v)
            return (
              <button
                key={v}
                onClick={() => updateOption(option.id, v)}
                disabled={disabled}
                title={v}
                aria-label={`Color ${v}`}
                className={clx(
                  "relative flex flex-col items-center gap-1.5 group",
                )}
              >
                <span
                  className={clx(
                    "block w-9 h-9 rounded-full border-[2px] transition-all duration-200",
                    {
                      "border-ink scale-110 shadow-md": v === current,
                      "border-transparent hover:border-ink/40 hover:scale-105":
                        v !== current,
                    }
                  )}
                  style={{
                    backgroundColor: hex ?? "#ccc",
                    boxShadow:
                      hex && hex.toLowerCase() === "#fafafa"
                        ? "inset 0 0 0 1px #e0e0e0"
                        : undefined,
                  }}
                />
                <span
                  className={clx(
                    "text-[9px] uppercase tracking-[0.06em] whitespace-nowrap",
                    v === current ? "text-ink font-semibold" : "text-ink-muted"
                  )}
                >
                  {v}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Size pill picker
  if (isSize) {
    const sorted = [...values].sort((a, b) => {
      const ia = SIZES_ORDER.indexOf(a.toUpperCase())
      const ib = SIZES_ORDER.indexOf(b.toUpperCase())
      if (ia === -1 && ib === -1) return a.localeCompare(b)
      if (ia === -1) return 1
      if (ib === -1) return -1
      return ia - ib
    })

    return (
      <div className="flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink">
            {title}
          </span>
          <button className="text-[11px] text-ink-muted underline underline-offset-2 hover:text-ink transition-colors duration-200">
            Guia de tamanhos
          </button>
        </div>
        <div className="flex flex-wrap gap-2" data-testid={dataTestId}>
          {sorted.map((v) => (
            <button
              key={v}
              onClick={() => updateOption(option.id, v)}
              disabled={disabled}
              className={clx(
                "h-10 min-w-[44px] px-3 rounded-[4px] text-[12px] font-medium tracking-[0.04em] uppercase border transition-all duration-200",
                {
                  "border-ink bg-ink text-white": v === current,
                  "border-line bg-white text-ink hover:border-ink":
                    v !== current,
                }
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Generic fallback
  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink">
        {title}
      </span>
      <div className="flex flex-wrap gap-2" data-testid={dataTestId}>
        {values.map((v) => (
          <button
            key={v}
            onClick={() => updateOption(option.id, v)}
            disabled={disabled}
            className={clx(
              "h-10 min-w-[44px] px-4 rounded-[4px] text-[12px] font-medium border transition-all duration-200",
              {
                "border-ink bg-ink text-white": v === current,
                "border-line bg-white text-ink hover:border-ink": v !== current,
              }
            )}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  )
}

export default OptionSelect
