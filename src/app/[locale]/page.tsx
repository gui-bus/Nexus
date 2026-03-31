"use client"

import * as React from "react"

import { useTranslations } from "next-intl"

import { motion } from "framer-motion"

import { Button } from "@/src/components/ui/button"

import { LanguageSwitcher } from "@/src/components/common/languageSwitcher"
import { ThemeToggle } from "@/src/components/common/themeToggle"

export default function Page(): React.JSX.Element {
  const t = useTranslations("Index")

  return (
    <div className="relative min-h-svh w-full overflow-hidden bg-background font-sans text-foreground selection:bg-brand-primary selection:text-white uppercase tracking-tighter">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="h-2.5 w-2.5 rounded-full bg-brand-primary" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Core Build 1.0.0
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <LanguageSwitcher />
          <ThemeToggle />
        </motion.div>
      </header>

      <main className="relative z-10 flex min-h-svh flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-12 pt-20">
        <div className="flex-1 space-y-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-none border border-brand-primary/30 bg-brand-primary/5 text-[10px] font-bold uppercase tracking-[0.4em] text-brand-primary">
              Elite Technical Template
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-heading text-6xl font-black uppercase leading-[0.85] tracking-[-0.05em] sm:text-8xl lg:text-[10rem] border-l-8 border-brand-primary pl-6"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-[520px] normal-case tracking-normal"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start gap-8 pt-6"
          >
            <Button
              size="lg"
              className="h-16 px-12 rounded-none bg-foreground text-background hover:bg-brand-primary hover:text-white transition-all duration-500 font-black uppercase text-xs tracking-[0.2em]"
            >
              {t("button")}
            </Button>

            <div className="flex flex-col justify-center">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/50 mb-1">
                Status Protocol
              </span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                </span>
                <span className="text-[11px] text-brand-primary font-mono tracking-widest leading-none">
                  System_Online
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: "circOut" }}
          className="relative hidden xl:flex items-center justify-center w-[450px] h-[450px]"
        >
          <div className="absolute inset-0 rounded-full border border-dashed border-border/20 animate-[spin_30s_linear_infinite]" />
          <div className="absolute inset-16 rounded-full border border-brand-primary/10 animate-[spin_20s_linear_infinite_reverse]" />

          <div className="relative h-64 w-64 bg-background border border-border shadow-[20px_20px_0px_0px_rgba(var(--brand-primary),0.1)] flex items-center justify-center group overflow-hidden">
            <div className="absolute inset-0 bg-brand-primary opacity-0 group-hover:opacity-5 transition-opacity duration-700" />
            <div className="absolute top-0 left-0 w-full h-full p-4 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[10px] text-brand-primary opacity-40">
                  01
                </span>
                <div className="h-4 w-4 border-t border-r border-brand-primary/40" />
              </div>
              <div className="flex justify-between items-end">
                <div className="h-4 w-4 border-b border-l border-brand-primary/40" />
                <span className="font-mono text-[8px] text-muted-foreground/30">
                  SEC_ALPHA_UNIT
                </span>
              </div>
            </div>
            <div className="h-32 w-32 border border-brand-primary/20 rotate-45 group-hover:rotate-90 transition-transform duration-1000" />
          </div>
        </motion.div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-50 flex items-end justify-between px-6 py-4 md:px-12 md:py-8 pointer-events-none">
        <div className="flex flex-col gap-1.5">
          <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-muted-foreground/30">
            Protocol Controls
          </p>
          <p className="font-mono text-[9px] text-muted-foreground/50 uppercase tracking-[0.2em]">
            {t("toggle_dark")}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1.5 text-right">
          <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-muted-foreground/30">
            System Hash
          </p>
          <p className="font-mono text-[9px] text-muted-foreground/50 uppercase tracking-[0.2em]">
            Elite_Node_V16
          </p>
        </div>
      </footer>
    </div>
  )
}
