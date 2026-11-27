import { themeAttributes } from './theme-attributes.mapper'

describe('themeAttributes', () => {
  it('adds nothing for empty settings', () => {
    expect(themeAttributes({})).toEqual({ className: '' })
  })

  it('maps every switch to the attribute that tokens.css reads', () => {
    expect(themeAttributes({ product: 'pargic', hue: 'pink', scheme: 'dark', density: 'desk' })).toEqual({
      'className':    'dark d-desk',
      'data-product': 'pargic',
      'data-hue':     'pink',
    })
  })

  it('adds no class for the light scheme', () => {
    expect(themeAttributes({ scheme: 'light', density: 'mob' }).className).toBe('d-mob')
  })
})
