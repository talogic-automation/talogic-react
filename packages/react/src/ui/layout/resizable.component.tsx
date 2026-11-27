import type { ComponentProps } from 'react'
import { Group, Panel, Separator } from 'react-resizable-panels'
import { cn } from '../../class-names'

/**
 * The shadcn/ui Resizable group: panels the user can resize, for desktop sidebars and inspectors.
 *
 * @param props - react-resizable-panels Group props (`orientation`).
 * @returns The panel group.
 */
export function ResizablePanelGroup ({ className, ...props }: ComponentProps<typeof Group>) {
  return <Group data-slot='resizable-panel-group' className={cn('flex size-full', className)} {...props} />
}

/**
 * One panel of a {@link ResizablePanelGroup}.
 *
 * @param props - react-resizable-panels Panel props (`defaultSize`, `minSize`).
 * @returns The panel.
 */
export function ResizablePanel (props: ComponentProps<typeof Panel>) {
  return <Panel data-slot='resizable-panel' {...props} />
}

/**
 * The drag handle between two panels: a 1 px border line with a wider hit area.
 *
 * @param props - react-resizable-panels Separator props.
 * @returns The handle.
 */
export function ResizableHandle ({ className, ...props }: ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot='resizable-handle'
      className={cn(
        'relative flex w-px shrink-0 items-center justify-center bg-border outline-none after:absolute after:inset-y-0 after:start-1/2 after:w-2 after:-translate-x-1/2',
        'hover:bg-ring focus-visible:bg-ring aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full',
        className,
      )}
      {...props}
    />
  )
}
