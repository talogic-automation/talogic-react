import { Plus } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../../class-names'

/** Props of {@link EmptyState}. */
export interface EmptyStateProps extends Omit<ComponentProps<'div'>, 'title'> {
  /** What is missing, such as "No schedules yet". */
  title:        ReactNode
  /** What the user gets by adding one. */
  description?: ReactNode
  /** The icon in the brand-soft tile. Default a plus. */
  icon?:        ReactNode
  /** The action that fills the space, usually one small primary button. */
  action?:      ReactNode
}

/**
 * The Empty pattern: a dashed box with an icon tile, a title, a sentence and one action.
 *
 * @param props - Title, description, icon, action and any `div` props.
 * @returns The empty state.
 */
export function EmptyState ({ title, description, icon, action, className, ...props }: EmptyStateProps) {
  return (
    <div data-slot='empty-state' className={cn('flex flex-col items-center gap-2 rounded-xl border-[1.5px] border-dashed border-input p-6 text-center', className)} {...props}>
      <span aria-hidden='true' className='grid size-10 place-items-center rounded-[10px] bg-brand-soft text-brand-text [&_svg]:size-5'>{icon ?? <Plus />}</span>
      <p className='m-0 type-h4'>{title}</p>
      {description && <p className='m-0 max-w-sm text-[13px] text-muted-foreground'>{description}</p>}
      {action && <div className='mt-1'>{action}</div>}
    </div>
  )
}
