import { Accordion as AccordionPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'

/**
 * The shadcn/ui Accordion root, for FAQs and long settings.
 *
 * @param props - Radix Accordion root props (`type` is `single` or `multiple`).
 * @returns The accordion.
 */
export function Accordion ({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot='accordion' className={cn('border-t', className)} {...props} />
}

/**
 * One question and answer.
 *
 * @param props - Radix Accordion item props.
 * @returns The item.
 */
export function AccordionItem ({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item data-slot='accordion-item' className={cn('border-b', className)} {...props} />
}

/**
 * The question: a full-width button with a plus that turns into a minus as the answer opens.
 *
 * @param props - Radix Accordion trigger props.
 * @returns The heading and its button.
 */
export function AccordionTrigger ({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className='m-0 flex'>
      <AccordionPrimitive.Trigger
        data-slot='accordion-trigger'
        className={cn('group flex flex-1 cursor-pointer items-center justify-between gap-4 py-3 text-start type-h4 outline-none transition-colors duration-150 hover:text-brand-text focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none', className)}
        {...props}
      >
        {children}
        {/* One plus: opening turns it a quarter turn while its upright bar folds flat, so it ends as a minus. */}
        <svg viewBox='0 0 16 16' aria-hidden='true' className='size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-emphasised group-data-[state=open]:rotate-180 motion-reduce:transition-none'>
          <rect x='3' y='7.25' width='10' height='1.5' rx='0.75' fill='currentColor' />
          <rect x='7.25' y='3' width='1.5' height='10' rx='0.75' fill='currentColor' className='origin-center transition-[scale] duration-300 ease-emphasised [transform-box:fill-box] group-data-[state=open]:scale-y-0 motion-reduce:transition-none' />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

/**
 * The answer. It uncovers to its own height while it fades in, and covers again on close.
 *
 * @param props - Radix Accordion content props.
 * @returns The panel.
 */
export function AccordionContent ({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot='accordion-content'
      className='overflow-hidden text-sm text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none'
      {...props}
    >
      <div className={cn('pb-3', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}
