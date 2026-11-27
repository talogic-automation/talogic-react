import { apcaContrast, readableLabel } from './apca-contrast.algorithm'

describe('apcaContrast', () => {
  it('matches the APCA reference values', () => {
    expect(apcaContrast('#888', '#fff')).toBeCloseTo(63.06, 1)
    expect(apcaContrast('#fff', '#888')).toBeCloseTo(-68.54, 1)
    expect(apcaContrast('#000', '#aaa')).toBeCloseTo(58.15, 1)
    expect(apcaContrast('#aaa', '#000')).toBeCloseTo(-56.24, 1)
  })

  it('is 0 for colours too close to read', () => {
    expect(apcaContrast('#777777', '#777777')).toBe(0)
  })

  it('rejects text that is not a hex colour', () => {
    expect(() => apcaContrast('violet', '#fff')).toThrow(RangeError)
  })
})

describe('readableLabel', () => {
  it('chooses white on a saturated mid-tone, where WCAG 2 and HSP choose black', () => {
    expect(readableLabel('#9274e8')).toBe('#ffffff')
  })

  it('chooses the ink on a light fill', () => {
    expect(readableLabel('#af98fe')).toBe('#14121a')
  })

  it('chooses among the candidates it is given', () => {
    expect(readableLabel('#ffff00', ['#ffffff', '#000080'])).toBe('#000080')
  })
})
