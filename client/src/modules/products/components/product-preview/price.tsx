import { clx } from "@modules/common/components/ui"
import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      {price.price_type === "sale" && (
        <span
          className="line-through text-ink-faint text-[13px]"
          data-testid="original-price"
        >
          {price.original_price}
        </span>
      )}
      <span
        className={clx(
          "text-[13px] text-ink-soft",
          price.price_type === "sale" && "text-ink"
        )}
        data-testid="price"
      >
        {price.calculated_price}
      </span>
    </div>
  )
}