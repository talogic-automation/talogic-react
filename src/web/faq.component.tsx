import type { ReactNode } from 'react'
import { cn } from '../class-names'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui'

/** One question of a {@link Faq}. */
export interface FaqItem {
  question: string
  answer:   ReactNode
}

/** Props of {@link Faq}. */
export interface FaqProps {
  title:      ReactNode
  items:      readonly FaqItem[]
  className?: string
}

/**
 * The FAQ pattern: a title and an accordion of questions. One answer opens at a time.
 *
 * @param props - Title and questions.
 * @returns The section.
 */
export function Faq ({ title, items, className }: FaqProps) {
  return (
    <section data-slot='faq' className={cn('py-22', className)}>
      <div className='mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-start gap-12 px-6'>
        <h2 className='m-0 type-h2 text-4xl'>{title}</h2>
        <Accordion type='single' collapsible>
          {items.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent className='text-[15px]'>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
