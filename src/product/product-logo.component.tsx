import type { ComponentProps } from 'react'
import { cn } from '../class-names'
import type { Product } from '../tokens'
import daygic from './logos/daygic.svg'
import ingic from './logos/ingic.svg'
import loomgicDark from './logos/loomgic-dark.svg'
import loomgic from './logos/loomgic.svg'
import loregicDark from './logos/loregic-dark.svg'
import loregic from './logos/loregic.svg'
import pargic from './logos/pargic.svg'
import talogic from './logos/talogic.svg'
import { PRODUCT_CATALOGUE } from './product-catalogue.content'

const LOGOS: Record<Product, { light: string, dark?: string }> = {
  talogic: { light: talogic },
  pargic:  { light: pargic },
  daygic:  { light: daygic },
  ingic:   { light: ingic },
  loregic: { light: loregic, dark: loregicDark },
  loomgic: { light: loomgic, dark: loomgicDark },
}

/** Props of {@link ProductLogo}. */
export interface ProductLogoProps extends Omit<ComponentProps<'img'>, 'src'> {
  /** The product. */
  product: Product
  /** Decorative logos beside the product name pass an empty alt. Default the product name. */
  alt?:    string
}

/**
 * A product's logo symbol, in its own colours. Logos are never redrawn as icons or recoloured to the UI hue.
 * Logos with dark ink swap to a light-ink file inside `.dark`.
 *
 * @param props - The product, `alt`, and any `img` props; size it with classes (default 24 px).
 * @returns The logo image, or a light and a dark image when the product has a dark file.
 */
export function ProductLogo ({ product, alt = PRODUCT_CATALOGUE[product].name, className, ...props }: ProductLogoProps) {
  const { light, dark } = LOGOS[product]
  const classes = cn('size-6 shrink-0 object-contain', className)
  if (!dark) return <img data-slot='product-logo' src={light} alt={alt} className={classes} {...props} />

  return (
    <>
      <img data-slot='product-logo' src={light} alt={alt} className={cn(classes, 'dark:hidden')} {...props} />
      <img data-slot='product-logo' src={dark} alt={alt} className={cn(classes, 'hidden dark:block')} {...props} />
    </>
  )
}
