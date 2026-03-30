"use client"

import { useLocale } from "next-intl"
import ReactCountryFlag from "react-country-flag"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "@/i18n/routing"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CaretDown } from "@phosphor-icons/react"

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (nextLocale: "pt" | "en") => {
    if (nextLocale === locale) return

    // Using the customized useRouter from @/i18n/routing handles the
    // locale change even when prefix is 'never' by updating the cookie
    // and performing a refresh.
    router.push(pathname, { locale: nextLocale })
  }

  const languages = [
    { code: "pt", name: "Português", countryCode: "BR" },
    { code: "en", name: "English", countryCode: "US" },
  ] as const

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
            onClick={() => handleLanguageChange(lang.code)}
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
