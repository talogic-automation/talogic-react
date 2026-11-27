import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProductSwitcher } from './product-switcher.component'

describe('ProductSwitcher', () => {
  it('shows the current product and workspace', () => {
    render(<ProductSwitcher product='pargic' workspace='Acme Finance workspace' />)

    const trigger = screen.getByRole('button', { name: 'pargic, switch product' })

    expect(trigger).toHaveTextContent('Acme Finance workspace')
  })

  it('offers the products and reports the one picked', async () => {
    const onProductChange = jest.fn()

    render(<ProductSwitcher product='pargic' products={['pargic', 'daygic', 'ingic']} onProductChange={onProductChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'pargic, switch product' }))

    expect(screen.getAllByRole('menuitemradio').map((item) => item.textContent)).toEqual(['pargic', 'daygic', 'ingic'])
    expect(screen.getByRole('menuitemradio', { name: 'pargic' })).toBeChecked()

    await userEvent.click(screen.getByRole('menuitemradio', { name: 'daygic' }))

    expect(onProductChange).toHaveBeenCalledWith('daygic')
  })
})
