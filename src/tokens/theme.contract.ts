/** The products of the Talogic family. Each one takes one hue of the family palette. */
export const PRODUCTS = ['talogic', 'pargic', 'daygic', 'ingic', 'loregic', 'loomgic'] as const

/** A product of the Talogic family. */
export type Product = typeof PRODUCTS[number]

/** The twelve hues of the family palette, in wheel order. */
export const HUES = ['red', 'orange', 'amber', 'lime', 'green', 'teal', 'cyan', 'sky', 'blue', 'violet', 'purple', 'pink'] as const

/** A hue of the family palette. */
export type Hue = typeof HUES[number]

/** The eleven steps of every hue. Each step has the same OKLCH lightness in every hue. */
export const PALETTE_STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const

/** A step of the family palette. */
export type PaletteStep = typeof PALETTE_STEPS[number]

/**
 * Control densities, one per surface: `web` 44 px, `app` 36 px, `desk` 28 px, `mob` 48 px.
 * A surface sets its density with a class, and the component recipes read it.
 */
export const DENSITIES = ['web', 'app', 'desk', 'mob'] as const

/** A control density. */
export type Density = typeof DENSITIES[number]

/** The colour schemes. */
export const COLOUR_SCHEMES = ['light', 'dark'] as const

/** A colour scheme. */
export type ColourScheme = typeof COLOUR_SCHEMES[number]

/** The switches of a themed region. Every switch is optional: a region inherits what it does not set. */
export interface ThemeSettings {
  /** The product whose accent the region shows. */
  product?: Product
  /** A family hue for the accent. It wins over `product`, for a product that has no name yet. */
  hue?:     Hue
  /** The colour scheme. Only `dark` adds a class, because `light` is the default. */
  scheme?:  ColourScheme
  /** The control density of the surface. */
  density?: Density
}
