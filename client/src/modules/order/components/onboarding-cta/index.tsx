"use client"

import { resetOnboardingState } from "@lib/data/onboarding"
import { Button, Container, Text } from "@modules/common/components/ui"
import { useI18n } from "@lib/i18n/provider"

const OnboardingCta = ({ orderId }: { orderId: string }) => {
  const { t } = useI18n()
  return (
    <Container className="max-w-4xl h-full bg-paper-warm w-full">
      <div className="flex flex-col gap-y-4 center p-4 md:items-center">
        <Text className="text-ink-soft text-xl">
          {t("order.testOrderCreated")}
        </Text>
        <Text className="text-ink-muted text-small-regular">
          {t("order.testContinue")}
        </Text>
        <Button
          className="w-fit"
          size="large"
          onClick={() => resetOnboardingState(orderId)}
        >
          {t("order.completeSetup")}
        </Button>
      </div>
    </Container>
  )
}

export default OnboardingCta
