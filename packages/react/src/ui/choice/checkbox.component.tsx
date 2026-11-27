import { Check, Minus } from 'lucide-react'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'

/**
 * The shadcn/ui Checkbox: 16 px, primary fill when checked, a dash when indeterminate.
 *
 * @param props - Radix Checkbox props.
 * @returns The checkbox.
 */
export function Checkbox ({ className, ...props }: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      className={cn(
        'peer grid size-4 shrink-0 cursor-pointer place-content-center rounded-[4px] border border-input bg-background shadow-xs outline-none',
        'focus-visible:ring-3 focus-visible:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        'data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className='group grid place-content-center'>
        <Check className='size-3 group-data-[state=indeterminate]:hidden' strokeWidth={3} aria-hidden='true' />
        <Minus className='hidden size-3 group-data-[state=indeterminate]:block' strokeWidth={3} aria-hidden='true' />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
