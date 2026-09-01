"use client"

import { useI18n } from "@lib/i18n/provider"

const ERROR_PATTERNS: Array<{ pattern: RegExp; key: string }> = [
  { pattern: /invalid email or password/i, key: "error.invalidEmailOrPassword" },
  { pattern: /unauthorized/i, key: "error.invalidEmailOrPassword" },
  { pattern: /identity with email already exists/i, key: "error.identityAlreadyExists" },
  { pattern: /user already exists/i, key: "error.identityAlreadyExists" },
  { pattern: /email already in use/i, key: "error.emailAlreadyInUse" },
]

const ErrorMessage = ({ error, 'data-testid': dataTestid }: { error?: string | null, 'data-testid'?: string }) => {
  const { t } = useI18n()

  if (!error) {
    return null
  }

  let displayError = error

  // Check if error matches any known pattern and translate it
  for (const { pattern, key } of ERROR_PATTERNS) {
    if (pattern.test(error)) {
      displayError = t(key)
      break
    }
  }

  // If no pattern matched, check if raw string exists as translation key
  if (displayError === error) {
    const directTranslation = t(error)
    if (directTranslation !== error) {
      displayError = directTranslation
    } else {
      // Clean up raw Error: prefix if un-translated
      displayError = error.replace(/^Error:\s*/i, "")
    }
  }

  return (
    <div className="pt-2 text-rose-500 text-xs font-normal" data-testid={dataTestid}>
      <span>{displayError}</span>
    </div>
  )
}

export default ErrorMessage
