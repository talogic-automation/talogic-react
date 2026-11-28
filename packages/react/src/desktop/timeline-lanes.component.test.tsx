import { render, screen } from '@testing-library/react'
import { TimelineLanes } from './timeline-lanes.component'

const lanes = [{ name: 'Speakers', hue: 'amber', segments: [{ start: 600, end: 900, label: 'Mira' }] }] as const

describe('TimelineLanes', () => {
  it('labels the ruler and the spans with media time from 00:00', () => {
    render(<TimelineLanes duration={1_800} lanes={lanes} tickCount={3} />)

    expect(screen.getByRole('group', { name: 'Timeline' })).toHaveTextContent(/^00:0015:0030:00/)
    expect(screen.getByRole('button', { name: 'Speakers, Mira, 10:00 to 15:00' })).toBeInTheDocument()
  })

  it('labels the ruler and the spans with clock times from the start time', () => {
    render(<TimelineLanes duration={1_800} lanes={lanes} tickCount={3} startsAt={new Date(2026, 10, 27, 9, 30)} />)

    expect(screen.getByRole('group', { name: 'Timeline' })).toHaveTextContent(/^09:3009:4510:00/)
    expect(screen.getByRole('button', { name: 'Speakers, Mira, 09:40 to 09:45' })).toBeInTheDocument()
  })
})
