import { Fragment, Suspense } from "react"
import { getCollectionByHandle } from "@lib/data/collections"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { getColorHex } from "@lib/util/color-swatch"
import { HttpTypes } from "@medusajs/types"
import { getT } from "@lib/i18n/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import LaunchCard from "./launch-card"

const COLLECTION_HANDLE = "lancamentos"
const PRODUCT_LIMIT = 4
const NEW_PRODUCT_DAYS = 30

async function LaunchContent({ region }: { region: HttpTypes.StoreRegion }) {
  const t = await getT()
  const collection = await getCollectionByHandle(COLLECTION_HANDLE)
  if (!collection?.id) return null

  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      limit: PRODUCT_LIMIT,
    },
  })

  if (!products.length) return null

  const now = Date.now()

  return (
    <section className="w-full border-t border-line">
      <div className="content-container py-16 small:py-24">
        <div className="mb-10 small:mb-14 flex items-baseline justify-between">
          <div>
            <p className="eyebrow mb-3">{t("home.launch.eyebrow")}</p>
            <h2 className="font-display text-[2.4rem] small:text-[3rem] leading-[0.95] tracking-[-0.03em] text-ink">
              {t("home.launch.title")
                .split("\n")
                .map((line, i) => (
                  <Fragment key={i}>
                    {i > 0 ? <br className="hidden small:block" /> : null}
                    {line}
                  </Fragment>
                ))}
            </h2>
          </div>
          <LocalizedClientLink
            href={`/collections/${COLLECTION_HANDLE}`}
            className="hidden small:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-ink-muted hover:text-ink transition-colors duration-200 group"
          >
            {t("home.viewAll")}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </LocalizedClientLink>
        </div>
        <div className="grid grid-cols-2 small:grid-cols-4 gap-x-5 small:gap-x-8 gap-y-12">
          {products.map((product, index) => {
            const { cheapestPrice } = getProductPrice({ product })
            const colorOption = (product.options ?? []).find((o) =>
              ["cor", "color", "couleur", "cores"].some((k) =>
                (o.title ?? "").toLowerCase().includes(k)
              )
            )
            const colors = (colorOption?.values ?? []).map((v) => ({
              name: v.value,
              hex: getColorHex(v.value, v.metadata) ?? "#cccccc",
            }))

            const createdAt = product.created_at
              ? new Date(product.created_at).getTime()
              : 0
            const isNew =
              createdAt > 0 && now - createdAt <= NEW_PRODUCT_DAYS * 86400000

            const badge =
              (typeof product.metadata?.home_badge === "string"
                ? product.metadata.home_badge
                : "") || (isNew ? t("home.launch.badgeNew") : "")

            const typeValue = (
              product.type as { value?: string } | null | undefined
            )?.value
            const subtitle = typeValue || collection.title || ""

            return (
              <LaunchCard
                key={product.id}
                product={product}
                subtitle={subtitle}
                price={cheapestPrice?.calculated_price ?? ""}
                colors={colors}
                badge={badge || undefined}
                index={index}
              />
            )
          })}
        </div>
        <div className="mt-10 flex justify-center small:hidden">
          <LocalizedClientLink
            href={`/collections/${COLLECTION_HANDLE}`}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-ink border border-line rounded-soft px-8 py-3 hover:bg-ink hover:text-white transition-all duration-200"
          >
            {t("home.launch.viewAllMobile")}
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default async function LaunchSection({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  return (
    <Suspense fallback={null}>
      <LaunchContent region={region} />
    </Suspense>
  )
}
