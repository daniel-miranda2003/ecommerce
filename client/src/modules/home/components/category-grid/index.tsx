import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Reveal from "@modules/common/components/reveal"
import { getT } from "@lib/i18n/server"

const categories = [
  {
    title: "Vestidos",
    handle: "vestidos",
    image: "/category-1.png",
  },
  {
    title: "Tops & Blusas",
    handle: "tops",
    image: "/category-2.png",
  },
  {
    title: "Pantalones",
    handle: "pantalones",
    image: "/hero-bg.png",
  },
  {
    title: "Chaquetas",
    handle: "chaquetas",
    image: "/category-1.png",
  },
  {
    title: "Accesorios",
    handle: "accesorios",
    image: "/category-2.png",
  },
]

const CategoryGrid = async () => {
  const t = await getT()

  return (
    <section className="w-full border-t border-line">
      <Reveal>
        <div className="grid grid-cols-2 small:grid-cols-5 w-full">
          {categories.map((category, index) => (
            <LocalizedClientLink
              key={category.handle}
              href={`/store?category=${category.handle}`}
              className="group relative flex aspect-[3/4] w-full flex-col justify-end overflow-hidden border-r border-b small:border-b-0 border-line last:border-r-0"
            >
              <div className="absolute inset-0 z-0 h-full w-full bg-paper transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 20vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
              <div className="relative z-20 p-6 small:p-8">
                <span className="font-display text-2xl text-white tracking-wide">
                  {category.title}
                </span>
                <div className="mt-2 h-[1px] w-0 bg-white transition-all duration-300 ease-out group-hover:w-8" />
              </div>
            </LocalizedClientLink>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

export default CategoryGrid
