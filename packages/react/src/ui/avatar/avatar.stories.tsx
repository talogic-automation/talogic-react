import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, AvatarFallback } from './avatar.component'

const meta = {
  title:     'Primitives/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

/** Initials on brand-soft, and an overlapping stack. */
export const Stack: Story = {
  render: () => (
    <div className='flex'>
      <Avatar className='border-2 border-card'><AvatarFallback>ER</AvatarFallback></Avatar>
      <Avatar className='-ms-2 border-2 border-card'><AvatarFallback className='bg-secondary text-foreground'>MK</AvatarFallback></Avatar>
      <Avatar className='-ms-2 border-2 border-card'><AvatarFallback className='bg-muted text-muted-foreground'>+3</AvatarFallback></Avatar>
    </div>
  ),
}
