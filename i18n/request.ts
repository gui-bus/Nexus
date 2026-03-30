import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"

export default getRequestConfig(async ({ locale }) => {
  const currentLocale = locale || routing.defaultLocale

  // Ensure that the locale is valid, or fallback to the default
  const locales = routing.locales as unknown as string[]
  const finalLocale = locales.includes(currentLocale)
    ? currentLocale
    : routing.defaultLocale

  return {
    locale: finalLocale,
    messages: (await import(`../messages/${finalLocale}.json`)).default,
  }
})
