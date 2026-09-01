import { declineTransferRequest } from "@lib/data/orders"
import { Heading, Text } from "@modules/common/components/ui"
import TransferImage from "@modules/order/components/transfer-image"
import { getT } from "@lib/i18n/server"

export default async function TransferPage({
  params,
}: {
  params: { id: string; token: string }
}) {
  const { id, token } = params
  const t = await getT()

  const { success, error } = await declineTransferRequest(id, token)

  return (
    <div className="flex flex-col gap-y-4 items-start w-2/5 mx-auto mt-10 mb-20">
      <TransferImage />
      <div className="flex flex-col gap-y-6">
        {success && (
          <>
            <Heading level="h1" className="text-xl text-ink font-display">
              {t("transfer.declinedTitle")}
            </Heading>
            <Text className="text-ink-muted">
              {t("transfer.declinedBody", { id })}
            </Text>
          </>
        )}
        {!success && (
          <>
            <Text className="text-ink-muted">
              {t("transfer.declineError")}
            </Text>
            {error && (
              <Text className="text-red-500">{t("transfer.errorMessage", { error })}</Text>
            )}
          </>
        )}
      </div>
    </div>
  )
}
