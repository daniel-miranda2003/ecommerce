"use client"

import { HttpTypes } from "@medusajs/types"
import { Text } from "@modules/common/components/ui"
import { useI18n } from "@lib/i18n/provider"

type LineItemOptionsProps = {
  variant: HttpTypes.StoreProductVariant | undefined
  "data-testid"?: string
  "data-value"?: HttpTypes.StoreProductVariant
}

const LineItemOptions = ({
  variant,
  "data-testid": dataTestid,
  "data-value": dataValue,
}: LineItemOptionsProps) => {
  const { t } = useI18n()
  return (
    <Text
      data-testid={dataTestid}
      data-value={dataValue}
      className="inline-block txt-medium text-ui-fg-subtle w-full overflow-hidden text-ellipsis"
    >
      {t("common.variant", { title: variant?.title || "" })}
    </Text>
  )
}

export default LineItemOptions
