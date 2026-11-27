import { logoColorForHue } from './logo-color.algorithm'

describe('logoColorForHue', () => {
  it('gives the proposed logo colours of the six free hues', () => {
    expect({
      lime:   logoColorForHue('lime'),
      teal:   logoColorForHue('teal'),
      cyan:   logoColorForHue('cyan'),
      sky:    logoColorForHue('sky'),
      purple: logoColorForHue('purple'),
      pink:   logoColorForHue('pink'),
    }).toEqual({ lime: '#8aad1f', teal: '#20b6a4', cyan: '#22b1c3', sky: '#3aabdc', purple: '#b83cdd', pink: '#dd3c92' })
  })

  it('keeps HSL saturation 70 % and lightness 55 % where that is not too light', () => {
    expect(logoColorForHue('blue')).toBe('#3c6cdd')
  })

  it('darkens the yellow and green hues, as the daygic and loregic logos are', () => {
    expect(logoColorForHue('amber')).toBe('#c79423')
    expect(logoColorForHue('green')).toBe('#21ba79')
  })
})
