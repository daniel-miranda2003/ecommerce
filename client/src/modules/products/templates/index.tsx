import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"
import { getT } from "@lib/i18n/server"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = async ({
  product,
  region,
  countryCode,
  images,
}) => {
  const t = await getT()

  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div
        className="content-container py-8 small:py-12"
        data-testid="product-container"
      >
        <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-ink-muted mb-8">
          <a href="/" className="hover:text-ink transition-colors duration-200">
            {t("nav.home")}
          </a>
          <span>›</span>
          {product.collection && (
            <>
              <a
                href={`/collections/${product.collection.handle}`}
                className="hover:text-ink transition-colors duration-200"
              >
                {product.collection.title}
              </a>
              <span>›</span>
            </>
          )}
          <span className="text-ink">{product.title}</span>
        </nav>
        <div className="grid grid-cols-1 small:grid-cols-[1fr_420px] gap-8 small:gap-16 items-start">
          <div className="w-full">
            <ImageGallery
              images={images}
              productTitle={product.title ?? t("product.generic")}
            />
          </div>
          <div className="flex flex-col gap-y-6 small:sticky small:top-28 self-start">
            <div>
              {product.collection && (
                <a
                  href={`/collections/${product.collection.handle}`}
                  className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink-muted hover:text-ink transition-colors duration-200 mb-2 block"
                >
                  {product.collection.title}
                </a>
              )}
              <h1 className="font-display text-[2rem] small:text-[2.4rem] leading-[1.05] tracking-[-0.02em] text-ink">
                {product.title}
              </h1>
              {product.description && (
                <p className="mt-4 text-[14px] leading-[1.8] text-ink-muted">
                  {product.description}
                </p>
              )}
            </div>

            <div className="w-full border-t border-line" />

            <ProductOnboardingCta />
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>

            <div className="w-full border-t border-line" />

            <ProductTabs product={product} />
          </div>
        </div>
      </div>

      <div
        className="content-container border-t border-line py-16 small:py-24"
        data-testid="related-products-container"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink-muted mb-3">
          VOCÊ TAMBÉM PODE GOSTAR
        </p>
        <h2 className="font-display text-[2rem] small:text-[2.5rem] leading-[0.95] tracking-[-0.03em] text-ink mb-10">
          Produtos relacionados
        </h2>
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
