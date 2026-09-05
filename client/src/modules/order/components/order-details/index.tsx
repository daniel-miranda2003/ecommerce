import { HttpTypes } from "@medusajs/types"
import { Text } from "@modules/common/components/ui"
import { getT } from "@lib/i18n/server"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = async ({ order, showStatus }: OrderDetailsProps) => {
  const t = await getT()
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div>
      <Text>
        {t("order.confirmationSent", { email: order.email ?? "" })}
      </Text>
      <Text className="mt-2">
        {t("order.date")}{" "}
        <span data-testid="order-date">
          {new Date(order.created_at).toDateString()}
        </span>
      </Text>
      <Text className="mt-2 text-accent-red-fg">
        {t("order.number")} <span data-testid="order-id">{order.display_id}</span>
      </Text>

      <div className="flex items-center text-compact-small gap-x-4 mt-4">
        {showStatus && (
          <>
            <Text>
              {t("order.status")}{" "}
              <span className="text-ink-muted " data-testid="order-status">
                {formatStatus(order.fulfillment_status)}
              </span>
            </Text>
            <Text>
              {t("order.paymentStatus")}{" "}
              <span
                className="text-ink-muted "
                data-testid="order-payment-status"
              >
                {formatStatus(order.payment_status)}
              </span>
            </Text>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
