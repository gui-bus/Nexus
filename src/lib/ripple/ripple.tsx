"use client"

import * as React from "react"

import { cn } from "../utils/utils"

interface RippleProps {
  x: number
  y: number
  size: number
  onComplete: () => void
}

export const Ripple = React.memo(({ x, y, size, onComplete }: RippleProps) => {
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 600)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <span
      className={cn("ripple absolute rounded-full bg-white/30 animate-ripple")}
      style={{
        width: size,
        height: size,
        left: x - size / 2,
        top: y - size / 2,
      }}
    />
  )
})

Ripple.displayName = "Ripple"
