"use client"

import { useLocale } from "next-intl"
import ReactCountryFlag from "react-country-flag"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CaretDown } from "@phosphor-icons/react"

export function LanguageSwitcher() {
  const locale = useLocale()

  const handleLanguageChange = (nextLocale: string) => {
    if (nextLocale === locale) return

    // For prefix-less routing, manual cookie setting + reload is the most reliable method
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`

    // Force a full reload to ensure the server-side locale state is updated
    window.location.reload()
  }

  const languages = [
    { code: "pt", name: "Português", countryCode: "BR" },
    { code: "en", name: "English", countryCode: "US" },
  ]

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 px-3">
          <ReactCountryFlag
            countryCode={currentLanguage.countryCode}
            svg
            style={{
              width: "1.2em",
              height: "1.2em",
              borderRadius: "2px",
              objectFit: "cover",
            }}
          />
          <span className="font-medium">{currentLanguage.name}</span>
          <CaretDown
            size={14}
            weight="bold"
            className="text-muted-foreground"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onSelect={() => handleLanguageChange(lang.code)}
            className="flex cursor-pointer items-center gap-3"
          >
            <ReactCountryFlag
              countryCode={lang.countryCode}
              svg
              style={{
                width: "1.2em",
                height: "1.2em",
                borderRadius: "2px",
                objectFit: "cover",
              }}
            />
            <span
              className={locale === lang.code ? "font-bold text-primary" : ""}
            >
              {lang.name}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
