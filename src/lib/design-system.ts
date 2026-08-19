import type React from "react"

export interface BloomGlobalProps {
  variant?:
    | "default"
    | "bordered"
    | "light"
    | "flat"
    | "ghost"
    | "shadow"
    | "underlined"
    | "glassmorphism"
    | "gradient"
    | "glow"
    | "splitted"
    | "compact"

  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"

  color?:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "danger"

  radius?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"

  startContent?: React.ReactNode

  endContent?: React.ReactNode

  isDisabled?: boolean

  isLoading?: boolean

  loadingText?: string

  isInvalid?: boolean

  errorMessage?: React.ReactNode

  helperText?: React.ReactNode

  disableRipple?: boolean

  hover?: "none" | "scale" | "lift" | "glow" | "border"

  kbdShortcut?: string
}

export type BloomColor = BloomGlobalProps["color"]
export type BloomSize = BloomGlobalProps["size"]
export type BloomRadius = BloomGlobalProps["radius"]
export type BloomVariant = BloomGlobalProps["variant"]

export const designHover = {
  none: "",
  scale: "hover:scale-[1.03] active:scale-[0.97] will-change-transform",
  lift: "hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm will-change-transform",
  glow: "hover:shadow-[0_0_15px_rgba(var(--primary-rgb,59,130,246),0.4)] transition-shadow",
  border: "hover:ring-2 hover:ring-primary/50 transition-shadow",
}

export const designColors = {
  default: {
    default:
      "bg-default text-default-foreground hover:bg-default/80 focus-visible:ring-default/50",
    bordered:
      "border border-default text-default-foreground hover:bg-default/10 focus-visible:ring-default/50",
    light:
      "bg-transparent text-default-foreground hover:bg-default/15 focus-visible:ring-default/50",
    flat: "bg-default/20 text-default-foreground hover:bg-default/30 focus-visible:ring-default/50",
    ghost:
      "bg-transparent border border-default text-default-foreground hover:bg-default hover:text-default-foreground focus-visible:ring-default/50",
    shadow:
      "bg-default text-default-foreground hover:bg-default/80 shadow-md shadow-default/10 focus-visible:ring-default/50",
    link: "bg-transparent text-default-foreground underline hover:opacity-80 border-none",
  },
  primary: {
    default:
      "bg-primary text-primary-foreground hover:opacity-90 focus-visible:ring-primary/50",
    bordered:
      "border border-primary text-primary hover:bg-primary/10 focus-visible:ring-primary/50",
    light:
      "bg-transparent text-primary hover:bg-primary/15 focus-visible:ring-primary/50",
    flat: "bg-primary/20 text-primary hover:bg-primary/30 focus-visible:ring-primary/50",
    ghost:
      "bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-primary/50",
    shadow:
      "bg-primary text-primary-foreground hover:opacity-90 shadow-md shadow-primary/20 focus-visible:ring-primary/50",
    link: "bg-transparent text-primary underline hover:opacity-80 border-none",
  },
  secondary: {
    default:
      "bg-secondary text-secondary-foreground hover:opacity-90 focus-visible:ring-secondary/50",
    bordered:
      "border border-secondary text-secondary dark:text-secondary-foreground hover:bg-secondary/10 focus-visible:ring-secondary/50",
    light:
      "bg-transparent text-secondary dark:text-secondary-foreground hover:bg-secondary/15 focus-visible:ring-secondary/50",
    flat: "bg-secondary/20 text-secondary dark:text-secondary-foreground hover:bg-secondary/30 focus-visible:ring-secondary/50",
    ghost:
      "bg-transparent border border-secondary text-secondary dark:text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-secondary/50",
    shadow:
      "bg-secondary text-secondary-foreground hover:opacity-90 shadow-md shadow-secondary/20 focus-visible:ring-secondary/50",
    link: "bg-transparent text-secondary dark:text-secondary-foreground underline hover:opacity-80 border-none",
  },
  accent: {
    default:
      "bg-accent text-accent-foreground hover:opacity-90 focus-visible:ring-accent/50",
    bordered:
      "border border-accent text-accent hover:bg-accent/10 focus-visible:ring-accent/50",
    light:
      "bg-transparent text-accent hover:bg-accent/15 focus-visible:ring-accent/50",
    flat: "bg-accent/20 text-accent hover:bg-accent/30 focus-visible:ring-accent/50",
    ghost:
      "bg-transparent border border-accent text-accent hover:bg-accent hover:text-accent-foreground focus-visible:ring-accent/50",
    shadow:
      "bg-accent text-accent-foreground hover:opacity-90 shadow-md shadow-accent/20 focus-visible:ring-accent/50",
    link: "bg-transparent text-accent underline hover:opacity-80 border-none",
  },
  success: {
    default:
      "bg-success text-success-foreground hover:opacity-95 focus-visible:ring-success/50",
    bordered:
      "border border-success text-success hover:bg-success/10 focus-visible:ring-success/50",
    light:
      "bg-transparent text-success hover:bg-success/15 focus-visible:ring-success/50",
    flat: "bg-success/20 text-success hover:bg-success/30 focus-visible:ring-success/50",
    ghost:
      "bg-transparent border border-success text-success hover:bg-success hover:text-success-foreground focus-visible:ring-success/50",
    shadow:
      "bg-success text-success-foreground hover:opacity-95 shadow-md shadow-success/20 focus-visible:ring-success/50",
    link: "bg-transparent text-success underline hover:opacity-80 border-none",
  },
  warning: {
    default:
      "bg-warning text-warning-foreground hover:opacity-95 focus-visible:ring-warning/50",
    bordered:
      "border border-warning text-warning hover:bg-warning/10 focus-visible:ring-warning/50",
    light:
      "bg-transparent text-warning hover:bg-warning/15 focus-visible:ring-warning/50",
    flat: "bg-warning/20 text-warning hover:bg-warning/30 focus-visible:ring-warning/50",
    ghost:
      "bg-transparent border border-warning text-warning hover:bg-warning hover:text-warning-foreground focus-visible:ring-warning/50",
    shadow:
      "bg-warning text-warning-foreground hover:opacity-95 shadow-md shadow-warning/20 focus-visible:ring-warning/50",
    link: "bg-transparent text-warning underline hover:opacity-80 border-none",
  },
  danger: {
    default:
      "bg-danger text-danger-foreground hover:opacity-95 focus-visible:ring-danger/50",
    bordered:
      "border border-danger text-danger hover:bg-danger/10 focus-visible:ring-danger/50",
    light:
      "bg-transparent text-danger hover:bg-danger/15 focus-visible:ring-danger/50",
    flat: "bg-danger/20 text-danger hover:bg-danger/30 focus-visible:ring-danger/50",
    ghost:
      "bg-transparent border border-danger text-danger hover:bg-danger hover:text-danger-foreground focus-visible:ring-danger/50",
    shadow:
      "bg-danger text-danger-foreground hover:opacity-95 shadow-md shadow-danger/20 focus-visible:ring-danger/50",
    link: "bg-transparent text-danger underline hover:opacity-80 border-none",
  },
}

export const designSizes = {
  xs: "px-2 py-1 text-xs h-6",
  sm: "px-3 py-1.5 text-sm h-7",
  md: "px-4 py-2 text-sm h-9",
  lg: "px-5 py-2.5 text-base h-11",
  xl: "px-6 py-3 text-lg h-12",
  "2xl": "px-7 py-3.5 text-xl h-14",
  "3xl": "px-8 py-4 text-2xl h-16",
}

export const designRadius = {
  none: "rounded-none",
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
}
