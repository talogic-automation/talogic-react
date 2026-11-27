import type { ComponentProps } from 'react'
import { cn } from '../../class-names'

/**
 * The shadcn/ui Skeleton: a placeholder block. Skeletons copy the real layout, so size them like the content.
 *
 * @param props - Any `div` props; set the size with classes.
 * @returns The placeholder.
 */
export function Skeleton ({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot='skeleton' aria-hidden='true' className={cn('animate-pulse rounded-sm bg-muted', className)} {...props} />
}
