import { Check } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../../class-names'

/** One step of a {@link Stepper}. */
export interface StepperStep {
  /** The step's name, such as "Models". */
  title:        string
  /** A line under the title, such as "2 of 3 downloaded". */
  description?: ReactNode
}

/** Props of {@link Stepper}. */
export interface StepperProps extends Omit<ComponentProps<'ol'>, 'children'> {
  /** The steps, in order. */
  steps:         readonly StepperStep[]
  /** The index of the current step, from 0. Steps before it are done. A value past the last step marks all done. */
  current:       number
  /** `horizontal` puts the steps in a row with lines between them (default); `vertical` stacks them. */
  orientation?:  'horizontal' | 'vertical'
  /** Called with the index of a done step that the user picks, to go back to it. Without it, the steps are text. */
  onStepSelect?: (index: number) => void
}

type StepState = 'done' | 'current' | 'upcoming'

const markers: Record<StepState, string> = {
  done:     'bg-primary text-primary-foreground',
  current:  'border-2 border-primary text-brand-text',
  upcoming: 'bg-muted text-muted-foreground',
}

/**
 * The progress of a flow in steps, such as a first-run setup or a wizard. Done steps show a check, the current step
 * a ring and `aria-current="step"`, and later steps a muted number. With `onStepSelect`, done steps are buttons that
 * go back. The lines between steps fill as the flow moves on.
 *
 * @param props - The steps, the current index, the orientation, the select handler and any `ol` props.
 * @returns The stepper.
 */
export function Stepper ({ steps, current, orientation = 'horizontal', onStepSelect, className, 'aria-label': label = 'Progress', ...props }: StepperProps) {
  const vertical = orientation === 'vertical'

  return (
    <ol
      data-slot='stepper'
      data-orientation={orientation}
      aria-label={label}
      className={cn('m-0 flex list-none p-0', vertical ? 'flex-col' : 'items-start', className)}
      {...props}
    >
      {steps.map((step, index) => {
        const state: StepState = index < current ? 'done' : (index === current ? 'current' : 'upcoming')
        const last = index === steps.length - 1
        const marker = (
          <span
            aria-hidden='true'
            className={cn('grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold transition-colors duration-200 motion-reduce:transition-none', markers[state])}
          >
            {state === 'done' ? <Check className='size-3.5' strokeWidth={2.5} /> : index + 1}
          </span>
        )
        const text = (
          <span className='flex min-w-0 flex-col'>
            <span className={cn('text-[13px] font-medium', state === 'upcoming' && 'text-muted-foreground')}>
              {step.title}
              {state === 'done' && <span className='sr-only'>, done</span>}
            </span>
            {step.description && <span className='text-xs text-muted-foreground'>{step.description}</span>}
          </span>
        )
        const head = onStepSelect && state === 'done'
          ? (
              <button
                type='button'
                onClick={() => onStepSelect(index)}
                className='flex cursor-pointer items-center gap-2 rounded-md text-start outline-none focus-visible:ring-2 focus-visible:ring-ring'
              >
                {marker}
                {text}
              </button>
            )
          : <span className='flex items-center gap-2'>{marker}{text}</span>

        return (
          <li
            key={step.title}
            data-state={state}
            aria-current={state === 'current' ? 'step' : undefined}
            className={cn('flex', vertical ? 'flex-col' : 'items-center gap-2', !last && !vertical && 'flex-1')}
          >
            {head}
            {!last && (
              <span
                aria-hidden='true'
                className={cn(
                  'shrink-0 bg-border transition-colors duration-200 motion-reduce:transition-none',
                  vertical ? 'my-1 ms-[13px] h-5 w-0.5' : 'h-0.5 min-w-4 flex-1',
                  state === 'done' && 'bg-primary',
                )}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}
