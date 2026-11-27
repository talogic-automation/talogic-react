import type { ComponentProps } from 'react'
import { cn } from '../../class-names'

/**
 * The shadcn/ui Table: 13 px, border rows, a muted hover. It scrolls sideways when narrow.
 *
 * @param props - Any `table` props.
 * @returns The table in a scroll container.
 */
export function Table ({ className, ...props }: ComponentProps<'table'>) {
  return (
    <div data-slot='table-container' className='relative w-full overflow-x-auto'>
      <table data-slot='table' className={cn('w-full caption-bottom border-collapse text-[13px]', className)} {...props} />
    </div>
  )
}

/**
 * The head of a {@link Table}.
 *
 * @param props - Any `thead` props.
 * @returns The head.
 */
export function TableHeader (props: ComponentProps<'thead'>) {
  return <thead data-slot='table-header' {...props} />
}

/**
 * The body of a {@link Table}.
 *
 * @param props - Any `tbody` props.
 * @returns The body.
 */
export function TableBody (props: ComponentProps<'tbody'>) {
  return <tbody data-slot='table-body' {...props} />
}

/**
 * A row. `data-state="selected"` tints it.
 *
 * @param props - Any `tr` props.
 * @returns The row.
 */
export function TableRow ({ className, ...props }: ComponentProps<'tr'>) {
  return <tr data-slot='table-row' className={cn('border-b transition-colors hover:bg-muted/60 data-[state=selected]:bg-muted', className)} {...props} />
}

/**
 * A column heading.
 *
 * @param props - Any `th` props.
 * @returns The heading cell.
 */
export function TableHead ({ className, ...props }: ComponentProps<'th'>) {
  return <th data-slot='table-head' className={cn('h-9 whitespace-nowrap px-3 text-start align-middle font-medium text-muted-foreground', className)} {...props} />
}

/**
 * A data cell.
 *
 * @param props - Any `td` props.
 * @returns The cell.
 */
export function TableCell ({ className, ...props }: ComponentProps<'td'>) {
  return <td data-slot='table-cell' className={cn('px-3 py-[11px] align-middle', className)} {...props} />
}

/**
 * The caption, under the table.
 *
 * @param props - Any `caption` props.
 * @returns The caption.
 */
export function TableCaption ({ className, ...props }: ComponentProps<'caption'>) {
  return <caption data-slot='table-caption' className={cn('mt-3 text-xs text-muted-foreground', className)} {...props} />
}
