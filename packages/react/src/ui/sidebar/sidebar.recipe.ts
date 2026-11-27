/** A label that fades in place when a `nav` sidebar collapses, so the icon beside it never moves. */
export const fadingLabelClassName = 'truncate transition-opacity duration-200 motion-reduce:transition-none group-data-[collapsed]/sidebar:opacity-0'

/** A row of a `nav` sidebar: a 36 px link or button with a 16 px icon, the accent colours when current. */
export const navRowClassName = [
  'flex h-9 w-full shrink-0 cursor-pointer items-center gap-3 rounded-md px-3 text-[13.5px] font-medium text-muted-foreground no-underline outline-none',
  'hover:bg-sidebar-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring [&_svg]:size-4 [&_svg]:shrink-0',
  'aria-[current]:bg-brand-soft aria-[current]:text-brand-text',
].join(' ')
