import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './breadcrumb.component'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from './menubar.component'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './navigation-menu.component'
import { Pagination } from './pagination.component'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs.component'

const meta = {
  title: 'Primitives/Navigation',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** Pill tabs switch views inside a panel. Underline tabs switch pages in a header. */
export const TabVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      <Tabs defaultValue='build'>
        <TabsList>
          {['Build', 'Data', 'Runs', 'Settings'].map((tab) => <TabsTrigger key={tab} value={tab.toLowerCase()}>{tab}</TabsTrigger>)}
        </TabsList>
        <TabsContent value='build' className='text-muted-foreground'>The recipe steps.</TabsContent>
      </Tabs>
      <Tabs defaultValue='overview'>
        <TabsList variant='underline'>
          {['Overview', 'Records', 'Schedules', 'Access'].map((tab) => <TabsTrigger key={tab} value={tab.toLowerCase()}>{tab}</TabsTrigger>)}
        </TabsList>
      </Tabs>
    </div>
  ),
}

/** A breadcrumb to the current run. */
export const Breadcrumbs: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href='#'>Projects</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href='#'>Supplier invoices</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Run 2026-11-27-1</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

/** Pagination with three page buttons. */
export const Pages: Story = {
  render: function PagesStory () {
    const [page, setPage] = useState(1)

    return <Pagination page={page} pageCount={16} onPageChange={setPage} />
  },
}

/** The website's main navigation, with a products panel. */
export const SiteNavigation: Story = {
  parameters: { density: 'web' },
  render:     () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='m-0 grid w-[360px] list-none gap-1 p-0'>
              {['pargic', 'daygic', 'ingic'].map((name) => <li key={name}><NavigationMenuLink href='#'>{name}</NavigationMenuLink></li>)}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem><NavigationMenuLink href='#'>Services</NavigationMenuLink></NavigationMenuItem>
        <NavigationMenuItem><NavigationMenuLink href='#'>Docs</NavigationMenuLink></NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

/** The menubar of a desktop window. */
export const DesktopMenubar: Story = {
  parameters: { density: 'desk' },
  render:     () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Open media<MenubarShortcut>Ctrl O</MenubarShortcut></MenubarItem>
          <MenubarItem>Save flow<MenubarShortcut>Ctrl S</MenubarShortcut></MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Quit</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      {['Edit', 'View', 'Flow', 'Help'].map((menu) => (
        <MenubarMenu key={menu}>
          <MenubarTrigger>{menu}</MenubarTrigger>
          <MenubarContent><MenubarItem>{menu} item</MenubarItem></MenubarContent>
        </MenubarMenu>
      ))}
    </Menubar>
  ),
}
