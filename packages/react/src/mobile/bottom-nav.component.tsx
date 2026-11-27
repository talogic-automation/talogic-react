import type { ReactNode } from 'react'
import { cn } from '../class-names'

/** A tab of a {@link BottomNav}. */
export interface BottomNavItem {
  label:    string
  href:     string
  /** A 22 px lucide icon. */
  icon:     ReactNode
  current?: boolean
}

/** Props of {@link BottomNav}. */
export interface BottomNavProps {
  /** Three to five tabs. */
  items:      readonly BottomNavItem[]
  className?: string
}

/**
 * The BottomNav pattern of a mobile app: a tab bar with 48 px targets, above the home indicator safe area.
 * The current tab takes the brand text colour.
 *
 * @param props - The tabs.
 * @returns The tab bar.
 */
export function BottomNav ({ items, className }: BottomNavProps) {
  return (
    <nav
      data-slot='bottom-nav'
      aria-label='Tabs'
      className={cn('grid shrink-0 border-t bg-background px-2 pt-1.5 pb-[max(env(safe-area-inset-bottom),8px)]', className)}
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          aria-current={item.current ? 'page' : undefined}
          className='flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl text-muted-foreground no-underline outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[current=page]:text-brand-text [&_svg]:size-[22px]'
        >
          <span aria-hidden='true' className='flex'>{item.icon}</span>
          <span className='text-[11px] font-medium'>{item.label}</span>
        </a>
      ))}
    </nav>
  )
}
