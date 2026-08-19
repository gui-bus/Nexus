"use client"

import * as React from "react"

import { Icon } from "@iconify/react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"

import { Ripple } from "@/src/lib/ripple/ripple"
import { useRipples } from "@/src/lib/ripple/useRipple"
import { cn } from "@/src/lib/utils/utils"

import {
  designColors,
  designRadius,
  designSizes,
} from "../../../lib/design-system"

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
type ButtonRadius =
  "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"
type ButtonColor =
  | "accent"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "default"

type ButtonHover = "scale" | "lift"

type ButtonBaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonBaseVariants> & {
    asChild?: boolean
    isLoading?: boolean
    loadingText?: string
    loadingIcon?: React.ReactNode
    isDisabled?: boolean
    isFullWidth?: boolean
    startContent?: React.ReactNode
    endContent?: React.ReactNode
    badgeContent?: string
    badgePosition?: "start" | "end"
    badgeCustomClassname?: string
    hover?: ButtonHover
    size?: ButtonSize
    color?: ButtonColor
    radius?: ButtonRadius
    disableRipple?: boolean
    isCopy?: boolean
    copyText?: string
  }

type IconOnlyProps = {
  isIconOnly: true
  ariaLabel: string
}

type NormalButtonProps = {
  isIconOnly?: false
  ariaLabel?: string
}

export type ButtonProps = ButtonBaseProps & (IconOnlyProps | NormalButtonProps)

const buttonBaseVariants = cva(
  "relative inline-flex items-center justify-center gap-1.5 font-medium transition-all duration-200 ease-in-out outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl",
  {
    variants: {
      size: designSizes,
      radius: designRadius,
      variant: {
        default: "shadow-md",
        bordered: "bg-transparent border-2 border-teal-300 shadow-sm",
        light: "bg-transparent shadow-none border border-transparent",
        flat: "bg-transparent shadow-none border border-transparent",
        ghost: "bg-transparent border-2 border-teal-300 shadow-sm",
        shadow: "shadow-lg",
        link: "bg-transparent underline text-sky-600 hover:text-sky-500 shadow-none border-none",
      },
      hover: {
        scale: "hover:scale-[1.03] active:scale-[0.97] will-change-transform",
        lift: "hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm will-change-transform",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
)

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      variant,
      isLoading = false,
      loadingText,
      loadingIcon,
      isDisabled = false,
      isFullWidth = false,
      startContent,
      endContent,
      badgeContent,
      badgePosition = "end",
      badgeCustomClassname,
      color = "default",
      radius = "xl",
      size = "md",
      hover = "scale",
      disableRipple = false,
      disabled,
      children,
      className,
      onClick,
      type,
      isIconOnly = false,
      ariaLabel,
      isCopy = false,
      copyText,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const { ripples, addRipple, removeRipple } = useRipples()

    const isEffectivelyDisabled = isDisabled || disabled
    const nativeDisabled = !asChild ? isEffectivelyDisabled : undefined
    const ariaDisabled = isEffectivelyDisabled || isLoading || undefined

    const [copied, setCopied] = React.useState(false)

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isEffectivelyDisabled || isLoading) return

        if (isCopy) {
          const textToCopy =
            copyText || (typeof children === "string" ? children : "")
          if (textToCopy) {
            navigator.clipboard.writeText(textToCopy)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          }
        }

        if (!disableRipple) {
          const rect = e.currentTarget.getBoundingClientRect()
          const size = Math.max(rect.width, rect.height)
          addRipple(e.clientX - rect.left, e.clientY - rect.top, size)
        }

        onClick?.(e)
      },
      [
        isEffectivelyDisabled,
        isLoading,
        isCopy,
        copyText,
        children,
        disableRipple,
        addRipple,
        onClick,
      ]
    )

    const activeVariant = variant || "default"

    const [drawCheckmark, setDrawCheckmark] = React.useState(false)

    React.useEffect(() => {
      if (copied) {
        const timeout = setTimeout(() => setDrawCheckmark(true), 50)
        return () => clearTimeout(timeout)
      }
      setDrawCheckmark(false)
    }, [copied])

    const displayedStartContent = isCopy ? (
      copied ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5 text-emerald-400"
        >
          <path
            d="M20 6L9 17L4 12"
            style={{
              strokeDasharray: 22,
              strokeDashoffset: drawCheckmark ? 0 : 22,
              transition: "stroke-dashoffset 250ms ease-out",
            }}
          />
        </svg>
      ) : (
        startContent || <Icon icon="hugeicons:copy-01" className="size-3.5" />
      )
    ) : (
      startContent
    )

    const displayedChildren = isCopy
      ? copied
        ? "Copied"
        : children || "Copy"
      : children

    return (
      <Comp
        ref={ref}
        type={type ?? "button"}
        disabled={nativeDisabled}
        aria-disabled={ariaDisabled}
        aria-busy={isLoading || undefined}
        aria-label={ariaLabel || undefined}
        tabIndex={asChild && isEffectivelyDisabled ? -1 : undefined}
        onClick={handleClick}
        className={cn(
          buttonBaseVariants({ size, variant, radius, hover }),
          designColors[color][activeVariant],
          className,
          "cursor-pointer relative overflow-hidden",
          isFullWidth && "w-full flex flex-1 justify-center",
          isLoading && "cursor-wait opacity-50",
          isEffectivelyDisabled && "cursor-not-allowed opacity-50",
          asChild && isEffectivelyDisabled && "pointer-events-none",
          isIconOnly && "aspect-square"
        )}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            {loadingIcon ? (
              <span aria-hidden="true">{loadingIcon}</span>
            ) : (
              <span
                role="status"
                className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                aria-label="Loading"
              />
            )}
            <span>{loadingText || displayedChildren}</span>
            <span className="sr-only" aria-live="polite" aria-atomic="true">
              {loadingText ?? "Loading, please wait"}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            {badgeContent && badgePosition === "start" && (
              <span
                className={cn(
                  "inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-primary text-white mr-2",
                  badgeCustomClassname
                )}
                aria-hidden="true"
              >
                {badgeContent}
              </span>
            )}
            {displayedStartContent && (
              <span className={cn(!isIconOnly && "mr-2")} aria-hidden="true">
                {displayedStartContent}
              </span>
            )}
            {displayedChildren && <span>{displayedChildren}</span>}
            {endContent && (
              <span className={cn(!isIconOnly && "ml-2")} aria-hidden="true">
                {endContent}
              </span>
            )}
            {badgeContent && badgePosition === "end" && (
              <span
                className={cn(
                  "inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-primary text-white ml-2",
                  badgeCustomClassname
                )}
                aria-hidden="true"
              >
                {badgeContent}
              </span>
            )}
          </div>
        )}

        {ripples.map(
          (r: { x: number; y: number; size: number; id: number }) => (
            <Ripple
              key={r.id}
              x={r.x}
              y={r.y}
              size={r.size}
              onComplete={() => removeRipple(r.id)}
            />
          )
        )}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonBaseVariants }
