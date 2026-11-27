import { Tabs as TabsPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'

/**
 * The shadcn/ui Tabs root.
 *
 * @param props - Radix Tabs root props.
 * @returns The tabs.
 */
export function Tabs ({ className, ...props }: ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot='tabs' className={cn('flex flex-col gap-3', className)} {...props} />
}

/** Props of {@link TabsList}. */
export interface TabsListProps extends ComponentProps<typeof TabsPrimitive.List> {
  /**
   * `pill` switches views inside a panel. `underline` switches pages in a header, with a brand line under the
   * active tab.
   */
  variant?: 'pill' | 'underline'
}

/**
 * The row of {@link TabsTrigger}s.
 *
 * @param props - `variant` and Radix Tabs list props.
 * @returns The tab list.
 */
export function TabsList ({ className, variant = 'pill', ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot='tabs-list'
      data-variant={variant}
      className={cn(
        'group/tabs-list inline-flex w-fit items-center',
        variant === 'pill' ? 'gap-0.5 rounded-md bg-muted p-[3px]' : 'w-full gap-5 border-b',
        className,
      )}
      {...props}
    />
  )
}

/**
 * One tab. It reads the list's variant, so it has no variant of its own.
 *
 * @param props - Radix Tabs trigger props.
 * @returns The tab.
 */
export function TabsTrigger ({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot='tabs-trigger'
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap font-medium text-muted-foreground outline-none',
        'hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4',
        'group-data-[variant=pill]/tabs-list:h-[calc(var(--control-h)-6px)] group-data-[variant=pill]/tabs-list:rounded-sm group-data-[variant=pill]/tabs-list:px-3 group-data-[variant=pill]/tabs-list:text-[13px]',
        'group-data-[variant=pill]/tabs-list:data-[state=active]:bg-background group-data-[variant=pill]/tabs-list:data-[state=active]:text-foreground group-data-[variant=pill]/tabs-list:data-[state=active]:shadow-xs',
        'group-data-[variant=underline]/tabs-list:-mb-px group-data-[variant=underline]/tabs-list:border-b-2 group-data-[variant=underline]/tabs-list:border-transparent group-data-[variant=underline]/tabs-list:py-2.5 group-data-[variant=underline]/tabs-list:text-sm',
        'group-data-[variant=underline]/tabs-list:data-[state=active]:border-brand group-data-[variant=underline]/tabs-list:data-[state=active]:text-foreground',
        className,
      )}
      {...props}
    />
  )
}

/**
 * The panel of one tab.
 *
 * @param props - Radix Tabs content props.
 * @returns The panel.
 */
export function TabsContent ({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot='tabs-content' className={cn('flex-1 outline-none', className)} {...props} />
}
