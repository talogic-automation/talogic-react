/** The panel of a drop-down or context menu: popover colours, medium elevation, 4 px inset. */
export const menuContentClassName = 'z-50 min-w-48 overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-md'

/**
 * One row of a menu: 13.5 px text, a muted 16 px icon, the accent colour on focus. `data-variant=destructive`
 * turns the row and its icon red.
 */
export const menuItemClassName = [
  'relative flex cursor-default select-none items-center gap-2.5 rounded-sm px-2.5 py-[7px] text-[13.5px] outline-none',
  'focus:bg-accent data-disabled:pointer-events-none data-disabled:opacity-50',
  '[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground',
  'data-[variant=destructive]:text-destructive data-[variant=destructive]:[&_svg]:text-destructive',
].join(' ')

/** The keyboard shortcut at the end of a menu row. */
export const menuShortcutClassName = 'ms-auto text-xs tracking-wide text-muted-foreground'

/** The line between groups of menu rows. */
export const menuSeparatorClassName = '-mx-1 my-1 h-px bg-border'

/** The heading of a group of menu rows. */
export const menuLabelClassName = 'px-2.5 py-1.5 text-xs font-medium text-muted-foreground'
