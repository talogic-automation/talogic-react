import { ChevronsLeft, ChevronsRight, PanelLeft, Search } from 'lucide-react'
import { type ComponentProps, type ReactNode, useState } from 'react'
import { Button } from '../button'
import { cn } from '../../class-names'
import { Input } from '../field'
import { Tooltip, TooltipContent, TooltipTrigger } from '../overlay'
import { SidebarContext, type SidebarVariant, useSidebar } from './sidebar-context.hook'
import { fadingLabelClassName, navRowClassName } from './sidebar.recipe'

/** Props of {@link Sidebar}. */
export interface SidebarProps extends Omit<ComponentProps<'aside'>, 'aria-label'> {
  /** The sidebar's name, such as "Plugins". It labels the landmark, and the panel rail shows it down the side. */
  label:              string
  /** `panel` for a desktop tool panel (default), `nav` for a web platform's navigation. */
  variant?:           SidebarVariant
  /** The edge the sidebar sits on. Default `start`. */
  side?:              'start' | 'end'
  /** Controls the collapsed state. Leave it out for a sidebar that keeps its own. */
  collapsed?:         boolean
  /** The first collapsed state of a sidebar that keeps its own. Default false. */
  defaultCollapsed?:  boolean
  /** Called with the new collapsed state. */
  onCollapsedChange?: (collapsed: boolean) => void
}

const widths: Record<SidebarVariant, { open: string, collapsed: string }> = {
  panel: { open: 'w-full gap-2 p-2.5', collapsed: 'w-12 items-center gap-1 px-1.5 py-2' },
  nav:   { open: 'w-60 gap-4 px-2 py-3', collapsed: 'w-14 gap-4 px-2 py-3' },
}

/**
 * The family sidebar, in two variants built from the same parts. `panel` follows loomgic's plugin sidebar: search
 * and a collapse button on top, foldable groups of items with a colour bar, and a rail with the sidebar's name when
 * collapsed (put it in a ResizablePanel to let the user widen it). `nav` follows pargic's portal: the product at the
 * top, sections of icon links, and a foot with the account and the collapse button; it narrows to its icons while
 * the labels fade in place. On a phone, put either in a SidebarSheet.
 *
 * @param props - Label, variant, side, the collapsed state, and any `aside` props.
 * @returns The sidebar.
 */
export function Sidebar ({ label, variant = 'panel', side = 'start', collapsed, defaultCollapsed = false, onCollapsedChange, className, children, ...props }: SidebarProps) {
  const [ownCollapsed, setOwnCollapsed] = useState(defaultCollapsed)
  const isCollapsed = collapsed ?? ownCollapsed

  function setCollapsed (next: boolean): void {
    if (collapsed === undefined) setOwnCollapsed(next)
    onCollapsedChange?.(next)
  }

  return (
    <SidebarContext value={{ collapsed: isCollapsed, setCollapsed, label, side, variant }}>
      <aside
        data-slot='sidebar'
        data-variant={variant}
        data-collapsed={isCollapsed || undefined}
        aria-label={label}
        className={cn(
          'group/sidebar flex h-full min-h-0 shrink-0 flex-col overflow-hidden bg-sidebar text-[13px] text-sidebar-foreground',
          side === 'start' ? 'border-e border-sidebar-border' : 'border-s border-sidebar-border',
          variant === 'nav' && 'transition-[width] duration-300 ease-emphasised motion-reduce:transition-none',
          isCollapsed ? widths[variant].collapsed : widths[variant].open,
          className,
        )}
        {...props}
      >
        {children}
        {variant === 'panel' && isCollapsed && (
          <span aria-hidden='true' className='mt-auto py-2 text-xs font-semibold tracking-[0.06em] text-muted-foreground uppercase [writing-mode:vertical-rl]'>{label}</span>
        )}
      </aside>
    </SidebarContext>
  )
}

/**
 * Shows a tooltip with the name of a part while the sidebar is collapsed, when its label is hidden.
 *
 * @param props - The name and the part.
 * @returns The part, with a tooltip when collapsed.
 */
export function SidebarTooltip ({ label, children }: { label: string, children: ReactNode }) {
  const { collapsed, side } = useSidebar()
  if (!collapsed) return children

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side === 'start' ? 'right' : 'left'}>{label}</TooltipContent>
    </Tooltip>
  )
}

