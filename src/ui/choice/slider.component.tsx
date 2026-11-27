import { Slider as SliderPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'

/**
 * The shadcn/ui Slider, with one thumb per value. Give it an `aria-label` or label it with a {@link Label}.
 *
 * @param props - Radix Slider props.
 * @returns The slider.
 */
export function Slider ({ className, value, defaultValue, min = 0, max = 100, ...props }: ComponentProps<typeof SliderPrimitive.Root>) {
  const thumbs = (value ?? defaultValue ?? [min]).length
  const thumbLabel = props['aria-label']

  return (
    <SliderPrimitive.Root
      data-slot='slider'
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      className={cn('relative flex w-full touch-none select-none items-center data-disabled:opacity-50', className)}
      {...props}
    >
      <SliderPrimitive.Track className='relative h-1.5 grow overflow-hidden rounded-full bg-muted'>
        <SliderPrimitive.Range className='absolute h-full bg-primary' />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbs }, (_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          aria-label={thumbLabel}
          className='block size-4 cursor-grab rounded-full border border-primary bg-background shadow-xs outline-none focus-visible:ring-3 focus-visible:ring-ring/25'
        />
      ))}
    </SliderPrimitive.Root>
  )
}
