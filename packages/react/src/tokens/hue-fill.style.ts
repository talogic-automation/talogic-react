import type { Hue } from './theme.contract'

/**
 * The fill class of each family hue at step 500. Lanes, plugin dots and chart series use these, in wheel order,
 * so no series outweighs another. The classes are written out so Tailwind finds them.
 */
export const HUE_FILL: Readonly<Record<Hue, string>> = {
  red:    'bg-red-500',
  orange: 'bg-orange-500',
  amber:  'bg-amber-500',
  lime:   'bg-lime-500',
  green:  'bg-green-500',
  teal:   'bg-teal-500',
  cyan:   'bg-cyan-500',
  sky:    'bg-sky-500',
  blue:   'bg-blue-500',
  violet: 'bg-violet-500',
  purple: 'bg-purple-500',
  pink:   'bg-pink-500',
}
