import { getLocaleHeader } from "@lib/util/get-locale-header"
import Medusa, { FetchArgs, FetchInput } from "@medusajs/js-sdk"

const isBrowser = typeof window !== "undefined"
  
let MEDUSA_BACKEND_URL =
  (isBrowser
    ? process.env.NEXT_PUBLIC_MEDUSA_PUBLIC_BACKEND_URL
    : process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) || "http://localhost:9000"

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: false,
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})

const originalFetch = sdk.client.fetch.bind(sdk.client)

sdk.client.fetch = async <T>(
  input: FetchInput,
  init?: FetchArgs
): Promise<T> => {
  const headers = init?.headers ?? {}
  let localeHeader: Record<string, string | null> | undefined
  try {
    localeHeader = await getLocaleHeader()
    headers["x-medusa-locale"] ??= localeHeader["x-medusa-locale"]
  } catch {}

  const newHeaders = {
    ...localeHeader,
    ...headers,
  }

  const method = (init?.method || "GET").toUpperCase()
  const isGet = method === "GET"
  const nextOptions = init?.next ?? (isGet ? { revalidate: 3600 } : undefined)

  init = {
    ...init,
    headers: newHeaders,
    ...(nextOptions ? { next: nextOptions } : {}),
  }
  return originalFetch(input, init)
}
