"use client"

import * as React from "react"

import Image from "next/image"

import { motion } from "framer-motion"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip/tooltip"

import { ThemeToggle } from "@/src/components/common/themeToggle"

import { useThemeTransition } from "@/src/lib/hooks/useThemeTransition"

export default function Page(): React.JSX.Element {
  const { resolvedTheme } = useThemeTransition()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setMounted(true)
    })
    return () => cancelAnimationFrame(timer)
  }, [])

  const logoSrc =
    mounted && resolvedTheme === "dark"
      ? "/logos/logo_white.svg"
      : "/logos/logo_black.svg"
  const techTheme = mounted && resolvedTheme === "dark" ? "Dark" : "Light"

  const techs = [
    "React",
    "NextJS",
    "Typescript",
    "TailwindCSS",
    "Bloom",
    "Framer Motion",
    "React Hook Form",
    "Zod",
    "Tanstack",
    "nextintl",
    "pnpm",
    "Vitest",
    "Playwright",
    "Husky",
    "Zustand",
  ]

  return (
    <div className="relative min-h-svh w-full overflow-hidden bg-[#F1F1F1] dark:bg-[#161616] font-sans text-foreground">
      <main className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6 py-16 md:px-12 text-center max-w-4xl mx-auto">
        <div className="flex flex-col items-center space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={logoSrc}
              alt="Nexus Logo"
              width={120}
              height={120}
              className="h-24 sm:h-28 w-auto"
              priority
            />
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-sans text-3xl font-bold tracking-tight sm:text-5xl text-foreground"
            >
              Projeto pronto!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto"
            >
              Você já pode adicionar componentes e começar a construir.
            </motion.p>
          </div>

          <TooltipProvider>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 max-w-2xl mx-auto pt-4"
            >
              {techs.map((tech) => (
                <Tooltip key={tech} delayDuration={100}>
                  <TooltipTrigger asChild>
                    <Image
                      src={`https://raw.githubusercontent.com/gui-bus/TechIcons/main/${techTheme}/${encodeURIComponent(tech)}.svg`}
                      alt={tech}
                      width={48}
                      height={48}
                      unoptimized
                      className="h-10 w-10 sm:h-12 sm:w-12 hover:scale-110 transition-transform duration-200 cursor-pointer"
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    variant="flat"
                    color="default"
                    className="bg-popover text-popover-foreground border border-border/40 text-xs px-2.5 py-1"
                  >
                    {tech}
                  </TooltipContent>
                </Tooltip>
              ))}
            </motion.div>
          </TooltipProvider>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 pt-4"
          >
            <ThemeToggle />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 w-full max-w-md mx-auto text-center space-y-2"
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              Desenvolvido com a biblioteca de componentes{" "}
              <a
                href="https://bloom.guibus.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-primary hover:text-brand-primary/80 transition-colors"
              >
                Bloom UI
              </a>
              .
            </p>
            <p className="text-xs text-muted-foreground/60 leading-relaxed">
              Se quiser começar seu projeto do zero limpando os logos e layouts
              do Nexus, execute{" "}
              <code className="px-1.5 py-0.5 rounded bg-muted/60 font-mono text-[10px] border border-border/40">
                pnpm cleanup
              </code>{" "}
              no terminal.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
