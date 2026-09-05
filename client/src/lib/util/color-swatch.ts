import { HttpTypes } from "@medusajs/types"

const COLOR_MAP: Record<string, string> = {
  preto: "#1a1a1a",
  negro: "#1a1a1a",
  black: "#1a1a1a",
  branco: "#FAFAFA",
  white: "#FAFAFA",
  "off-white": "#FAF9F6",
  offwhite: "#FAF9F6",
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

const normalize = (value: string) => value.toLowerCase().trim()

const LIGHT_SWATCHES = new Set(["#fafafa", "#faf9f6"])

/**
 * Resolves a color swatch hex for an option value.
 *
 * Priority:
 * 1. `metadata.swatch` — editable from the Medusa admin, no code required
 * 2. The name→hex fallback map (for catalog values without metadata)
 *
 * Returns `null` when neither a metadata swatch nor a known name match exists.
 */
export const getColorHex = (
  value: string,
  metadata?: HttpTypes.StoreProductOptionValue["metadata"]
): string | null => {
  const swatch = metadata?.swatch
  if (typeof swatch === "string" && swatch.trim()) {
    return swatch.trim()
  }

  return COLOR_MAP[normalize(value)] ?? null
}

/**
 * Whether the swatch is near-white and needs an inset hairline to stay visible
 * on the light storefront background.
 */
export const needsInset = (hex: string | null): boolean =>
  !!hex && LIGHT_SWATCHES.has(normalize(hex))