import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { DropdownMenuItem } from '../ui'
import { type RecordsColumn, RecordsTable } from './records-table.component'

interface Run { id: string, records: number }

const rows: Run[] = [{ id: 'run-1', records: 412 }, { id: 'run-2', records: 96 }]
const columns: RecordsColumn<Run>[] = [
  { key: 'id', header: 'Run', cell: (run) => run.id },
  { key: 'records', header: 'Records', cell: (run) => run.records, align: 'end' },
]

function Harness ({ onAction = () => {} }: { onAction?: (id: string) => void }) {
  const [selected, setSelected] = useState<Set<string>>(() => new Set(['run-1']))

  return (
    <RecordsTable
      label='Runs'
      rows={rows}
      columns={columns}
      getRowId={(run) => run.id}
      selected={selected}
      onSelectedChange={setSelected}
      rowActions={(run) => <DropdownMenuItem onSelect={() => onAction(run.id)}>Run again</DropdownMenuItem>}
    />
  )
}

describe('RecordsTable', () => {
  it('shows a partial selection on the select-all box and selects every row from it', async () => {
    render(<Harness />)
    const all = screen.getByRole('checkbox', { name: 'Select all rows' })

    expect(all).toHaveAttribute('aria-checked', 'mixed')

    await userEvent.click(all)

    expect(screen.getByRole('checkbox', { name: 'Select run-2' })).toBeChecked()
    expect(all).toBeChecked()
  })

  it('selects and clears one row', async () => {
    render(<Harness />)
    await userEvent.click(screen.getByRole('checkbox', { name: 'Select run-1' }))

    expect(screen.getByRole('checkbox', { name: 'Select run-1' })).not.toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Select all rows' })).not.toBeChecked()
  })

  it('runs a row action for that row', async () => {
    const onAction = jest.fn()

    render(<Harness onAction={onAction} />)
    await userEvent.click(screen.getByRole('button', { name: 'Actions for run-2' }))
    await userEvent.click(screen.getByRole('menuitem', { name: 'Run again' }))

    expect(onAction).toHaveBeenCalledWith('run-2')
  })

  it('aligns number columns to the end', () => {
    render(<Harness />)

    expect(screen.getByRole('cell', { name: '412' })).toHaveClass('text-end')
  })
})
