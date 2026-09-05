import { Button, Container, Text } from "@modules/common/components/ui"
import { cookies as nextCookies } from "next/headers"
import { getT } from "@lib/i18n/server"

async function ProductOnboardingCta() {
  const cookies = await nextCookies()
  const t = await getT()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  if (!isOnboarding) {
    return null
  }

  return (
    <Container className="max-w-4xl h-full bg-paper-warm w-full p-8">
      <div className="flex flex-col gap-y-4 center">
        <Text className="text-ink-soft text-xl">
          {t("product.demoCreated")}
        </Text>
        <Text className="text-ink-muted text-small-regular">
          {t("product.demoContinue")}
        </Text>
        <a href="http://localhost:7001/a/orders?onboarding_step=create_order_nextjs">
          <Button className="w-full">{t("order.completeSetup")}</Button>
        </a>
      </div>
    </Container>
  )
}

export default ProductOnboardingCta
