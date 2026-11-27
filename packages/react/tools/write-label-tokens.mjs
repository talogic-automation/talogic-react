// Writes the --color-on-<hue>-<step> tokens of src/tokens/tokens.css: for each colour of the family palette, the
// label colour (ink or white) that APCA reads best on it. Run it after a palette change: npm run tokens:labels.
// The labels test fails while tokens.css and this rule disagree.
import { readFileSync, writeFileSync } from 'node:fs'
import { readableLabel } from '../src/tokens/apca-contrast.algorithm.ts'
import { FAMILY_PALETTE } from '../src/tokens/palette.style.ts'

const file = new URL('../src/tokens/tokens.css', import.meta.url)
const start = '  /* generated:labels: written by npm run tokens:labels from the APCA rule; do not edit by hand */'
const end = '  /* generated:labels-end */'

const lines = Object.entries(FAMILY_PALETTE).flatMap(([hue, steps]) =>
  Object.entries(steps).map(([step, hex]) => `  --color-on-${hue}-${step}: ${readableLabel(hex)};`),
)
const css = readFileSync(file, 'utf8').replaceAll('\r\n', '\n')
const from = css.indexOf(start)
const to = css.indexOf(end)
if (from === -1 || to === -1) throw new Error('tokens.css has no generated:labels block')

writeFileSync(file, `${css.slice(0, from)}${start}\n${lines.join('\n')}\n${css.slice(to)}`)
console.log(`Wrote ${lines.length} label tokens.`)
