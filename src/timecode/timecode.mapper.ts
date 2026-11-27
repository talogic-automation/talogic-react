/** Writes a clock field with two digits. */
function pad (value: number): string {
  return String(value).padStart(2, '0')
}

/**
 * Formats a number of seconds as a clock reading: `mm:ss`, or `hh:mm:ss` from one hour or when asked.
 * Negative and fractional seconds are clamped to whole seconds from zero.
 *
 * @param seconds - The elapsed or total time, in seconds.
 * @param withHours - Always shows the hours, for a clock that will pass one hour. Default false.
 * @returns The clock reading, with two-digit fields.
 */
export function formatTimecode (seconds: number, withHours = false): string {
  const total = Math.max(0, Math.floor(seconds))
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const rest = total % 60

  return withHours || hours > 0 ? `${pad(hours)}:${pad(minutes)}:${pad(rest)}` : `${pad(minutes)}:${pad(rest)}`
}
