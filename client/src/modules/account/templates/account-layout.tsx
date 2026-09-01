import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"
import { getT } from "@lib/i18n/server"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = async ({
  customer,
  children,
}) => {
  const t = await getT()

  if (!customer) {
    return (
      <div className="flex-1 flex flex-col items-center pt-4 pb-12 small:pt-8 small:pb-16 bg-paper" data-testid="account-page">
        {children}
      </div>
    )
  }

  return (
    <div className="flex-1 py-8 small:py-14 bg-paper" data-testid="account-page">
      <div className="content-container max-w-6xl mx-auto">
        <div className="bg-card border border-line rounded-[6px] shadow-card-hover p-6 small:p-10 flex flex-col gap-10">
          <div className="grid grid-cols-1 small:grid-cols-[220px_1fr] gap-8 small:gap-12 min-h-[480px]">
            <div className="border-b small:border-b-0 small:border-r border-line pb-6 small:pb-0 small:pr-8">
              <AccountNav customer={customer} />
            </div>
            <div className="flex-1">{children}</div>
          </div>

          <div className="flex flex-col small:flex-row items-start small:items-center justify-between border-t border-line pt-8 gap-6">
            <div>
              <h3 className="font-display text-2xl text-ink mb-1">{t("account.gotQuestions")}</h3>
              <p className="text-xs text-ink-muted leading-relaxed max-w-md">
                {t("account.gotQuestionsText")}
              </p>
            </div>
            <div>
              <UnderlineLink href="/customer-service">
                {t("account.customerService")}
              </UnderlineLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
