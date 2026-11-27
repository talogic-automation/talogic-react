import { AlertDialog as AlertDialogPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { buttonVariants, type ButtonVariants } from '../button'
import { cn } from '../../class-names'
import { overlayClassName } from './overlay.recipe'

/** The shadcn/ui AlertDialog root: a dialog that needs an answer, such as a delete confirmation. */
export const AlertDialog = AlertDialogPrimitive.Root

/** The element that opens an {@link AlertDialog}. */
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger

/**
 * The centred panel of an {@link AlertDialog}. It has no close button: the user must pick an action.
 *
 * @param props - Radix AlertDialog content props.
 * @returns The panel in a portal.
 */
export function AlertDialogContent ({ className, ...props }: ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className={overlayClassName} />
      <AlertDialogPrimitive.Content
        data-slot='alert-dialog-content'
        className={cn('fixed start-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl border bg-popover p-6 text-popover-foreground shadow-lg outline-none rtl:translate-x-1/2', className)}
        {...props}
      />
    </AlertDialogPrimitive.Portal>
  )
}

/**
 * The title of an {@link AlertDialog}.
 *
 * @param props - Radix AlertDialog title props.
 * @returns The title.
 */
export function AlertDialogTitle ({ className, ...props }: ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return <AlertDialogPrimitive.Title data-slot='alert-dialog-title' className={cn('m-0 font-display text-lg font-bold leading-tight', className)} {...props} />
}

/**
 * The description of an {@link AlertDialog}: what happens and whether it can be undone.
 *
 * @param props - Radix AlertDialog description props.
 * @returns The description.
 */
export function AlertDialogDescription ({ className, ...props }: ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return <AlertDialogPrimitive.Description data-slot='alert-dialog-description' className={cn('m-0 text-sm text-muted-foreground', className)} {...props} />
}

/**
 * The confirming action. Pass `variant='destructive'` for a delete.
 *
 * @param props - A button variant and Radix AlertDialog action props.
 * @returns The action button.
 */
export function AlertDialogAction ({ className, variant = 'default', ...props }: ComponentProps<typeof AlertDialogPrimitive.Action> & Pick<ButtonVariants, 'variant'>) {
  return <AlertDialogPrimitive.Action data-slot='alert-dialog-action' className={cn(buttonVariants({ variant }), className)} {...props} />
}

/**
 * The cancelling action. It gets focus first, so Enter never confirms by accident.
 *
 * @param props - Radix AlertDialog cancel props.
 * @returns The cancel button.
 */
export function AlertDialogCancel ({ className, ...props }: ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return <AlertDialogPrimitive.Cancel data-slot='alert-dialog-cancel' className={cn(buttonVariants({ variant: 'outline' }), className)} {...props} />
}
