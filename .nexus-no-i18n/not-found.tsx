import * as React from "react"

import Link from "next/link"

import { Button } from "@/src/components/ui/button/button"

export default function NotFound(): React.JSX.Element {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        404 - Página não encontrada
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        A página que você está procurando não existe.
      </p>
      <div className="mt-8">
        <Link href="/">
          <Button className="h-10 px-6 rounded-full bg-brand-primary text-white hover:bg-brand-primary/90 transition-all duration-200 cursor-pointer">
            Voltar ao início
          </Button>
        </Link>
      </div>
    </div>
  )
}