/**
 * The button that collapses the sidebar and expands it again. In the `nav` variant it is a full row with a label.
 *
 * @param props - Any button props.
 * @returns The button.
 */
export function SidebarCollapseButton ({ className, ...props }: ComponentProps<'button'>) {
  const { collapsed, setCollapsed, label, side, variant } = useSidebar()
  const text = variant === 'nav' ? `${collapsed ? 'Expand' : 'Collapse'} sidebar` : `${collapsed ? 'Show' : 'Hide'} ${label.toLowerCase()}`
  if (variant === 'nav') {
    return (
      <SidebarTooltip label={text}>
        <button
          type='button'
          aria-label={text}
          aria-expanded={!collapsed}
          onClick={() => setCollapsed(!collapsed)}
          className={cn(navRowClassName, className)}
          {...props}
        >
          <PanelLeft aria-hidden='true' />
          <span aria-hidden='true' className={fadingLabelClassName}>Collapse</span>
        </button>
      </SidebarTooltip>
    )
  }

  const pointsLeft = (side === 'start') !== collapsed

  return (
    <Button
      variant='ghost'
      size='icon-sm'
      aria-label={text}
      aria-expanded={!collapsed}
      title={text}
      onClick={() => setCollapsed(!collapsed)}
      className={cn('shrink-0 text-muted-foreground', className)}
      {...props}
    >
      {pointsLeft ? <ChevronsLeft /> : <ChevronsRight />}
    </Button>
  )
}

/** Props of {@link SidebarHeader}. */
export interface SidebarHeaderProps {
  /** The search text. Leave out `onQueryChange` for a header without search. */
  query?:         string
  /** Called with the new search text. */
  onQueryChange?: (query: string) => void
  /** The search field's accessible label and placeholder. Default "Search" and the sidebar's name. */
  searchLabel?:   string
  /** Controls beside the search in the `panel` variant, or the brand in the `nav` variant. */
  children?:      ReactNode
  className?:     string
}

/**
 * The top of a {@link Sidebar}. In the `panel` variant: the search field and the collapse button; collapsed, only the
 * button stays. In the `nav` variant: its children, usually a SidebarBrand.
 *
 * @param props - The search state, its label, and extra controls.
 * @returns The header.
 */
export function SidebarHeader ({ query = '', onQueryChange, searchLabel, children, className }: SidebarHeaderProps) {
  const { collapsed, label, variant } = useSidebar()
  if (variant === 'nav') return <div data-slot='sidebar-header' className={cn('flex h-8 items-center', className)}>{children}</div>
  if (collapsed) return <SidebarCollapseButton />
  const searchText = searchLabel ?? `Search ${label.toLowerCase()}`

  return (
    <div data-slot='sidebar-header' className={cn('flex items-center gap-1', className)}>
      {onQueryChange && (
        <Input type='search' value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={searchText} aria-label={searchText} startIcon={<Search />} />
      )}
      {children}
      <SidebarCollapseButton className='ms-auto' />
    </div>
  )
}

/**
 * The scrolling body of a {@link Sidebar}, which holds the groups. In the `nav` variant it is the navigation landmark.
 *
 * @param props - Any `div` props, and `label` for the navigation's name in the `nav` variant.
 * @returns The body.
 */
export function SidebarContent ({ className, ...props }: ComponentProps<'div'>) {
  const { collapsed, label, variant } = useSidebar()
  const classes = cn('flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto', variant === 'panel' && collapsed ? 'items-center gap-1' : 'gap-4', variant === 'panel' && !collapsed && 'gap-3', className)

  return variant === 'nav' ? <nav data-slot='sidebar-content' aria-label={label} className={classes} {...props} /> : <div data-slot='sidebar-content' className={classes} {...props} />
}

/**
 * The foot of a {@link Sidebar}, for the account, the collapse button or a status. In the `panel` variant it is
 * hidden on the rail; in the `nav` variant it stays, with its labels faded.
 *
 * @param props - Any `div` props.
 * @returns The footer.
 */
export function SidebarFooter ({ className, ...props }: ComponentProps<'div'>) {
  const { collapsed, variant } = useSidebar()

  return variant === 'panel' && collapsed ? null : <div data-slot='sidebar-footer' className={cn('mt-auto flex flex-col gap-2', variant === 'nav' && 'border-t border-sidebar-border pt-3', className)} {...props} />
}
