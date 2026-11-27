import type { Meta, StoryObj } from '@storybook/react-vite'
import { BadgeCheck, Bot, FileText, LockOpen, Server, ShieldCheck } from 'lucide-react'
import type { Product } from '../tokens'
import { Button } from '../ui'
import { CtaBand } from './cta-band.component'
import { Faq } from './faq.component'
import { FeatureGrid } from './feature-grid.component'
import { Hero } from './hero.component'
import { HowItWorks } from './how-it-works.component'
import { type PricingPlan, PricingTable } from './pricing-table.component'
import { ProductCard } from './product-card.component'
import { SiteFooter } from './site-footer.component'
import { SiteHeader, type SiteNavEntry } from './site-header.component'

const meta = {
  title:      'Web/Patterns',
  parameters: { layout: 'fullscreen', density: 'web' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const NAV: SiteNavEntry[] = [
  {
    label: 'Products',
    links: [
      { label: 'pargic', href: '/pargic', description: 'Web pages and documents into checked records.' },
      { label: 'daygic', href: '/daygic', description: 'Your day, summarised, with to-dos.' },
      { label: 'ingic', href: '/ingic', description: 'Returned scans checked against the original.' },
    ],
  },
  { label: 'Services', href: '/services' },
  { label: 'Docs', href: '/docs' },
  { label: 'Company', href: '/company' },
]

const ACTIONS = (
  <>
    <Button asChild variant='ghost'><a href='/sign-in'>Sign in</a></Button>
    <Button asChild><a href='/contact'>Talk to us</a></Button>
  </>
)

const PRODUCT_LIST: Product[] = ['pargic', 'daygic', 'ingic', 'loregic', 'loomgic']

const FEATURES = [
  { icon: <FileText />, title: 'Recipes you can read', body: 'Every automation is a plain JSON recipe. You can review it, diff it and keep it in git.' },
  { icon: <BadgeCheck />, title: 'Evidence with every result', body: 'A record links back to the page, the scan or the second of audio it came from.' },
  { icon: <Server />, title: 'Runs where your data is', body: 'Docker, your cloud or your laptop. Results go to your own storage.' },
  { icon: <Bot />, title: 'Built for agents too', body: 'Each product has an MCP endpoint, so an assistant can call it with the same rules.' },
  { icon: <ShieldCheck />, title: 'Checked before it ships', body: 'Typed fields, validation and a sample run before anything goes on a schedule.' },
  { icon: <LockOpen />, title: 'Open by default', body: 'MIT licensed cores. No lock-in for your recipes or your records.' },
]

const STEPS = [
  { title: 'Review', body: 'We watch the task once and write down every step and exception.' },
  { title: 'Build', body: 'We write the recipe with the product that fits, or a custom one.' },
  { title: 'Run', body: 'A sample run on real data, checked with you before any schedule.' },
  { title: 'Hand over', body: 'Your team gets the recipe, the docs and the dashboards.' },
]

const PLANS: PricingPlan[] = [
  { name: 'Open source', price: 'Free', blurb: 'Self-host the engine and the CLI.', features: ['Full engine and CLI', 'Community support', 'Your infrastructure'], cta: { label: 'Read the docs', href: '/docs' } },
  { name: 'Team', price: { monthly: '[YOUR PRICE]', yearly: '[YOUR YEARLY PRICE]' }, blurb: 'Hosted portal for a team that runs recipes daily.', features: ['Portal and Studio', 'Schedules and alerts', 'SSO with Entra or Google', 'Email support'], cta: { label: 'Start a trial', href: '/trial' }, featured: true },
  { name: 'Enterprise', price: 'Custom', blurb: 'On-premises, audit and a named engineer.', features: ['On-premises install', 'Audit log export', 'Custom adapters', 'Named engineer'], cta: { label: 'Talk to us', href: '/contact' } },
]

const FAQ = [
  { question: 'Where does my data live?', answer: 'In your own storage. Talogic products write to your bucket or database.' },
  { question: 'Can I run it on-premises?', answer: 'Yes. Every engine runs in Docker, on your servers or your laptop.' },
  { question: 'Do I need to write code?', answer: 'No. Recipes are JSON you can edit in Studio, and we can build the first one with you.' },
]

const COLUMNS = [
  { title: 'Products', links: PRODUCT_LIST.map((product) => ({ label: product, href: `/${product}` })) },
  { title: 'Company', links: [{ label: 'About', href: '/about' }, { label: 'Services', href: '/services' }, { label: 'Contact', href: '/contact' }] },
  { title: 'Developers', links: [{ label: 'Docs', href: '/docs' }, { label: 'GitHub', href: '/github' }, { label: 'Status', href: '/status' }] },
]

/** The site header, with a products panel and a mobile sheet below 768 px. */
export const Header: Story = { render: () => <SiteHeader nav={NAV} actions={ACTIONS} /> }

/** The hero of the institutional site. */
export const HeroSection: Story = {
  render: () => (
    <Hero
      eyebrow='Human focused automations'
      title='Automation people can read, check and trust.'
      lead='Talogic builds tools that turn messy work into clear records: web pages, documents, scans, recordings and code docs. Every product shows what it did and why.'
      actions={<><Button size='lg'>See the products</Button><Button size='lg' variant='outline'>Book an automation review</Button></>}
    />
  ),
}

/** Product cards, each in its own accent. */
export const ProductCards: Story = {
  render: () => (
    <div className='mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-4 p-6'>
      {PRODUCT_LIST.map((product) => <ProductCard key={product} product={product} href={`/${product}`} />)}
    </div>
  ),
}

/** The feature grid. */
export const Features: Story = { render: () => <FeatureGrid title='The same rules in every product' lead='Each tool is different. The way it treats your work is not.' features={FEATURES} /> }

/** How an engagement works, in numbered steps. */
export const Steps: Story = {
  render: () => <HowItWorks title='Automation services' lead='When a product is not enough, we build the automation with you and hand it over in a form your team can read and run.' link={<Button variant='link' className='self-start text-base'>How an engagement works</Button>} steps={STEPS} />,
}

/** The pricing table with a monthly and yearly switch. */
export const Pricing: Story = { render: () => <PricingTable title='Pricing' lead='Per product, the same three plans.' plans={PLANS} note='Prices are placeholders until plans are set.' /> }

/** The FAQ accordion. */
export const Questions: Story = { render: () => <Faq title='Questions' items={FAQ} /> }

/** The call-to-action band. */
export const CallToAction: Story = { render: () => <CtaBand title='Tell us the task you repeat every week.' body='We reply with which product fits, or what a custom automation would take.' onSubmit={() => {}} /> }

/** The site footer. */
export const Footer: Story = { render: () => <SiteFooter tagline='Human focused automations.' columns={COLUMNS} legal={<><span>© 2026 Talogic</span><span>Privacy · Terms</span></>} /> }

/** The whole institutional website, composed from the patterns. */
export const Website: Story = {
  render: () => (
    <div className='text-base'>
      <SiteHeader nav={NAV} actions={ACTIONS} />
      <Hero
        eyebrow='Human focused automations'
        title='Automation people can read, check and trust.'
        lead='Talogic builds tools that turn messy work into clear records: web pages, documents, scans, recordings and code docs. Every product shows what it did and why.'
        actions={<><Button size='lg'>See the products</Button><Button size='lg' variant='outline'>Book an automation review</Button></>}
      />
      <div className='mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-4 px-6 pb-22'>
        {PRODUCT_LIST.map((product) => <ProductCard key={product} product={product} href={`/${product}`} />)}
      </div>
      <FeatureGrid title='The same rules in every product' lead='Each tool is different. The way it treats your work is not.' features={FEATURES} />
      <HowItWorks title='Automation services' lead='When a product is not enough, we build the automation with you and hand it over in a form your team can read and run.' steps={STEPS} />
      <PricingTable title='Pricing' lead='Per product, the same three plans.' plans={PLANS} note='Prices are placeholders until plans are set.' />
      <Faq title='Questions' items={FAQ} />
      <CtaBand title='Tell us the task you repeat every week.' body='We reply with which product fits, or what a custom automation would take.' onSubmit={() => {}} />
      <SiteFooter tagline='Human focused automations.' columns={COLUMNS} legal={<><span>© 2026 Talogic</span><span>Privacy · Terms</span></>} />
    </div>
  ),
}

/** A product page: the same patterns in the pargic accent. */
export const ProductPage: Story = {
  globals: { product: 'pargic' },
  render:  () => (
    <div className='text-base'>
      <SiteHeader nav={NAV} actions={ACTIONS} />
      <Hero
        eyebrow='pargic · in use'
        title='Websites and documents in, checked records out.'
        lead='Write a recipe once. pargic opens the pages, reads the documents, checks every field and sends the records to your storage on a schedule.'
        actions={<><Button size='lg'>Start a trial</Button><Button size='lg' variant='outline'>Read the docs</Button></>}
      />
      <FeatureGrid title='What a recipe does' features={FEATURES.slice(0, 3)} />
      <PricingTable title='Pricing' plans={PLANS} />
      <CtaBand title='Show us a page you copy by hand.' onSubmit={() => {}} />
    </div>
  ),
}
