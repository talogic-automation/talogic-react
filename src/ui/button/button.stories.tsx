import type { Meta, StoryObj } from '@storybook/react-vite'
import { Play, Plus } from 'lucide-react'
import { Button } from './button.component'

const meta = {
  title:     'Primitives/Button',
  component: Button,
  args:      { children: 'Run now', variant: 'default', size: 'default', loading: false, disabled: false },
  argTypes:  {
    variant: { control: 'select', options: ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] },
    size:    { control: 'select', options: ['default', 'sm', 'lg', 'icon', 'icon-sm'] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/** One button, driven by the controls. */
export const Playground: Story = {}

/** Every variant. One primary per view. */
export const Variants: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-2'>
      <Button>Primary</Button>
      <Button variant='secondary'>Secondary</Button>
      <Button variant='outline'>Outline</Button>
      <Button variant='ghost'>Ghost</Button>
      <Button variant='destructive'>Delete</Button>
      <Button variant='link'>Link</Button>
    </div>
  ),
}

/** Sizes, an icon button, disabled, and loading (the label stays). */
export const SizesAndStates: Story = {
  render: () => (
    <div className='flex flex-wrap items-center gap-2'>
      <Button size='sm'>Small</Button>
      <Button size='lg'>Large</Button>
      <Button size='icon' variant='outline' aria-label='Add'><Plus /></Button>
      <Button><Play />Run flow</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Running sample</Button>
    </div>
  ),
}
