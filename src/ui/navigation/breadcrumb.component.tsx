import { Slot } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'

/**
 * The shadcn/ui Breadcrumb landmark.
 *
 * @param props - Any `nav` props.
 * @returns The breadcrumb navigation.
 */
export function Breadcrumb ({ 'aria-label': label = 'Breadcrumb', ...props }: ComponentProps<'nav'>) {
  return <nav data-slot='breadcrumb' aria-label={label} {...props} />
}

/**
 * The ordered list of a {@link Breadcrumb}.
 *
 * @param props - Any `ol` props.
 * @returns The list.
 */
export function BreadcrumbList ({ className, ...props }: ComponentProps<'ol'>) {
  return <ol data-slot='breadcrumb-list' className={cn('m-0 flex list-none flex-wrap items-center gap-2 p-0 text-[13px] text-muted-foreground', className)} {...props} />
}

/**
 * One step of a {@link BreadcrumbList}.
 *
 * @param props - Any `li` props.
 * @returns The step.
 */
export function BreadcrumbItem ({ className, ...props }: ComponentProps<'li'>) {
  return <li data-slot='breadcrumb-item' className={cn('inline-flex items-center gap-2', className)} {...props} />
}

/**
 * A link to an earlier step.
 *
 * @param props - `asChild` for a router link, and any `a` props.
 * @returns The link.
 */
export function BreadcrumbLink ({ asChild = false, className, ...props }: ComponentProps<'a'> & { asChild?: boolean }) {
  const Component = asChild ? Slot.Root : 'a'

  return <Component data-slot='breadcrumb-link' className={cn('text-inherit no-underline transition-colors hover:text-foreground', className)} {...props} />
}

/**
 * The current step. It is not a link.
 *
 * @param props - Any `span` props.
 * @returns The current page.
 */
export function BreadcrumbPage ({ className, ...props }: ComponentProps<'span'>) {
  return <span data-slot='breadcrumb-page' aria-current='page' className={cn('font-medium text-foreground', className)} {...props} />
}

/**
 * The slash between steps. It is decorative.
 *
 * @param props - Any `li` props.
 * @returns The separator.
 */
export function BreadcrumbSeparator ({ children = '/', ...props }: ComponentProps<'li'>) {
  return <li data-slot='breadcrumb-separator' role='presentation' aria-hidden='true' {...props}>{children}</li>
}
