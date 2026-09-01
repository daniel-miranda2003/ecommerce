import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"
import { useI18n } from "@lib/i18n/provider"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)
  const { t } = useI18n()

  return (
    <div
      className="w-full flex flex-col items-center"
      data-testid="login-page"
    >
      <h1 className="font-display text-2xl small:text-3xl text-ink font-normal tracking-[-0.02em] mb-1.5 text-center">
        {t("account.welcomeBack")}
      </h1>
      <p className="text-center text-xs small:text-sm text-ink-muted mb-5 leading-relaxed">
        {t("account.welcomeBackText")}
      </p>

      {message?.state === "verification_required" && (
        <div
          className="w-full mb-6 text-center text-xs text-ink-soft bg-[#EDF3EC] border border-[#346538]/20 rounded-[4px] p-4"
          data-testid="login-verification-message"
        >
          {t("account.verificationLinkSent", { email: "{{email}}" })
            .split("{{email}}")
            .map((part, i) =>
              i % 2 === 0 ? part : <strong key={i}>{message.email}</strong>
            )}
        </div>
      )}

      <form className="w-full flex flex-col gap-y-4" action={formAction}>
        <Input
          label={t("account.email")}
          name="email"
          type="email"
          title="Enter a valid email address."
          autoComplete="email"
          required
          data-testid="email-input"
        />
        <Input
          label={t("account.password")}
          name="password"
          type="password"
          autoComplete="current-password"
          required
          data-testid="password-input"
        />

        <ErrorMessage
          error={message?.state === "error" ? message.error : null}
          data-testid="login-error-message"
        />

        <SubmitButton
          data-testid="sign-in-button"
          className="w-full h-11 bg-ink text-white font-medium text-sm tracking-[0.04em] rounded-[4px] hover:bg-[#333333] transition-colors duration-200 btn-press mt-2"
        >
          {t("account.signIn")}
        </SubmitButton>
      </form>
    </div>
  )
}

export default Login
