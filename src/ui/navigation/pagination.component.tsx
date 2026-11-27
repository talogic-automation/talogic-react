import { buttonVariants } from '../button'
import { cn } from '../../class-names'

/** Props of {@link Pagination}. */
export interface PaginationProps {
  /** The current page, from 1. */
  page:         number
  /** The number of pages. */
  pageCount:    number
  /** Called with the page to show. */
  onPageChange: (page: number) => void
  /** Page buttons to show around the current one. Default 3 in all. */
  window?:      number
  className?:   string
}

/**
 * Previous, numbered pages and next, as small buttons. The current page has the outline variant and
 * `aria-current`.
 *
 * @param props - Page, page count, change handler and window size.
 * @returns The pagination navigation.
 */
export function Pagination ({ page, pageCount, onPageChange, window = 3, className }: PaginationProps) {
  const first = Math.max(1, Math.min(page - Math.floor(window / 2), pageCount - window + 1))
  const pages = Array.from({ length: Math.min(window, pageCount) }, (_, index) => first + index)

  return (
    <nav data-slot='pagination' aria-label='Pagination' className={cn('flex items-center gap-1', className)}>
      <button type='button' className={buttonVariants({ variant: 'ghost', size: 'sm' })} disabled={page <= 1} onClick={() => onPageChange(page - 1)}>Previous</button>
      {pages.map((number) => (
        <button
          key={number}
          type='button'
          aria-current={number === page ? 'page' : undefined}
          aria-label={`Page ${number}`}
          className={buttonVariants({ variant: number === page ? 'outline' : 'ghost', size: 'icon-sm' })}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      <button type='button' className={buttonVariants({ variant: 'ghost', size: 'sm' })} disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>Next</button>
    </nav>
  )
}
