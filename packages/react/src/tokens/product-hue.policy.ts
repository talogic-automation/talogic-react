import type { Hue, Product } from './theme.contract'

/**
 * The hue each product takes. One product, one hue. Two products may share a hue, as ingic and loomgic
 * share blue: their logos tell them apart. Red is for errors and delete only, so no product takes it.
 */
export const PRODUCT_HUES: Readonly<Record<Product, Hue>> = {
  talogic: 'violet',
  pargic:  'orange',
  daygic:  'amber',
  ingic:   'blue',
  loregic: 'green',
  loomgic: 'blue',
}

/** Hues that no product uses yet. A new product takes one of these. */
export const FREE_HUES: readonly Hue[] = ['lime', 'teal', 'cyan', 'sky', 'purple', 'pink']

/**
 * Gives the hue that a product takes.
 *
 * @param product - The product.
 * @returns The family hue of the product's accent.
 */
export function hueForProduct (product: Product): Hue {
  return PRODUCT_HUES[product]
}
