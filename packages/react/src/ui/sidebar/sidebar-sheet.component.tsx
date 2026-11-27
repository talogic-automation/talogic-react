import { PanelLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '../button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../overlay'

/** Props of {@link SidebarSheet}. */
export interface SidebarSheetProps {
  /** The sidebar's name, for the button and the sheet's title. */
  label:         string
  /** The Sidebar to show. */
  children:      ReactNode
  /** The edge the sheet comes from. Default `start`. */
  side?:         'start' | 'end'
  /** Controls the open state. */
  open?:         boolean
  /** Called with the new open state. */
  onOpenChange?: (open: boolean) => void
  /** Classes for the open button, such as `md:hidden`. */
  className?:    string
}

/**
 * The sidebar on a phone: a button that opens the {@link Sidebar} in a sheet from the side, at the mobile density.
 * Close the sheet when the user picks an item, with `open` and `onOpenChange`.
 *
 * @param props - The label, the sidebar, the side and the open state.
 * @returns The button, and the sheet while it is open.
 */
export function SidebarSheet ({ label, children, side = 'start', open, onOpenChange, className }: SidebarSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' aria-label={`Show ${label.toLowerCase()}`} className={className}><PanelLeft /></Button>
      </SheetTrigger>
      <SheetContent side={side} className='d-mob w-[min(320px,86vw)] gap-0 p-0 [&>[data-slot=sidebar]]:border-0'>
        <SheetTitle className='sr-only'>{label}</SheetTitle>
        {children}
      </SheetContent>
    </Sheet>
  )
}
