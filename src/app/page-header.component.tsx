import type { ReactNode } from 'react'
import { cn } from '../class-names'

/** Props of {@link PageHeader}. */
export interface PageHeaderProps {
  /** The page title: 22 px, semibold. */
  title:        ReactNode
  /** One line under the title. */
  description?: ReactNode
  /** Actions at the end, with at most one primary button. */
  actions?:     ReactNode
  /** Underline tabs under the title, for the sections of the page. */
  tabs?:        ReactNode
  className?:   string
}

/**
 * The PageHeader pattern of an app page: title, description, actions and optional section tabs.
 *
 * @param props - Title, description, actions and tabs.
 * @returns The header.
 */
export function PageHeader ({ title, description, actions, tabs, className }: PageHeaderProps) {
  return (
    <div data-slot='page-header' className={cn('flex flex-col gap-4', className)}>
      <div className='flex flex-wrap items-end gap-4'>
        <div className='flex flex-col gap-1'>
          <h1 className='m-0 text-[22px] font-semibold tracking-tight'>{title}</h1>
          {description && <p className='m-0 text-[13px] text-muted-foreground'>{description}</p>}
        </div>
        {actions && <div className='ms-auto flex flex-wrap gap-2'>{actions}</div>}
      </div>
      {tabs}
    </div>
  )
}
