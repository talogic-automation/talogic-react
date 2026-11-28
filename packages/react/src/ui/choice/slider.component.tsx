import { Slider as SliderPrimitive } from 'radix-ui'
import { type ComponentProps, useState } from 'react'
import { cn } from '../../class-names'

/**
 * The shadcn/ui Slider, with one thumb per value. A click on the track glides the thumb and the fill to that point;
 * a drag follows the pointer at once. Give it an `aria-label` or label it with a {@link Label}.
 *
 * @param props - Radix Slider props.
 * @returns The slider.
 */
export function Slider ({ className, value, defaultValue, min = 0, max = 100, onPointerDown, onPointerMove, onPointerUp, ...props }: ComponentProps<typeof SliderPrimitive.Root>) {
  const [dragging, setDragging] = useState(false)
  const thumbs = (value ?? defaultValue ?? [min]).length
  const thumbLabel = props['aria-label']

  return (
    <SliderPrimitive.Root
      data-slot='slider'
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      data-dragging={dragging || undefined}
      onPointerDown={(event) => { setDragging(false); onPointerDown?.(event) }}
      onPointerMove={(event) => { if (event.buttons > 0) setDragging(true); onPointerMove?.(event) }}
      onPointerUp={(event) => { setDragging(false); onPointerUp?.(event) }}
      className={cn(
        'group/slider relative flex w-full touch-none select-none items-center data-disabled:opacity-50',
        // The thumb's wrapper (positioned by Radix) and the fill glide unless the user is dragging.
        'not-data-dragging:[&>span:has([role=slider])]:transition-[left] not-data-dragging:[&>span:has([role=slider])]:duration-200 not-data-dragging:[&>span:has([role=slider])]:ease-emphasised',
        'motion-reduce:[&>span:has([role=slider])]:transition-none',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className='relative h-1.5 grow overflow-hidden rounded-full bg-muted'>
        <SliderPrimitive.Range className='absolute h-full bg-primary transition-[left,right] duration-200 ease-emphasised group-data-dragging/slider:transition-none motion-reduce:transition-none' />
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
