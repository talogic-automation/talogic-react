import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'
import { menuContentClassName, menuItemClassName, menuLabelClassName, menuSeparatorClassName, menuShortcutClassName } from './menu.recipe'

/** The shadcn/ui DropdownMenu root (Radix). */
export const DropdownMenu = DropdownMenuPrimitive.Root

/** The element that opens a {@link DropdownMenu}. */
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

/** A group of rows. */
export const DropdownMenuGroup = DropdownMenuPrimitive.Group

/** A group of rows where one is chosen. */
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

/**
 * The menu panel, in a portal.
 *
 * @param props - Radix DropdownMenu content props.
 * @returns The panel.
 */
export function DropdownMenuContent ({ className, sideOffset = 6, ...props }: ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content data-slot='dropdown-menu-content' sideOffset={sideOffset} className={cn(menuContentClassName, className)} {...props} />
    </DropdownMenuPrimitive.Portal>
  )
}

/** Props of {@link DropdownMenuItem}. */
export interface DropdownMenuItemProps extends ComponentProps<typeof DropdownMenuPrimitive.Item> {
  /** `destructive` for delete and other actions that lose data. */
  variant?: 'default' | 'destructive'
}

/**
 * One command row.
 *
 * @param props - `variant` and Radix DropdownMenu item props.
 * @returns The row.
 */
export function DropdownMenuItem ({ className, variant = 'default', ...props }: DropdownMenuItemProps) {
  return <DropdownMenuPrimitive.Item data-slot='dropdown-menu-item' data-variant={variant} className={cn(menuItemClassName, className)} {...props} />
}

/**
 * A row that picks one value of a {@link DropdownMenuRadioGroup}.
 *
 * @param props - Radix DropdownMenu radio item props.
 * @returns The row, with a dot when chosen.
 */
export function DropdownMenuRadioItem ({ className, children, ...props }: ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem data-slot='dropdown-menu-radio-item' className={cn(menuItemClassName, 'ps-7', className)} {...props}>
      <span className='absolute start-2.5 flex size-2 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator><span className='block size-2 rounded-full bg-brand' /></DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

/**
 * The heading of a group of rows.
 *
 * @param props - Radix DropdownMenu label props.
 * @returns The heading.
 */
export function DropdownMenuLabel ({ className, ...props }: ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return <DropdownMenuPrimitive.Label data-slot='dropdown-menu-label' className={cn(menuLabelClassName, className)} {...props} />
}

/**
 * A line between groups of rows.
 *
 * @param props - Radix DropdownMenu separator props.
 * @returns The separator.
 */
export function DropdownMenuSeparator ({ className, ...props }: ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return <DropdownMenuPrimitive.Separator data-slot='dropdown-menu-separator' className={cn(menuSeparatorClassName, className)} {...props} />
}

/**
 * The keyboard shortcut of a row.
 *
 * @param props - Any `span` props.
 * @returns The shortcut text.
 */
export function DropdownMenuShortcut ({ className, ...props }: ComponentProps<'span'>) {
  return <span data-slot='dropdown-menu-shortcut' className={cn(menuShortcutClassName, className)} {...props} />
}
