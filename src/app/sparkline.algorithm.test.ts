import { sparklinePath } from './sparkline.algorithm'

describe('sparklinePath', () => {
  it('draws nothing for fewer than two values', () => {
    expect(sparklinePath([], 100, 32)).toBe('')
    expect(sparklinePath([4], 100, 32)).toBe('')
  })

  it('puts the lowest value at the bottom and the highest at the top, inside the inset', () => {
    expect(sparklinePath([0, 10], 100, 32)).toBe('M0.0,30.0 L100.0,2.0')
  })

  it('spaces the points evenly across the width', () => {
    expect(sparklinePath([1, 2, 3], 100, 32, 0)).toBe('M0.0,32.0 L50.0,16.0 L100.0,0.0')
  })

  it('draws a flat series through the middle', () => {
    expect(sparklinePath([5, 5, 5], 60, 20)).toBe('M0.0,10.0 L30.0,10.0 L60.0,10.0')
  })
})
