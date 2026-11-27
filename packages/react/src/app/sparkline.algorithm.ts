/**
 * Builds the SVG path of a sparkline. The series is scaled to fill the box, with the lowest value at the bottom
 * and the highest at the top; a flat series draws a line through the middle.
 *
 * @param values - The series, oldest first. Fewer than two values draws nothing.
 * @param width - The width of the drawing box.
 * @param height - The height of the drawing box.
 * @param inset - Space kept at the top and bottom, so a stroke is not clipped. Default 2.
 * @returns The `d` attribute of a polyline path, or an empty string.
 */
export function sparklinePath (values: readonly number[], width: number, height: number, inset = 2): string {
  if (values.length < 2) return ''
  const min = Math.min(...values)
  const range = Math.max(...values) - min
  const usable = height - inset * 2
  const step = width / (values.length - 1)

  return values
    .map((value, index) => {
      const y = range === 0 ? height / 2 : inset + usable - ((value - min) / range) * usable

      return `${index === 0 ? 'M' : 'L'}${(index * step).toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}
