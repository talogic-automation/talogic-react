import type { ReactNode } from 'react'
import { cn } from '../class-names'
import { Badge } from '../ui'

/** Props of {@link Hero}. */
export interface HeroProps {
  /** A short label over the title, on brand-soft. */
  eyebrow?:   ReactNode
  /** The headline, in DM Sans display. */
  title:      ReactNode
  /** The paragraph under the headline. */
  lead?:      ReactNode
  /** The calls to action, usually one primary and one outline large button. */
  actions?:   ReactNode
  className?: string
}

/**
 * The Hero pattern: the opening section of a website or product page.
 *
 * @param props - Eyebrow, title, lead and actions.
 * @returns The hero section.
 */
export function Hero ({ eyebrow, title, lead, actions, className }: HeroProps) {
  return (
    <section data-slot='hero' className={cn('pt-22 pb-14', className)}>
      <div className='mx-auto flex max-w-[1200px] flex-col items-start gap-5.5 px-6'>
        {eyebrow && <Badge variant='brand' className='h-7 px-3 text-[13px]'>{eyebrow}</Badge>}
        <h1 className='m-0 max-w-[980px] type-display text-[clamp(40px,6vw,72px)]'>{title}</h1>
        {lead && <p className='m-0 max-w-[680px] type-lead text-[19px]'>{lead}</p>}
        {actions && <div className='flex flex-wrap gap-3'>{actions}</div>}
      </div>
    </section>
  )
}
