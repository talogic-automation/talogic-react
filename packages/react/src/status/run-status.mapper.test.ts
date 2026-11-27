import { RUN_STATUSES } from './run-status.contract'
import { runStatusDisplay } from './run-status.mapper'

describe('runStatusDisplay', () => {
  it('gives every status a word, so colour is never the only signal', () => {
    for (const status of RUN_STATUSES) expect(runStatusDisplay(status).label).not.toBe('')
  })

  it('keeps red for failures only', () => {
    const red = RUN_STATUSES.filter((status) => runStatusDisplay(status).variant === 'danger')

    expect(red).toEqual(['failed'])
  })

  it('uses the status colours of the foundations', () => {
    expect(runStatusDisplay('completed').variant).toBe('success')
    expect(runStatusDisplay('no-records').variant).toBe('warning')
    expect(runStatusDisplay('running').variant).toBe('info')
  })
})
