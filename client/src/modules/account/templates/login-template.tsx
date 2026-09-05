"use client"

import { useState } from "react"
import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"
import { useI18n } from "@lib/i18n/provider"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState<LOGIN_VIEW>(LOGIN_VIEW.SIGN_IN)
  const { t } = useI18n()

  return (
    <div className="content-container relative z-10 flex flex-col items-center py-0">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[32rem] w-[32rem] rounded-full opacity-[0.03] blur-[140px] bg-[#D9B98C]"
      />

      <div className="w-full max-w-md flex flex-col items-center animate-reveal">
        <p className="eyebrow mb-2">{t("account.eyebrowLogin")}</p>
        <div className="w-full flex border-b border-line mb-5">
          <button
            type="button"
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className={`flex-1 py-3 text-xs tracking-[0.08em] uppercase transition-colors duration-200 border-b-2 -mb-px text-center ${
              currentView === LOGIN_VIEW.SIGN_IN
                ? "border-ink font-semibold text-ink"
                : "border-transparent font-normal text-ink-muted hover:text-ink"
            }`}
            data-testid="sign-in-tab"
          >
            {t("account.signIn")}
          </button>
          <button
            type="button"
            onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
            className={`flex-1 py-3 text-xs tracking-[0.08em] uppercase transition-colors duration-200 border-b-2 -mb-px text-center ${
              currentView === LOGIN_VIEW.REGISTER
                ? "border-ink font-semibold text-ink"
                : "border-transparent font-normal text-ink-muted hover:text-ink"
            }`}
            data-testid="register-tab"
          >
            {t("account.createAccount")}
          </button>
        </div>
        <div className="w-full bg-card border border-line p-6 small:p-8 rounded-base shadow-card-hover transition-all duration-300">
          {currentView === LOGIN_VIEW.SIGN_IN ? (
            <Login setCurrentView={setCurrentView} />
          ) : (
            <Register setCurrentView={setCurrentView} />
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginTemplate
