"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"
import { useI18n } from "@lib/i18n/provider"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: string) => void
  "data-testid"?: string
}

type SortOption = {
  value: SortOptions
  labelKey: string
}

const sortOptions: SortOption[] = [
  {
    value: "created_at",
    labelKey: "store.sort.latest",
  },
  {
    value: "price_asc",
    labelKey: "store.sort.priceLowToHigh",
  },
  {
    value: "price_desc",
    labelKey: "store.sort.priceHighToLow",
  },
]

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const { t } = useI18n()

  const handleChange = (value: string) => {
    setQueryParams("sortBy", value as SortOptions)
  }

  return (
    <FilterRadioGroup
      title={t("store.sortBy")}
      items={sortOptions.map(({ value, labelKey }) => ({
        value,
        label: t(labelKey),
      }))}
      value={sortBy}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  )
}

export default SortProducts
