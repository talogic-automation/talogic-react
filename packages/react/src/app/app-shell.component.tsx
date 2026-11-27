import { Search } from 'lucide-react'
import { type ReactNode, useCallback, useState } from 'react'
import { cn } from '../class-names'
import { ProductSwitcher } from '../product'
import type { Product } from '../tokens'
import { Avatar, AvatarFallback, Badge, Button, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Kbd } from '../ui'
import { useCommandShortcut } from './command-shortcut.hook'

/** An entry of the app sidebar. */
export interface AppNavItem {
  label:    string
  href:     string
  /** A 16 px lucide icon. */
  icon:     ReactNode
  /** A count badge, such as the number of recipes. */
  count?:   number
  /** True for the page the user is on. */
  current?: boolean
}

/** A command of the palette. */
export interface AppCommand {
  label:    string
  group:    string
  onSelect: () => void
}

/** Props of {@link AppShell}. */
export interface AppShellProps {
  /** The product, for the switcher. Theme the accent with ThemeRoot or `<html data-product>`. */
  product:          Product
  workspace?:       string
  onProductChange?: (product: Product) => void
  /** The main sidebar entries. */
  nav:              readonly AppNavItem[]
  /** A titled second group, such as Workspace settings. */
  secondaryNav?:    { title: string, items: readonly AppNavItem[] }
  /** A card at the bottom of the sidebar, such as plan usage. */
  sidebarFooter?:   ReactNode
  /** The signed-in user. */
  user?:            { name: string, role?: string, initials: string }
  /** The breadcrumb at the start of the top bar. */
  breadcrumb?:      ReactNode
  /** Icon buttons at the end of the top bar. */
  topActions?:      ReactNode
  /** The commands of the ⌘K palette. Without commands, the search button and shortcut are hidden. */
  commands?:        readonly AppCommand[]
  /** The page. */
  children:         ReactNode
  className?:       string
}

/**
 * Draws one sidebar entry.
 *
 * @param props - The entry.
 * @returns The link.
 */
function NavLink ({ item }: { item: AppNavItem }) {
  return (
    <a
      href={item.href}
      aria-current={item.current ? 'page' : undefined}
      className={cn(
        'flex h-8 items-center gap-2.5 rounded-md px-2.5 text-[13.5px] font-medium text-muted-foreground no-underline [&_svg]:size-4 [&_svg]:shrink-0',
        'hover:bg-sidebar-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring',
        'aria-[current=page]:bg-brand-soft aria-[current=page]:text-brand-text',
      )}
    >
      {item.icon}
      {item.label}
      {item.count !== undefined && <Badge variant='secondary' className='ms-auto h-5'>{item.count}</Badge>}
    </a>
  )
}

/**
 * The AppShell pattern of a web portal: a sidebar with the product switcher, search, navigation, a footer card
 * and the user, beside a top bar and the page. ⌘K or Ctrl K opens the command palette.
 *
 * @param props - Product, navigation, user, top bar, commands and the page.
 * @returns The shell.
 */
export function AppShell ({ product, workspace, onProductChange, nav, secondaryNav, sidebarFooter, user, breadcrumb, topActions, commands, children, className }: AppShellProps) {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const openPalette = useCallback(() => setPaletteOpen(true), [])
  useCommandShortcut(openPalette, Boolean(commands?.length))
  const groups = [...new Set(commands?.map((command) => command.group))]

  return (
    <div data-slot='app-shell' className={cn('flex min-h-screen flex-wrap bg-background', className)}>
      <aside className='flex max-w-full flex-[1_1_240px] flex-col gap-3.5 border-e border-sidebar-border bg-sidebar p-3 text-sidebar-foreground md:max-w-[280px]'>
        <ProductSwitcher product={product} workspace={workspace} onProductChange={onProductChange} />
        {commands?.length
          ? (
              <Button variant='outline' size='sm' className='justify-start font-normal text-muted-foreground' onClick={openPalette}>
                <Search />
                Search
                <Kbd className='ms-auto'>⌘K</Kbd>
              </Button>
            )
          : null}
        <nav aria-label='Workspace' className='flex flex-col gap-0.5'>
          {nav.map((item) => <NavLink key={item.href} item={item} />)}
        </nav>
        {secondaryNav && (
          <nav aria-label={secondaryNav.title} className='flex flex-col gap-0.5'>
            <span className='px-2.5 pb-1 text-xs font-medium text-muted-foreground'>{secondaryNav.title}</span>
            {secondaryNav.items.map((item) => <NavLink key={item.href} item={item} />)}
          </nav>
        )}
        {sidebarFooter && <div className='mt-auto'>{sidebarFooter}</div>}
        {user && (
          <div className={cn('flex items-center gap-2.5 p-1', !sidebarFooter && 'mt-auto')}>
            <Avatar><AvatarFallback>{user.initials}</AvatarFallback></Avatar>
            <span className='flex flex-col leading-tight'>
              <span className='text-[13px] font-semibold'>{user.name}</span>
              {user.role && <span className='text-xs text-muted-foreground'>{user.role}</span>}
            </span>
          </div>
        )}
      </aside>
      <div className='relative flex min-w-0 flex-[999_1_560px] flex-col'>
        <div className='flex h-14 flex-wrap items-center gap-3 border-b px-6'>
          {breadcrumb}
          {topActions && <div className='ms-auto flex items-center gap-1.5'>{topActions}</div>}
        </div>
        <main className='flex flex-col gap-5 p-6'>{children}</main>
      </div>
      {commands?.length
        ? (
            <CommandDialog open={paletteOpen} onOpenChange={setPaletteOpen}>
              <CommandInput placeholder='Search recipes, runs and settings' />
              <CommandList>
                <CommandEmpty>No results.</CommandEmpty>
                {groups.map((group) => (
                  <CommandGroup key={group} heading={group}>
                    {commands.filter((command) => command.group === group).map((command) => (
                      <CommandItem key={command.label} onSelect={() => { setPaletteOpen(false); command.onSelect() }}>{command.label}</CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </CommandDialog>
          )
        : null}
    </div>
  )
}
