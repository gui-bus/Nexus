import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"

export default getRequestConfig(async ({ locale }) => {
  // Use the requested locale if it's valid, otherwise fall back to the default
  const validLocale: string = (routing.locales as readonly string[]).includes(
    locale
  )
    ? locale
    : routing.defaultLocale

  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default,
  }
})
