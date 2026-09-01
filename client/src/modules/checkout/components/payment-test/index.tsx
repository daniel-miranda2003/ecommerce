import { useI18n } from "@lib/i18n/provider"
import { Badge } from "@modules/common/components/ui"

const PaymentTest = ({ className }: { className?: string }) => {
  const { t } = useI18n()
  return (
    <Badge color="orange" className={className}>
      <span className="font-semibold">{t("checkout.payment.attention")}</span>{" "}
      {t("checkout.payment.testingOnly")}
    </Badge>
  )
}

export default PaymentTest
