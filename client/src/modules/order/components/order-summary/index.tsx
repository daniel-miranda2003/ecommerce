import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { getT } from "@lib/i18n/server"

type OrderSummaryProps = {
  order: HttpTypes.StoreOrder
}

const OrderSummary = async ({ order }: OrderSummaryProps) => {
  const t = await getT()
  const getAmount = (amount?: number | null) => {
    if (!amount) {
      return
    }

    return convertToLocale({
      amount,
      currency_code: order.currency_code,
    })
  }

  return (
    <div>
      <h2 className="text-base-semi">{t("order.summary")}</h2>
      <div className="text-small-regular text-ink-soft my-2">
        <div className="flex items-center justify-between text-base-regular text-ink-soft mb-2">
          <span>{t("order.subtotal")}</span>
          <span>{getAmount(order.subtotal)}</span>
        </div>
        <div className="flex flex-col gap-y-1">
          {order.discount_total > 0 && (
            <div className="flex items-center justify-between">
              <span>{t("order.discount")}</span>
              <span>- {getAmount(order.discount_total)}</span>
            </div>
          )}
          {order.gift_card_total > 0 && (
            <div className="flex items-center justify-between">
              <span>{t("order.discount")}</span>
              <span>- {getAmount(order.gift_card_total)}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span>{t("order.shipping")}</span>
            <span>{getAmount(order.shipping_total)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>{t("order.taxes")}</span>
            <span>{getAmount(order.tax_total)}</span>
          </div>
        </div>
        <div className="h-px w-full border-b border-line border-dashed my-4" />
        <div className="flex items-center justify-between text-base-regular text-ink-soft mb-2">
          <span>{t("order.total")}</span>
          <span>{getAmount(order.total)}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
