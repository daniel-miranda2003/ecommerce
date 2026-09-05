import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"
import { getColorHex, needsInset } from "@lib/util/color-swatch"
import { useI18n } from "@lib/i18n/provider"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
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

  if (isColor) {
    return (
      <div className="flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink">
            {title}
          </span>
          {current && (
            <span className="text-[12px] text-ink-muted capitalize">
              {current}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2.5" data-testid={dataTestId}>
          {(option.values ?? []).map((valueOption) => {
            const v = valueOption.value
            const hex = getColorHex(v, valueOption.metadata)
            return (
              <button
                key={v}
                onClick={() => updateOption(option.id, v)}
                disabled={disabled}
                title={v}
                aria-label={t("color.ariaLabel", { name: v })}
                className={clx(
                  "relative flex flex-col items-center gap-1.5 group"
                )}
              >
                <span
                  className={clx(
                    "block w-9 h-9 rounded-full border-[2px] transition-all duration-200",
                    {
                      "border-ink scale-105": v === current,
                      "border-transparent hover:border-ink/40 hover:scale-105":
                        v !== current,
                    }
                  )}
                  style={{
                    backgroundColor: hex ?? "#ccc",
                    boxShadow: needsInset(hex)
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
            {t("product.sizeGuide")}
          </button>
        </div>
        <div className="flex flex-wrap gap-2" data-testid={dataTestId}>
          {sorted.map((v) => (
            <button
              key={v}
              onClick={() => updateOption(option.id, v)}
              disabled={disabled}
              className={clx(
                "h-10 min-w-[44px] px-3 rounded-base text-[12px] font-medium tracking-[0.04em] uppercase border transition-all duration-200",
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
              "h-10 min-w-[44px] px-4 rounded-base text-[12px] font-medium border transition-all duration-200",
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
