import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ToggleGroup, ToggleGroupItem } from './toggle-group.component'

describe('ToggleGroup', () => {
  it('reports the pressed segment', async () => {
    const onValueChange = jest.fn()

    render(
      <ToggleGroup type='single' defaultValue='all' onValueChange={onValueChange} aria-label='Run kind'>
        <ToggleGroupItem value='all'>All</ToggleGroupItem>
        <ToggleGroupItem value='scheduled'>Scheduled</ToggleGroupItem>
      </ToggleGroup>,
    )
    await userEvent.click(screen.getByRole('radio', { name: 'Scheduled' }))

    expect(onValueChange).toHaveBeenCalledWith('scheduled')
    expect(screen.getByRole('radio', { name: 'Scheduled' })).toHaveAttribute('data-state', 'on')
  })
})
