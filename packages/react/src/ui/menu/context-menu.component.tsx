import { ContextMenu as ContextMenuPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'
import { menuContentClassName, menuItemClassName, menuSeparatorClassName, menuShortcutClassName } from './menu.recipe'

/** The shadcn/ui ContextMenu root: the right-click menu of apps and desktop. */
export const ContextMenu = ContextMenuPrimitive.Root

/** The area that opens the {@link ContextMenu} on right-click or long press. */
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger

/**
 * The menu panel, in a portal.
 *
 * @param props - Radix ContextMenu content props.
 * @returns The panel.
 */
export function ContextMenuContent ({ className, ...props }: ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content data-slot='context-menu-content' className={cn(menuContentClassName, className)} {...props} />
    </ContextMenuPrimitive.Portal>
  )
}

/** Props of {@link ContextMenuItem}. */
export interface ContextMenuItemProps extends ComponentProps<typeof ContextMenuPrimitive.Item> {
  /** `destructive` for delete and other actions that lose data. */
  variant?: 'default' | 'destructive'
}

/**
 * One command row.
 *
 * @param props - `variant` and Radix ContextMenu item props.
 * @returns The row.
 */
export function ContextMenuItem ({ className, variant = 'default', ...props }: ContextMenuItemProps) {
  return <ContextMenuPrimitive.Item data-slot='context-menu-item' data-variant={variant} className={cn(menuItemClassName, className)} {...props} />
}

/**
 * A line between groups of rows.
 *
 * @param props - Radix ContextMenu separator props.
 * @returns The separator.
 */
export function ContextMenuSeparator ({ className, ...props }: ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return <ContextMenuPrimitive.Separator data-slot='context-menu-separator' className={cn(menuSeparatorClassName, className)} {...props} />
}

/**
 * The keyboard shortcut of a row.
 *
 * @param props - Any `span` props.
 * @returns The shortcut text.
 */
export function ContextMenuShortcut ({ className, ...props }: ComponentProps<'span'>) {
  return <span data-slot='context-menu-shortcut' className={cn(menuShortcutClassName, className)} {...props} />
}
