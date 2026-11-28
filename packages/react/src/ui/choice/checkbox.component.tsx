import { Checkbox as CheckboxPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'

const stroke = 'fill-none stroke-current [stroke-dasharray:1] [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.4] transition-[stroke-dashoffset] ease-emphasised motion-reduce:transition-none'

/**
 * The shadcn/ui Checkbox: 16 px, primary fill when checked. Checking draws the tick from its short end. Going to the
 * indeterminate state undraws the tick while the dash draws across, and clearing undraws the mark while the fill
 * fades. Reduced motion changes at once.
 *
 * @param props - Radix Checkbox props.
 * @returns The checkbox.
 */
export function Checkbox ({ className, ...props }: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      className={cn(
        'peer group/checkbox grid size-4 shrink-0 cursor-pointer place-content-center rounded-[4px] border border-input bg-background text-primary-foreground shadow-xs outline-none',
        'transition-[background-color,border-color] duration-150 motion-reduce:transition-none',
        'focus-visible:ring-3 focus-visible:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator forceMount className='grid place-content-center'>
        <svg viewBox='0 0 16 16' aria-hidden='true' className='size-3'>
          <path
            d='M3.5 8.5 L6.5 11.5 L12.5 4.5'
            pathLength={1}
            className={cn(stroke, 'duration-200 [stroke-dashoffset:1] group-data-[state=checked]/checkbox:[stroke-dashoffset:0]')}
          />
          <path
            d='M4 8 L12 8'
            pathLength={1}
            className={cn(stroke, 'duration-200 [stroke-dashoffset:1] group-data-[state=indeterminate]/checkbox:[stroke-dashoffset:0] group-data-[state=indeterminate]/checkbox:delay-75')}
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
