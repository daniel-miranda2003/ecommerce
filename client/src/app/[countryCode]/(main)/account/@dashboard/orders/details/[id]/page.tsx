import { retrieveOrder } from "@lib/data/orders"
import OrderDetailsTemplate from "@modules/order/templates/order-details-template"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getLocale } from "@lib/data/locale-actions"
import { isSupportedLocale, translate } from "@lib/i18n/translate"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const locale = isSupportedLocale(await getLocale())
  const order = await retrieveOrder(params.id).catch(() => null)

  if (!order) {
    notFound()
  }

  return {
    title: translate(locale, "metadata.orderId", {
      display_id: order.display_id ?? "",
    }),
    description: translate(locale, "metadata.orderIdDescription"),
  }
}

export default async function OrderDetailPage(props: Props) {
  const params = await props.params
  const order = await retrieveOrder(params.id).catch(() => null)

  if (!order) {
    notFound()
  }

  return <OrderDetailsTemplate order={order} />
}
