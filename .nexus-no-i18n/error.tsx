"use client"

import * as React from "react"

import { Button } from "@bloomui-react/components"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: ErrorProps): React.JSX.Element {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Algo deu errado!
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Ocorreu um erro inesperado.
      </p>
      <div className="mt-8">
        <Button
          onClick={() => reset()}
          className="h-10 px-6 rounded-full bg-brand-primary text-white hover:bg-brand-primary/90 transition-all duration-200 cursor-pointer"
        >
          Tentar novamente
        </Button>
      </div>
    </div>
  )
}
