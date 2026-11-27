import { X } from 'lucide-react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'
import { overlayClassName } from './overlay.recipe'

/** The shadcn/ui Dialog root (Radix). */
export const Dialog = DialogPrimitive.Root

/** The element that opens a {@link Dialog}. */
export const DialogTrigger = DialogPrimitive.Trigger

/** An element that closes a {@link Dialog}. */
export const DialogClose = DialogPrimitive.Close

/** Props of {@link DialogContent}. */
export interface DialogContentProps extends ComponentProps<typeof DialogPrimitive.Content> {
  /** Shows the close button in the corner. Default true. */
  showClose?: boolean
}

/**
 * The centred panel of a {@link Dialog}: 14 px radius, large elevation, a close button.
 *
 * @param props - `showClose` and Radix Dialog content props.
 * @returns The dialog panel in a portal.
 */
export function DialogContent ({ className, children, showClose = true, ...props }: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={overlayClassName} />
      <DialogPrimitive.Content
        data-slot='dialog-content'
        className={cn('fixed start-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl border bg-popover p-6 text-popover-foreground shadow-lg outline-none rtl:translate-x-1/2', className)}
        {...props}
      >
        {children}
        {showClose && (
          <DialogPrimitive.Close className='absolute end-4 top-4 cursor-pointer rounded-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring'>
            <X className='size-4' aria-hidden='true' />
            <span className='sr-only'>Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

/**
 * The title and description block of a dialog or sheet.
 *
 * @param props - Any `div` props.
 * @returns The header.
 */
export function DialogHeader ({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot='dialog-header' className={cn('flex flex-col gap-1.5 text-start', className)} {...props} />
}

/**
 * The actions of a dialog or sheet, at the end of the row.
 *
 * @param props - Any `div` props.
 * @returns The footer.
 */
export function DialogFooter ({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot='dialog-footer' className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)} {...props} />
}

/**
 * The title of a {@link Dialog}, in DM Sans.
 *
 * @param props - Radix Dialog title props.
 * @returns The title.
 */
export function DialogTitle ({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title data-slot='dialog-title' className={cn('m-0 font-display text-lg font-bold leading-tight', className)} {...props} />
}

/**
 * The description of a {@link Dialog}.
 *
 * @param props - Radix Dialog description props.
 * @returns The description.
 */
export function DialogDescription ({ className, ...props }: ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description data-slot='dialog-description' className={cn('m-0 text-sm text-muted-foreground', className)} {...props} />
}
