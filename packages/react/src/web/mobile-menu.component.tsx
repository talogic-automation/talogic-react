import { Dialog as DialogPrimitive } from 'radix-ui'
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react'
import { cn } from '../class-names'
import { Button, MenuIcon } from '../ui'

/** A link of the {@link MobileMenu}. */
export interface MobileMenuLink {
  label: string
  href:  string
}

/** Props of {@link MobileMenu}. */
export interface MobileMenuProps {
  links:      readonly MobileMenuLink[]
  /** The actions at the foot of the panel, such as Sign in and Talk to us. */
  actions?:   ReactNode
  /** The accessible name of the navigation. Default "Main". */
  label?:     string
  /** Classes for the toggle button, such as `md:hidden`. */
  className?: string
}

/** How long the menu takes to close: the hold animation of its content (menu-hold, 400 ms). */
const CLOSE_MS = 400

/** Where the toggle is on screen when the menu opens. */
interface ToggleBox {
  left:   number
  top:    number
  width:  number
  height: number
}

/**
 * The mobile menu of a website. The panel grows out of the toggle as a circle while the page behind blurs and turns
 * grey, and the links fade in one after another. The toggle twirls into an X and back. With reduced motion, the
 * panel and the backdrop only fade.
 *
 * @param props - Links, actions, the navigation label and the toggle's classes.
 * @returns The toggle, and the menu while it is open.
 */
export function MobileMenu ({ links, actions, label = 'Main', className }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const [toggle, setToggle] = useState<ToggleBox>()
  // True from the open until the close animation ends. The page's toggle hides its own icon all that time, so only
  // the menu's toggle (drawn over it) shows bars, and the two icons never draw on top of each other.
  const [covered, setCovered] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) return
    const timer = setTimeout(() => setCovered(false), CLOSE_MS)

    return () => clearTimeout(timer)
  }, [open])

  // Measure the toggle again whenever the page's box changes while the menu is open (the scroll lock removing the
  // scrollbar, a rotation, a resize), so the menu's toggle and the reveal's centre stay on the page's toggle.
  useEffect(() => {
    if (!open) return
    const observer = new ResizeObserver(() => measure())
    observer.observe(document.documentElement)

    return () => observer.disconnect()
  }, [open])

  function measure (): void {
    const box = toggleRef.current?.getBoundingClientRect()
    if (box) setToggle({ left: box.left, top: box.top, width: box.width, height: box.height })
  }

  function changeOpen (next: boolean): void {
    if (next) measure()
    if (next) setCovered(true)
    setOpen(next)
  }

  const origin = toggle
    ? { '--menu-origin-x': `${toggle.left + toggle.width / 2}px`, '--menu-origin-y': `${toggle.top + toggle.height / 2}px` } as CSSProperties
    : undefined

  return (
    <DialogPrimitive.Root open={open} onOpenChange={changeOpen}>
      <DialogPrimitive.Trigger asChild>
        <Button ref={toggleRef} variant='ghost' size='icon' aria-label='Open menu' className={className}><MenuIcon className={covered ? 'invisible' : undefined} /></Button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          data-slot='mobile-menu-backdrop'
          className='fixed inset-0 z-50 bg-ink/30 backdrop-blur-[6px] backdrop-grayscale dark:bg-black/50 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in data-[state=closed]:[animation-duration:340ms] data-[state=open]:[animation-duration:420ms]'
        />
        <DialogPrimitive.Content
          data-slot='mobile-menu'
          aria-describedby={undefined}
          style={origin}
          className='group/menu d-mob pointer-events-none fixed inset-0 z-50 outline-none data-[state=closed]:animate-[menu-hold_400ms_both]'
        >
          <DialogPrimitive.Title className='sr-only'>Menu</DialogPrimitive.Title>
          {/* The shadow sits on a wrapper: a drop-shadow filter follows the clipped circle, a box-shadow would be clipped. */}
          <div className='fixed inset-0 [filter:drop-shadow(0_0_1px_rgb(20_18_26/0.4))_drop-shadow(-12px_16px_36px_rgb(20_18_26/0.4))] dark:[filter:drop-shadow(0_0_1px_rgb(255_255_255/0.45))_drop-shadow(-12px_16px_36px_rgb(0_0_0/0.7))]'>
            <div
              className={cn(
                'fixed inset-0 animate-menu-reveal group-data-[state=closed]/menu:animate-menu-conceal',
                'motion-reduce:animate-fade-in motion-reduce:group-data-[state=closed]/menu:animate-fade-out',
              )}
            >
              <div className='pointer-events-auto absolute inset-y-0 end-0 flex w-[min(340px,86vw)] flex-col gap-1 border-s bg-popover px-5 pt-21 pb-8 text-popover-foreground'>
                <nav aria-label={label} className='flex flex-col gap-1'>
                  {links.map((link, index) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => changeOpen(false)}
                      style={{ animationDelay: `${120 + index * 45}ms` }}
                      className='animate-menu-item-in rounded-md px-2 py-3 text-base font-medium text-foreground no-underline outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring motion-reduce:animate-fade-in'
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
                {actions && (
                  <div className='mt-auto flex animate-menu-item-in flex-col gap-2 [animation-delay:320ms] motion-reduce:animate-fade-in'>{actions}</div>
                )}
              </div>
            </div>
          </div>
          <DialogPrimitive.Close asChild>
            <Button
              variant='ghost'
              size='icon'
              aria-label='Close menu'
              className='pointer-events-auto fixed'
              style={toggle ? { left: toggle.left, top: toggle.top, width: toggle.width, height: toggle.height } : { right: 24, top: 12 }}
            >
              <MenuIcon open={open} />
            </Button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
