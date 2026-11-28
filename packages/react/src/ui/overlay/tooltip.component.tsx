import { Tooltip as TooltipPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'
import { floatingMotionClassName } from './overlay.recipe'

/** Shares the tooltip delay across the app. Put one near the root. */
export const TooltipProvider = TooltipPrimitive.Provider

/**
 * The shadcn/ui Tooltip root. It brings its own provider, so it also works alone.
 *
 * @param props - Radix Tooltip root props.
 * @returns The tooltip.
 */
export function Tooltip (props: ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipPrimitive.Provider delayDuration={300}>
      <TooltipPrimitive.Root data-slot='tooltip' {...props} />
    </TooltipPrimitive.Provider>
  )
}

/** The element that shows a {@link Tooltip} on hover and focus. */
export const TooltipTrigger = TooltipPrimitive.Trigger

/**
 * The tip: inverted colours, 12 px text.
 *
 * @param props - Radix Tooltip content props.
 * @returns The tip in a portal.
 */
export function TooltipContent ({ className, sideOffset = 6, ...props }: ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot='tooltip-content'
        sideOffset={sideOffset}
        className={cn('z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-sm bg-foreground px-2.5 py-1.5 text-xs text-background', floatingMotionClassName, className)}
        {...props}
      />
    </TooltipPrimitive.Portal>
  )
}
