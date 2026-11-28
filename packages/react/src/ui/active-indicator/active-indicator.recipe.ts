/**
 * The classes of the indicator element: absolute, placed by the variables of {@link useActiveIndicator}, gliding
 * between items once placed, and hidden while there is no active item.
 */
export const activeIndicatorClassName = [
  'pointer-events-none absolute left-(--indicator-left) top-(--indicator-top) h-(--indicator-height) w-(--indicator-width)',
  'group-data-[indicator=ready]/indicator:transition-[left,top,width,height] group-data-[indicator=ready]/indicator:duration-250 group-data-[indicator=ready]/indicator:ease-emphasised',
  'group-data-[indicator=none]/indicator:opacity-0 group-not-data-indicator/indicator:opacity-0 motion-reduce:transition-none',
].join(' ')
