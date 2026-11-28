import { X } from 'lucide-react'
import { Dialog as SheetPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'
import { overlayClassName, sheetMotionClassName } from './overlay.recipe'

/** The shadcn/ui Sheet root: a dialog that slides in from an edge. */
export const Sheet = SheetPrimitive.Root

/** The element that opens a {@link Sheet}. */
export const SheetTrigger = SheetPrimitive.Trigger

/** An element that closes a {@link Sheet}. */
export const SheetClose = SheetPrimitive.Close

/** The title of a {@link Sheet}. */
export const SheetTitle = SheetPrimitive.Title

/** The description of a {@link Sheet}. */
export const SheetDescription = SheetPrimitive.Description

const sideClassName = {
  start:  'inset-y-0 start-0 h-full w-3/4 max-w-sm border-e',
  end:    'inset-y-0 end-0 h-full w-3/4 max-w-sm border-s',
  top:    'inset-x-0 top-0 border-b',
  bottom: 'inset-x-0 bottom-0 border-t',
} as const

/** Props of {@link SheetContent}. */
export interface SheetContentProps extends ComponentProps<typeof SheetPrimitive.Content> {
  /** The edge the sheet comes from. Default `end`. */
  side?: keyof typeof sideClassName
}

/**
 * The panel of a {@link Sheet}, against one edge, with a close button.
 *
 * @param props - `side` and Radix Dialog content props.
 * @returns The panel in a portal.
 */
export function SheetContent ({ className, children, side = 'end', ...props }: SheetContentProps) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className={overlayClassName} />
      <SheetPrimitive.Content
        data-slot='sheet-content'
        className={cn('fixed z-50 flex flex-col gap-4 bg-popover p-6 text-popover-foreground shadow-lg outline-none', sideClassName[side], sheetMotionClassName[side], className)}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className='absolute end-4 top-4 cursor-pointer rounded-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring'>
          <X className='size-4' aria-hidden='true' />
          <span className='sr-only'>Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  )
}
