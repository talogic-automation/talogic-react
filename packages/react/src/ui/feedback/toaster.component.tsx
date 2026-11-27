import type { ComponentProps } from 'react'
import { Toaster as Sonner } from 'sonner'

/**
 * The shadcn/ui Toaster (Sonner), drawn with the Talogic tokens: popover colours, large elevation, 10 px radius.
 * Mount one per app, then call `toast()` from `sonner`.
 *
 * @param props - Sonner Toaster props.
 * @returns The toast region.
 */
export function Toaster (props: ComponentProps<typeof Sonner>) {
  return (
    <Sonner
      className='toaster group'
      toastOptions={{
        classNames: {
          toast:       'group flex w-[360px] items-start gap-3 rounded-lg border bg-popover px-4 py-3.5 font-sans text-popover-foreground shadow-lg',
          title:       'text-[15px] font-semibold',
          description: 'text-[13px] text-muted-foreground',
          success:     '[&_[data-icon]]:text-success',
          error:       '[&_[data-icon]]:text-destructive',
          info:        '[&_[data-icon]]:text-info',
          warning:     '[&_[data-icon]]:text-warning',
        },
      }}
      {...props}
    />
  )
}
