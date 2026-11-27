import type { Meta, StoryObj } from '@storybook/react-vite'
import { Play, Search } from 'lucide-react'
import { useState } from 'react'
import {
  Button,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  Field,
  Input,
  Kbd,
  Label,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
  Progress,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
  Switch,
} from '../ui'
import { FlowNode } from './flow-node.component'
import { Inspector } from './inspector.component'
import { StatusBar } from './status-bar.component'
import { type TimelineLane, TimelineLanes } from './timeline-lanes.component'
import { TitleBar } from './title-bar.component'

const meta = {
  title:      'Desktop/Patterns',
  parameters: { density: 'desk' },
  globals:    { product: 'loomgic', theme: 'dark' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const MENUS = (
  <>
    <MenubarMenu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>Open media<MenubarShortcut>Ctrl O</MenubarShortcut></MenubarItem>
        <MenubarItem>Save flow<MenubarShortcut>Ctrl S</MenubarShortcut></MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    {['Edit', 'View', 'Flow', 'Help'].map((menu) => (
      <MenubarMenu key={menu}><MenubarTrigger>{menu}</MenubarTrigger><MenubarContent><MenubarItem>{menu} item</MenubarItem></MenubarContent></MenubarMenu>
    ))}
  </>
)

const LANES: TimelineLane[] = [
  { name: 'Speech', hue: 'red', segments: [{ start: 8, end: 126, label: 'Ed' }, { start: 135, end: 320, label: 'Mira' }, { start: 337, end: 488, label: 'João' }, { start: 505, end: 572, label: 'transcribing', faint: true }] },
  { name: 'Speakers', hue: 'green', segments: [{ start: 8, end: 92, label: '3 voices' }, { start: 101, end: 270, label: '2 voices', faint: true }, { start: 278, end: 463, label: '3 voices' }] },
  { name: 'Objects', hue: 'blue', segments: [{ start: 42, end: 92, label: 'slide' }, { start: 252, end: 286, label: 'chart' }, { start: 370, end: 446, label: 'whiteboard' }, { start: 589, end: 631, label: 'slide', faint: true }] },
]

const INSPECTOR = (
  <Inspector
    title='whisper'
    subtitle='v1.4 · speech to text'
    hue='red'
    tabs={[
      {
        value:   'settings',
        label:   'Settings',
        content: (
          <>
            <Field label='Model'>
              <Select defaultValue='large'><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value='large'>large-v3 · GPU</SelectItem><SelectItem value='small'>small · CPU</SelectItem></SelectContent></Select>
            </Field>
            <Field label='Language'>
              <Select defaultValue='detect'><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value='detect'>Detect</SelectItem><SelectItem value='en'>English</SelectItem><SelectItem value='pt'>Portuguese</SelectItem></SelectContent></Select>
            </Field>
            <div className='flex flex-col gap-1.5'><Label>No-speech threshold · 0.60</Label><Slider defaultValue={[60]} aria-label='No-speech threshold' /></div>
            <Label className='justify-between'>Word timestamps<Switch defaultChecked /></Label>
            <Label className='justify-between'>Keep audio chunks<Switch /></Label>
          </>
        ),
      },
      { value: 'output', label: 'Output', content: <span className='text-muted-foreground'>Transcript with word timings.</span> },
      { value: 'logs', label: 'Logs', content: <span className='font-mono text-xs'>08:12.4 chunk 41 of 71</span> },
    ]}
    footer={<div className='flex flex-col gap-1.5'><div className='flex justify-between text-xs'><span>Transcribing</span><span className='tabular-nums text-muted-foreground'>08:12 / 14:03</span></div><Progress value={58} aria-label='Transcribing' /></div>}
  />
)

const STATUS = (
  <StatusBar
    start={<><span className='flex items-center gap-1.5 text-success'><span className='size-1.5 rounded-full bg-current' />Engine ready</span><span>GPU · CUDA 12</span><span>3 plugins running</span></>}
    end={<><span className='tabular-nums'>Playhead 08:12.4</span><span>Local only</span></>}
  />
)

/** The title bar with menus and window controls. */
export const Title: Story = { render: () => <TitleBar product='loomgic' menus={MENUS} title='standup-2026-11-24.mp4 · Flow: Meeting notes' onMinimise={() => {}} onMaximise={() => {}} onClose={() => {}} /> }

/** The inspector of the selected plugin. */
export const InspectorPanel: Story = { render: () => <div className='h-[420px] w-[300px] rounded-lg border'>{INSPECTOR}</div> }

/** Flow nodes, with the right-click menu on one. */
export const Nodes: Story = {
  render: function NodesStory () {
    const [selected, setSelected] = useState('whisper')

    return (
      <div className='flex flex-wrap gap-4 rounded-lg bg-canvas bg-[radial-gradient(var(--input)_1px,transparent_1px)] bg-size-[18px_18px] p-6'>
        <FlowNode title='standup.mp4' description='14:03 · 1080p · 2 audio tracks' status='completed' selected={selected === 'input'} onSelect={() => setSelected('input')} />
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div><FlowNode title='whisper' hue='red' description='Speech to text, word timestamps' status='running' selected={selected === 'whisper'} onSelect={() => setSelected('whisper')} /></div>
          </ContextMenuTrigger>
          <ContextMenuContent><ContextMenuItem>Run from here</ContextMenuItem><ContextMenuItem>Duplicate</ContextMenuItem><ContextMenuItem variant='destructive'>Disable node</ContextMenuItem></ContextMenuContent>
        </ContextMenu>
        <FlowNode title='speakers' hue='green' description='Who spoke when, 4 voices max' status='waiting' selected={selected === 'speakers'} onSelect={() => setSelected('speakers')} />
        <FlowNode title='OCR' hue='blue' description='Text on shared slides' status='off' selected={selected === 'ocr'} onSelect={() => setSelected('ocr')} />
      </div>
    )
  },
}

/** Timeline lanes with a playhead. */
export const Timeline: Story = { render: () => <TimelineLanes duration={840} playhead={492} lanes={LANES} className='rounded-lg border' /> }

/** The status bar. */
export const Status: Story = { render: () => STATUS }

/** The whole desktop window of loomgic studio. */
export const StudioWindow: Story = {
  parameters: { layout: 'fullscreen' },
  render:     () => (
    <div className='bg-canvas p-10'>
      <div className='flex h-[820px] flex-col overflow-hidden rounded-lg border bg-background text-[13px] shadow-lg'>
        <TitleBar product='loomgic' menus={MENUS} title='standup-2026-11-24.mp4 · Flow: Meeting notes' onMinimise={() => {}} onMaximise={() => {}} onClose={() => {}} />
        <div className='flex h-[42px] shrink-0 items-center gap-2 border-b px-2.5'>
          <Button><Play />Run flow</Button>
          <Button variant='outline'>Stop</Button>
          <Button variant='outline' className='ms-auto w-64 justify-start font-normal text-muted-foreground'><Search />Search plugins and actions<Kbd className='ms-auto'>Ctrl K</Kbd></Button>
        </div>
        <ResizablePanelGroup orientation='horizontal' className='min-h-0 flex-1'>
          <ResizablePanel defaultSize='230px' minSize='180px' className='bg-sidebar'>
            <div className='flex flex-col gap-2.5 p-2.5'>
              <Input placeholder='Filter plugins' aria-label='Filter plugins' />
              {['whisper', 'speakers', 'narrator', 'face-emotion', 'OCR', 'objects'].map((plugin) => <span key={plugin} className='flex h-7 items-center rounded-sm px-2 hover:bg-accent'>{plugin}</span>)}
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <div className='flex h-full flex-wrap content-start gap-4 bg-canvas bg-[radial-gradient(var(--input)_1px,transparent_1px)] bg-size-[18px_18px] p-6'>
              <FlowNode title='standup.mp4' description='14:03 · 1080p · 2 audio tracks' status='completed' />
              <FlowNode title='whisper' hue='red' description='Speech to text, word timestamps' status='running' selected />
              <FlowNode title='speakers' hue='green' description='Who spoke when, 4 voices max' status='waiting' />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize='300px' minSize='240px'>{INSPECTOR}</ResizablePanel>
        </ResizablePanelGroup>
        <TimelineLanes duration={840} playhead={492} lanes={LANES} className='border-t' />
        {STATUS}
      </div>
    </div>
  ),
}
