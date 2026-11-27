import type { Meta, StoryObj } from '@storybook/react-vite'
import { Copy } from 'lucide-react'
import { Button } from '@talogic-automation/react'
import { Field, Input } from '@talogic-automation/react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@talogic-automation/react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@talogic-automation/react'
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from '@talogic-automation/react'
import { Popover, PopoverContent, PopoverTrigger } from '@talogic-automation/react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@talogic-automation/react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@talogic-automation/react'

const meta = {
  title: 'Primitives/Overlay',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** A form in a dialog. */
export const FormDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild><Button>New schedule</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New schedule</DialogTitle>
          <DialogDescription>Run a recipe on a timer and send records to your storage.</DialogDescription>
        </DialogHeader>
        <Field label='Name'><Input defaultValue='Supplier invoices, daily' /></Field>
        <DialogFooter>
          <DialogClose asChild><Button variant='outline'>Cancel</Button></DialogClose>
          <Button>Create schedule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/** A delete confirmation. Cancel gets focus first. */
export const DeleteConfirmation: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild><Button variant='destructive'>Delete recipe</Button></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Delete this recipe?</AlertDialogTitle>
        <AlertDialogDescription>Its runs and records stay. You cannot undo this.</AlertDialogDescription>
        <div className='flex justify-end gap-2'>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant='destructive'>Delete</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  ),
}

/** A sheet from the end edge. */
export const SideSheet: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant='outline'>Run details</Button></SheetTrigger>
      <SheetContent>
        <SheetTitle className='m-0 type-h3'>Run 2026-11-27-1</SheetTitle>
        <SheetDescription className='m-0 text-[13px] text-muted-foreground'>412 records sent to Azure Blob in 1m 38s.</SheetDescription>
      </SheetContent>
    </Sheet>
  ),
}

/** The mobile bottom sheet. */
export const BottomSheet: Story = {
  parameters: { density: 'mob' },
  render:     () => (
    <Drawer>
      <DrawerTrigger asChild><Button>Standup details</Button></DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Standup with the data team</DrawerTitle>
        <DrawerDescription>Mira will move the invoice job to Mondays. You agreed to send the new field list by Friday.</DrawerDescription>
        <Button>Add 1 to-do</Button>
        <Button variant='secondary'>Play from 09:41</Button>
      </DrawerContent>
    </Drawer>
  ),
}

/** A popover and a tooltip. */
export const PopoverAndTooltip: Story = {
  render: () => (
    <div className='flex gap-4'>
      <Popover>
        <PopoverTrigger asChild><Button variant='outline'>Last 7 days</Button></PopoverTrigger>
        <PopoverContent><p className='m-0 text-[13px]'>Pick a range for the runs table.</p></PopoverContent>
      </Popover>
      <Tooltip>
        <TooltipTrigger asChild><Button variant='outline' size='icon-sm' aria-label='Copy record id'><Copy /></Button></TooltipTrigger>
        <TooltipContent>Copy record id</TooltipContent>
      </Tooltip>
    </div>
  ),
}
