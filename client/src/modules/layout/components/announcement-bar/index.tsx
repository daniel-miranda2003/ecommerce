import LocalizedClientLink from "@modules/common/components/localized-client-link"

const AnnouncementBar = () => {
  return (
    <div
      className="w-full bg-ink text-white"
      role="banner"
      aria-label="Anuncio promocional"
    >
      <div className="content-container flex items-center justify-center gap-2 py-2.5">
        <p className="text-xs tracking-[0.1em] uppercase font-medium text-center">
          Envío gratis en compras mayores a $50 —{" "}
          <LocalizedClientLink
            href="/store"
            className="underline underline-offset-2 hover:text-white/70 transition-colors duration-200"
          >
            Ver colección
          </LocalizedClientLink>
        </p>
      </div>
    </div>
  )
}

export default AnnouncementBar
