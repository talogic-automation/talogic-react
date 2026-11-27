import type { ComponentProps } from 'react'
import { cn } from '../../class-names'
import { badgeVariants, type BadgeVariants } from './badge.recipe'

/** Props of {@link Badge}. */
export interface BadgeProps extends ComponentProps<'span'>, BadgeVariants {
  /** Shows a dot in the current colour before the label, for a live status. */
  dot?: boolean
}

/**
 * The shadcn/ui Badge: a short label or status.
 *
 * @param props - Variant, `dot` and any `span` props.
 * @returns The badge.
 */
export function Badge ({ className, variant, dot = false, children, ...props }: BadgeProps) {
  return (
    <span data-slot='badge' className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && <span aria-hidden='true' className='size-1.5 shrink-0 rounded-full bg-current' />}
      {children}
    </span>
  )
}
