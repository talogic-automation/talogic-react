import { render, screen } from '@testing-library/react'
import { Field } from './field.component'
import { Input } from './input.component'
import { Textarea } from './textarea.component'

describe('Field', () => {
  it('labels the control and describes it with the hint', () => {
    render(<Field label='Start URL' hint='Pargic opens this page first.'><Input /></Field>)

    const input = screen.getByRole('textbox', { name: 'Start URL' })

    expect(input).toHaveAccessibleDescription('Pargic opens this page first.')
    expect(input).not.toHaveAttribute('aria-invalid')
  })

  it('marks the control invalid and adds the error to its description', () => {
    render(<Field label='API key name' hint='Shown in logs.' error='Use letters, digits and dashes only.'><Textarea /></Field>)

    const textarea = screen.getByRole('textbox', { name: 'API key name' })

    expect(textarea).toHaveAttribute('aria-invalid', 'true')
    expect(textarea).toHaveAccessibleDescription('Shown in logs. Use letters, digits and dashes only.')
  })

  it('keeps an id the caller gives', () => {
    render(<Field id='start-url' label='Start URL'><Input /></Field>)

    expect(screen.getByLabelText('Start URL')).toHaveAttribute('id', 'start-url')
  })

  it('leaves a control outside a field alone', () => {
    render(<Input aria-label='Search runs' />)

    expect(screen.getByRole('textbox', { name: 'Search runs' })).not.toHaveAttribute('aria-describedby')
  })
})
