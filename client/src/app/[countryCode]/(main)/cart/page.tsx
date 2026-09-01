import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import CartTemplate from "@modules/cart/templates"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getLocale } from "@lib/data/locale-actions"
import { isSupportedLocale, translate } from "@lib/i18n/translate"

export async function generateMetadata(): Promise<Metadata> {
  const locale = isSupportedLocale(await getLocale())

  return {
    title: translate(locale, "metadata.cart"),
    description: translate(locale, "metadata.cartDescription"),
  }
}

export default async function Cart() {
  const cart = await retrieveCart().catch((error) => {
    console.error(error)
    return notFound()
  })

  const customer = await retrieveCustomer()

  return <CartTemplate cart={cart} customer={customer} />
}
