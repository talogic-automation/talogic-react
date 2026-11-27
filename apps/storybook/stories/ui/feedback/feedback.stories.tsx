import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast } from 'sonner'
import { Button } from '@talogic-automation/react'
import { Alert } from '@talogic-automation/react'
import { EmptyState } from '@talogic-automation/react'
import { Progress } from '@talogic-automation/react'
import { Skeleton } from '@talogic-automation/react'
import { Spinner } from '@talogic-automation/react'
import { Toaster } from '@talogic-automation/react'

const meta = {
  title: 'Primitives/Feedback',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** Alerts in every tone. */
export const Alerts: Story = {
  render: () => (
    <div className='flex max-w-md flex-col gap-3'>
      <Alert title='New source detected'>Two pages changed layout since the last run.</Alert>
      <Alert tone='success' title='Recipe published'>The schedule starts tomorrow at 07:00.</Alert>
      <Alert tone='warning' title='No records'>The run finished, but the page had no rows.</Alert>
      <Alert tone='danger' title='Run failed'>Sign-in page returned 403. Check the connection.</Alert>
    </div>
  ),
}

/** A toast from Sonner, drawn with the tokens. */
export const Toasts: Story = {
  render: () => (
    <>
      <Toaster />
      <Button variant='outline' onClick={() => toast.success('Run 2026-11-27-1 completed', { description: '412 records sent to Azure Blob.' })}>Show a toast</Button>
    </>
  ),
}

/** Progress, skeleton and spinner. Skeletons copy the real layout. */
export const Loading: Story = {
  render: () => (
    <div className='flex max-w-sm flex-col gap-4'>
      <Progress value={64} aria-label='Run progress' />
      <div className='flex items-center gap-3'>
        <Skeleton className='size-9 rounded-full' />
        <div className='flex flex-1 flex-col gap-1.5'><Skeleton className='h-2.5 w-3/4' /><Skeleton className='h-2.5 w-1/2' /></div>
      </div>
      <span className='flex items-center gap-2 text-[13px] text-muted-foreground'><Spinner />Loading records</span>
    </div>
  ),
}

/** An empty state with one action. */
export const Empty: Story = {
  render: () => (
    <EmptyState className='max-w-sm' title='No schedules yet' description='Run a recipe on a timer and send records to your storage.' action={<Button size='sm'>New schedule</Button>} />
  ),
}
