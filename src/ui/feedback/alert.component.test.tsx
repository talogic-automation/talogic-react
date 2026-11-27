import { render, screen } from '@testing-library/react'
import { Alert } from './alert.component'

describe('Alert', () => {
  it('announces a danger alert at once', () => {
    render(<Alert tone='danger' title='Run failed'>Sign-in page returned 403.</Alert>)

    expect(screen.getByRole('alert')).toHaveTextContent('Run failed')
    expect(screen.getByRole('alert')).toHaveTextContent('Sign-in page returned 403.')
  })

  it('announces an info alert politely', () => {
    render(<Alert title='New source detected' />)

    expect(screen.getByRole('status')).toHaveTextContent('New source detected')
  })
})
