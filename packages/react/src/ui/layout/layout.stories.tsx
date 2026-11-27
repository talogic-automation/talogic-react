import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion.component'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './card.component'
import { Kbd } from './kbd.component'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable.component'
import { ScrollArea } from './scroll-area.component'
import { Separator } from './separator.component'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table.component'

const meta = {
  title: 'Primitives/Layout',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** A card with header, content and footer. */
export const Cards: Story = {
  render: () => (
    <Card className='max-w-xs'>
      <CardHeader><CardTitle>Records this week</CardTitle></CardHeader>
      <CardContent className='flex flex-col gap-1'>
        <span className='text-3xl font-semibold tracking-tight tabular-nums'>12,480</span>
        <span className='text-xs text-success'>+8.2% vs last week</span>
      </CardContent>
      <CardFooter><span className='text-xs text-muted-foreground'>Updated 2 min ago</span><a href='/records' className='text-[13px] font-medium text-brand-text no-underline'>Open</a></CardFooter>
    </Card>
  ),
}

/** A table of runs. */
export const Tables: Story = {
  render: () => (
    <Table>
      <TableHeader><TableRow><TableHead>Run</TableHead><TableHead>Recipe</TableHead><TableHead className='text-end'>Records</TableHead></TableRow></TableHeader>
      <TableBody>
        <TableRow><TableCell className='font-mono text-xs'>2026-11-27-1</TableCell><TableCell>Supplier invoices</TableCell><TableCell className='text-end tabular-nums'>412</TableCell></TableRow>
        <TableRow data-state='selected'><TableCell className='font-mono text-xs'>2026-11-26-1</TableCell><TableCell>Price list, EU</TableCell><TableCell className='text-end tabular-nums'>1,204</TableCell></TableRow>
      </TableBody>
    </Table>
  ),
}

/** An FAQ accordion. */
export const Accordions: Story = {
  render: () => (
    <Accordion type='single' collapsible defaultValue='data' className='max-w-md'>
      <AccordionItem value='data'><AccordionTrigger>Where does my data live?</AccordionTrigger><AccordionContent>In your own storage. Talogic products write to your bucket or database.</AccordionContent></AccordionItem>
      <AccordionItem value='onprem'><AccordionTrigger>Can I run it on-premises?</AccordionTrigger><AccordionContent>Yes. Every engine runs in Docker.</AccordionContent></AccordionItem>
    </Accordion>
  ),
}

/** Resizable panels and a scroll area, as in a desktop window. */
export const Panels: Story = {
  parameters: { density: 'desk' },
  render:     () => (
    <div className='h-64 overflow-hidden rounded-lg border'>
      <ResizablePanelGroup orientation='horizontal'>
        <ResizablePanel defaultSize='30%' minSize='20%'>
          <ScrollArea className='h-full'>
            <div className='flex flex-col gap-1 p-2.5 text-[13px]'>{Array.from({ length: 20 }, (_, index) => <span key={index}>Plugin {index + 1}</span>)}</div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel><div className='grid h-full place-items-center bg-canvas text-[13px] text-muted-foreground'>Canvas</div></ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}

/** Separators and keys. */
export const SeparatorsAndKeys: Story = {
  render: () => (
    <div className='flex max-w-sm flex-col gap-3'>
      <span className='flex items-center gap-1.5 text-[13px] text-muted-foreground'>Search anything <Kbd>⌘</Kbd><Kbd>K</Kbd></span>
      <Separator />
      <div className='flex h-5 items-center gap-3 text-[13px]'>Engine ready<Separator orientation='vertical' />GPU · CUDA 12</div>
    </div>
  ),
}
