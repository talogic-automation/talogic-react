import type { ReactNode } from 'react'
import { cn } from '../class-names'
import { ProductLogo } from '../product'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui'
import { MobileMenu } from './mobile-menu.component'

/** A link in the site navigation. */
export interface SiteLink {
  label:        string
  href:         string
  /** One line under the label, in a drop-down panel. */
  description?: string
}

/** A top-level entry of the site navigation: a link, or a drop-down of links. */
export interface SiteNavEntry {
  label:  string
  href?:  string
  links?: readonly SiteLink[]
}

/** Props of {@link SiteHeader}. */
export interface SiteHeaderProps {
  /** The main navigation. */
  nav:        readonly SiteNavEntry[]
  /** The actions at the end, such as Sign in and Talk to us. */
  actions?:   ReactNode
  /** The brand at the start. Default the Talogic symbol and name, linking home. */
  brand?:     ReactNode
  className?: string
}

/**
 * The SiteHeader pattern: a sticky, blurred bar with the brand, the main navigation and the actions. Below
 * 768 px the navigation moves into the animated {@link MobileMenu}.
 *
 * @param props - Navigation, actions and brand.
 * @returns The header.
 */
export function SiteHeader ({ nav, actions, brand, className }: SiteHeaderProps) {
  const home = brand ?? (
    <a href='/' className='flex items-center gap-2 no-underline' aria-label='Talogic home'>
      <ProductLogo product='talogic' alt='' className='size-7' />
      <span className='font-display text-xl font-extrabold tracking-tight text-foreground'>Talogic</span>
    </a>
  )

  return (
    <header data-slot='site-header' className={cn('sticky top-0 z-40 border-b bg-background/88 backdrop-blur-md', className)}>
      <div className='mx-auto flex h-[68px] max-w-[1200px] items-center gap-7 px-6'>
        {home}
        <NavigationMenu className='hidden md:flex' aria-label='Main'>
          <NavigationMenuList>
            {nav.map((entry) => (
              <NavigationMenuItem key={entry.label}>
                {entry.links
                  ? (
                      <>
                        <NavigationMenuTrigger>{entry.label}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className='m-0 grid w-[420px] list-none gap-1 p-0'>
                            {entry.links.map((link) => (
                              <li key={link.href}>
                                <NavigationMenuLink href={link.href} className='flex h-auto flex-col items-start gap-0.5 py-2'>
                                  <span className='text-sm font-semibold'>{link.label}</span>
                                  {link.description && <span className='text-[13px] font-normal text-muted-foreground'>{link.description}</span>}
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    )
                  : <NavigationMenuLink href={entry.href}>{entry.label}</NavigationMenuLink>}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className='ms-auto hidden items-center gap-2 md:flex'>{actions}</div>
        <MobileMenu
          className='ms-auto md:hidden'
          links={nav.flatMap((entry) => entry.links ?? [{ label: entry.label, href: entry.href ?? '#' }])}
          actions={actions}
        />
      </div>
    </header>
  )
}
