import { type FormEvent, type ReactNode, useId } from 'react'
import { cn } from '../class-names'
import { Button, Input } from '../ui'

/** Props of {@link CtaBand}. */
export interface CtaBandProps {
  title:        ReactNode
  body?:        ReactNode
  /** Called with the email address when the user sends the form. */
  onSubmit:     (email: string) => void
  /** The field's accessible label and placeholder. Default "Work email". */
  inputLabel?:  string
  /** The button label. Default "Send". */
  submitLabel?: string
  className?:   string
}

/**
 * The CTABand pattern: a primary-colour band with a title and a one-field email form.
 *
 * @param props - Title, body, submit handler and labels.
 * @returns The section.
 */
export function CtaBand ({ title, body, onSubmit, inputLabel = 'Work email', submitLabel = 'Send', className }: CtaBandProps) {
  const id = useId()

  function submit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const email = new FormData(event.currentTarget).get('email')
    if (typeof email === 'string' && email.trim()) onSubmit(email.trim())
  }

  return (
    <section data-slot='cta-band' className={cn('py-22', className)}>
      <div className='mx-auto max-w-[1200px] px-6'>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-8 rounded-[28px] bg-primary p-[clamp(28px,5vw,56px)] text-primary-foreground'>
          <div className='flex flex-col gap-2.5'>
            <h2 className='m-0 type-h2 text-4xl text-inherit'>{title}</h2>
            {body && <p className='m-0 text-[17px] opacity-90'>{body}</p>}
          </div>
          <form onSubmit={submit} className='flex flex-wrap gap-2.5'>
            <label htmlFor={id} className='sr-only'>{inputLabel}</label>
            <Input id={id} name='email' type='email' required autoComplete='email' placeholder={inputLabel} className='flex-[1_1_220px] border-transparent' />
            <Button type='submit' className='bg-foreground text-background hover:bg-foreground/90'>{submitLabel}</Button>
          </form>
        </div>
      </div>
    </section>
  )
}
