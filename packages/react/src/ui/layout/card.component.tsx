import type { ComponentProps } from 'react'
import { cn } from '../../class-names'

/**
 * The shadcn/ui Card: card colours, a border, 14 px radius and the lowest elevation.
 *
 * @param props - Any `div` props.
 * @returns The card.
 */
export function Card ({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot='card' className={cn('flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-xs', className)} {...props} />
}

/**
 * The top of a {@link Card}: title, description and an optional action.
 *
 * @param props - Any `div` props.
 * @returns The header.
 */
export function CardHeader ({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot='card-header' className={cn('flex flex-col gap-1 px-5 pt-5', className)} {...props} />
}

/**
 * The title of a {@link Card}.
 *
 * @param props - Any `h3` props.
 * @returns The title.
 */
export function CardTitle ({ className, children, ...props }: ComponentProps<'h3'>) {
  return <h3 data-slot='card-title' className={cn('m-0 type-h4', className)} {...props}>{children}</h3>
}

/**
 * The description of a {@link Card}.
 *
 * @param props - Any `p` props.
 * @returns The description.
 */
export function CardDescription ({ className, ...props }: ComponentProps<'p'>) {
  return <p data-slot='card-description' className={cn('m-0 text-[13px] text-muted-foreground', className)} {...props} />
}

/**
 * The body of a {@link Card}.
 *
 * @param props - Any `div` props.
 * @returns The content.
 */
export function CardContent ({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot='card-content' className={cn('px-5 py-4', className)} {...props} />
}

/**
 * The foot of a {@link Card}: muted, with a top border, pinned to the bottom.
 *
 * @param props - Any `div` props.
 * @returns The footer.
 */
export function CardFooter ({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot='card-footer' className={cn('mt-auto flex items-center justify-between gap-3 border-t bg-muted px-5 py-3', className)} {...props} />
}
