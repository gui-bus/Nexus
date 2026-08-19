"use client"

import * as React from "react"

import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { type VariantProps, cva } from "class-variance-authority"

import { designRadius } from "../../../lib/design-system"
import { cn } from "../../../lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

export interface TooltipProps extends React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Root
> {
  delayDuration?: number
  closeDelay?: number
}

const Tooltip = ({
  delayDuration = 200,
  closeDelay,
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  ...props
}: TooltipProps) => {
  const [localOpen, setLocalOpen] = React.useState(defaultOpen || false)
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  )

  const open = controlledOpen !== undefined ? controlledOpen : localOpen

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (nextOpen) {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current)
          closeTimeoutRef.current = null
        }
        if (controlledOpen === undefined) {
          setLocalOpen(true)
        }
        onOpenChange?.(true)
      } else {
        if (closeDelay) {
          if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current)
          }
          closeTimeoutRef.current = setTimeout(() => {
            if (controlledOpen === undefined) {
              setLocalOpen(false)
            }
            onOpenChange?.(false)
            closeTimeoutRef.current = null
          }, closeDelay)
        } else {
          if (controlledOpen === undefined) {
            setLocalOpen(false)
          }
          onOpenChange?.(false)
        }
      }
    },
    [closeDelay, controlledOpen, onOpenChange]
  )

  React.useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  return (
    <TooltipPrimitive.Root
      delayDuration={delayDuration}
      open={open}
      onOpenChange={handleOpenChange}
      {...props}
    />
  )
}
Tooltip.displayName = TooltipPrimitive.Root.displayName

const TooltipTrigger = TooltipPrimitive.Trigger

const tooltipContentVariants = cva(
  "z-50 overflow-hidden px-3 py-1.5 font-semibold shadow-xl select-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "",
        bordered: "bg-white dark:bg-zinc-900 border-2",
        flat: "",
      },
      color: {
        default: "",
        primary: "",
        secondary: "",
        accent: "",
        success: "",
        warning: "",
        danger: "",
      },
      size: {
        sm: "px-2 py-1 text-[10px] gap-1",
        md: "px-3 py-1.5 text-xs gap-1.5",
        lg: "px-4 py-2 text-sm gap-2",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        color: "default",
        className: "bg-default text-default-foreground",
      },
      {
        variant: "default",
        color: "primary",
        className: "bg-primary text-primary-foreground",
      },
      {
        variant: "default",
        color: "secondary",
        className: "bg-secondary text-secondary-foreground",
      },
      {
        variant: "default",
        color: "accent",
        className: "bg-accent text-accent-foreground",
      },
      {
        variant: "default",
        color: "success",
        className: "bg-success text-success-foreground",
      },
      {
        variant: "default",
        color: "warning",
        className: "bg-warning text-warning-foreground",
      },
      {
        variant: "default",
        color: "danger",
        className: "bg-danger text-danger-foreground",
      },

      {
        variant: "bordered",
        color: "default",
        className:
          "border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100",
      },
      {
        variant: "bordered",
        color: "primary",
        className: "border-primary text-primary",
      },
      {
        variant: "bordered",
        color: "secondary",
        className:
          "border-secondary text-secondary dark:text-secondary-foreground",
      },
      {
        variant: "bordered",
        color: "accent",
        className: "border-accent text-accent",
      },
      {
        variant: "bordered",
        color: "success",
        className: "border-success text-success",
      },
      {
        variant: "bordered",
        color: "warning",
        className: "border-warning text-warning",
      },
      {
        variant: "bordered",
        color: "danger",
        className: "border-danger text-danger",
      },

      {
        variant: "flat",
        color: "default",
        className:
          "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
      },
      {
        variant: "flat",
        color: "primary",
        className: "bg-primary/10 text-primary",
      },
      {
        variant: "flat",
        color: "secondary",
        className:
          "bg-secondary/10 text-secondary dark:text-secondary-foreground",
      },
      {
        variant: "flat",
        color: "accent",
        className: "bg-accent/10 text-accent",
      },
      {
        variant: "flat",
        color: "success",
        className: "bg-success/10 text-success",
      },
      {
        variant: "flat",
        color: "warning",
        className: "bg-warning/10 text-warning",
      },
      {
        variant: "flat",
        color: "danger",
        className: "bg-danger/10 text-danger",
      },
    ],
    defaultVariants: {
      variant: "default",
      color: "default",
      size: "md",
    },
  }
)

export interface TooltipContentProps
  extends
    Omit<
      React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
      "color" | "size"
    >,
    VariantProps<typeof tooltipContentVariants> {
  showArrow?: boolean
  interactive?: boolean
  radius?: keyof typeof designRadius
}

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(
  (
    {
      className,
      sideOffset = 6,
      showArrow = true,
      interactive = false,
      variant = "default",
      color = "default",
      size = "md",
      radius = "xl",
      children,
      ...props
    },
    ref
  ) => {
    const arrowFillClass = React.useMemo(() => {
      if (variant === "flat") {
        switch (color) {
          case "primary":
            return "fill-primary/10"
          case "secondary":
            return "fill-secondary/10"
          case "accent":
            return "fill-accent/10"
          case "success":
            return "fill-success/10"
          case "warning":
            return "fill-warning/10"
          case "danger":
            return "fill-danger/10"
          default:
            return "fill-zinc-100 dark:fill-zinc-800"
        }
      }
      if (variant === "bordered") {
        return "fill-white dark:fill-zinc-900"
      }

      switch (color) {
        case "primary":
          return "fill-primary"
        case "secondary":
          return "fill-secondary"
        case "accent":
          return "fill-accent"
        case "success":
          return "fill-success"
        case "warning":
          return "fill-warning"
        case "danger":
          return "fill-danger"
        default:
          return "fill-default"
      }
    }, [variant, color])

    const arrowStrokeClass = React.useMemo(() => {
      if (variant !== "bordered") return ""
      switch (color) {
        case "primary":
          return "stroke-primary"
        case "secondary":
          return "stroke-secondary"
        case "accent":
          return "stroke-accent"
        case "success":
          return "stroke-success"
        case "warning":
          return "stroke-warning"
        case "danger":
          return "stroke-danger"
        default:
          return "stroke-zinc-350 dark:stroke-zinc-700"
      }
    }, [variant, color])

    return (
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          className={cn(
            tooltipContentVariants({ variant, color, size }),
            designRadius[radius],
            interactive &&
              "pointer-events-auto select-text max-w-xs p-3 font-normal",
            className
          )}
          {...props}
        >
          {children}
          {showArrow && (
            <TooltipPrimitive.Arrow
              className={cn(
                "size-2.5",
                arrowFillClass,
                arrowStrokeClass,
                variant === "bordered" && "stroke-[1.5px]"
              )}
            />
          )}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    )
  }
)
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
