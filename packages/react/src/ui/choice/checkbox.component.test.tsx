import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './checkbox.component'

describe('Checkbox', () => {
  it('toggles its checked state', async () => {
    render(<Checkbox aria-label='Keep raw HTML' />)
    await userEvent.click(screen.getByRole('checkbox', { name: 'Keep raw HTML' }))

    expect(screen.getByRole('checkbox', { name: 'Keep raw HTML' })).toBeChecked()
  })

  it('shows the indeterminate state for a partial selection', () => {
    render(<Checkbox aria-label='Select all' checked='indeterminate' />)

    expect(screen.getByRole('checkbox', { name: 'Select all' })).toHaveAttribute('aria-checked', 'mixed')
  })
})
