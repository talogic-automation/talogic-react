import { ChevronDown } from 'lucide-react'
import { NavigationMenu as NavigationMenuPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'

/**
 * The shadcn/ui NavigationMenu: the main navigation of a website, with drop-down panels.
 *
 * @param props - Radix NavigationMenu root props.
 * @returns The navigation menu.
 */
export function NavigationMenu ({ className, children, ...props }: ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root data-slot='navigation-menu' className={cn('relative flex items-center', className)} {...props}>
      {children}
      <div className='absolute start-0 top-full flex justify-center'>
        <NavigationMenuPrimitive.Viewport className='relative mt-2 h-(--radix-navigation-menu-viewport-height) w-full origin-top overflow-hidden rounded-xl border bg-popover text-popover-foreground transition-[width,height] duration-200 data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out motion-reduce:transition-none motion-reduce:data-[state=open]:animate-fade-in motion-reduce:data-[state=closed]:animate-fade-out shadow-lg md:w-(--radix-navigation-menu-viewport-width)' />
      </div>
    </NavigationMenuPrimitive.Root>
  )
}

/**
 * The list of a {@link NavigationMenu}.
 *
 * @param props - Radix NavigationMenu list props.
 * @returns The list.
 */
export function NavigationMenuList ({ className, ...props }: ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return <NavigationMenuPrimitive.List data-slot='navigation-menu-list' className={cn('m-0 flex list-none items-center gap-1 p-0', className)} {...props} />
}

/** One entry of a {@link NavigationMenuList}. */
export const NavigationMenuItem = NavigationMenuPrimitive.Item

const triggerClassName = 'inline-flex h-[calc(var(--control-h)-6px)] cursor-pointer items-center gap-1 rounded-md bg-transparent px-3 text-[15px] font-medium text-foreground no-underline outline-none transition-colors duration-150 motion-reduce:transition-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-accent'

/**
 * A top-level entry that opens a panel.
 *
 * @param props - Radix NavigationMenu trigger props.
 * @returns The trigger.
 */
export function NavigationMenuTrigger ({ className, children, ...props }: ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger data-slot='navigation-menu-trigger' className={cn(triggerClassName, 'group', className)} {...props}>
      {children}
      <ChevronDown className='size-4 transition-transform duration-200 ease-emphasised group-data-[state=open]:rotate-180 motion-reduce:transition-none' aria-hidden='true' />
    </NavigationMenuPrimitive.Trigger>
  )
}

/**
 * The panel a {@link NavigationMenuTrigger} opens.
 *
 * @param props - Radix NavigationMenu content props.
 * @returns The panel.
 */
export function NavigationMenuContent ({ className, ...props }: ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return <NavigationMenuPrimitive.Content data-slot='navigation-menu-content' className={cn('top-0 start-0 w-full p-2 md:absolute md:w-auto', className)} {...props} />
}

/**
 * A plain top-level link.
 *
 * @param props - Radix NavigationMenu link props.
 * @returns The link.
 */
export function NavigationMenuLink ({ className, ...props }: ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return <NavigationMenuPrimitive.Link data-slot='navigation-menu-link' className={cn(triggerClassName, className)} {...props} />
}
