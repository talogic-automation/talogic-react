import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { FAMILY_PALETTE } from './palette.style'
import { HUES, PALETTE_STEPS, PRODUCTS } from './theme.contract'

const tokens = readFileSync(join(__dirname, 'tokens.css'), 'utf8')

describe('family palette', () => {
  it('has every step of every hue', () => {
    for (const hue of HUES) expect(Object.keys(FAMILY_PALETTE[hue])).toEqual([...PALETTE_STEPS])
  })

  it('matches the values that tokens.css declares', () => {
    for (const hue of HUES) {
      for (const step of PALETTE_STEPS) {
        expect(tokens).toContain(`--color-${hue}-${step}: ${FAMILY_PALETTE[hue][step]};`)
      }
    }
  })

  it('declares a data-hue rule for every hue and a data-product rule for every product', () => {
    for (const hue of HUES) expect(tokens).toContain(`[data-hue="${hue}"]`)
    for (const product of PRODUCTS) expect(tokens).toContain(`[data-product="${product}"]`)
  })
})
