import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Stepper } from './stepper.component'

const steps = [{ title: 'Device' }, { title: 'Models', description: '2 of 3 downloaded' }, { title: 'Your voice' }, { title: 'Privacy' }]

describe('Stepper', () => {
  it('lists the steps and marks done, current and upcoming ones', () => {
    render(<Stepper steps={steps} current={1} />)
    const items = within(screen.getByRole('list', { name: 'Progress' })).getAllByRole('listitem')

    expect(items.map((item) => item.dataset.state)).toEqual(['done', 'current', 'upcoming', 'upcoming'])
    expect(items[0]).toHaveTextContent('Device, done')
    expect(items[1]).toHaveAttribute('aria-current', 'step')
    expect(items[1]).toHaveTextContent('2 of 3 downloaded')
  })

  it('has no buttons without a select handler', () => {
    render(<Stepper steps={steps} current={2} />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('goes back to a done step, and only to done steps', async () => {
    const onStepSelect = jest.fn()
    render(<Stepper steps={steps} current={2} onStepSelect={onStepSelect} />)

    expect(screen.getAllByRole('button')).toHaveLength(2)

    await userEvent.click(screen.getByRole('button', { name: /Device/ }))

    expect(onStepSelect).toHaveBeenCalledWith(0)
  })

  it('marks every step done past the last one', () => {
    render(<Stepper steps={steps} current={4} orientation='vertical' />)

    expect(screen.getByRole('list')).toHaveAttribute('data-orientation', 'vertical')
    expect(screen.getAllByRole('listitem').every((item) => item.dataset.state === 'done')).toBe(true)
  })
})
