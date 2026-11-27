import { Minus, Square, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../class-names'
import { ProductLogo } from '../product'
import type { Product } from '../tokens'
import { Button, Menubar } from '../ui'

/** Props of {@link TitleBar}. */
export interface TitleBarProps {
  /** The product, for the logo. */
  product:     Product
  /** The menus: MenubarMenu elements. */
  menus?:      ReactNode
  /** The window title, such as the open file. */
  title?:      ReactNode
  /** Window controls. Leave them out on macOS, where the system draws them. */
  onMinimise?: () => void
  onMaximise?: () => void
  onClose?:    () => void
  className?:  string
}

/**
 * The TitleBar pattern of a desktop app (Tauri): the logo, the menubar, the title, and the window controls.
 * The bar is a drag region (`data-tauri-drag-region`), so the user moves the window by it.
 *
 * @param props - Product, menus, title and window control handlers.
 * @returns The title bar.
 */
export function TitleBar ({ product, menus, title, onMinimise, onMaximise, onClose, className }: TitleBarProps) {
  const controls = [
    { label: 'Minimise', icon: <Minus />, onClick: onMinimise },
    { label: 'Maximise', icon: <Square />, onClick: onMaximise },
    { label: 'Close window', icon: <X />, onClick: onClose },
  ].filter((control) => control.onClick)

  return (
    <div data-slot='title-bar' data-tauri-drag-region='' className={cn('flex h-9 shrink-0 items-center gap-3 border-b bg-sidebar ps-3 text-[13px]', className)}>
      <ProductLogo product={product} alt='' className='size-[18px]' />
      {menus && <Menubar>{menus}</Menubar>}
      <span data-tauri-drag-region='' className='flex-1 truncate text-center text-[12.5px] text-muted-foreground'>{title}</span>
      {controls.length > 0 && (
        <div className='flex h-full'>
          {controls.map((control) => (
            <Button
              key={control.label}
              variant='ghost'
              aria-label={control.label}
              onClick={control.onClick}
              className={cn('h-full w-[46px] rounded-none px-0 [&_svg]:size-3.5', control.label === 'Close window' && 'hover:bg-destructive hover:text-destructive-foreground')}
            >
              {control.icon}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
