import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../../class-names'
import { controlClassName } from './control.recipe'
import { useFieldControl } from './field-control.hook'

/** Props of {@link Input}. */
export interface InputProps extends ComponentProps<'input'> {
  /** An icon inside the start of the input, such as a search glass. It is decorative. */
  startIcon?: ReactNode
}

/**
 * The shadcn/ui Input. Inside a {@link Field} it takes the field's id, description and invalid state.
 *
 * @param props - `startIcon` and any `input` props.
 * @returns The input, wrapped when it has an icon.
 */
export function Input ({ className, startIcon, type = 'text', ...props }: InputProps) {
  const control = useFieldControl(props)
  const input = (
    <input
      data-slot='input'
      type={type}
      className={cn(controlClassName, 'h-(--control-h) px-3 file:border-0 file:bg-transparent file:text-sm file:font-medium', startIcon ? 'ps-[34px]' : '', className)}
      {...props}
      {...control}
    />
  )
  if (!startIcon) return input

  return (
    <span className='relative flex w-full items-center'>
      <span aria-hidden='true' className='pointer-events-none absolute start-[11px] flex text-muted-foreground [&_svg]:size-4'>{startIcon}</span>
      {input}
    </span>
  )
}
