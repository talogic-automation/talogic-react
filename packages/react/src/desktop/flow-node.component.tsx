import type { ReactNode } from 'react'
import { cn } from '../class-names'
import { type RunStatus, StatusBadge } from '../status'
import { HUE_FILL, type Hue } from '../tokens'

/** Props of {@link FlowNode}. */
export interface FlowNodeProps {
  /** The node's name, such as a plugin or input. */
  title:       string
  /** One line on what the node does. */
  description: ReactNode
  status:      RunStatus
  /** The family hue of the node's lane. Default none, for inputs. */
  hue?:        Hue
  /** Draws the brand border of the selected node. */
  selected?:   boolean
  onSelect?:   () => void
  className?:  string
}

/**
 * A node on a desktop flow canvas: a 200 px card with the lane dot, the name, the status and one line.
 * Place it absolutely on the canvas; wrap it in a ContextMenuTrigger for its right-click menu.
 *
 * @param props - Title, description, status, hue, selection and select handler.
 * @returns The node.
 */
export function FlowNode ({ title, description, status, hue, selected = false, onSelect, className }: FlowNodeProps) {
  return (
    <button
      type='button'
      data-slot='flow-node'
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        'flex w-[200px] cursor-pointer flex-col rounded-lg bg-card text-start text-[13px] text-card-foreground shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring',
        selected ? 'border-2 border-brand' : 'border',
        className,
      )}
    >
      <span className='flex items-center gap-2 border-b px-2.5 py-2'>
        <span aria-hidden='true' className={cn('size-2 shrink-0 rounded-[2px]', hue ? HUE_FILL[hue] : 'bg-muted-foreground')} />
        <span className='font-semibold'>{title}</span>
        <StatusBadge status={status} className='ms-auto h-[18px] text-[11px]' />
      </span>
      <span className='px-2.5 py-2 text-xs leading-snug text-muted-foreground'>{description}</span>
    </button>
  )
}
