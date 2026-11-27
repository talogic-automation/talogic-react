import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { Sidebar, SidebarCollapseButton, SidebarContent, SidebarFooter, SidebarHeader } from './sidebar.component'
import { SidebarGroup } from './sidebar-group.component'
import { SidebarItem } from './sidebar-item.component'

/**
 * A plugin sidebar with search, two groups and an active item.
 *
 * @param props - The first collapsed state.
 * @returns The sidebar.
 */
function Plugins ({ defaultCollapsed = false }: { defaultCollapsed?: boolean }) {
  const [query, setQuery] = useState('')
  const plugins = [['whisper', 'Speech'], ['speakers', 'Speech'], ['OCR', 'Vision']] as const
  const shown = plugins.filter(([name]) => name.toLowerCase().includes(query.toLowerCase()))

  return (
    <Sidebar label='Plugins' defaultCollapsed={defaultCollapsed}>
      <SidebarHeader query={query} onQueryChange={setQuery} />
      <SidebarContent>
        {['Speech', 'Vision'].map((group) => {
          const items = shown.filter(([, of]) => of === group)

          return items.length > 0 && (
            <SidebarGroup key={group} title={group} count={items.length} forceOpen={query !== ''}>
              {items.map(([name]) => <SidebarItem key={name} title={name} meta='1.0' hue='red' active={name === 'whisper'} />)}
            </SidebarGroup>
          )
        })}
      </SidebarContent>
    </Sidebar>
  )
}

describe('Sidebar', () => {
  it('lists the items in labelled groups and marks the active one', () => {
    render(<Plugins />)
    const sidebar = screen.getByRole('complementary', { name: 'Plugins' })

    expect(within(sidebar).getByRole('group', { name: 'Speech' })).toHaveTextContent('whisper')
    expect(screen.getByRole('button', { name: /whisper/ })).toHaveAttribute('aria-current', 'true')
  })

  it('folds a group and opens it again', async () => {
    render(<Plugins />)
    await userEvent.click(screen.getByRole('button', { name: /Speech/ }))

    expect(screen.queryByRole('button', { name: /speakers/ })).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /Speech/ }))

    expect(screen.getByRole('button', { name: /speakers/ })).toBeInTheDocument()
  })

  it('filters with the search and keeps matching groups open', async () => {
    render(<Plugins />)
    await userEvent.click(screen.getByRole('button', { name: /Speech/ }))
    await userEvent.type(screen.getByRole('searchbox', { name: 'Search plugins' }), 'speak')

    expect(screen.getByRole('button', { name: /speakers/ })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /OCR/ })).not.toBeInTheDocument()
  })

  it('collapses to a rail of icon buttons named after their items, and expands again', async () => {
    render(<Plugins />)
    await userEvent.click(screen.getByRole('button', { name: 'Hide plugins' }))

    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'OCR' })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Show plugins' }))

    expect(screen.getByRole('searchbox', { name: 'Search plugins' })).toBeInTheDocument()
  })
})

describe('Sidebar, nav variant', () => {
  it('is a navigation with links that keep their names when collapsed', async () => {
    render(
      <Sidebar variant='nav' label='Portal'>
        <SidebarContent>
          <SidebarGroup title='Build'>
            <SidebarItem asChild title='Runs' icon={null} active><a href='/runs'>Runs</a></SidebarItem>
            <SidebarItem asChild title='Recipes' icon={null} badge={12}><a href='/recipes'>Recipes</a></SidebarItem>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter><SidebarCollapseButton /></SidebarFooter>
      </Sidebar>,
    )

    expect(screen.getByRole('navigation', { name: 'Portal' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Runs' })).toHaveAttribute('aria-current', 'page')

    await userEvent.click(screen.getByRole('button', { name: 'Collapse sidebar' }))

    expect(screen.getByRole('complementary', { name: 'Portal' })).toHaveAttribute('data-collapsed', 'true')
    expect(screen.getByRole('link', { name: 'Runs' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toHaveAttribute('aria-expanded', 'false')
  })
})
