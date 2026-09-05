"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"
import { useI18n } from "@lib/i18n/provider"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)
  const { t } = useI18n()

  return (
    <div
      className="w-full flex flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="font-display text-2xl small:text-3xl text-ink font-normal tracking-[-0.02em] mb-1.5 text-center">
        {t("account.becomeMember")}
      </h1>
      <p className="text-center text-xs small:text-sm text-ink-muted mb-5 leading-relaxed">
        {t("account.createMemberProfile")}
      </p>

      {message?.state === "verification_required" && (
        <div
          className="w-full mb-6 text-center text-xs text-ink-soft bg-accent-green-bg border border-accent-green-fg/20 rounded-base p-4"
          data-testid="register-verification-message"
        >
          {t("account.verificationLinkSentCheck", { email: "{{email}}" })
            .split("{{email}}")
            .map((part, i) =>
              i % 2 === 0 ? part : <strong key={i}>{message.email}</strong>
            )}
        </div>
      )}

      <form className="w-full flex flex-col gap-y-4" action={formAction}>
        <div className="grid grid-cols-2 gap-3 w-full">
          <Input
            label={t("checkout.field.firstName")}
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label={t("checkout.field.lastName")}
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
        </div>

        <Input
          label={t("account.email")}
          name="email"
          required
          type="email"
          autoComplete="email"
          data-testid="email-input"
        />
        <Input
          label={t("account.phone")}
          name="phone"
          type="tel"
          autoComplete="tel"
          data-testid="phone-input"
        />
        <Input
          label={t("account.password")}
          name="password"
          required
          type="password"
          autoComplete="new-password"
          data-testid="password-input"
        />

        <ErrorMessage
          error={message?.state === "error" ? message.error : null}
          data-testid="register-error"
        />

        <p className="text-center text-[11px] text-ink-muted leading-normal mt-1">
          {t("account.byCreating")}{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="text-ink underline underline-offset-2 hover:text-ink-soft transition-colors"
          >
            {t("account.privacyPolicy")}
          </LocalizedClientLink>{" "}
          {t("account.and")}{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="text-ink underline underline-offset-2 hover:text-ink-soft transition-colors"
          >
            {t("account.termsOfUse")}
          </LocalizedClientLink>
          .
        </p>

        <SubmitButton
          className="w-full h-11 bg-ink text-white font-medium text-sm tracking-[0.04em] rounded-base hover:bg-ink-soft transition-colors duration-200 btn-press mt-2"
          data-testid="register-button"
        >
          {t("account.join")}
        </SubmitButton>
      </form>
    </div>
  )
}

export default Register
