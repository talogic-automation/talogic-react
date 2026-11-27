import type { ComponentProps } from 'react'
import { cn } from '../../class-names'
import { controlClassName } from './control.recipe'
import { useFieldControl } from './field-control.hook'

/**
 * The shadcn/ui Textarea. Inside a {@link Field} it takes the field's id, description and invalid state.
 *
 * @param props - Any `textarea` props.
 * @returns The textarea.
 */
export function Textarea ({ className, ...props }: ComponentProps<'textarea'>) {
  const control = useFieldControl(props)

  return <textarea data-slot='textarea' className={cn(controlClassName, 'min-h-20 resize-y px-3 py-2.5 leading-normal', className)} {...props} {...control} />
}
