import { type ReactNode, useId } from 'react'
import { cn } from '../../class-names'
import { FieldControlContext } from './field-control.hook'
import { Label } from './label.component'

/** Props of {@link Field}. */
export interface FieldProps {
  /** The visible label. */
  label:      ReactNode
  /** Helper copy under the control. */
  hint?:      ReactNode
  /** An error under the control. It marks the control invalid and replaces nothing: the hint stays. */
  error?:     ReactNode
  /** The control's id. A stable id is made when it is not given. */
  id?:        string
  /** The control: an Input, Textarea or SelectTrigger, which wire themselves to the field. */
  children:   ReactNode
  className?: string
}

/**
 * A labelled form field: label, control, hint and error, with the ARIA wiring done for the control.
 *
 * @param props - Label, hint, error, optional id and the control.
 * @returns The field.
 */
export function Field ({ label, hint, error, id, children, className }: FieldProps) {
  const autoId = useId()
  const controlId = id ?? autoId
  const hintId = hint ? `${controlId}-hint` : ''
  const errorId = error ? `${controlId}-error` : ''
  const describedBy = [hintId, errorId].filter(Boolean).join(' ')

  return (
    <FieldControlContext value={{ id: controlId, describedBy, invalid: Boolean(error) }}>
      <div data-slot='field' className={cn('flex flex-col gap-1.5', className)}>
        <Label htmlFor={controlId}>{label}</Label>
        {children}
        {hint && <p id={hintId} className='m-0 text-xs text-muted-foreground'>{hint}</p>}
        {error && <p id={errorId} className='m-0 text-xs text-destructive'>{error}</p>}
      </div>
    </FieldControlContext>
  )
}
