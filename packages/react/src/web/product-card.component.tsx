import { cn } from '../class-names'
import { PRODUCT_CATALOGUE, ProductLogo } from '../product'
import type { Product } from '../tokens'
import { Badge } from '../ui'

/** Props of {@link ProductCard}. */
export interface ProductCardProps {
  /** The product. The card takes its accent, so a grid of cards shows each product's colour. */
  product:      Product
  /** Where the card links. */
  href:         string
  /** Replaces the catalogue tagline. */
  description?: string
  /** Replaces the catalogue stage. */
  stage?:       string
  className?:   string
}

/**
 * The ProductCard pattern: a linked card with a brand band, the logo, the name, one sentence and the stage.
 *
 * @param props - Product, link, and optional copy.
 * @returns The card link.
 */
export function ProductCard ({ product, href, description, stage, className }: ProductCardProps) {
  const entry = PRODUCT_CATALOGUE[product]

  return (
    <a
      data-slot='product-card'
      data-product={product}
      href={href}
      className={cn('flex flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground no-underline shadow-xs transition-shadow hover:shadow-sm focus-visible:outline-2 focus-visible:outline-ring', className)}
    >
      <span aria-hidden='true' className='block h-1.5 bg-brand' />
      <span className='flex flex-col gap-3.5 p-5.5'>
        <ProductLogo product={product} alt='' className='size-11' />
        <span className='flex flex-col gap-1'>
          <span className='font-display text-2xl font-extrabold italic text-brand-text'>{entry.name}</span>
          <span className='text-[13px] leading-normal text-muted-foreground'>{description ?? entry.tagline}</span>
        </span>
        <Badge variant='outline' className='self-start'>{stage ?? entry.stage}</Badge>
      </span>
    </a>
  )
}
