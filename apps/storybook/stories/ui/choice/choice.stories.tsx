import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from '@talogic-automation/react'
import { Checkbox } from '@talogic-automation/react'
import { RadioGroup, RadioGroupItem } from '@talogic-automation/react'
import { Slider } from '@talogic-automation/react'
import { Switch } from '@talogic-automation/react'
import { ToggleGroup, ToggleGroupItem } from '@talogic-automation/react'

const meta = {
  title: 'Primitives/Choice',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** Checkbox, including the indeterminate state of a partial selection. */
export const Checkboxes: Story = {
  render: () => (
    <div className='flex flex-col gap-2.5'>
      <Label><Checkbox defaultChecked />Skip pages with no records</Label>
      <Label><Checkbox />Keep raw HTML</Label>
      <Label><Checkbox checked='indeterminate' />Select all</Label>
      <Label><Checkbox disabled />Disabled</Label>
    </div>
  ),
}

/** A radio group of schedules. */
export const Radios: Story = {
  render: () => (
    <RadioGroup defaultValue='daily' className='flex gap-5' aria-label='Schedule'>
      {['daily', 'weekly', 'manual'].map((value) => <Label key={value}><RadioGroupItem value={value} />{value[0]?.toUpperCase() + value.slice(1)}</Label>)}
    </RadioGroup>
  ),
}

/** Switches in a settings row. */
export const Switches: Story = {
  render: () => (
    <div className='flex max-w-xs flex-col gap-3'>
      <Label className='justify-between'>Notify on failure<Switch defaultChecked /></Label>
      <Label className='justify-between'>Run on device only<Switch /></Label>
    </div>
  ),
}

/** A slider with a label. */
export const Sliders: Story = {
  render: () => (
    <div className='flex max-w-xs flex-col gap-2'>
      <Label>Match threshold</Label>
      <Slider defaultValue={[85]} aria-label='Match threshold' />
    </div>
  ),
}

/** A segmented toggle group. */
export const Toggles: Story = {
  render: () => (
    <ToggleGroup type='single' defaultValue='all' aria-label='Run kind'>
      <ToggleGroupItem value='all'>All</ToggleGroupItem>
      <ToggleGroupItem value='scheduled'>Scheduled</ToggleGroupItem>
      <ToggleGroupItem value='manual'>Manual</ToggleGroupItem>
    </ToggleGroup>
  ),
}
