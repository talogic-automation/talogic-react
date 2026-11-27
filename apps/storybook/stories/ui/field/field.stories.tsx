import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search } from 'lucide-react'
import { Field } from '@talogic-automation/react'
import { Input } from '@talogic-automation/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@talogic-automation/react'
import { Textarea } from '@talogic-automation/react'

const meta = {
  title:     'Primitives/Field',
  component: Field,
  args:      { label: 'Start URL', hint: 'Pargic opens this page first.', error: '', children: null },
  render:    (args) => <div className='max-w-sm'><Field {...args}><Input defaultValue='https://supplier.example/invoices' /></Field></div>,
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

/** A field with a hint. Set an error in the controls to see the invalid state. */
export const Playground: Story = {}

/** Input, textarea, select and a search input, with hint and error states. */
export const Controls: Story = {
  render: () => (
    <div className='grid max-w-2xl grid-cols-2 gap-4'>
      <Field label='API key name' error='Use letters, digits and dashes only.'><Input defaultValue='prod key' /></Field>
      <Field label='Search'><Input placeholder='Find' startIcon={<Search />} /></Field>
      <Field label='Format'>
        <Select defaultValue='csv'>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value='csv'>CSV</SelectItem>
            <SelectItem value='json'>JSON Lines</SelectItem>
            <SelectItem value='parquet'>Parquet</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label='Disabled'><Input disabled defaultValue='Read only' /></Field>
      <Field label='Notes' hint='Shown to the team on every run.' className='col-span-2'><Textarea placeholder='What this recipe collects' /></Field>
    </div>
  ),
}
