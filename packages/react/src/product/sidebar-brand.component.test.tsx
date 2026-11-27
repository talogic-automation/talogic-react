import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Sidebar } from '../ui'
import { SidebarBrand } from './sidebar-brand.component'

describe('SidebarBrand', () => {
  it('collapses and expands the sidebar from the logo', async () => {
    render(<Sidebar variant='nav' label='Portal'><SidebarBrand product='pargic' badge='Dev' /></Sidebar>)
    await userEvent.click(screen.getByRole('button', { name: 'pargic: collapse sidebar' }))

    expect(screen.getByRole('complementary', { name: 'Portal' })).toHaveAttribute('data-collapsed', 'true')

    await userEvent.click(screen.getByRole('button', { name: 'pargic: expand sidebar' }))

    expect(screen.getByRole('complementary', { name: 'Portal' })).not.toHaveAttribute('data-collapsed')
  })
})
