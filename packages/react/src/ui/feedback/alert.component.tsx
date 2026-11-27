import { CircleCheck, Info, TriangleAlert } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../../class-names'

const tones = {
  info:    { box: 'border-border bg-card', icon: 'text-info', Icon: Info },
  success: { box: 'border-border bg-card', icon: 'text-success', Icon: CircleCheck },
  warning: { box: 'border-[color-mix(in_oklab,var(--warning)_35%,var(--border))] bg-warning-soft', icon: 'text-warning', Icon: TriangleAlert },
  danger:  { box: 'border-[color-mix(in_oklab,var(--destructive)_40%,var(--border))] bg-destructive-soft', icon: 'text-destructive', Icon: TriangleAlert },
} as const

/** Props of {@link Alert}. */
export interface AlertProps extends Omit<ComponentProps<'div'>, 'title'> {
  /** The tone. It sets the icon and colour; the title says what happened. */
  tone?: keyof typeof tones
  /** A short title, such as "Run failed". */
  title: ReactNode
  /** Replaces the tone's icon. */
  icon?: ReactNode
}

/**
 * The shadcn/ui Alert: an inline message with an icon, a title and a description. Danger and warning
 * alerts are announced at once (`role="alert"`); info and success are polite (`role="status"`).
 *
 * @param props - Tone, title, optional icon, the description as children, and any `div` props.
 * @returns The alert.
 */
export function Alert ({ tone = 'info', title, icon, children, className, ...props }: AlertProps) {
  const { box, icon: iconClass, Icon } = tones[tone]

  return (
    <div data-slot='alert' role={tone === 'danger' || tone === 'warning' ? 'alert' : 'status'} className={cn('flex gap-3 rounded-lg border px-4 py-3.5', box, className)} {...props}>
      <span aria-hidden='true' className={cn('mt-px flex shrink-0 [&_svg]:size-[18px]', iconClass)}>{icon ?? <Icon />}</span>
      <div className='flex flex-col gap-0.5'>
        <p className='m-0 type-h4'>{title}</p>
        {children && <div className='text-[13px] text-muted-foreground'>{children}</div>}
      </div>
    </div>
  )
}
