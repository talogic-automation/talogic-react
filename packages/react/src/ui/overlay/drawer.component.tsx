import type { ComponentProps } from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'
import { cn } from '../../class-names'
import { overlayClassName } from './overlay.recipe'

/** The shadcn/ui Drawer root (vaul): a bottom sheet the user can drag down to close. */
export const Drawer = DrawerPrimitive.Root

/** The element that opens a {@link Drawer}. */
export const DrawerTrigger = DrawerPrimitive.Trigger

/** An element that closes a {@link Drawer}. */
export const DrawerClose = DrawerPrimitive.Close

/**
 * The bottom sheet: a 24 px top radius and a grab handle.
 *
 * @param props - vaul content props.
 * @returns The sheet in a portal.
 */
export function DrawerContent ({ className, children, ...props }: ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Overlay className={overlayClassName} />
      <DrawerPrimitive.Content
        data-slot='drawer-content'
        className={cn('fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col gap-3.5 rounded-t-3xl border-t bg-popover px-5 pt-2.5 pb-8 text-popover-foreground outline-none', className)}
        {...props}
      >
        <div aria-hidden='true' className='mx-auto h-[5px] w-10 shrink-0 rounded-full bg-input' />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  )
}

/**
 * The title of a {@link Drawer}.
 *
 * @param props - vaul title props.
 * @returns The title.
 */
export function DrawerTitle ({ className, ...props }: ComponentProps<typeof DrawerPrimitive.Title>) {
  return <DrawerPrimitive.Title data-slot='drawer-title' className={cn('m-0 text-xl font-semibold leading-tight', className)} {...props} />
}

/**
 * The description of a {@link Drawer}.
 *
 * @param props - vaul description props.
 * @returns The description.
 */
export function DrawerDescription ({ className, ...props }: ComponentProps<typeof DrawerPrimitive.Description>) {
  return <DrawerPrimitive.Description data-slot='drawer-description' className={cn('m-0 text-sm text-muted-foreground', className)} {...props} />
}
