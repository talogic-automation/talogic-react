import type { ThemeSettings } from './theme.contract'

/** The DOM attributes that switch the theme of a region. Spread them on any element. */
export interface ThemeAttributes {
  /** `dark` and the density class, or an empty string. */
  'className':     string
  /** The product, when set. */
  'data-product'?: string
  /** The hue, when set. */
  'data-hue'?:     string
}

/**
 * Converts theme settings into the attributes that `tokens.css` reads: `.dark`, `.d-<density>`,
 * `data-product` and `data-hue`.
 *
 * @param settings - The switches to apply. A switch that is not set adds nothing.
 * @returns The attributes to spread on the root element of the region.
 */
export function themeAttributes (settings: ThemeSettings): ThemeAttributes {
  const classes = [settings.scheme === 'dark' ? 'dark' : '', settings.density ? `d-${settings.density}` : '']
  const attributes: ThemeAttributes = { className: classes.filter(Boolean).join(' ') }

  if (settings.product) attributes['data-product'] = settings.product
  if (settings.hue) attributes['data-hue'] = settings.hue

  return attributes
}
