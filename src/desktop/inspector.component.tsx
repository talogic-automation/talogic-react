import type { ReactNode } from 'react'
import { cn } from '../class-names'
import { HUE_FILL, type Hue } from '../tokens'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui'

/** One tab of an {@link Inspector}. */
export interface InspectorTab {
  value:   string
  label:   string
  content: ReactNode
}

/** Props of {@link Inspector}. */
export interface InspectorProps {
  /** The selected item, such as a plugin. */
  title:      ReactNode
  /** One line beside the title, such as the version and what it does. */
  subtitle?:  ReactNode
  /** The family hue of the item's dot. */
  hue?:       Hue
  tabs:       readonly InspectorTab[]
  /** A panel pinned to the bottom, such as the progress of the running item. */
  footer?:    ReactNode
  className?: string
}

/**
 * The Inspector pattern of a desktop app: the selected item's header, underline tabs, and its settings.
 * Put it in a ResizablePanel so the user can widen it.
 *
 * @param props - Title, subtitle, hue, tabs and footer.
 * @returns The inspector.
 */
export function Inspector ({ title, subtitle, hue, tabs, footer, className }: InspectorProps) {
  return (
    <aside data-slot='inspector' aria-label='Inspector' className={cn('flex h-full flex-col text-[13px]', className)}>
      <div className='flex items-center gap-2 border-b p-3'>
        {hue && <span aria-hidden='true' className={cn('size-2.5 shrink-0 rounded-[3px]', HUE_FILL[hue])} />}
        <h2 className='m-0 type-h4'>{title}</h2>
        {subtitle && <span className='truncate text-xs text-muted-foreground'>{subtitle}</span>}
      </div>
      <Tabs defaultValue={tabs[0]?.value} className='min-h-0 flex-1 gap-0'>
        <TabsList variant='underline' className='gap-4 px-3'>
          {tabs.map((tab) => <TabsTrigger key={tab.value} value={tab.value} className='text-[13px] group-data-[variant=underline]/tabs-list:py-2'>{tab.label}</TabsTrigger>)}
        </TabsList>
        {tabs.map((tab) => <TabsContent key={tab.value} value={tab.value} className='flex flex-col gap-3 overflow-y-auto p-3'>{tab.content}</TabsContent>)}
      </Tabs>
      {footer && <div className='m-3 mt-auto rounded-md bg-muted p-2.5'>{footer}</div>}
    </aside>
  )
}
