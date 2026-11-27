import { FAMILY_PALETTE } from './palette.style'
import type { Hue } from './theme.contract'

/**
 * The rule behind the Talogic logo colours. The Talogic, pargic, ingic and loomgic logos are HSL saturation 70 %,
 * lightness 55 % (#753edd, #dd773e, #3e63dd). On yellow and green hues that pair is too bright, so the daygic and
 * loregic logos are darker: no logo is lighter than OKLCH lightness 0.70.
 */
export const LOGO_RULE = { saturation: 0.7, lightness: 0.55, maxOklchLightness: 0.7, lightnessStep: 0.005 } as const

/**
 * Reads a `#rrggbb` colour as its three channels from 0 to 1.
 *
 * @param hex - The colour.
 * @returns The red, green and blue channels.
 */
function channels (hex: string): [number, number, number] {
  return [1, 3, 5].map((start) => Number.parseInt(hex.slice(start, start + 2), 16) / 255) as [number, number, number]
}

/**
 * The HSL hue of a colour.
 *
 * @param hex - The colour as `#rrggbb`.
 * @returns The hue in degrees, from 0 to 360.
 */
function hslHue (hex: string): number {
  const [red, green, blue] = channels(hex)
  const max = Math.max(red, green, blue)
  const delta = max - Math.min(red, green, blue)
  if (delta === 0) return 0
  const sector = max === red ? ((green - blue) / delta) % 6 : (max === green ? (blue - red) / delta + 2 : (red - green) / delta + 4)

  return (sector * 60 + 360) % 360
}

/**
 * Converts an HSL colour to hex.
 *
 * @param hue - The hue in degrees.
 * @param saturation - The saturation from 0 to 1.
 * @param lightness - The lightness from 0 to 1.
 * @returns The colour as `#rrggbb`.
 */
function hslToHex (hue: number, saturation: number, lightness: number): string {
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
  const second = chroma * (1 - Math.abs(((hue / 60) % 2) - 1))
  const match = lightness - chroma / 2
  const sextant = Math.floor(hue / 60) % 6
  const rgb = [[chroma, second, 0], [second, chroma, 0], [0, chroma, second], [0, second, chroma], [second, 0, chroma], [chroma, 0, second]][sextant] ?? [0, 0, 0]

  return `#${rgb.map((value) => Math.round((value + match) * 255).toString(16).padStart(2, '0')).join('')}`
}

/**
 * The OKLCH lightness of a colour: how light it looks, from 0 to 1.
 *
 * @param hex - The colour as `#rrggbb`.
 * @returns The lightness.
 */
function oklchLightness (hex: string): number {
  const [red, green, blue] = channels(hex).map((value) => (value <= 0.040_45 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)) as [number, number, number]
  const long = Math.cbrt(0.412_221_470_8 * red + 0.536_332_536_3 * green + 0.051_445_992_9 * blue)
  const medium = Math.cbrt(0.211_903_498_2 * red + 0.680_699_545_1 * green + 0.107_396_956_6 * blue)
  const short = Math.cbrt(0.088_302_461_9 * red + 0.281_718_837_6 * green + 0.629_978_700_5 * blue)

  return 0.210_454_255_3 * long + 0.793_617_785 * medium - 0.004_072_046_8 * short
}

/**
 * Gives the logo colour of a family hue by the Talogic logo rule: HSL saturation 70 % and lightness 55 % at the hue
 * of the palette's step 500, made darker in half-percent steps until its OKLCH lightness is 0.70 or less. Use it for
 * the logo of a new product; the existing logos keep the exact colours of their files.
 *
 * @param hue - The family hue the product takes.
 * @returns The logo colour as `#rrggbb`.
 */
export function logoColorForHue (hue: Hue): string {
  const degrees = hslHue(FAMILY_PALETTE[hue]['500'])
  let lightness: number = LOGO_RULE.lightness
  let color = hslToHex(degrees, LOGO_RULE.saturation, lightness)
  while (oklchLightness(color) > LOGO_RULE.maxOklchLightness) {
    lightness -= LOGO_RULE.lightnessStep
    color = hslToHex(degrees, LOGO_RULE.saturation, lightness)
  }

  return color
}
