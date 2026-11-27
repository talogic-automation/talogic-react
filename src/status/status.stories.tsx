import type { Meta, StoryObj } from '@storybook/react-vite'
import { RUN_STATUSES } from './run-status.contract'
import { StatusBadge } from './status-badge.component'

const meta = {
  title:     'Shared/Status',
  component: StatusBadge,
  args:      { status: 'completed' },
  argTypes:  { status: { control: 'select', options: RUN_STATUSES } },
} satisfies Meta<typeof StatusBadge>

export default meta
type Story = StoryObj<typeof meta>

/** One status, driven by the controls. */
export const Playground: Story = {}

/** Every status, with the same word and colour in every product. */
export const AllStatuses: Story = {
  render: () => <div className='flex flex-wrap gap-2'>{RUN_STATUSES.map((status) => <StatusBadge key={status} status={status} />)}</div>,
}
