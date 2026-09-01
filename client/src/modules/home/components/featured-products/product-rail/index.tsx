import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { getT } from "@lib/i18n/server"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"
import Reveal from "@modules/common/components/reveal"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const t = await getT()
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts) {
    return null
  }

  return (
    <div className="content-container py-16 small:py-28">
      <Reveal>
        <div className="flex items-baseline justify-between mb-10 small:mb-12">
          <h2 className="font-display text-[2rem] small:text-[2.4rem] leading-[1] tracking-[-0.02em] text-ink">
            {collection.title}
          </h2>
          <LocalizedClientLink
            href={`/collections/${collection.handle}`}
            className="eyebrow text-ink-muted hover:text-ink transition-colors duration-200"
          >
            {t("home.viewAll")}
          </LocalizedClientLink>
        </div>
      </Reveal>
      <ul className="grid grid-cols-2 small:grid-cols-3 gap-x-6 small:gap-x-8 gap-y-16 small:gap-y-24">
        {pricedProducts &&
          pricedProducts.map((product, i) => (
            <li key={product.id}>
              <Reveal index={i}>
                <ProductPreview product={product} region={region} isFeatured />
              </Reveal>
            </li>
          ))}
      </ul>
    </div>
  )
}