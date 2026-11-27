import type { ComponentProps } from 'react'
import { cn } from '../../class-names'

/** Props of {@link MenuIcon}. */
export interface MenuIconProps extends ComponentProps<'svg'> {
  /**
   * `true` twirls the hamburger into an X, `false` twirls it back. Leave it out for a still hamburger, so a page
   * does not play the closing motion when it loads.
   */
  open?: boolean
}

const line = 'origin-center [transform-box:fill-box] motion-reduce:[animation-duration:1ms]'

/**
 * The menu toggle icon. Opening, the outer lines fall to the centre and twirl a half turn past each other into an
 * X, while the middle line shrinks to a dot and pops away. Closing plays it back the other way. With reduced motion
 * the icon changes at once.
 *
 * @param props - `open` and any `svg` props; it is decorative, so label the button around it.
 * @returns The icon.
 */
export function MenuIcon ({ open, className, ...props }: MenuIconProps) {
  const state = open === undefined ? undefined : (open ? 'open' : 'closed')

  return (
    <svg data-slot='menu-icon' data-state={state} viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' className={cn('group/menu-icon size-5', className)} {...props}>
      <rect x='4' y='6' width='16' height='2' rx='1' className={cn(line, 'group-data-[state=open]/menu-icon:animate-menu-line-top-open group-data-[state=closed]/menu-icon:animate-menu-line-top-close')} />
      <rect x='4' y='11' width='16' height='2' rx='1' className={cn(line, 'group-data-[state=open]/menu-icon:animate-menu-line-middle-open group-data-[state=closed]/menu-icon:animate-menu-line-middle-close')} />
      <rect x='4' y='16' width='16' height='2' rx='1' className={cn(line, 'group-data-[state=open]/menu-icon:animate-menu-line-bottom-open group-data-[state=closed]/menu-icon:animate-menu-line-bottom-close')} />
    </svg>
  )
}
