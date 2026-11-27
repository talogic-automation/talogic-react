import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { readableLabel } from './apca-contrast.algorithm'
import { FAMILY_PALETTE } from './palette.style'
import { HUES, PALETTE_STEPS } from './theme.contract'

const tokens = readFileSync(join(__dirname, 'tokens.css'), 'utf8')

describe('label tokens', () => {
  it('give every family colour the label the APCA rule picks (run npm run tokens:labels after a palette change)', () => {
    for (const hue of HUES) {
      for (const step of PALETTE_STEPS) {
        expect(tokens).toContain(`--color-on-${hue}-${step}: ${readableLabel(FAMILY_PALETTE[hue][step])};`)
      }
    }
  })

  it('never fix the label of a filled role to one colour', () => {
    const fixed = tokens.match(/--(?:primary|sidebar-primary|destructive)-foreground: #[\da-f]+;/g)

    expect(fixed).toBeNull()
  })
})
