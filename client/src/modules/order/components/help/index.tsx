import { Heading } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"
import { getT } from "@lib/i18n/server"

const Help = async () => {
  const t = await getT()
  return (
    <div className="mt-6">
      <Heading className="text-base-semi">{t("order.needHelp")}</Heading>
      <div className="text-base-regular my-2">
        <ul className="gap-y-2 flex flex-col">
          <li>
            <LocalizedClientLink href="/contact">{t("order.contact")}</LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="/contact">
              {t("order.returnsExchanges")}
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
