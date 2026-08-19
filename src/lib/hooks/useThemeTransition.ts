import { useCallback } from "react"

import { useTheme } from "next-themes"

interface UseThemeTransition {
  theme: string | undefined
  resolvedTheme: string | undefined
  toggleTheme: () => void
}

export function useThemeTransition(): UseThemeTransition {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const toggleTheme = useCallback((): void => {
    if (typeof window === "undefined") {
      return
    }

    const currentTheme = resolvedTheme || theme
    const nextTheme = currentTheme === "light" ? "dark" : "light"

    if (!document.startViewTransition) {
      setTheme(nextTheme)
      return
    }

    document.startViewTransition(async () => {
      setTheme(nextTheme)
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
  }, [theme, resolvedTheme, setTheme])

  return { theme, resolvedTheme, toggleTheme }
}
