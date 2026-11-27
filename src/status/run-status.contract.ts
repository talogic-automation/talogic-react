/**
 * The statuses of a run, a node or any job, with the same names in every product: Queued, Waiting, Running,
 * Completed, No records, Failed and Off.
 */
export const RUN_STATUSES = ['queued', 'waiting', 'running', 'completed', 'no-records', 'failed', 'off'] as const

/** The status of a run, a node or any job. */
export type RunStatus = typeof RUN_STATUSES[number]
