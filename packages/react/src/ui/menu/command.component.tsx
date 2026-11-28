import { Command as CommandPrimitive } from 'cmdk'
import { Search } from 'lucide-react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../../class-names'
import { floatingMotionClassName, overlayClassName } from '../overlay'
import { menuItemClassName, menuSeparatorClassName, menuShortcutClassName } from './menu.recipe'

/**
 * The shadcn/ui Command (cmdk): a filterable list of actions.
 *
 * @param props - cmdk root props.
 * @returns The command list.
 */
export function Command ({ className, ...props }: ComponentProps<typeof CommandPrimitive>) {
  return <CommandPrimitive data-slot='command' className={cn('flex size-full flex-col overflow-hidden rounded-lg bg-popover text-popover-foreground', className)} {...props} />
}

/** Props of {@link CommandDialog}. */
export interface CommandDialogProps extends ComponentProps<typeof DialogPrimitive.Root> {
  /** The accessible name of the palette. */
  title?:    string
  children?: ReactNode
}

/**
 * The command palette: a {@link Command} in a dialog, opened with ⌘K or Ctrl K by the app.
 *
 * @param props - `title`, the dialog's open state, and the command content.
 * @returns The palette.
 */
export function CommandDialog ({ title = 'Search', children, ...props }: CommandDialogProps) {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={overlayClassName} />
        <DialogPrimitive.Content className={cn('fixed start-1/2 top-[18%] z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-xl border bg-popover shadow-lg outline-none rtl:translate-x-1/2', floatingMotionClassName)}>
          <DialogPrimitive.Title className='sr-only'>{title}</DialogPrimitive.Title>
          <DialogPrimitive.Description className='sr-only'>Type to filter the commands.</DialogPrimitive.Description>
          <Command>{children}</Command>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

/**
 * The search field of a {@link Command}.
 *
 * @param props - cmdk input props.
 * @returns The field with a search icon.
 */
export function CommandInput ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot='command-input-wrapper' className='flex h-11 items-center gap-2 border-b px-3'>
      <Search className='size-4 shrink-0 text-muted-foreground' aria-hidden='true' />
      <CommandPrimitive.Input data-slot='command-input' className={cn('h-full w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground', className)} {...props} />
    </div>
  )
}

/**
 * The scrolling list of results.
 *
 * @param props - cmdk list props.
 * @returns The list.
 */
export function CommandList ({ className, ...props }: ComponentProps<typeof CommandPrimitive.List>) {
  return <CommandPrimitive.List data-slot='command-list' className={cn('max-h-80 overflow-y-auto p-1', className)} {...props} />
}

/**
 * Shown when no result matches.
 *
 * @param props - cmdk empty props.
 * @returns The empty message.
 */
export function CommandEmpty ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Empty>) {
  return <CommandPrimitive.Empty data-slot='command-empty' className={cn('py-6 text-center text-sm text-muted-foreground', className)} {...props} />
}

/**
 * A titled group of results.
 *
 * @param props - cmdk group props.
 * @returns The group.
 */
export function CommandGroup ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Group>) {
  return <CommandPrimitive.Group data-slot='command-group' className={cn('[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground', className)} {...props} />
}

/**
 * One result.
 *
 * @param props - cmdk item props.
 * @returns The result row.
 */
export function CommandItem ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Item>) {
  return <CommandPrimitive.Item data-slot='command-item' className={cn(menuItemClassName, 'data-[selected=true]:bg-accent', className)} {...props} />
}

/**
 * A line between groups.
 *
 * @param props - cmdk separator props.
 * @returns The separator.
 */
export function CommandSeparator ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Separator>) {
  return <CommandPrimitive.Separator data-slot='command-separator' className={cn(menuSeparatorClassName, className)} {...props} />
}

/**
 * The keyboard shortcut of a result.
 *
 * @param props - Any `span` props.
 * @returns The shortcut text.
 */
export function CommandShortcut ({ className, ...props }: ComponentProps<'span'>) {
  return <span data-slot='command-shortcut' className={cn(menuShortcutClassName, className)} {...props} />
}
