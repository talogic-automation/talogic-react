import { RadioGroup as RadioGroupPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'

/**
 * The shadcn/ui RadioGroup root.
 *
 * @param props - Radix RadioGroup root props.
 * @returns The group.
 */
export function RadioGroup ({ className, ...props }: ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot='radio-group' className={cn('grid gap-2.5', className)} {...props} />
}

/**
 * One option of a {@link RadioGroup}: a 16 px circle with a dot when selected. The dot and the fill fade in on the
 * chosen option while they fade out on the one before.
 *
 * @param props - Radix RadioGroup item props.
 * @returns The radio.
 */
export function RadioGroupItem ({ className, ...props }: ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot='radio-group-item'
      className={cn(
        'peer group/radio grid size-4 shrink-0 cursor-pointer place-content-center rounded-full border border-input bg-background shadow-xs outline-none',
        'transition-[background-color,border-color] duration-200 motion-reduce:transition-none',
        'focus-visible:ring-3 focus-visible:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:border-primary data-[state=checked]:bg-primary',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        forceMount
        className='size-1.5 scale-0 rounded-full bg-primary-foreground opacity-0 transition-[opacity,scale] duration-200 ease-emphasised group-data-[state=checked]/radio:scale-100 group-data-[state=checked]/radio:opacity-100 motion-reduce:transition-none'
      />
    </RadioGroupPrimitive.Item>
  )
}
