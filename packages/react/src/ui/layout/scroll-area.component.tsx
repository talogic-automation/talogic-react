import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'

/**
 * The shadcn/ui ScrollArea: native scrolling with thin themed bars, for panels in apps and desktop.
 *
 * @param props - Radix ScrollArea root props.
 * @returns The scroll area.
 */
export function ScrollArea ({ className, children, ...props }: ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root data-slot='scroll-area' className={cn('relative overflow-hidden', className)} {...props}>
      <ScrollAreaPrimitive.Viewport className='size-full rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring'>{children}</ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollBar orientation='horizontal' />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

/**
 * One bar of a {@link ScrollArea}.
 *
 * @param props - Radix ScrollArea scrollbar props.
 * @returns The bar.
 */
export function ScrollBar ({ className, orientation = 'vertical', ...props }: ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot='scroll-area-scrollbar'
      orientation={orientation}
      className={cn('flex touch-none select-none p-px', orientation === 'vertical' ? 'h-full w-2' : 'h-2 flex-col', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb className='relative flex-1 rounded-full bg-input' />
    </ScrollAreaPrimitive.Scrollbar>
  )
}
