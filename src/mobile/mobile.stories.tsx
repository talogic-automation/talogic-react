import type { Meta, StoryObj } from '@storybook/react-vite'
import { Clock, House, ListTodo, Settings2 } from 'lucide-react'
import { type ReactNode, useState } from 'react'
import { ProductLogo } from '../product'
import { ThemeRoot } from '../tokens'
import { Avatar, AvatarFallback, Badge, Button, Checkbox, Label } from '../ui'
import { BottomNav, type BottomNavItem } from './bottom-nav.component'
import { CaptureFrame } from './capture-frame.component'
import { RecordButton, type RecordingState } from './record-button.component'

const meta = {
  title:      'Mobile/Patterns',
  parameters: { density: 'mob' },
  globals:    { product: 'daygic' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const TABS: BottomNavItem[] = [
  { label: 'Today', href: '#today', icon: <House />, current: true },
  { label: 'Timeline', href: '#timeline', icon: <Clock /> },
  { label: 'To-dos', href: '#todos', icon: <ListTodo /> },
  { label: 'Settings', href: '#settings', icon: <Settings2 /> },
]

const LEVELS = [0.4, 0.7, 0.3, 0.9, 0.5, 0.8, 0.2, 0.6, 1, 0.4, 0.7, 0.5, 0.3, 0.8, 0.6, 0.9, 0.4, 0.2, 0.7, 0.5, 0.8, 0.3, 0.6, 0.9, 0.4, 0.5, 0.7, 0.2, 0.6, 0.8]

/**
 * A 390 by 844 phone frame for the stories.
 *
 * @param props - The screen content.
 * @returns The frame.
 */
function Phone ({ children }: { children: ReactNode }) {
  return <div className='mx-auto flex h-[844px] w-[390px] flex-col overflow-hidden rounded-[44px] border bg-background text-base shadow-lg'>{children}</div>
}

/** The tab bar. */
export const Tabs: Story = { render: () => <div className='w-[390px]'><BottomNav items={TABS} /></div> }

/** The recording card, in each state. */
export const Recording: Story = {
  render: function RecordingStory () {
    const [state, setState] = useState<RecordingState>('recording')

    return (
      <div className='w-[358px]'>
        <RecordButton state={state} elapsed={13_338} levels={LEVELS} onStart={() => setState('recording')} onPause={() => setState('paused')} onResume={() => setState('recording')} onMarker={() => {}} />
      </div>
    )
  },
}

/** daygic: the Today screen. */
export const DaygicToday: Story = {
  parameters: { layout: 'centered' },
  render:     function TodayStory () {
    const [state, setState] = useState<RecordingState>('recording')

    return (
      <Phone>
        <div className='flex items-center gap-3 px-5 pt-14 pb-3'>
          <div className='flex flex-col'><span className='text-[13px] text-muted-foreground'>Thursday, 27 November</span><span className='type-display text-[32px]'>Today</span></div>
          <Avatar className='ms-auto size-10'><AvatarFallback>ER</AvatarFallback></Avatar>
        </div>
        <div className='flex flex-1 flex-col gap-3.5 overflow-hidden px-4 py-1'>
          <RecordButton state={state} elapsed={13_338} levels={LEVELS} onStart={() => setState('recording')} onPause={() => setState('paused')} onResume={() => setState('recording')} onMarker={() => {}} />
          <div className='flex flex-col gap-2'>
            <h2 className='m-0 type-h4'>So far today</h2>
            <p className='m-0 text-[13px] text-muted-foreground'>Standup with the data team, a call with Northwind about late invoices, and lunch notes on the Lisbon trip.</p>
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center justify-between'><h2 className='m-0 type-h4'>To-dos</h2><Badge variant='brand'>3 new</Badge></div>
            {[['Send field list to Mira', 'From standup · due Friday', false], ['Ask Northwind for missing totals', 'From call at 11:10', false], ['Book Lisbon hotel', 'From lunch', true]].map(([title, meta, done]) => (
              <Label key={String(title)} className='min-h-13 gap-3 border-b text-[15px] font-normal'>
                <Checkbox defaultChecked={Boolean(done)} className='size-5' />
                <span className='flex flex-col gap-0.5'><span>{title}</span><span className='text-xs text-muted-foreground'>{meta}</span></span>
              </Label>
            ))}
          </div>
        </div>
        <BottomNav items={TABS} />
      </Phone>
    )
  },
}

/** ingic: capturing a returned page and checking it. */
export const IngicCapture: Story = {
  parameters: { layout: 'centered' },
  render:     () => (
    <ThemeRoot product='ingic'>
      <Phone>
        <CaptureFrame
          title='Contract 0417 · page 2 of 3'
          checksTitle={<span className='flex items-center gap-2.5'><ProductLogo product='ingic' alt='' />Page 2 checks</span>}
          checks={[
            { label: 'Page aligned to the original', detail: '0.4° skew', passed: true },
            { label: 'Printed text unchanged', detail: '412 words', passed: true },
            { label: 'Date field filled', detail: '2026-11-25', passed: true },
            { label: 'Signature present', detail: 'Missing', passed: false },
          ]}
          onClose={() => {}}
          actions={<><Button variant='outline'>Retake</Button><Button>Send back for signature</Button></>}
        >
          <div aria-hidden='true' className='relative mt-10 h-[290px] w-[220px] -rotate-3 rounded-sm bg-[#e9e7ee] shadow-[0_12px_30px_rgb(0_0_0/0.5)]'>
            <span className='absolute start-[18px] end-[30px] top-[26px] h-2 rounded-[2px] bg-[#c9c6d1]' />
            <span className='absolute start-[18px] end-[60px] top-[44px] h-2 rounded-[2px] bg-[#c9c6d1]' />
            <span className='absolute bottom-[26px] start-3.5 h-[22px] w-[92px] rounded-sm border-2 border-dashed border-red-500' />
          </div>
        </CaptureFrame>
      </Phone>
    </ThemeRoot>
  ),
}
