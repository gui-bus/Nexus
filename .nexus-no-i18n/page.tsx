"use client"

import * as React from "react"

import { Button } from "@bloomui-react/components"
import { motion } from "framer-motion"

import { ThemeToggle } from "@/src/components/common/themeToggle"

export default function Page(): React.JSX.Element {
  return (
    <div className="relative min-h-svh w-full overflow-hidden bg-background font-sans text-foreground">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 backdrop-blur-md bg-background/40 border-b border-border/40">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-xl font-bold tracking-tight text-brand-primary">
            Nexus
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <ThemeToggle />
        </motion.div>
      </header>

      <main className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6 md:px-12 text-center max-w-4xl mx-auto">
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-sans text-4xl font-bold tracking-tight sm:text-6xl text-foreground"
          >
            Projeto pronto!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Você já pode adicionar componentes e começar a construir.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center pt-4"
          >
            <Button
              size="lg"
              className="h-12 px-8 rounded-full bg-brand-primary text-white hover:bg-brand-primary/90 transition-all duration-300 font-semibold shadow-md hover:scale-102 active:scale-98 cursor-pointer"
            >
              Botão
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
