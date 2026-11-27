import type { ReactNode } from 'react'
import { cn } from '../class-names'

/** One feature of a {@link FeatureGrid}. */
export interface Feature {
  /** A 24 px lucide icon. It sits in a 44 px brand-soft tile. */
  icon:  ReactNode
  title: string
  body:  string
}

/** Props of {@link FeatureGrid}. */
export interface FeatureGridProps {
  title?:     ReactNode
  lead?:      ReactNode
  features:   readonly Feature[]
  className?: string
}

/**
 * The FeatureGrid pattern: a section of feature cards on the canvas colour.
 *
 * @param props - Title, lead and features.
 * @returns The section.
 */
export function FeatureGrid ({ title, lead, features, className }: FeatureGridProps) {
  return (
    <section data-slot='feature-grid' className={cn('border-y bg-canvas py-22', className)}>
      <div className='mx-auto flex max-w-[1200px] flex-col gap-10 px-6'>
        {(title || lead) && (
          <div className='flex max-w-[720px] flex-col gap-2.5'>
            {title && <h2 className='m-0 type-h2 text-4xl'>{title}</h2>}
            {lead && <p className='m-0 type-lead'>{lead}</p>}
          </div>
        )}
        <ul className='m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 p-0'>
          {features.map((feature) => (
            <li key={feature.title} className='flex flex-col gap-3 rounded-2xl border bg-card p-6 shadow-xs'>
              <span aria-hidden='true' className='grid size-11 place-items-center rounded-xl bg-brand-soft text-brand-text [&_svg]:size-6'>{feature.icon}</span>
              <h3 className='m-0 type-h3'>{feature.title}</h3>
              <p className='m-0 text-[15px] text-muted-foreground'>{feature.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
