import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Avatar,
  AvatarFallback,
  type Hue,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Sidebar,
  SidebarBrand,
  SidebarCollapseButton,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarSheet,
  fadingLabelClassName,
} from '@talogic-automation/react'
import { Calendar, FileText, FolderKanban, LayoutGrid, Link2, List, Play, Settings, Shield, Star, Users, Workflow } from 'lucide-react'
import { type ReactNode, useState } from 'react'

const meta = {
  title: 'Primitives/Sidebar',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

interface Plugin { name: string, version: string, group: string, hue: Hue, soon?: boolean }

const PLUGINS: Plugin[] = [
  { name: 'whisper', version: 'speech to text · 1.4', group: 'Speech', hue: 'red' },
  { name: 'speakers', version: 'who spoke when · 0.9', group: 'Speech', hue: 'red' },
  { name: 'narrator', version: 'summary · 0.6', group: 'Language', hue: 'violet' },
  { name: 'translate', version: 'any language · 0.4', group: 'Language', hue: 'violet' },
  { name: 'OCR', version: 'text on screen · 1.1', group: 'Vision', hue: 'blue' },
  { name: 'objects', version: 'what is in view · 0.8', group: 'Vision', hue: 'blue' },
  { name: 'face-emotion', version: 'faces · 0.3', group: 'Vision', hue: 'blue' },
  { name: 'upscale', version: 'video · 0.2', group: 'Video', hue: 'green', soon: true },
]

/**
 * loomgic's plugin sidebar as the `panel` variant, with its search, folding groups and the collapsed rail.
 *
 * @returns The sidebar.
 */
function PluginSidebar () {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState('whisper')
  const shown = PLUGINS.filter((plugin) => plugin.name.toLowerCase().includes(query.toLowerCase()))
  const groups = [...new Set(shown.map((plugin) => plugin.group))]

  return (
    <Sidebar label='Plugins'>
      <SidebarHeader query={query} onQueryChange={setQuery} />
      <SidebarContent>
        {groups.map((group) => {
          const items = shown.filter((plugin) => plugin.group === group)

          return (
            <SidebarGroup key={group} title={group} count={items.length} forceOpen={query !== ''}>
              {items.map((plugin) => (
                <SidebarItem
                  key={plugin.name}
                  title={plugin.name}
                  meta={plugin.version}
                  hue={plugin.hue}
                  active={plugin.name === active}
                  disabled={plugin.soon}
                  draggable={!plugin.soon}
                  onClick={() => setActive(plugin.name)}
                />
              ))}
            </SidebarGroup>
          )
        })}
        {groups.length === 0 && <p className='m-0 px-1 text-[13px] text-muted-foreground'>No plugin matches.</p>}
      </SidebarContent>
    </Sidebar>
  )
}

const BUILD: [string, ReactNode][] = [['Projects', <FolderKanban key='i' />], ['Studio', <Workflow key='i' />], ['Recipes', <FileText key='i' />], ['Runs', <Play key='i' />], ['Records', <List key='i' />], ['Schedules', <Calendar key='i' />]]
const FAVOURITES = ['Supplier invoices', 'Price list, EU', 'Tender notices']
const FOOT: [string, ReactNode][] = [['Connections', <Link2 key='i' />], ['Members', <Users key='i' />], ['Access', <Shield key='i' />], ['Settings', <Settings key='i' />]]

/**
 * pargic's portal sidebar as the `nav` variant: the brand that toggles, sections of links, favourites, and the foot.
 *
 * @returns The sidebar.
 */
function PortalSidebar ({ collapsible = true }: { collapsible?: boolean }) {
  const [current, setCurrent] = useState('Runs')
  const link = (label: string, icon: ReactNode) => (
    <SidebarItem key={label} asChild title={label} icon={icon} active={label === current} onClick={(event) => { event.preventDefault(); setCurrent(label) }}>
      <a href={`#${label.toLowerCase()}`}>{label}</a>
    </SidebarItem>
  )

  return (
    <Sidebar variant='nav' label='Portal' collapsed={collapsible ? undefined : false} className={collapsible ? undefined : 'w-full'}>
      <SidebarHeader><SidebarBrand product='pargic' badge='Dev' /></SidebarHeader>
      <SidebarContent>
        <SidebarGroup title='Build'>{BUILD.map(([label, icon]) => link(label, icon))}</SidebarGroup>
        <SidebarGroup title='Favourites'>
          {FAVOURITES.map((project) => link(project, <Star />))}
        </SidebarGroup>
        <div className='mt-auto flex flex-col gap-0.5 border-t border-sidebar-border pt-3'>{FOOT.map(([label, icon]) => link(label, icon))}</div>
      </SidebarContent>
      <SidebarFooter>
        <div className='flex items-center gap-2.5 px-1'>
          <Avatar><AvatarFallback>ER</AvatarFallback></Avatar>
          <span className={`flex flex-col leading-tight ${fadingLabelClassName}`}>
            <span className='text-[13px] font-semibold'>Ed R.</span>
            <span className='text-xs text-muted-foreground'>Owner</span>
          </span>
        </div>
        {collapsible && <SidebarCollapseButton />}
        <span className={`px-3 text-xs text-muted-foreground ${fadingLabelClassName}`}>version 0.4.0</span>
      </SidebarFooter>
    </Sidebar>
  )
}

/** The desktop app's plugin sidebar (`panel` variant), in a resizable panel beside a canvas. Collapse it with the chevrons. */
export const DesktopPlugins: Story = {
  globals:    { product: 'loomgic', theme: 'dark' },
  parameters: { density: 'desk' },
  render:     () => (
    <div className='h-[520px] overflow-hidden rounded-lg border'>
      <ResizablePanelGroup orientation='horizontal'>
        <ResizablePanel defaultSize='260px' minSize='48px'>
          <PluginSidebar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <div className='grid h-full place-items-center bg-canvas bg-[radial-gradient(var(--input)_1px,transparent_1px)] bg-size-[18px_18px] text-[13px] text-muted-foreground'>Drag a plugin onto the flow</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}

/** The web platform's sidebar (`nav` variant). The logo and the foot button collapse it to its icons, and the labels fade in place. */
export const WebPlatform: Story = {
  globals:    { product: 'pargic' },
  parameters: { layout: 'fullscreen', density: 'app' },
  render:     () => (
    <div className='flex h-[720px]'>
      <PortalSidebar />
      <main className='flex flex-1 flex-col gap-2 p-6'>
        <h1 className='m-0 text-[22px] font-semibold'>Runs</h1>
        <p className='m-0 text-[13px] text-muted-foreground'>The page beside the sidebar.</p>
      </main>
    </div>
  ),
}

/** Both sidebars on a phone: each opens in a sheet from the side, always expanded. */
export const Mobile: Story = {
  globals:    { product: 'pargic', viewport: { value: 'mobile2', isRotated: false } },
  parameters: { layout: 'fullscreen', density: 'mob' },
  render:     () => (
    <div className='flex h-14 items-center gap-2 border-b px-3'>
      <SidebarSheet label='Portal'><PortalSidebar collapsible={false} /></SidebarSheet>
      <span className='font-semibold'>Runs</span>
      <span className='ms-auto' />
      <SidebarSheet label='Plugins' side='end'>
        <Sidebar label='Plugins' collapsed={false} className='w-full'>
          <SidebarContent>
            <SidebarGroup title='Speech'>
              <SidebarItem title='whisper' meta='speech to text · 1.4' hue='red' active />
              <SidebarItem title='speakers' meta='who spoke when · 0.9' hue='red' />
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarSheet>
    </div>
  ),
}

/** The two variants side by side: the same parts, sized and shaped for each job. */
export const Variants: Story = {
  render: () => (
    <div className='flex h-[560px] gap-6'>
      <div className='w-64 overflow-hidden rounded-lg border'><PluginSidebar /></div>
      <div className='overflow-hidden rounded-lg border'><PortalSidebar /></div>
      <div className='flex gap-2'>
        <div className='overflow-hidden rounded-lg border'>
          <Sidebar label='Plugins' defaultCollapsed>
            <SidebarHeader />
            <SidebarContent>
              <SidebarGroup title='Speech'><SidebarItem title='whisper' hue='red' active /><SidebarItem title='speakers' hue='red' /></SidebarGroup>
              <SidebarGroup title='Vision'><SidebarItem title='OCR' hue='blue' /></SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </div>
        <div className='overflow-hidden rounded-lg border'>
          <Sidebar variant='nav' label='Portal' defaultCollapsed>
            <SidebarHeader><SidebarBrand product='pargic' /></SidebarHeader>
            <SidebarContent>
              <SidebarItem title='Overview' icon={<LayoutGrid />} />
              <SidebarItem title='Runs' icon={<Play />} active />
            </SidebarContent>
            <SidebarFooter><SidebarCollapseButton /></SidebarFooter>
          </Sidebar>
        </div>
      </div>
    </div>
  ),
}
