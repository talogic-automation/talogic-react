import { Label as LabelPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'

/**
 * The shadcn/ui Label: 13 px, medium weight.
 *
 * @param props - Radix Label props.
 * @returns The label.
 */
export function Label ({ className, ...props }: ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot='label'
      className={cn('flex select-none items-center gap-2 text-[13px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50', className)}
      {...props}
    />
  )
}
