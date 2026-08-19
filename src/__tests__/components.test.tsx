import * as React from "react"

import { Button } from "@bloomui-react/components"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

describe("Components", () => {
  describe("Button", () => {
    it("renders correctly with children", () => {
      render(<Button>Click me</Button>)
      expect(screen.getByText("Click me")).toBeInTheDocument()
    })
  })
})
