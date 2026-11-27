import type { ComponentProps } from 'react'
import { cn } from '../../class-names'

/**
 * The shadcn/ui Kbd: one key, in Fira Code, with a heavier bottom border.
 *
 * @param props - Any `kbd` props.
 * @returns The key.
 */
export function Kbd ({ className, ...props }: ComponentProps<'kbd'>) {
  return <kbd data-slot='kbd' className={cn('inline-flex h-5 min-w-5 items-center justify-center rounded-[5px] border border-b-2 bg-muted px-1.5 font-mono text-[11px] text-muted-foreground', className)} {...props} />
}
