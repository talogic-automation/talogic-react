import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { PRODUCTS, type Product } from '../tokens'
import { PRODUCT_CATALOGUE } from './product-catalogue.content'
import { ProductLogo } from './product-logo.component'
import { ProductSwitcher } from './product-switcher.component'

const meta = {
  title: 'Shared/Product',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** Every product logo in its own colours. Logos with dark ink swap to a light file in the dark theme. */
export const Logos: Story = {
  render: () => (
    <div className='flex flex-wrap gap-6'>
      {PRODUCTS.map((product) => (
        <span key={product} className='flex flex-col items-center gap-2 text-[13px]'>
          <ProductLogo product={product} className='size-12' />
          {PRODUCT_CATALOGUE[product].name}
        </span>
      ))}
    </div>
  ),
}

/** The ProductSwitcher at the top of a portal sidebar. */
export const Switcher: Story = {
  render: function SwitcherStory () {
    const [product, setProduct] = useState<Product>('pargic')

    return (
      <div className='w-64 rounded-lg bg-sidebar p-3' data-product={product}>
        <ProductSwitcher product={product} workspace='Acme Finance workspace' onProductChange={setProduct} />
      </div>
    )
  },
}
