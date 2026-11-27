import { formatTimecode } from './timecode.mapper'

describe('formatTimecode', () => {
  it('shows minutes and seconds under one hour', () => {
    expect(formatTimecode(492.4)).toBe('08:12')
  })

  it('adds hours from one hour', () => {
    expect(formatTimecode(13_338)).toBe('03:42:18')
  })

  it('shows hours when asked', () => {
    expect(formatTimecode(5, true)).toBe('00:00:05')
  })

  it('clamps negative time to zero', () => {
    expect(formatTimecode(-3)).toBe('00:00')
  })
})
