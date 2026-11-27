import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecordButton, type RecordingState } from './record-button.component'

function renderButton (state: RecordingState) {
  const handlers = { onStart: jest.fn(), onPause: jest.fn(), onResume: jest.fn(), onMarker: jest.fn() }
  render(<RecordButton state={state} elapsed={13_338} {...handlers} />)

  return handlers
}

describe('RecordButton', () => {
  it('pauses while recording, and offers a marker', async () => {
    const handlers = renderButton('recording')

    expect(screen.getByText('Recording')).toBeInTheDocument()
    expect(screen.getByLabelText('Recorded time')).toHaveTextContent('03:42:18')

    await userEvent.click(screen.getByRole('button', { name: 'Pause' }))
    await userEvent.click(screen.getByRole('button', { name: 'Add a marker' }))

    expect(handlers.onPause).toHaveBeenCalledTimes(1)
    expect(handlers.onMarker).toHaveBeenCalledTimes(1)
  })

  it('resumes when paused, without a marker button', async () => {
    const handlers = renderButton('paused')
    await userEvent.click(screen.getByRole('button', { name: 'Resume' }))

    expect(handlers.onResume).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('button', { name: 'Add a marker' })).not.toBeInTheDocument()
  })

  it('starts when idle', async () => {
    const handlers = renderButton('idle')
    await userEvent.click(screen.getByRole('button', { name: 'Start recording' }))

    expect(handlers.onStart).toHaveBeenCalledTimes(1)
  })
})
