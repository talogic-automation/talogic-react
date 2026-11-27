import type { ReactNode } from 'react'
import { cn } from '../class-names'

/** One step of {@link HowItWorks}. */
export interface HowItWorksStep {
  title: string
  body:  string
}

/** Props of {@link HowItWorks}. */
export interface HowItWorksProps {
  title:      ReactNode
  lead?:      ReactNode
  /** A link under the lead, such as "How an engagement works". */
  link?:      ReactNode
  steps:      readonly HowItWorksStep[]
  className?: string
}

/**
 * The HowItWorks pattern: a title on one side and numbered steps on the other.
 *
 * @param props - Title, lead, link and steps.
 * @returns The section.
 */
export function HowItWorks ({ title, lead, link, steps, className }: HowItWorksProps) {
  return (
    <section data-slot='how-it-works' className={cn('py-22', className)}>
      <div className='mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-start gap-12 px-6'>
        <div className='flex flex-col gap-3.5'>
          <h2 className='m-0 type-h2 text-4xl'>{title}</h2>
          {lead && <p className='m-0 type-lead'>{lead}</p>}
          {link}
        </div>
        <ol className='m-0 flex list-none flex-col p-0'>
          {steps.map((step, index) => (
            <li key={step.title} className='grid grid-cols-[44px_minmax(0,1fr)] gap-4.5 border-b py-4.5'>
              <span aria-hidden='true' className='grid size-11 place-items-center rounded-full border-[1.5px] border-brand font-bold text-brand-text'>{index + 1}</span>
              <span className='flex flex-col gap-1'>
                <span className='type-h3'>{step.title}</span>
                <span className='text-[15px] text-muted-foreground'>{step.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
