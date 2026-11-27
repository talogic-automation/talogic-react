import { render, screen } from '@testing-library/react'
import { BottomNav } from './bottom-nav.component'

describe('BottomNav', () => {
  it('marks only the current tab', () => {
    render(
      <BottomNav
        items={[
          { label: 'Today', href: '/today', icon: null, current: true },
          { label: 'Timeline', href: '/timeline', icon: null },
        ]}
      />,
    )

    expect(screen.getByRole('link', { name: 'Today' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Timeline' })).not.toHaveAttribute('aria-current')
  })
})
