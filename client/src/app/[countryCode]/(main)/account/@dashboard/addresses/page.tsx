import { Metadata } from "next"
import { notFound } from "next/navigation"

import AddressBook from "@modules/account/components/address-book"

import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"
import { getLocale } from "@lib/data/locale-actions"
import { getT } from "@lib/i18n/server"
import { isSupportedLocale, translate } from "@lib/i18n/translate"

export async function generateMetadata(): Promise<Metadata> {
  const locale = isSupportedLocale(await getLocale())

  return {
    title: translate(locale, "metadata.addresses"),
    description: translate(locale, "metadata.addressesDescription"),
  }
}

export default async function Addresses(props: {
  params: Promise<{ countryCode: string }>
}) {
  const t = await getT()
  const params = await props.params
  const { countryCode } = params
  const customer = await retrieveCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{t("metadata.addresses")}</h1>
        <p className="text-base-regular">{t("metadata.addressesBody")}</p>
      </div>
      <AddressBook customer={customer} region={region} />
    </div>
  )
}
