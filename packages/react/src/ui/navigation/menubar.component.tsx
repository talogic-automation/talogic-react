import { Menubar as MenubarPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'

/**
 * The shadcn/ui Menubar: the File, Edit, View menus of a desktop app.
 *
 * @param props - Radix Menubar root props.
 * @returns The menubar.
 */
export function Menubar ({ className, ...props }: ComponentProps<typeof MenubarPrimitive.Root>) {
  return <MenubarPrimitive.Root data-slot='menubar' className={cn('flex items-center gap-0.5', className)} {...props} />
}

/** One menu of a {@link Menubar}. */
export const MenubarMenu = MenubarPrimitive.Menu

/**
 * The name of a menu, such as File.
 *
 * @param props - Radix Menubar trigger props.
 * @returns The trigger.
 */
export function MenubarTrigger ({ className, ...props }: ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot='menubar-trigger'
      className={cn('flex h-[26px] cursor-default select-none items-center rounded-sm px-2 text-[13px] outline-none hover:bg-accent focus:bg-accent data-[state=open]:bg-accent', className)}
      {...props}
    />
  )
}

/**
 * The items of a menu, in a portal.
 *
 * @param props - Radix Menubar content props.
 * @returns The menu panel.
 */
export function MenubarContent ({ className, align = 'start', sideOffset = 6, ...props }: ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        data-slot='menubar-content'
        align={align}
        sideOffset={sideOffset}
        className={cn('z-50 min-w-48 origin-(--radix-menubar-content-transform-origin) rounded-lg border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out motion-reduce:data-[state=open]:animate-fade-in motion-reduce:data-[state=closed]:animate-fade-out', className)}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
}

/**
 * One command of a menu.
 *
 * @param props - Radix Menubar item props.
 * @returns The item.
 */
export function MenubarItem ({ className, ...props }: ComponentProps<typeof MenubarPrimitive.Item>) {
  return (
    <MenubarPrimitive.Item
      data-slot='menubar-item'
      className={cn('relative flex cursor-default select-none items-center gap-2.5 rounded-sm px-2.5 py-1.5 text-[13px] outline-none focus:bg-accent data-disabled:pointer-events-none data-disabled:opacity-50', className)}
      {...props}
    />
  )
}

/**
 * The keyboard shortcut of a {@link MenubarItem}, at the end of the row.
 *
 * @param props - Any `span` props.
 * @returns The shortcut text.
 */
export function MenubarShortcut ({ className, ...props }: ComponentProps<'span'>) {
  return <span data-slot='menubar-shortcut' className={cn('ms-auto text-xs text-muted-foreground', className)} {...props} />
}

/**
 * A line between groups of items.
 *
 * @param props - Radix Menubar separator props.
 * @returns The separator.
 */
export function MenubarSeparator ({ className, ...props }: ComponentProps<typeof MenubarPrimitive.Separator>) {
  return <MenubarPrimitive.Separator data-slot='menubar-separator' className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />
}
