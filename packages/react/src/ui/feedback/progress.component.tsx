import { Progress as ProgressPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'

/**
 * The shadcn/ui Progress bar: 6 px, brand fill on the muted track. Give it an `aria-label`.
 *
 * @param props - `value` from 0 to `max` (default 100) and Radix Progress props.
 * @returns The progress bar.
 */
export function Progress ({ className, value, max = 100, ...props }: ComponentProps<typeof ProgressPrimitive.Root>) {
  const percent = value == null ? 0 : Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <ProgressPrimitive.Root data-slot='progress' value={value} max={max} className={cn('relative h-1.5 w-full overflow-hidden rounded-full bg-muted', className)} {...props}>
      <ProgressPrimitive.Indicator className='h-full rounded-full bg-brand transition-[width]' style={{ width: `${percent}%` }} />
    </ProgressPrimitive.Root>
  )
}
