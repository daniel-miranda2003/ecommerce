import { getT } from "@lib/i18n/server"
import { Button, Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = async () => {
  const t = await getT()
  return (
    <div className="bg-white flex items-center justify-between">
      <div>
        <Heading level="h2" className="txt-xlarge">
          {t("cart.signInPrompt.title")}
        </Heading>
        <Text className="txt-medium text-ink-muted mt-2">
          {t("cart.signInPrompt.subtitle")}
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="h-10" data-testid="sign-in-button">
            {t("cart.signInPrompt.signIn")}
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
