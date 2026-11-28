/**
 * A label beside an icon, after pargic's sidebar: while the sidebar narrows, the label slides 12 px to the right and
 * fades as the edge covers it; while it widens, it slides back. The icon never moves. In a SidebarSheet the labels
 * slide in the same way when the sheet opens.
 */
export const fadingLabelClassName = [
  'min-w-0 truncate whitespace-nowrap transition-[translate,opacity] duration-150 ease-out motion-reduce:transition-none',
  'group-data-[collapsed]/sidebar:translate-x-3 group-data-[collapsed]/sidebar:opacity-0',
  'in-data-[slot=sidebar-sheet]:animate-sidebar-label-in motion-reduce:in-data-[slot=sidebar-sheet]:animate-none',
].join(' ')

/** A row of a `nav` sidebar: a 36 px link or button with a 16 px icon, the accent colours when current. */
export const navRowClassName = [
  'flex h-9 w-full shrink-0 cursor-pointer items-center gap-3 rounded-md px-3 text-[13.5px] font-medium text-muted-foreground no-underline outline-none transition-colors duration-150 motion-reduce:transition-none',
  'hover:bg-sidebar-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring [&_svg]:size-4 [&_svg]:shrink-0',
  'aria-[current]:bg-brand-soft aria-[current]:text-brand-text',
].join(' ')
