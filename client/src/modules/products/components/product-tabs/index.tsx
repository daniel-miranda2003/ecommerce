"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"
import { useI18n } from "@lib/i18n/provider"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const { t } = useI18n()

  const tabs = [
    {
      label: t("product.tab.information"),
      component: <ProductInfoTab product={product} />,
    },
    {
      label: t("product.tab.shippingReturns"),
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  const { t } = useI18n()
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">{t("product.material")}</span>
            <p>{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">{t("product.countryOfOrigin")}</span>
            <p>{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">{t("product.type")}</span>
            <p>{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">{t("product.weight")}</span>
            <p>
              {product.weight
                ? t("product.weightUnit", { n: product.weight })
                : "-"}
            </p>
          </div>
          <div>
            <span className="font-semibold">{t("product.dimensions")}</span>
            <p>
              {product.length && product.width && product.height
                ? t("product.dimensionsTemplate", {
                    length: product.length,
                    width: product.width,
                    height: product.height,
                  })
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  const { t } = useI18n()
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">{t("product.fastDelivery.title")}</span>
            <p className="max-w-sm">{t("product.fastDelivery.text")}</p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">{t("product.simpleExchanges.title")}</span>
            <p className="max-w-sm">{t("product.simpleExchanges.text")}</p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">{t("product.easyReturns.title")}</span>
            <p className="max-w-sm">{t("product.easyReturns.text")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
