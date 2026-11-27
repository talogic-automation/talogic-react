import { Bookmark, Mic, Pause, Play } from 'lucide-react'
import { cn } from '../class-names'
import { formatTimecode } from '../timecode'
import { Badge, Button } from '../ui'

/** The state of a recording. */
export type RecordingState = 'idle' | 'recording' | 'paused'

/** Props of {@link RecordButton}. */
export interface RecordButtonProps {
  state:      RecordingState
  /** The time recorded so far, in seconds. */
  elapsed:    number
  /** Recent input levels from 0 to 1, newest last, for the waveform. */
  levels?:    readonly number[]
  onStart:    () => void
  onPause:    () => void
  onResume:   () => void
  /** Adds a marker at the current time. The marker button shows only while recording. */
  onMarker?:  () => void
  className?: string
}

/**
 * The RecordButton pattern of a mobile app: the recording state with its word, the elapsed time, a waveform
 * in the brand colour, and one primary action that starts, pauses or resumes.
 *
 * @param props - State, elapsed time, levels and the action handlers.
 * @returns The recording card.
 */
export function RecordButton ({ state, elapsed, levels = [], onStart, onPause, onResume, onMarker, className }: RecordButtonProps) {
  const action = {
    idle:      { label: 'Start recording', icon: <Mic />, onClick: onStart },
    recording: { label: 'Pause', icon: <Pause />, onClick: onPause },
    paused:    { label: 'Resume', icon: <Play />, onClick: onResume },
  }[state]

  return (
    <div data-slot='record-button' className={cn('flex flex-col gap-3.5 rounded-[20px] bg-brand-soft p-4', className)}>
      <div className='flex items-center gap-2'>
        {state === 'recording' && <Badge variant='danger' dot className='bg-card'>Recording</Badge>}
        {state === 'paused' && <Badge variant='warning' className='bg-card'>Paused</Badge>}
        {state === 'idle' && <Badge variant='outline' className='bg-card'>Not recording</Badge>}
        <span className='ms-auto text-[13px] font-semibold tabular-nums' aria-label='Recorded time'>{formatTimecode(elapsed, true)}</span>
      </div>
      {levels.length > 0 && (
        <div aria-hidden='true' className='flex h-10 items-center gap-[3px]'>
          {levels.map((level, index) => (
            // The bars are positions on a rolling meter, not items: the index is their identity.
            // eslint-disable-next-line @eslint-react/no-array-index-key
            <span key={index} className={cn('block w-1 rounded-full bg-brand', state !== 'recording' && 'opacity-45')} style={{ height: `${Math.round(6 + Math.min(1, Math.max(0, level)) * 30)}px` }} />
          ))}
        </div>
      )}
      <div className='flex gap-2.5'>
        <Button className='flex-1' onClick={action.onClick}>{action.icon}{action.label}</Button>
        {state === 'recording' && onMarker && (
          <Button variant='outline' size='icon' className='bg-card' aria-label='Add a marker' onClick={onMarker}><Bookmark /></Button>
        )}
      </div>
    </div>
  )
}
