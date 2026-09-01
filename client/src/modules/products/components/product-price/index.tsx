import { clx } from "@modules/common/components/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import { useI18n } from "@lib/i18n/provider"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { t } = useI18n()
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-paper-warm border border-line animate-pulse" />
  }

  return (
    <div className="flex flex-col text-ink-soft">
      <span
        className={clx("text-xl-semi", {
          "text-[#1F6C9F]": selectedPrice.price_type === "sale",
        })}
      >
        {!variant && t("product.from")}
        <span
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>
      </span>
      {selectedPrice.price_type === "sale" && (
        <>
          <p>
            <span className="text-ink-faint">{t("product.original")} </span>
            <span
              className="line-through"
              data-testid="original-product-price"
              data-value={selectedPrice.original_price_number}
            >
              {selectedPrice.original_price}
            </span>
          </p>
          <span className="text-[#1F6C9F]">
            {t("product.offPercentage", {
              percentage: selectedPrice.percentage_diff,
            })}
          </span>
        </>
      )}
    </div>
  )
}
