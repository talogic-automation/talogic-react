import { Plus, Search } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../class-names'
import { Badge, Button, Input } from '../ui'

/** Props of {@link FilterBar}. */
export interface FilterBarProps {
  /** The search text. */
  query:         string
  /** Called with the new search text. */
  onQueryChange: (query: string) => void
  /** The search field's accessible label and placeholder. Default "Search". */
  searchLabel?:  string
  /** Filter chips, such as {@link FilterChip}s. */
  filters?:      ReactNode
  /** A view switch at the end, such as a ToggleGroup. */
  views?:        ReactNode
  className?:    string
}

/**
 * The FilterBar pattern above a table: search, filter chips and a view switch.
 *
 * @param props - Search state, filters and views.
 * @returns The bar.
 */
export function FilterBar ({ query, onQueryChange, searchLabel = 'Search', filters, views, className }: FilterBarProps) {
  return (
    <div data-slot='filter-bar' role='search' className={cn('flex flex-wrap items-center gap-2 border-b p-3', className)}>
      <div className='max-w-80 flex-[1_1_220px]'>
        <Input type='search' value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={searchLabel} aria-label={searchLabel} startIcon={<Search />} />
      </div>
      {filters}
      {views && <div className='ms-auto'>{views}</div>}
    </div>
  )
}

/** Props of {@link FilterChip}. */
export interface FilterChipProps extends ComponentProps<'button'> {
  /** The filter's name, such as "Status". */
  label:  string
  /** How many values the filter has picked. Zero shows no count. */
  count?: number
  /** Replaces the plus icon. */
  icon?:  ReactNode
}

/**
 * A filter button with a dashed border and the count of picked values. Open a popover or menu from it.
 *
 * @param props - Label, count, icon and any `button` props.
 * @returns The chip.
 */
export function FilterChip ({ label, count = 0, icon, className, ...props }: FilterChipProps) {
  return (
    <Button variant='outline' size='sm' className={cn('border-dashed', className)} {...props}>
      {icon ?? <Plus />}
      {label}
      {count > 0 && <Badge variant='brand' className='h-[18px]' aria-label={`${count} selected`}>{count}</Badge>}
    </Button>
  )
}
