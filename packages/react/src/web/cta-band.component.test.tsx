import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CtaBand } from './cta-band.component'

describe('CtaBand', () => {
  it('sends the trimmed email address', async () => {
    const onSubmit = jest.fn()

    render(<CtaBand title='Tell us the task you repeat every week.' onSubmit={onSubmit} />)
    await userEvent.type(screen.getByRole('textbox', { name: 'Work email' }), '  ed@example.com ')
    await userEvent.click(screen.getByRole('button', { name: 'Send' }))

    expect(onSubmit).toHaveBeenCalledWith('ed@example.com')
  })

  it('does not send an empty form', async () => {
    const onSubmit = jest.fn()

    render(<CtaBand title='Talk to us' onSubmit={onSubmit} />)
    await userEvent.click(screen.getByRole('button', { name: 'Send' }))

    expect(onSubmit).not.toHaveBeenCalled()
  })
})
