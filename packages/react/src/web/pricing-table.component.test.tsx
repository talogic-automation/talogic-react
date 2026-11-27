import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { type PricingPlan, PricingTable } from './pricing-table.component'

const plans: PricingPlan[] = [
  { name: 'Open source', price: 'Free', blurb: 'Self-host.', features: ['Full engine'], cta: { label: 'Read the docs', href: '/docs' } },
  { name: 'Team', price: { monthly: '€49', yearly: '€490' }, blurb: 'Hosted.', features: ['Portal'], cta: { label: 'Start a trial', href: '/trial' }, featured: true },
]

describe('PricingTable', () => {
  it('shows the monthly price first and switches to yearly', async () => {
    render(<PricingTable title='Pricing' plans={plans} />)
    const team = screen.getByRole('listitem', { name: 'Team' })

    expect(team).toHaveTextContent('€49')

    await userEvent.click(screen.getByRole('radio', { name: 'Yearly' }))

    expect(team).toHaveTextContent('€490')
    expect(screen.getByRole('listitem', { name: 'Open source' })).toHaveTextContent('Free')
  })

  it('marks the featured plan and gives it the primary call to action', () => {
    render(<PricingTable title='Pricing' plans={plans} />)
    const team = screen.getByRole('listitem', { name: 'Team' })

    expect(team).toHaveTextContent('Most teams')
    expect(within(team).getByRole('link', { name: 'Start a trial' })).toHaveClass('bg-primary')
    expect(within(screen.getByRole('listitem', { name: 'Open source' })).getByRole('link')).toHaveClass('border-input')
  })
})
