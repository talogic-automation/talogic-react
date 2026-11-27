import { Check, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../class-names'
import { Badge, Button } from '../ui'

/** One check of a captured page. */
export interface CaptureCheck {
  label:  string
  /** The detail at the end of the row, such as "0.4° skew" or "Missing". */
  detail: string
  passed: boolean
}

/** Props of {@link CaptureFrame}. */
export interface CaptureFrameProps {
  /** The page being captured, such as "Contract 0417 · page 2 of 3". */
  title:       ReactNode
  /** The camera view or the captured image. */
  children:    ReactNode
  /** The title of the result sheet, such as "Page 2 checks". */
  checksTitle: ReactNode
  checks:      readonly CaptureCheck[]
  onClose:     () => void
  /** The actions under the checks, such as Retake and Send back for signature. */
  actions:     ReactNode
  className?:  string
}

/**
 * The CaptureFrame pattern of a mobile scanning app: a dark camera view with a close button and the page name,
 * and a sheet of checks. A check always shows a word and an icon beside its colour.
 *
 * @param props - Title, camera view, checks, close handler and actions.
 * @returns The capture screen.
 */
export function CaptureFrame ({ title, children, checksTitle, checks, onClose, actions, className }: CaptureFrameProps) {
  const failed = checks.filter((check) => !check.passed).length

  return (
    <div data-slot='capture-frame' className={cn('flex h-full flex-col bg-[#0e0d12]', className)}>
      <div className='relative grid min-h-[440px] flex-1 place-items-center overflow-hidden'>
        <div className='absolute inset-x-4 top-[max(env(safe-area-inset-top),16px)] z-10 flex items-center justify-between'>
          <Button size='icon' aria-label='Close camera' onClick={onClose} className='rounded-full bg-white/14 text-white hover:bg-white/24'><X /></Button>
          <span className='text-sm font-semibold text-white'>{title}</span>
          <span className='size-(--control-h)' aria-hidden='true' />
        </div>
        {children}
      </div>
      <section aria-label='Checks' className='flex flex-col gap-3 rounded-t-3xl bg-background px-5 pt-5 pb-[max(env(safe-area-inset-bottom),24px)]'>
        <div className='flex items-center gap-2.5'>
          <h2 className='m-0 type-h3 text-[19px]'>{checksTitle}</h2>
          {failed > 0
            ? <Badge variant='danger' dot className='ms-auto'>{failed} failed</Badge>
            : <Badge variant='success' dot className='ms-auto'>All passed</Badge>}
        </div>
        <ul className='m-0 flex list-none flex-col p-0'>
          {checks.map((check) => (
            <li key={check.label} className='flex min-h-10 items-center gap-3 border-b'>
              <span className={cn('grid size-6 shrink-0 place-items-center rounded-full [&_svg]:size-3.5', check.passed ? 'bg-success-soft text-success' : 'bg-destructive-soft text-destructive')}>
                {check.passed ? <Check strokeWidth={3} aria-label='Passed' /> : <X strokeWidth={3} aria-label='Failed' />}
              </span>
              <span className='flex-1 text-[15px]'>{check.label}</span>
              <span className='text-xs text-muted-foreground'>{check.detail}</span>
            </li>
          ))}
        </ul>
        <div className='mt-1 flex gap-2.5 [&>*]:flex-1'>{actions}</div>
      </section>
    </div>
  )
}
