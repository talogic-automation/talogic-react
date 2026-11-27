import { Check } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { cn } from '../class-names'
import { Badge, Button, ToggleGroup, ToggleGroupItem } from '../ui'

/** How often a plan is billed. */
export type Billing = 'monthly' | 'yearly'

/** One plan of a {@link PricingTable}. */
export interface PricingPlan {
  name:      string
  /** The price, the same for both billings, or one per billing. */
  price:     string | Readonly<Record<Billing, string>>
  blurb:     string
  features:  readonly string[]
  cta:       { label: string, href: string }
  /** The plan most teams pick. It gets a brand border, a badge and the primary button. */
  featured?: boolean
}

/** Props of {@link PricingTable}. */
export interface PricingTableProps {
  title:           ReactNode
  lead?:           ReactNode
  plans:           readonly PricingPlan[]
  /** The billing shown first. */
  defaultBilling?: Billing
  /** A note under the plans, such as a placeholder warning. */
  note?:           ReactNode
  /** The featured badge text. Default "Most teams". */
  featuredLabel?:  string
  className?:      string
}

/**
 * The PricingTable pattern: plan cards with a monthly and yearly switch.
 *
 * @param props - Title, lead, plans, first billing and note.
 * @returns The section.
 */
export function PricingTable ({ title, lead, plans, defaultBilling = 'monthly', note, featuredLabel = 'Most teams', className }: PricingTableProps) {
  const [billing, setBilling] = useState<Billing>(defaultBilling)

  return (
    <section data-slot='pricing-table' className={cn('border-y bg-canvas py-22', className)}>
      <div className='mx-auto flex max-w-[1200px] flex-col gap-8 px-6'>
        <div className='flex flex-wrap items-end justify-between gap-5'>
          <div className='flex flex-col gap-2.5'>
            <h2 className='m-0 type-h2 text-4xl'>{title}</h2>
            {lead && <p className='m-0 type-lead'>{lead}</p>}
          </div>
          <ToggleGroup type='single' value={billing} onValueChange={(value) => value && setBilling(value as Billing)} aria-label='Billing'>
            <ToggleGroupItem value='monthly'>Monthly</ToggleGroupItem>
            <ToggleGroupItem value='yearly'>Yearly</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <ul className='m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 p-0'>
          {plans.map((plan) => (
            <li
              key={plan.name}
              aria-label={plan.name}
              className={cn('flex flex-col gap-3.5 rounded-2xl border bg-card p-7 shadow-xs', plan.featured && 'border-brand shadow-[0_0_0_1px_var(--brand),var(--elevation-md)]')}
            >
              <div className='flex items-center justify-between'>
                <h3 className='m-0 type-h3'>{plan.name}</h3>
                {plan.featured && <Badge>{featuredLabel}</Badge>}
              </div>
              <span className='font-display text-[34px] font-extrabold tracking-tight'>{typeof plan.price === 'string' ? plan.price : plan.price[billing]}</span>
              <p className='m-0 text-[15px] text-muted-foreground'>{plan.blurb}</p>
              <hr className='m-0 h-px border-0 bg-border' />
              <ul className='m-0 flex list-none flex-col gap-2.5 p-0 text-[15px]'>
                {plan.features.map((feature) => (
                  <li key={feature} className='flex gap-2.5'><Check className='mt-0.5 size-4.5 shrink-0 text-brand-text' strokeWidth={2} aria-hidden='true' />{feature}</li>
                ))}
              </ul>
              <Button asChild variant={plan.featured ? 'default' : 'outline'} className='mt-auto'>
                <a href={plan.cta.href}>{plan.cta.label}</a>
              </Button>
            </li>
          ))}
        </ul>
        {note && <p className='m-0 text-xs text-muted-foreground'>{note}</p>}
      </div>
    </section>
  )
}
