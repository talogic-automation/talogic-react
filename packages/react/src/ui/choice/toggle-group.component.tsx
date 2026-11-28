import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { activeIndicatorClassName, useActiveIndicator } from '../active-indicator'
import { cn } from '../../class-names'

/**
 * The shadcn/ui ToggleGroup, drawn as a segmented control on the muted colour. With `type='single'`, one raised
 * background slides to the pressed segment and takes its width; with `type='multiple'`, each pressed segment lifts.
 *
 * @param props - Radix ToggleGroup root props (`type` is `single` or `multiple`).
 * @returns The group.
 */
export function ToggleGroup ({ className, children, ...props }: ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  const indicator = useActiveIndicator<HTMLDivElement>('[data-state=on]')
  const sliding = props.type === 'single'

  return (
    <ToggleGroupPrimitive.Root
      ref={sliding ? indicator : undefined}
      data-slot='toggle-group'
      data-mode={props.type}
      className={cn('group/indicator relative inline-flex w-fit items-center gap-0.5 rounded-md bg-muted p-[3px]', className)}
      {...props}
    >
      {sliding && <span aria-hidden='true' data-slot='toggle-group-indicator' className={cn(activeIndicatorClassName, 'rounded-sm bg-background shadow-xs')} />}
      {children}
    </ToggleGroupPrimitive.Root>
  )
}

/**
 * One segment of a {@link ToggleGroup}. The pressed segment sits on the raised background.
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
        'relative transition-colors duration-150 data-[state=on]:text-foreground motion-reduce:transition-none',
        'in-data-[mode=multiple]:data-[state=on]:bg-background in-data-[mode=multiple]:data-[state=on]:shadow-xs',
        className,
      )}
      {...props}
    />
  )
}
