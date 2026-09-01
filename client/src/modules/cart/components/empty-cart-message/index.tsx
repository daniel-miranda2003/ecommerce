import { getT } from "@lib/i18n/server"
import { Heading, Text } from "@modules/common/components/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = async () => {
  const t = await getT()
  return (
    <div className="py-40 px-2 flex flex-col justify-center items-start" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="font-display text-[2.6rem] leading-[1] tracking-[-0.02em] text-ink"
      >
        {t("cart.empty.title")}
      </Heading>
      <Text className="text-base leading-[1.8] text-ink-muted mt-4 mb-6 max-w-[32rem]">
        {t("cart.empty.message")}
      </Text>
      <div>
        <InteractiveLink href="/store">{t("cart.exploreProducts")}</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
