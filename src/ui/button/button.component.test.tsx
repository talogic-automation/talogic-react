import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './button.component'

describe('Button', () => {
  it('calls onClick when pressed', async () => {
    const onClick = jest.fn()

    render(<Button onClick={onClick}>Run now</Button>)
    await userEvent.click(screen.getByRole('button', { name: 'Run now' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('keeps the label, sets aria-busy and blocks clicks while loading', async () => {
    const onClick = jest.fn()

    render(<Button loading onClick={onClick}>Running sample</Button>)
    const button = screen.getByRole('button', { name: 'Running sample' })
    await userEvent.click(button)

    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button).toBeDisabled()
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders its child as the button with asChild', () => {
    render(<Button asChild variant='outline'><a href='/docs'>Read the docs</a></Button>)

    const link = screen.getByRole('link', { name: 'Read the docs' })

    expect(link).toHaveAttribute('data-slot', 'button')
    expect(link).toHaveClass('border-input')
  })

  it('lets the link variant drop the control height', () => {
    render(<Button variant='link'>How it works</Button>)

    expect(screen.getByRole('button')).toHaveClass('h-auto', 'px-0')
    expect(screen.getByRole('button')).not.toHaveClass('h-(--control-h)')
  })
})
