import { Check, ChevronDown } from 'lucide-react'
import { Select as SelectPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'
import { controlClassName } from './control.recipe'
import { useFieldControl } from './field-control.hook'

/** The shadcn/ui Select root (Radix). */
export const Select = SelectPrimitive.Root

/** A group of {@link SelectItem}s. */
export const SelectGroup = SelectPrimitive.Group

/** The selected value inside a {@link SelectTrigger}. */
export const SelectValue = SelectPrimitive.Value

/**
 * The button that opens a {@link Select}. Inside a {@link Field} it takes the field's id and state.
 *
 * @param props - Radix Select trigger props.
 * @returns The trigger.
 */
export function SelectTrigger ({ className, children, ...props }: ComponentProps<typeof SelectPrimitive.Trigger>) {
  const control = useFieldControl(props)

  return (
    <SelectPrimitive.Trigger
      data-slot='select-trigger'
      className={cn(controlClassName, 'flex h-(--control-h) cursor-pointer items-center justify-between gap-2 px-3 text-start data-placeholder:text-muted-foreground [&>span]:truncate', className)}
      {...props}
      {...control}
    >
      {children}
      <SelectPrimitive.Icon asChild><ChevronDown className='size-4 shrink-0 text-muted-foreground' aria-hidden='true' /></SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

/**
 * The list of a {@link Select}, in a portal, as wide as the trigger.
 *
 * @param props - Radix Select content props.
 * @returns The list.
 */
export function SelectContent ({ className, children, position = 'popper', ...props }: ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot='select-content'
        position={position}
        className={cn(
          'relative z-50 max-h-(--radix-select-content-available-height) min-w-32 origin-(--radix-select-content-transform-origin) overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-md',
          'data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out motion-reduce:data-[state=open]:animate-fade-in motion-reduce:data-[state=closed]:animate-fade-out',
          position === 'popper' && 'w-full min-w-(--radix-select-trigger-width) data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1',
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className='p-1'>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

/**
 * The heading of a {@link SelectGroup}.
 *
 * @param props - Radix Select label props.
 * @returns The heading.
 */
export function SelectLabel ({ className, ...props }: ComponentProps<typeof SelectPrimitive.Label>) {
  return <SelectPrimitive.Label data-slot='select-label' className={cn('px-2.5 py-1.5 text-xs font-medium text-muted-foreground', className)} {...props} />
}

/**
 * An option of a {@link Select}, with a check mark when selected.
 *
 * @param props - Radix Select item props.
 * @returns The option.
 */
export function SelectItem ({ className, children, ...props }: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot='select-item'
      className={cn('relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 ps-2.5 pe-8 text-[13.5px] outline-none focus:bg-accent data-disabled:pointer-events-none data-disabled:opacity-50', className)}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <span className='absolute end-2 flex size-4 items-center justify-center'>
        <SelectPrimitive.ItemIndicator><Check className='size-4' aria-hidden='true' /></SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  )
}

/**
 * A line between groups of a {@link Select}.
 *
 * @param props - Radix Select separator props.
 * @returns The separator.
 */
export function SelectSeparator ({ className, ...props }: ComponentProps<typeof SelectPrimitive.Separator>) {
  return <SelectPrimitive.Separator data-slot='select-separator' className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />
}
