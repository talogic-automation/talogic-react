import { Slot } from 'radix-ui'
import { cloneElement, type ComponentProps, isValidElement, type ReactElement, type ReactNode } from 'react'
import { cn } from '../../class-names'
import { HUE_FILL, type Hue } from '../../tokens'
import { SidebarTooltip } from './sidebar.component'
import { useSidebar } from './sidebar-context.hook'
import { fadingLabelClassName, navRowClassName } from './sidebar.recipe'

/** Props of {@link SidebarItem}. */
export interface SidebarItemProps extends Omit<ComponentProps<'button'>, 'title'> {
  /** The item's name, such as a plugin or a page. */
  title:     string
  /** One short line under the title in Fira Code, such as a version or a type. `panel` variant only. */
  meta?:     ReactNode
  /** A 16 px icon. In the `nav` variant every item has one; in the `panel` variant it replaces the colour bar. */
  icon?:     ReactNode
  /** The family hue of the colour bar (`panel` variant). */
  hue?:      Hue
  /** A colour for the bar when it is not a family hue, such as a plugin's own colour. */
  color?:    string
  /** A count or short badge at the end of the row, such as the number of recipes. */
  badge?:    ReactNode
  /** Marks the current item or page: the brand-soft background and `aria-current`. */
  active?:   boolean
  /**
   * Renders the item through its only child, such as a router link: the child gets the item's look and content.
   * Its own children are replaced.
   */
  asChild?:  boolean
  /** With `asChild`, the element to render, such as `<a href='/runs' />`. */
  children?: ReactNode
}

/**
 * One entry of a {@link Sidebar}. In the `panel` variant: a colour bar or an icon, the title and a meta line; it can
 * be dragged, for example onto a canvas. In the `nav` variant: an icon and a label. In both, the text slides away
 * while the sidebar collapses and the bar or icon stays put; collapsed, the title shows in a tooltip.
 *
 * @param props - Title, meta, icon or colour, the active state, `asChild` and any button props.
 * @returns The item.
 */
export function SidebarItem ({ title, meta, icon, hue, color = 'var(--muted-foreground)', badge, active = false, asChild = false, className, children, ...props }: SidebarItemProps) {
  const { collapsed, variant } = useSidebar()
  const current = active ? (variant === 'nav' ? 'page' : 'true') : undefined

  const content = variant === 'nav'
    ? (
        <>
          <span aria-hidden='true' className='flex'>{icon}</span>
          <span className={fadingLabelClassName}>{title}</span>
          {badge !== undefined && <span className={cn('ms-auto rounded-full bg-secondary px-1.5 text-xs text-secondary-foreground tabular-nums', fadingLabelClassName)}>{badge}</span>}
        </>
      )
    : (
        <>
          {icon
            ? <span aria-hidden='true' className='flex w-2.5 shrink-0 justify-center text-muted-foreground group-aria-[current]/item:text-brand-text [&_svg]:size-4'>{icon}</span>
            : <span aria-hidden='true' className={cn('h-6 w-2.5 shrink-0 rounded-[3px]', hue ? HUE_FILL[hue] : '')} style={hue ? undefined : { background: color }} />}
          <span className={cn('flex flex-col', fadingLabelClassName)}>
            <span className='truncate text-[13px] font-medium'>{title}</span>
            {meta && <span className='truncate font-mono text-[10.5px] leading-tight text-muted-foreground'>{meta}</span>}
          </span>
          {badge !== undefined && <span className={cn('ms-auto text-[11px] text-muted-foreground tabular-nums', fadingLabelClassName)}>{badge}</span>}
        </>
      )

  const classes = variant === 'nav'
    ? cn(navRowClassName, className)
    : cn(
        'group/item flex cursor-pointer items-center rounded-md border border-transparent text-start text-sidebar-foreground no-underline outline-none transition-colors duration-150 motion-reduce:transition-none',
        'hover:border-sidebar-border hover:bg-background focus-visible:ring-2 focus-visible:ring-sidebar-ring disabled:cursor-not-allowed disabled:opacity-50',
        'aria-[current]:border-transparent aria-[current]:bg-brand-soft aria-[current]:text-brand-text',
        'w-full gap-2 px-[13px] py-1.5',
        className,
      )

  const shared = { 'data-slot': 'sidebar-item', 'aria-current': current, 'aria-label': collapsed ? title : undefined, 'className': classes } as const
  const element = asChild && isValidElement<{ children?: ReactNode }>(children)
    ? <Slot.Root {...shared} {...props}>{cloneWithContent(children, content)}</Slot.Root>
    : <button type='button' {...shared} {...props}>{content}</button>

  return <SidebarTooltip label={title}>{element}</SidebarTooltip>
}

/**
 * Puts the item's content inside the element given with `asChild`.
 *
 * @param child - The element, such as a link.
 * @param content - The item's content.
 * @returns The element with the content as its children.
 */
function cloneWithContent (child: ReactElement<{ children?: ReactNode }>, content: ReactNode): ReactElement {
  // The item's content must go inside the caller's element (a router link, for example); Slot alone cannot do that.
  // eslint-disable-next-line @eslint-react/no-clone-element
  return cloneElement(child, undefined, content)
}
