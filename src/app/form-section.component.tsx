import type { ReactNode } from 'react'
import { cn } from '../class-names'

/** Props of {@link FormSection}. */
export interface FormSectionProps {
  /** The section title. */
  title:        ReactNode
  /** What the settings in the section change. */
  description?: ReactNode
  /** The fields. */
  children:     ReactNode
  /** Buttons under the fields, such as Save. */
  actions?:     ReactNode
  className?:   string
}

/**
 * The FormSection pattern of a settings page: a title and description beside a card of fields. The two
 * columns stack below 768 px.
 *
 * @param props - Title, description, fields and actions.
 * @returns The section.
 */
export function FormSection ({ title, description, children, actions, className }: FormSectionProps) {
  return (
    <section data-slot='form-section' className={cn('grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]', className)}>
      <div className='flex flex-col gap-1'>
        <h2 className='m-0 type-h4'>{title}</h2>
        {description && <p className='m-0 text-[13px] text-muted-foreground'>{description}</p>}
      </div>
      <div className='flex flex-col overflow-hidden rounded-xl border bg-card shadow-xs'>
        <div className='flex flex-col gap-4 p-5'>{children}</div>
        {actions && <div className='flex justify-end gap-2 border-t bg-muted px-5 py-3'>{actions}</div>}
      </div>
    </section>
  )
}
