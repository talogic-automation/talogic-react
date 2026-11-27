/** Where a span sits on a timeline, in percent of its width. */
export interface TimelineBox {
  left:  number
  width: number
}

/**
 * Places a time span on a timeline. The span is clipped to the timeline, so a span past the end stops at 100 %.
 *
 * @param start - The start of the span, in seconds.
 * @param end - The end of the span, in seconds.
 * @param duration - The length of the timeline, in seconds. Zero or less places nothing.
 * @returns The left edge and width, in percent.
 */
export function timelineBox (start: number, end: number, duration: number): TimelineBox {
  if (duration <= 0) return { left: 0, width: 0 }
  const clamp = (value: number): number => Math.min(100, Math.max(0, (value / duration) * 100))
  const left = clamp(start)

  return { left, width: Math.max(0, clamp(end) - left) }
}

/**
 * Gives evenly spaced tick times for a timeline ruler, from zero to the duration.
 *
 * @param duration - The length of the timeline, in seconds.
 * @param count - How many ticks, both ends included. At least two.
 * @returns The tick times, in seconds, rounded to whole seconds.
 */
export function timelineTicks (duration: number, count: number): number[] {
  const ticks = Math.max(2, count)

  return Array.from({ length: ticks }, (_, index) => Math.round((duration * index) / (ticks - 1)))
}
