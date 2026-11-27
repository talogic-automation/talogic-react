import { cn } from '../class-names'
import { formatTimecode } from '../timecode'
import { HUE_FILL, type Hue } from '../tokens'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui'
import { timelineBox, timelineTicks } from './timeline.algorithm'

/** A span on a lane. */
export interface TimelineSegment {
  /** Start, in seconds. */
  start:  number
  /** End, in seconds. */
  end:    number
  /** Shown in a tooltip, such as a speaker or an object. */
  label?: string
  /** Draws the span faded, for low confidence or a pending result. */
  faint?: boolean
}

/** One lane of {@link TimelineLanes}. */
export interface TimelineLane {
  name:     string
  /** The family hue of the lane. */
  hue:      Hue
  segments: readonly TimelineSegment[]
}

/** Props of {@link TimelineLanes}. */
export interface TimelineLanesProps {
  /** The length of the media, in seconds. */
  duration:   number
  lanes:      readonly TimelineLane[]
  /** The playhead, in seconds. */
  playhead?:  number
  /** How many ruler ticks. Default 8. */
  tickCount?: number
  className?: string
}

/**
 * The Timeline lanes pattern of a desktop media app: a ruler, one lane per result kind with coloured spans,
 * and a playhead.
 *
 * @param props - Duration, lanes, playhead and tick count.
 * @returns The timeline.
 */
export function TimelineLanes ({ duration, lanes, playhead, tickCount = 8, className }: TimelineLanesProps) {
  const head = playhead === undefined ? undefined : timelineBox(0, playhead, duration).width

  return (
    <div data-slot='timeline-lanes' role='group' aria-label='Timeline' className={cn('relative flex flex-col text-[13px]', className)}>
      <div className='flex h-[26px] items-center border-b ps-[118px] pe-2.5' aria-hidden='true'>
        {timelineTicks(duration, tickCount).map((tick) => <span key={tick} className='flex-1 text-xs tabular-nums text-muted-foreground'>{formatTimecode(tick)}</span>)}
      </div>
      {lanes.map((lane) => (
        <div key={lane.name} className='flex h-[46px] items-center border-b'>
          <span className='flex w-[108px] shrink-0 items-center gap-1.5 px-2.5 font-medium'>
            <span aria-hidden='true' className={cn('size-2 shrink-0 rounded-[2px]', HUE_FILL[lane.hue])} />
            {lane.name}
          </span>
          <div className='relative me-2.5 h-[26px] flex-1'>
            {lane.segments.map((segment) => {
              const box = timelineBox(segment.start, segment.end, duration)
              const name = `${lane.name}${segment.label ? `, ${segment.label}` : ''}, ${formatTimecode(segment.start)} to ${formatTimecode(segment.end)}`

              return (
                <Tooltip key={`${segment.start}-${segment.end}`}>
                  <TooltipTrigger asChild>
                    <button
                      type='button'
                      aria-label={name}
                      className={cn('absolute inset-y-0 cursor-pointer rounded-[5px] outline-none focus-visible:ring-2 focus-visible:ring-ring', HUE_FILL[lane.hue], segment.faint ? 'opacity-35' : 'opacity-85')}
                      style={{ left: `${box.left}%`, width: `${box.width}%` }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>{name}</TooltipContent>
                </Tooltip>
              )
            })}
          </div>
        </div>
      ))}
      {head !== undefined && (
        <span
          aria-hidden='true'
          className='pointer-events-none absolute inset-y-0 w-0.5 bg-foreground'
          style={{ left: `calc(108px + (100% - 118px) * ${head / 100})` }}
        />
      )}
    </div>
  )
}
