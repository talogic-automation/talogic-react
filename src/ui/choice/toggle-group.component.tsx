import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'

/**
 * The shadcn/ui ToggleGroup, drawn as a segmented control on the muted colour.
 *
 * @param props - Radix ToggleGroup root props (`type` is `single` or `multiple`).
 * @returns The group.
 */
export function ToggleGroup ({ className, ...props }: ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return <ToggleGroupPrimitive.Root data-slot='toggle-group' className={cn('inline-flex w-fit items-center gap-0.5 rounded-md bg-muted p-[3px]', className)} {...props} />
}

/**
 * One segment of a {@link ToggleGroup}. The pressed segment lifts onto the background colour.
 *
 * @param props - Radix ToggleGroup item props.
 * @returns The segment.
 */
export function ToggleGroupItem ({ className, ...props }: ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot='toggle-group-item'
      className={cn(
        'inline-flex h-[calc(var(--control-h)-6px)] cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-sm px-3 text-[13px] font-medium text-muted-foreground outline-none',
        'hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 [&_svg]:size-4',
        'data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-xs',
        className,
      )}
      {...props}
    />
  )
}
