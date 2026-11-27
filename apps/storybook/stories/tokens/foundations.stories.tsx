import type { Meta, StoryObj } from '@storybook/react-vite'
import { FAMILY_PALETTE } from '@talogic-automation/react'
import { FREE_HUES, PRODUCT_HUES } from '@talogic-automation/react'
import { DENSITIES, HUES, PALETTE_STEPS, PRODUCTS } from '@talogic-automation/react'
import { ThemeRoot } from '@talogic-automation/react'

const meta = {
  title:      'Foundations/Tokens',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const NEUTRALS = ['background', 'foreground', 'card', 'popover', 'primary', 'secondary', 'muted', 'muted-foreground', 'accent', 'border', 'input', 'ring', 'canvas', 'sidebar', 'brand', 'brand-text', 'brand-soft', 'destructive', 'success', 'warning', 'info']

/** The family palette: 12 hues by 11 steps, the same OKLCH lightness per step. Steps 500, 700 and 100 carry product accents. */
export const FamilyPalette: Story = {
  render: () => (
    <div className='flex flex-col gap-1'>
      <div className='grid grid-cols-[120px_repeat(11,minmax(0,1fr))] gap-1 text-xs font-semibold'>
        <span />
        {PALETTE_STEPS.map((step) => <span key={step} className='text-center'>{step}</span>)}
      </div>
      {HUES.map((hue) => {
        const owners = PRODUCTS.filter((product) => PRODUCT_HUES[product] === hue)

        return (
          <div key={hue} className='grid grid-cols-[120px_repeat(11,minmax(0,1fr))] gap-1'>
            <span className='flex flex-col justify-center text-[13px] font-semibold'>
              {hue}
              <span className='text-xs font-normal text-muted-foreground'>{owners.length > 0 ? owners.join(', ') : (FREE_HUES.includes(hue) ? 'free' : 'status only')}</span>
            </span>
            {PALETTE_STEPS.map((step, index) => (
              <span key={step} className='flex h-12 items-end rounded-sm p-1.5 font-mono text-[10px]' style={{ background: FAMILY_PALETTE[hue][step], color: index <= 5 ? '#14121a' : '#ffffff' }}>
                {FAMILY_PALETTE[hue][step]}
              </span>
            ))}
          </div>
        )
      })}
    </div>
  ),
}

/** The shadcn/ui semantic tokens, shown in the current product, hue and theme of the toolbar. */
export const SemanticTokens: Story = {
  render: () => (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3'>
      {NEUTRALS.map((name) => (
        <div key={name} className='flex items-center gap-2.5'>
          <span className='size-8 shrink-0 rounded-md border' style={{ background: `var(--${name})` }} />
          <span className='font-mono text-xs'>--{name}</span>
        </div>
      ))}
    </div>
  ),
}

/** Every product accent side by side, light and dark: fill 500 with ink text, text 700, soft 100. */
export const ProductAccents: Story = {
  render: () => (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4'>
      {PRODUCTS.flatMap((product) => (['light', 'dark'] as const).map((scheme) => (
        <ThemeRoot key={`${product}-${scheme}`} product={product} scheme={scheme} className='flex flex-col gap-2.5 rounded-xl border bg-background p-4 text-foreground'>
          <span className='font-display text-lg font-extrabold italic text-brand-text'>{product} · {scheme}</span>
          <span className='inline-flex h-9 w-fit items-center rounded-md bg-primary px-3.5 text-sm font-medium text-primary-foreground'>Run recipe</span>
          <span className='w-fit rounded-full bg-brand-soft px-2 text-xs font-medium text-brand-text'>Brand soft</span>
          <span className='h-1.5 overflow-hidden rounded-full bg-muted'><span className='block h-full w-2/3 bg-brand' /></span>
        </ThemeRoot>
      )))}
    </div>
  ),
}

/** The type scale: DM Sans for headlines, Inter for content, Fira Code for code. */
export const Typography: Story = {
  render: () => (
    <div className='flex flex-col gap-3'>
      <span className='type-display text-[56px]'>Human focused</span>
      <span className='type-h1'>Automations that explain</span>
      <span className='type-h2'>Recipes, runs and records</span>
      <span className='type-h3'>Section title in apps</span>
      <span className='type-h4'>Card title</span>
      <span className='type-lead'>Marketing paragraph text for intros.</span>
      <span className='text-base'>Web body, 16/26: Inter for web content, the same face as the apps.</span>
      <span>App body, 14/21: Inter for portal, desktop and mobile apps.</span>
      <span className='text-[13px]'>Small, 13/19: dense tables, desktop panels, helper copy.</span>
      <span className='text-xs text-muted-foreground'>Extra small, 12/16: captions and meta. Never smaller.</span>
      <span className='font-mono text-xs'>recipe.output.records[0].total</span>
    </div>
  ),
}

/** Radius and elevation steps. Dark mode keeps the levels: surfaces step lighter and shadows turn black. */
export const RadiusAndElevation: Story = {
  render: () => (
    <div className='flex flex-col gap-6 rounded-xl bg-canvas p-6'>
      <div className='flex flex-wrap gap-4'>
        {[['rounded-sm', '6 · badge'], ['rounded-md', '8 · button, input'], ['rounded-lg', '10 · panel, menu'], ['rounded-xl', '14 · card, dialog'], ['rounded-2xl', '20 · web cards'], ['rounded-full', 'pill, avatar']].map(([radius, use]) => (
          <span key={radius} className='flex flex-col items-center gap-1.5 text-xs'>
            <span className={`size-14 border-2 border-brand bg-brand-soft ${radius}`} />
            <span className='font-mono'>{radius}</span>
            <span className='text-muted-foreground'>{use}</span>
          </span>
        ))}
      </div>
      <div className='grid grid-cols-5 gap-4'>
        {[['', '0 · flat'], ['shadow-xs', '1 · xs'], ['shadow-sm', '2 · sm'], ['shadow-md', '3 · md'], ['shadow-lg', '4 · lg']].map(([shadow, name]) => (
          <span key={name} className='flex flex-col gap-2 text-xs'>
            <span className={`h-18 rounded-lg border bg-card ${shadow}`} />
            <span className='font-mono'>{name}</span>
          </span>
        ))}
      </div>
    </div>
  ),
}

/** The four surface densities: the same recipe, sized by the class on the surface. */
export const Densities: Story = {
  render: () => (
    <div className='grid grid-cols-4 gap-4'>
      {DENSITIES.map((density) => (
        <ThemeRoot key={density} density={density} className='flex flex-col gap-2.5 rounded-xl border p-4'>
          <span className='font-mono text-xs text-muted-foreground'>d-{density}</span>
          <span className='flex h-(--control-h) items-center rounded-md border border-input px-3 text-(length:--control-fs) text-muted-foreground'>Search</span>
          <span className='flex h-(--control-h) items-center justify-center rounded-md bg-primary px-(--control-px) text-(length:--control-fs) font-medium text-primary-foreground'>Primary</span>
        </ThemeRoot>
      ))}
    </div>
  ),
}
