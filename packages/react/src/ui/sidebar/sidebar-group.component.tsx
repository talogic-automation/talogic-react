import { ChevronRight } from 'lucide-react'
import { Collapsible } from 'radix-ui'
import { type ReactNode, useState } from 'react'
import { cn } from '../../class-names'
import { useSidebar } from './sidebar-context.hook'
import { fadingLabelClassName } from './sidebar.recipe'

/** Props of {@link SidebarGroup}. */
export interface SidebarGroupProps {
  /** The group's title, such as "Speech" or "Build". */
  title:        string
  /** The number shown at the end of the title row, such as the number of plugins. */
  count?:       number
  /** Opens a folding group whatever the user chose, for example while a search is typed. */
  forceOpen?:   boolean
  /** The first open state of a folding group. Default true. */
  defaultOpen?: boolean
  /** Whether the group folds. Default true in the `panel` variant and false in the `nav` variant. */
  collapsible?: boolean
  /** The group's items. */
  children:     ReactNode
  className?:   string
}

/**
 * A titled group of a {@link Sidebar}. In the `panel` variant it folds, and on the rail its title goes and its items
 * stay as icons, with a line between groups. In the `nav` variant it is a section whose title fades in place when
 * the sidebar collapses.
 *
 * @param props - Title, count, open state, whether it folds, and the items.
 * @returns The group.
 */
export function SidebarGroup ({ title, count, forceOpen = false, defaultOpen = true, collapsible, className, children }: SidebarGroupProps) {
  const { collapsed, variant } = useSidebar()
  const [open, setOpen] = useState(defaultOpen)
  if (variant === 'panel' && collapsed) {
    return (
      <div role='group' aria-label={title} data-slot='sidebar-group' className='flex flex-col items-center gap-1 border-b border-sidebar-border pb-1 last:border-b-0'>
        {children}
      </div>
    )
  }

  const folds = collapsible ?? variant === 'panel'
  const titleClassName = 'text-xs font-semibold tracking-[0.04em] text-muted-foreground uppercase'

  if (!folds) {
    return (
      <div role='group' aria-label={title} data-slot='sidebar-group' className={cn('flex flex-col gap-0.5', className)}>
        <span aria-hidden='true' className={cn('flex h-6 items-center px-3', titleClassName, fadingLabelClassName)}>{title}</span>
        {children}
      </div>
    )
  }

  return (
    <Collapsible.Root data-slot='sidebar-group' open={forceOpen || open} onOpenChange={setOpen} className={cn('flex flex-col gap-1', className)}>
      <Collapsible.Trigger
        disabled={forceOpen}
        className='group/trigger flex w-full cursor-pointer items-center gap-1.5 rounded-sm px-1 py-0.5 text-start outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default'
      >
        <ChevronRight aria-hidden='true' className='size-3.5 shrink-0 text-muted-foreground transition-transform duration-150 group-data-[state=open]/trigger:rotate-90 motion-reduce:transition-none' />
        <span className={titleClassName}>{title}</span>
        {count !== undefined && <span className='ms-auto text-[11px] text-muted-foreground tabular-nums'>{count}</span>}
      </Collapsible.Trigger>
      <Collapsible.Content className='flex flex-col gap-1' role='group' aria-label={title}>
        {children}
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
