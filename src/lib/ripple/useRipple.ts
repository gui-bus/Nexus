"use client"

import * as React from "react"

export const useRipples = () => {
  const [ripples, setRipples] = React.useState<
    { x: number; y: number; size: number; id: number }[]
  >([])

  const addRipple = React.useCallback((x: number, y: number, size: number) => {
    const id = Date.now() + Math.random()
    setRipples((prev) => [...prev, { x, y, size, id }])
  }, [])

  const removeRipple = React.useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id))
  }, [])

  return { ripples, addRipple, removeRipple }
}
