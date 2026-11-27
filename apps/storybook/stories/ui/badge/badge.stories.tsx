import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './badge.component'

const meta = {
  title:     'Primitives/Badge',
  component: Badge,
  args:      { children: 'Live', variant: 'success', dot: true },
  argTypes:  { variant: { control: 'select', options: ['default', 'secondary', 'outline', 'brand', 'success', 'warning', 'danger', 'info'] } },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

/** One badge, driven by the controls. */
export const Playground: Story = {}

/** Every variant. Status badges always carry a word, because accents can share a hue with a status. */
export const Variants: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Badge>Default</Badge>
      <Badge variant='secondary'>Secondary</Badge>
      <Badge variant='outline'>Outline</Badge>
      <Badge variant='brand'>Brand soft</Badge>
      <Badge variant='success' dot>Live</Badge>
      <Badge variant='warning' dot>Draft</Badge>
      <Badge variant='danger' dot>Failed</Badge>
      <Badge variant='info' dot>Queued</Badge>
    </div>
  ),
}
