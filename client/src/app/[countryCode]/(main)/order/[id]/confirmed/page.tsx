import { retrieveOrder } from "@lib/data/orders"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getT } from "@lib/i18n/server"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata(_props: Props): Promise<Metadata> {
  const t = await getT()
  return {
    title: t("order.details"),
    description: t("order.placedSuccessfully"),
  }
}

export default async function OrderConfirmedPage(props: Props) {
  const params = await props.params
  const order = await retrieveOrder(params.id).catch(() => null)

  if (!order) {
    return notFound()
  }

  return <OrderCompletedTemplate order={order} />
}
