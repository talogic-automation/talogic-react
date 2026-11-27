import { Minus, Plus } from 'lucide-react'
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
 * The question: a full-width button with a plus or minus.
 *
 * @param props - Radix Accordion trigger props.
 * @returns The heading and its button.
 */
export function AccordionTrigger ({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className='m-0 flex'>
      <AccordionPrimitive.Trigger
        data-slot='accordion-trigger'
        className={cn('group flex flex-1 cursor-pointer items-center justify-between gap-4 py-3 text-start type-h4 outline-none focus-visible:ring-2 focus-visible:ring-ring', className)}
        {...props}
      >
        {children}
        <Plus className='size-4 shrink-0 text-muted-foreground group-data-[state=open]:hidden' aria-hidden='true' />
        <Minus className='hidden size-4 shrink-0 text-muted-foreground group-data-[state=open]:block' aria-hidden='true' />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

/**
 * The answer.
 *
 * @param props - Radix Accordion content props.
 * @returns The panel.
 */
export function AccordionContent ({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content data-slot='accordion-content' className='overflow-hidden text-sm text-muted-foreground' {...props}>
      <div className={cn('pb-3', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}
