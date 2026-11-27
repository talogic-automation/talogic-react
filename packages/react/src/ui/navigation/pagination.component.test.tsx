import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pagination } from './pagination.component'

describe('Pagination', () => {
  it('marks the current page and keeps the window inside the range', () => {
    render(<Pagination page={10} pageCount={10} onPageChange={() => {}} />)

    expect(screen.getByRole('button', { name: 'Page 10' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getAllByRole('button', { name: /^Page / }).map((button) => button.textContent)).toEqual(['8', '9', '10'])
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled()
  })

  it('asks for the page the user picks', async () => {
    const onPageChange = jest.fn()

    render(<Pagination page={1} pageCount={5} onPageChange={onPageChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Next' }))
    await userEvent.click(screen.getByRole('button', { name: 'Page 3' }))

    expect(onPageChange.mock.calls).toEqual([[2], [3]])
  })
})
