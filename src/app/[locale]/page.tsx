import * as React from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/src/components/ui/button"
import { LanguageSwitcher } from "@/src/components/common/languageSwitcher"
import { ThemeToggle } from "@/src/components/common/themeToggle"

export default function Page(): React.JSX.Element {
  const t = useTranslations("Index")

  return (
    <div className="flex min-h-svh flex-col p-6">
      <div className="mb-4 flex justify-end">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">{t("title")}</h1>
          <p>{t("description")}</p>
          <p>{t("added_component")}</p>
          <Button className="mt-2">{t("button")}</Button>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  )
}
