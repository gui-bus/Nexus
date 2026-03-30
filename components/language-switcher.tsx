"use client"

import { useState, useRef, useEffect } from "react"
import { useLocale } from "next-intl"
import ReactCountryFlag from "react-country-flag"
import { CaretDown, Check } from "@phosphor-icons/react"
import { useRouter, usePathname } from "@/i18n/routing"

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: "pt", name: "Português", countryCode: "BR" },
    { code: "en", name: "English", countryCode: "US" },
  ] as const

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0]

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLanguageChange = (nextLocale: "pt" | "en") => {
    if (nextLocale === locale) {
      setIsOpen(false)
      return
    }

    try {
      // 1. Define o cookie manualmente para garantir que o Middleware o leia no próximo request
      // eslint-disable-next-line react-hooks/immutability
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`

      // 2. Tenta a navegação suave via next-intl
      router.replace(pathname, { locale: nextLocale })

      // 3. Força o recarregamento da página para garantir a troca de mensagens no servidor
      // O timeout evita conflitos com a navegação do router
      setTimeout(() => {
        window.location.reload()
      }, 50)
    } catch (error) {
      console.error("Erro ao trocar idioma:", error)
      // Fallback de emergência
      window.location.reload()
    }

    setIsOpen(false)
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <ReactCountryFlag
          countryCode={currentLanguage.countryCode}
          svg
          style={{ width: "1.2em", height: "1.2em", borderRadius: "2px" }}
        />
        <span className="hidden sm:inline">{currentLanguage.name}</span>
        <CaretDown
          size={14}
          weight="bold"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="ring-opacity-5 absolute right-0 z-50 mt-2 w-48 origin-top-right animate-in rounded-md border bg-popover shadow-xl ring-1 ring-black duration-100 zoom-in-95 fade-in focus:outline-none">
          <div className="p-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex w-full items-center justify-between gap-3 rounded-sm px-3 py-2 text-sm transition-colors ${
                  locale === lang.code
                    ? "bg-accent font-semibold text-accent-foreground"
                    : "text-popover-foreground hover:bg-accent/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <ReactCountryFlag
                    countryCode={lang.countryCode}
                    svg
                    style={{
                      width: "1.2em",
                      height: "1.2em",
                      borderRadius: "2px",
                    }}
                  />
                  {lang.name}
                </div>
                {locale === lang.code && (
                  <Check size={14} weight="bold" className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
