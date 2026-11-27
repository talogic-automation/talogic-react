import type { ReactNode } from 'react'
import { cn } from '../class-names'

/** Props of {@link StatusBar}. */
export interface StatusBarProps {
  /** Items at the start, such as the engine state. */
  start?:     ReactNode
  /** Items at the end, such as the playhead. */
  end?:       ReactNode
  className?: string
}

/**
 * The StatusBar pattern at the foot of a desktop window: 24 px, 12 px muted text, items at both ends.
 * Its content is announced politely when it changes.
 *
 * @param props - Start and end items.
 * @returns The status bar.
 */
export function StatusBar ({ start, end, className }: StatusBarProps) {
  return (
    <div data-slot='status-bar' role='status' className={cn('flex h-6 shrink-0 items-center gap-3.5 border-t bg-sidebar px-2.5 text-xs text-muted-foreground', className)}>
      {start}
      {end && <div className='ms-auto flex items-center gap-3.5'>{end}</div>}
    </div>
  )
}
