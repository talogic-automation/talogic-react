import { FREE_HUES, hueForProduct, PRODUCT_HUES } from './product-hue.policy'
import { HUES, PRODUCTS } from './theme.contract'

describe('product hues', () => {
  it('gives every product a family hue', () => {
    for (const product of PRODUCTS) expect(HUES).toContain(hueForProduct(product))
  })

  it('never gives a product red, which is kept for errors', () => {
    expect(Object.values(PRODUCT_HUES)).not.toContain('red')
  })

  it('lists as free exactly the non-red hues that no product uses', () => {
    const used = new Set<string>(Object.values(PRODUCT_HUES))
    const free = HUES.filter((hue) => hue !== 'red' && !used.has(hue))

    expect([...FREE_HUES].sort()).toEqual([...free].sort())
  })
})
