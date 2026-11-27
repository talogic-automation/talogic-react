import { type AriaAttributes, createContext, useContext } from 'react'

/** What a {@link Field} tells the control inside it. */
export interface FieldControlState {
  /** The control's id, which the field's label points at. */
  id:          string
  /** Ids of the hint and the error, for `aria-describedby`. Empty when the field has neither. */
  describedBy: string
  /** True when the field shows an error. */
  invalid:     boolean
}

/** The context a {@link Field} provides. Null outside a field. */
export const FieldControlContext = createContext<FieldControlState | null>(null)

/** The ARIA wiring a control spreads on itself. */
export interface FieldControlProps {
  'id'?:               string
  'aria-describedby'?: string
  'aria-invalid'?:     AriaAttributes['aria-invalid']
}

/**
 * Wires a control to the field around it: its id, its description and its invalid state. A prop the caller
 * passes wins over the field's value. Outside a field it returns the caller's props unchanged.
 *
 * @param own - The ARIA props the caller passed to the control.
 * @returns The props to spread on the control element.
 */
export function useFieldControl (own: FieldControlProps = {}): FieldControlProps {
  const field = useContext(FieldControlContext)
  if (!field) return own

  return {
    'id':               own.id ?? field.id,
    'aria-describedby': own['aria-describedby'] ?? (field.describedBy || undefined),
    'aria-invalid':     own['aria-invalid'] ?? (field.invalid || undefined),
  }
}
