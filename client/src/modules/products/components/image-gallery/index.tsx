import { HttpTypes } from "@medusajs/types"
import ImageGalleryClient from "./client"
import { getT } from "@lib/i18n/server"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  productTitle?: string
}

const ImageGallery = async ({ images, productTitle }: ImageGalleryProps) => {
  const t = await getT()
  return (
    <ImageGalleryClient
      images={images}
      productTitle={productTitle ?? t("product.generic")}
    />
  )
}

export default ImageGallery