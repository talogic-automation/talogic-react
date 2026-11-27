import type { ReactNode } from 'react'
import { cn } from '../class-names'
import { Card } from '../ui'
import { sparklinePath } from './sparkline.algorithm'

const toneClassName = { positive: 'text-success', negative: 'text-destructive', neutral: 'text-muted-foreground' } as const

/** Props of {@link StatCard}. */
export interface StatCardProps {
  /** What the number counts, such as "Runs, 7 days". */
  label:      ReactNode
  /** The number, already formatted. */
  value:      ReactNode
  /** The change, already formatted, such as "+8.2%". */
  delta?:     ReactNode
  /** Whether the change is good, bad or neither. Default neutral. */
  tone?:      keyof typeof toneClassName
  /** A short series for the brand sparkline, oldest first. */
  series?:    readonly number[]
  className?: string
}

/**
 * The StatCard pattern: a label, a tabular number, a sparkline in the brand colour, and the change.
 *
 * @param props - Label, value, delta, tone and series.
 * @returns The card.
 */
export function StatCard ({ label, value, delta, tone = 'neutral', series, className }: StatCardProps) {
  const path = series ? sparklinePath(series, 100, 32) : ''

  return (
    <Card data-slot='stat-card' className={cn('gap-1.5 p-4', className)}>
      <span className='text-[13px] text-muted-foreground'>{label}</span>
      <div className='flex items-end justify-between gap-2'>
        <span className='text-[26px] font-semibold tracking-tight tabular-nums'>{value}</span>
        {path && (
          <svg viewBox='0 0 100 32' width='100' height='32' preserveAspectRatio='none' aria-hidden='true' className='overflow-visible'>
            <path d={path} fill='none' stroke='var(--brand)' strokeWidth='2' strokeLinejoin='round' vectorEffect='non-scaling-stroke' />
          </svg>
        )}
      </div>
      {delta && <span className={cn('text-xs', toneClassName[tone])}>{delta}</span>}
    </Card>
  )
}
