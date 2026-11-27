import { Ellipsis } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../class-names'
import { Button, Checkbox, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui'

/** A column of a {@link RecordsTable}. */
export interface RecordsColumn<Row> {
  /** A stable key for the column. */
  key:        string
  /** The heading. */
  header:     ReactNode
  /** Draws the cell of a row. */
  cell:       (row: Row) => ReactNode
  /** `end` for numbers, so digits line up. */
  align?:     'start' | 'end'
  className?: string
}

/** Props of {@link RecordsTable}. */
export interface RecordsTableProps<Row> {
  /** The rows to show. */
  rows:              readonly Row[]
  columns:           readonly RecordsColumn<Row>[]
  /** A stable id of a row. */
  getRowId:          (row: Row) => string
  /** The ids of the selected rows. Selection is on when this is given. */
  selected?:         ReadonlySet<string>
  /** Called with the new selection. */
  onSelectedChange?: (selected: Set<string>) => void
  /** The items of a row's actions menu. */
  rowActions?:       (row: Row) => ReactNode
  /** The accessible name of the table. */
  label:             string
  className?:        string
}

/**
 * The RecordsTable pattern: a data table with row selection, a select-all box and a row actions menu.
 * Sorting and virtualisation stay with the caller, which passes the rows to show.
 *
 * @param props - Rows, columns, row ids, selection and row actions.
 * @returns The table.
 */
export function RecordsTable<Row> ({ rows, columns, getRowId, selected, onSelectedChange, rowActions, label, className }: RecordsTableProps<Row>) {
  const selectable = selected !== undefined
  const ids = rows.map((row) => getRowId(row))
  const picked = ids.filter((id) => selected?.has(id)).length
  const allState = picked === 0 ? false : (picked === ids.length ? true : 'indeterminate')

  function toggle (id: string, on: boolean) {
    const next = new Set(selected)
    if (on) next.add(id)
    else next.delete(id)
    onSelectedChange?.(next)
  }

  function toggleAll (on: boolean) {
    const next = new Set(selected)
    for (const id of ids) {
      if (on) next.add(id)
      else next.delete(id)
    }
    onSelectedChange?.(next)
  }

  return (
    <Table data-slot='records-table' aria-label={label} className={cn('min-w-[760px]', className)}>
      <TableHeader>
        <TableRow className='hover:bg-transparent'>
          {selectable && <TableHead className='w-9'><Checkbox aria-label='Select all rows' checked={allState} onCheckedChange={(state) => toggleAll(state === true)} /></TableHead>}
          {columns.map((column) => <TableHead key={column.key} className={cn(column.align === 'end' && 'text-end', column.className)}>{column.header}</TableHead>)}
          {rowActions && <TableHead className='w-11'><span className='sr-only'>Actions</span></TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => {
          const id = getRowId(row)
          const isSelected = selected?.has(id) ?? false

          return (
            <TableRow key={id} data-state={isSelected ? 'selected' : undefined}>
              {selectable && <TableCell><Checkbox aria-label={`Select ${id}`} checked={isSelected} onCheckedChange={(state) => toggle(id, state === true)} /></TableCell>}
              {columns.map((column) => <TableCell key={column.key} className={cn(column.align === 'end' && 'text-end tabular-nums', column.className)}>{column.cell(row)}</TableCell>)}
              {rowActions && (
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='icon-sm' aria-label={`Actions for ${id}`}><Ellipsis /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>{rowActions(row)}</DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              )}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
