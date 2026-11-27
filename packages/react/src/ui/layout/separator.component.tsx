import { Separator as SeparatorPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'

/**
 * The shadcn/ui Separator: a 1 px border-colour line. Decorative unless told otherwise.
 *
 * @param props - Radix Separator props (`orientation`, `decorative`).
 * @returns The line.
 */
export function Separator ({ className, orientation = 'horizontal', decorative = true, ...props }: ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot='separator'
      orientation={orientation}
      decorative={decorative}
      className={cn('shrink-0 bg-border', orientation === 'horizontal' ? 'h-px w-full' : 'w-px self-stretch', className)}
      {...props}
    />
  )
}
