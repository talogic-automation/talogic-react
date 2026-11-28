import { Search } from 'lucide-react'
import { type ReactNode, useCallback, useState } from 'react'
import { cn } from '../class-names'
import { ProductSwitcher } from '../product'
import type { Product } from '../tokens'
import {
  Avatar,
  AvatarFallback,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  fadingLabelClassName,
  Kbd,
  Sidebar,
  SidebarCollapseButton,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarSheet,
} from '../ui'
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
 * The AppShell pattern of a web portal: the `nav` Sidebar with the product switcher, search, navigation, a footer
 * card and the user, beside a top bar and the page. The sidebar collapses to its icons; on a phone it opens in a
 * sheet from the top bar. ⌘K or Ctrl K opens the command palette.
 *
 * @param props - Product, navigation, user, top bar, commands and the page.
 * @returns The shell.
 */
export function AppShell ({ product, workspace, onProductChange, nav, secondaryNav, sidebarFooter, user, breadcrumb, topActions, commands, children, className }: AppShellProps) {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const openPalette = useCallback(() => setPaletteOpen(true), [])
  useCommandShortcut(openPalette, Boolean(commands?.length))
  const groups = [...new Set(commands?.map((command) => command.group))]
  const link = (item: AppNavItem) => (
    <SidebarItem key={item.href} asChild title={item.label} icon={item.icon} badge={item.count} active={item.current}>
      <a href={item.href}>{item.label}</a>
    </SidebarItem>
  )
  const sidebarBody = (
    <>
      <SidebarHeader className='h-12'>
        <ProductSwitcher product={product} workspace={workspace} onProductChange={onProductChange} className='px-2.5' />
      </SidebarHeader>
      <SidebarContent>
        {commands?.length
          ? <SidebarItem title='Search' icon={<Search />} badge={<Kbd className='border-0 bg-transparent'>⌘K</Kbd>} onClick={openPalette} />
          : null}
        <div className='flex flex-col gap-0.5'>{nav.map((item) => link(item))}</div>
        {secondaryNav && <SidebarGroup title={secondaryNav.title}>{secondaryNav.items.map((item) => link(item))}</SidebarGroup>}
      </SidebarContent>
      <SidebarFooter>
        {sidebarFooter && <div className={fadingLabelClassName}>{sidebarFooter}</div>}
        {user && (
          <div className='flex items-center gap-2.5 px-1'>
            <Avatar><AvatarFallback>{user.initials}</AvatarFallback></Avatar>
            <span className={cn('flex flex-col leading-tight', fadingLabelClassName)}>
              <span className='text-[13px] font-semibold'>{user.name}</span>
              {user.role && <span className='text-xs text-muted-foreground'>{user.role}</span>}
            </span>
          </div>
        )}
        <SidebarCollapseButton />
      </SidebarFooter>
    </>
  )

  return (
    <div data-slot='app-shell' className={cn('flex min-h-screen flex-wrap bg-background', className)}>
      <Sidebar variant='nav' label='Workspace' className='sticky top-0 h-screen max-md:hidden'>
        {sidebarBody}
      </Sidebar>
      <div className='relative flex min-w-0 flex-[999_1_560px] flex-col'>
        <div className='flex h-14 flex-wrap items-center gap-3 border-b px-6'>
          <SidebarSheet label='Workspace' className='-ms-2 md:hidden'>
            <Sidebar variant='nav' label='Workspace' collapsed={false} className='w-full'>{sidebarBody}</Sidebar>
          </SidebarSheet>
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
