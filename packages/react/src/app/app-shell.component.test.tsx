import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppShell, type AppNavItem } from './app-shell.component'

const nav: AppNavItem[] = [
  { label: 'Recipes', href: '/recipes', icon: null, count: 12 },
  { label: 'Runs', href: '/runs', icon: null, current: true },
]

describe('AppShell', () => {
  it('marks the current page in the sidebar', () => {
    render(<AppShell product='pargic' nav={nav}>page</AppShell>)

    expect(screen.getByRole('link', { name: 'Runs' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: /Recipes/ })).not.toHaveAttribute('aria-current')
    expect(screen.getByRole('main')).toHaveTextContent('page')
  })

  it('opens the command palette with Ctrl K and runs the picked command', async () => {
    const onSelect = jest.fn()

    render(<AppShell product='pargic' nav={nav} commands={[{ label: 'New recipe', group: 'Actions', onSelect }]}>page</AppShell>)
    await userEvent.keyboard('{Control>}k{/Control}')
    await userEvent.click(await screen.findByRole('option', { name: 'New recipe' }))

    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('hides search when there are no commands', () => {
    render(<AppShell product='pargic' nav={nav}>page</AppShell>)

    expect(screen.queryByRole('button', { name: /Search/ })).not.toBeInTheDocument()
  })
})
