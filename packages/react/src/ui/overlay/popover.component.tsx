import { Popover as PopoverPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'
import { floatingMotionClassName } from './overlay.recipe'

/** The shadcn/ui Popover root (Radix). */
export const Popover = PopoverPrimitive.Root

/** The element that opens a {@link Popover}. */
export const PopoverTrigger = PopoverPrimitive.Trigger

/** An element the popover places itself against, in place of the trigger. */
export const PopoverAnchor = PopoverPrimitive.Anchor

/**
 * The floating panel of a {@link Popover}: medium elevation, 10 px radius.
 *
 * @param props - Radix Popover content props.
 * @returns The panel in a portal.
 */
export function PopoverContent ({ className, align = 'center', sideOffset = 6, ...props }: ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot='popover-content'
        align={align}
        sideOffset={sideOffset}
        className={cn('z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-lg border bg-popover p-4 text-popover-foreground shadow-md outline-none', floatingMotionClassName, className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}
