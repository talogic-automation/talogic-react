import { LoaderCircle } from 'lucide-react'
import { Slot } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'
import { buttonVariants, type ButtonVariants } from './button.recipe'

/** Props of {@link Button}. */
export interface ButtonProps extends ComponentProps<'button'>, ButtonVariants {
  /** Renders the child element (a link, for example) with the button's styles. */
  asChild?: boolean
  /** Shows a spinner, sets `aria-busy` and disables the button. The label stays, so the width does not jump. */
  loading?: boolean
}

/**
 * The shadcn/ui Button. Use one primary button per view.
 *
 * @param props - Variant, size, `asChild`, `loading` and any `button` props.
 * @returns The button.
 */
export function Button ({ className, variant, size, asChild = false, loading = false, disabled = loading, children, ...props }: ButtonProps) {
  const Component = asChild ? Slot.Root : 'button'

  return (
    <Component
      data-slot='button'
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={asChild ? undefined : disabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && !asChild ? <><LoaderCircle className='animate-spin' aria-hidden='true' />{children}</> : children}
    </Component>
  )
}
