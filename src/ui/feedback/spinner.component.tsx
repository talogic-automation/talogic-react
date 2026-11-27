import { LoaderCircle } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'

/**
 * The shadcn/ui Spinner. Show text beside it for any wait over 400 ms.
 *
 * @param props - `label` (the accessible name, default "Loading") and any `svg` props.
 * @returns The spinner.
 */
export function Spinner ({ className, label = 'Loading', ...props }: ComponentProps<'svg'> & { label?: string }) {
  return <LoaderCircle data-slot='spinner' role='status' aria-label={label} className={cn('size-4 animate-spin text-muted-foreground', className)} {...props} />
}
