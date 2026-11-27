import type { BadgeVariant } from '../ui'
import type { RunStatus } from './run-status.contract'

/** How a status shows: its word and its badge colour. */
export interface RunStatusDisplay {
  /** The word beside the colour. A status never relies on colour alone. */
  label:   string
  /** The badge variant: success, warning, danger and info are the same in every product. */
  variant: BadgeVariant
  /** True for a live status, which shows a dot. */
  live:    boolean
}

const DISPLAY: Readonly<Record<RunStatus, RunStatusDisplay>> = {
  'queued':     { label: 'Queued', variant: 'secondary', live: false },
  'waiting':    { label: 'Waiting', variant: 'secondary', live: false },
  'running':    { label: 'Running', variant: 'info', live: true },
  'completed':  { label: 'Completed', variant: 'success', live: true },
  'no-records': { label: 'No records', variant: 'warning', live: true },
  'failed':     { label: 'Failed', variant: 'danger', live: true },
  'off':        { label: 'Off', variant: 'outline', live: false },
}

/**
 * Converts a status into the word and colour that every product shows for it.
 *
 * @param status - The status.
 * @returns Its label, badge variant and whether it shows a dot.
 */
export function runStatusDisplay (status: RunStatus): RunStatusDisplay {
  return DISPLAY[status]
}
