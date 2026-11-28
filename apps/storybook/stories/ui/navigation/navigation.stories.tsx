import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '@talogic-automation/react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@talogic-automation/react'
import { MenuIcon } from '@talogic-automation/react'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from '@talogic-automation/react'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@talogic-automation/react'
import { Pagination } from '@talogic-automation/react'
import { Stepper } from '@talogic-automation/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@talogic-automation/react'

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

/** The menu toggle: press it to twirl the hamburger into an X and back. */
export const MenuToggle: Story = {
  render: function MenuToggleStory () {
    const [open, setOpen] = useState<boolean | undefined>(undefined)

    return (
      <button
        type='button'
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(!open)}
        className='grid size-16 cursor-pointer place-items-center rounded-xl border bg-card text-foreground'
      >
        <MenuIcon open={open} className='size-8' />
      </button>
    )
  },
}

const SETUP_STEPS = [
  { title: 'Device', description: 'Simulated' },
  { title: 'Models', description: '2 of 3 downloaded' },
  { title: 'Your voice' },
  { title: 'Privacy' },
]

/** A stepper shows the progress of a setup flow. Pick a done step to go back to it. */
export const Steppers: Story = {
  render: function Render () {
    const [current, setCurrent] = useState(1)

    return (
      <div className='flex flex-col gap-8'>
        <Stepper steps={SETUP_STEPS} current={current} onStepSelect={setCurrent} />
        <Stepper steps={SETUP_STEPS} current={current} orientation='vertical' onStepSelect={setCurrent} />
        <div className='flex gap-2'>
          <Button variant='outline' onClick={() => setCurrent((step) => Math.max(0, step - 1))}>Back</Button>
          <Button onClick={() => setCurrent((step) => Math.min(SETUP_STEPS.length, step + 1))}>Continue</Button>
        </div>
      </div>
    )
  },
}
