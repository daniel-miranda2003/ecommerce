import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getT } from "@lib/i18n/server"

const AnnouncementBar = async () => {
  const t = await getT()

  return (
    <div
      className="w-full bg-ink text-white"
      role="banner"
      aria-label={t("announcement.aria")}
    >
      <div className="content-container flex items-center justify-center gap-2 py-2.5">
        <p className="text-xs tracking-[0.1em] uppercase font-medium text-center">
          {t("announcement.freeShipping", { amount: "$50" })} —{" "}
          <LocalizedClientLink
            href="/store"
            className="underline underline-offset-2 hover:text-white/70 transition-colors duration-200"
          >
            {t("announcement.viewCollection")}
          </LocalizedClientLink>
        </p>
      </div>
    </div>
  )
}

export default AnnouncementBar
