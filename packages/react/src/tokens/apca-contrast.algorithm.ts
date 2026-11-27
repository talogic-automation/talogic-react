/**
 * APCA (Accessible Perceptual Contrast Algorithm, SAPC 0.0.98G-4g), the contrast method of the WCAG 3 draft.
 * Unlike WCAG 2 contrast ratios and HSP brightness, it judges a label on a saturated mid-tone the way people see it:
 * white reads better than black on every step-500 fill of the family palette.
 */
const APCA = {
  mainTrc:     2.4,
  red:         0.2126729,
  green:       0.7151522,
  blue:        0.072175,
  normBg:      0.56,
  normText:    0.57,
  revText:     0.62,
  revBg:       0.65,
  blackThresh: 0.022,
  blackClamp:  1.414,
  scale:       1.14,
  lowOffset:   0.027,
  deltaYMin:   0.0005,
  lowClip:     0.1,
} as const

/** The two label colours of the theme: the Talogic ink and white. */
export const LABEL_COLORS = ['#14121a', '#ffffff'] as const

/** A label colour of the theme. */
export type LabelColor = typeof LABEL_COLORS[number]

/**
 * Reads a `#rgb` or `#rrggbb` colour as its three 0-255 channels.
 *
 * @param hex - The colour, with or without `#`.
 * @returns The red, green and blue channels.
 * @throws RangeError when the text is not a hex colour.
 */
function hexChannels (hex: string): [number, number, number] {
  const clean = hex.replace('#', '').trim()
  const full = clean.length === 3 ? [...clean].map((digit) => digit.repeat(2)).join('') : clean
  if (!/^[\da-f]{6}$/i.test(full)) throw new RangeError(`Not a hex colour: ${hex}`)

  return [0, 2, 4].map((start) => Number.parseInt(full.slice(start, start + 2), 16)) as [number, number, number]
}

/**
 * The screen luminance APCA works with, with its soft clamp near black.
 *
 * @param hex - The colour as `#rgb` or `#rrggbb`.
 * @returns The estimated luminance, from about 0 to 1.
 */
function screenLuminance (hex: string): number {
  const [red, green, blue] = hexChannels(hex).map((channel) => (channel / 255) ** APCA.mainTrc) as [number, number, number]
  const y = APCA.red * red + APCA.green * green + APCA.blue * blue

  return y < APCA.blackThresh ? y + (APCA.blackThresh - y) ** APCA.blackClamp : y
}

/**
 * The APCA lightness contrast (Lc) of text on a background. Dark text on a light background gives a positive Lc,
 * light text on a dark background a negative one. |Lc| 60 suits buttons and large text, 75 body text, 90 small text.
 *
 * @param text - The text colour as `#rgb` or `#rrggbb`.
 * @param background - The background colour as `#rgb` or `#rrggbb`.
 * @returns The Lc value, about -108 to 106; 0 when the two are too close to read.
 * @throws RangeError when a colour is not a hex colour.
 */
export function apcaContrast (text: string, background: string): number {
  const textY = screenLuminance(text)
  const backgroundY = screenLuminance(background)
  if (Math.abs(backgroundY - textY) < APCA.deltaYMin) return 0

  if (backgroundY > textY) {
    const sapc = (backgroundY ** APCA.normBg - textY ** APCA.normText) * APCA.scale

    return sapc < APCA.lowClip ? 0 : (sapc - APCA.lowOffset) * 100
  }
  const sapc = (backgroundY ** APCA.revBg - textY ** APCA.revText) * APCA.scale

  return sapc > -APCA.lowClip ? 0 : (sapc + APCA.lowOffset) * 100
}

/**
 * Chooses the label colour that reads best on a background: the candidate with the highest APCA |Lc|.
 *
 * @param background - The background colour as `#rgb` or `#rrggbb`.
 * @param candidates - The label colours to choose from. Default the Talogic ink and white.
 * @returns The candidate with the most contrast; the first one on a tie.
 * @throws RangeError when a colour is not a hex colour.
 */
export function readableLabel<Color extends string = LabelColor> (background: string, candidates: readonly Color[] = LABEL_COLORS as unknown as readonly Color[]): Color {
  let best = candidates[0]
  if (best === undefined) throw new RangeError('No label colour to choose from')
  let bestLc = Math.abs(apcaContrast(best, background))
  for (const candidate of candidates.slice(1)) {
    const lc = Math.abs(apcaContrast(candidate, background))
    if (!(lc > bestLc)) {
      continue
    }

    best = candidate
    bestLc = lc
  }

  return best
}
