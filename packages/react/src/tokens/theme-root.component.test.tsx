import { render, screen } from '@testing-library/react'
import { ThemeRoot } from './theme-root.component'

describe('ThemeRoot', () => {
  it('sets the attributes that tokens.css reads', () => {
    render(<ThemeRoot product='loomgic' scheme='dark' density='desk'>content</ThemeRoot>)

    const root = screen.getByText('content')

    expect(root).toHaveClass('dark', 'd-desk')
    expect(root).toHaveAttribute('data-product', 'loomgic')
    expect(root).not.toHaveAttribute('data-hue')
  })

  it('merges onto its child with asChild', () => {
    render(<ThemeRoot asChild hue='pink' className='p-4'><main>page</main></ThemeRoot>)

    const main = screen.getByRole('main')

    expect(main).toHaveAttribute('data-hue', 'pink')
    expect(main).toHaveClass('p-4')
  })
})
