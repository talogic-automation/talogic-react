import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MobileMenu } from './mobile-menu.component'

const links = [{ label: 'Services', href: '/services' }, { label: 'Docs', href: '/docs' }]

describe('MobileMenu', () => {
  it('opens a dialog with the links, and a close toggle showing the X', async () => {
    render(<MobileMenu links={links} actions={<a href='/contact'>Talk to us</a>} />)
    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }))

    const dialog = screen.getByRole('dialog', { name: 'Menu' })
    const close = screen.getByRole('button', { name: 'Close menu' })

    expect(dialog).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Main' })).toHaveTextContent('ServicesDocs')
    expect(screen.getByRole('link', { name: 'Talk to us' })).toBeInTheDocument()
    expect(close.querySelector('[data-slot="menu-icon"]')).toHaveAttribute('data-state', 'open')
  })

  it('reveals the panel from the toggle', async () => {
    render(<MobileMenu links={links} />)
    await userEvent.click(screen.getByRole('button', { name: 'Open menu' }))

    const menu = screen.getByRole('dialog', { name: 'Menu' })

    expect(menu.style.getPropertyValue('--menu-origin-x')).toMatch(/px$/)
    expect(menu.style.getPropertyValue('--menu-origin-y')).toMatch(/px$/)
  })

  it('closes from the X, from Escape and from a link', async () => {
    render(<MobileMenu links={links} />)
    const toggle = screen.getByRole('button', { name: 'Open menu' })

    await userEvent.click(toggle)
    await userEvent.click(screen.getByRole('button', { name: 'Close menu' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await userEvent.click(toggle)
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await userEvent.click(toggle)
    await userEvent.click(screen.getByRole('link', { name: 'Docs' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(toggle).toHaveFocus()
  })

  it('keeps the toggle icon still until the menu is used', () => {
    render(<MobileMenu links={links} />)

    expect(screen.getByRole('button', { name: 'Open menu' }).querySelector('[data-slot="menu-icon"]')).not.toHaveAttribute('data-state')
  })
})
