"use client"

import { useLocale } from "next-intl"
import ReactCountryFlag from "react-country-flag"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()

  const toggleLanguage = () => {
    const nextLocale = locale === "pt" ? "en" : "pt"

    // For prefix-less, handle this via NEXT_LOCALE cookie
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`
    router.refresh()
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2"
    >
      <ReactCountryFlag
        countryCode={locale === "pt" ? "US" : "BR"}
        svg
        style={{
          width: "1.2em",
          height: "1.2em",
        }}
        title={locale === "pt" ? "English" : "Português"}
      />
      {locale === "pt" ? "English" : "Português"}
    </Button>
  )
}
