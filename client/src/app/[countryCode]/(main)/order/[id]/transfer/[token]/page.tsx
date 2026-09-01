import { Heading, Text } from "@modules/common/components/ui"
import TransferActions from "@modules/order/components/transfer-actions"
import TransferImage from "@modules/order/components/transfer-image"
import { getT } from "@lib/i18n/server"

export default async function TransferPage({
  params,
}: {
  params: { id: string; token: string }
}) {
  const { id, token } = params
  const t = await getT()

  return (
    <div className="flex flex-col gap-y-4 items-start w-2/5 mx-auto mt-10 mb-20">
      <TransferImage />
      <div className="flex flex-col gap-y-6">
        <Heading level="h1" className="text-xl text-ink font-display">
          {t("transfer.requestTitle", { id })}
        </Heading>
        <Text className="text-ink-muted">
          {t("transfer.receivedBody", { id })}
        </Text>
        <div className="w-full h-px bg-line" />
        <Text className="text-ink-muted">
          {t("transfer.acceptBody")}
        </Text>
        <Text className="text-ink-muted">
          {t("transfer.declineBody")}
        </Text>
        <div className="w-full h-px bg-line" />
        <TransferActions id={id} token={token} />
      </div>
    </div>
  )
}
