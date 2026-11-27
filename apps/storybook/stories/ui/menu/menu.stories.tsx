import type { Meta, StoryObj } from '@storybook/react-vite'
import { Copy, Play, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@talogic-automation/react'
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from '@talogic-automation/react'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from '@talogic-automation/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@talogic-automation/react'

const meta = {
  title: 'Primitives/Menu',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** A row actions menu, with a destructive item. */
export const Dropdown: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant='outline'>Actions</Button></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem><Play />Run now<DropdownMenuShortcut>⌘R</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuItem><Copy />Duplicate<DropdownMenuShortcut>⌘D</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant='destructive'><Trash2 />Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

/** The right-click menu of a flow node. */
export const Context: Story = {
  parameters: { density: 'desk' },
  render:     () => (
    <ContextMenu>
      <ContextMenuTrigger className='grid h-32 w-72 place-items-center rounded-lg border border-dashed text-[13px] text-muted-foreground'>Right-click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem><Play />Run from here</ContextMenuItem>
        <ContextMenuItem><Copy />Duplicate<ContextMenuShortcut>Ctrl D</ContextMenuShortcut></ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant='destructive'><Trash2 />Disable node</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

const COMMANDS = (
  <>
    <CommandInput placeholder='Search recipes, runs and settings' />
    <CommandList>
      <CommandEmpty>No results.</CommandEmpty>
      <CommandGroup heading='Recipes'>
        <CommandItem>Supplier invoices</CommandItem>
        <CommandItem>Price list, EU</CommandItem>
      </CommandGroup>
      <CommandGroup heading='Actions'>
        <CommandItem>New recipe<CommandShortcut>⌘N</CommandShortcut></CommandItem>
        <CommandItem>Run now<CommandShortcut>⌘R</CommandShortcut></CommandItem>
      </CommandGroup>
    </CommandList>
  </>
)

/** The command list inline. */
export const CommandList_: Story = {
  name:   'Command',
  render: () => <Command className='max-w-md border shadow-md'>{COMMANDS}</Command>,
}

/** The ⌘K command palette in a dialog. */
export const CommandPalette: Story = {
  render: function CommandPaletteStory () {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button variant='outline' onClick={() => setOpen(true)}>Open the palette</Button>
        <CommandDialog open={open} onOpenChange={setOpen}>{COMMANDS}</CommandDialog>
      </>
    )
  },
}
