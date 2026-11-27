import { render, screen, within } from '@testing-library/react'
import { CaptureFrame } from './capture-frame.component'

describe('CaptureFrame', () => {
  it('counts the failed checks and names each result in words', () => {
    render(
      <CaptureFrame
        title='Contract 0417 · page 2 of 3'
        checksTitle='Page 2 checks'
        checks={[
          { label: 'Date field filled', detail: '2026-11-25', passed: true },
          { label: 'Signature present', detail: 'Missing', passed: false },
        ]}
        onClose={() => {}}
        actions={null}
      >
        camera
      </CaptureFrame>,
    )
    const checks = screen.getByRole('region', { name: 'Checks' })

    expect(checks).toHaveTextContent('1 failed')
    expect(within(checks).getByLabelText('Failed')).toBeInTheDocument()
    expect(within(checks).getByLabelText('Passed')).toBeInTheDocument()
  })
})
