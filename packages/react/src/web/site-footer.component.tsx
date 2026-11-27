import type { ReactNode } from 'react'
import { cn } from '../class-names'
import { ProductLogo } from '../product'

/** A column of links in a {@link SiteFooter}. */
export interface FooterColumn {
  title: string
  links: readonly { label: string, href: string }[]
}

/** Props of {@link SiteFooter}. */
export interface SiteFooterProps {
  /** The line under the brand. */
  tagline?:   ReactNode
  columns:    readonly FooterColumn[]
  /** The bottom row, such as copyright and legal links. */
  legal?:     ReactNode
  className?: string
}

/**
 * The SiteFooter pattern: the brand and tagline, columns of links, and a legal row.
 *
 * @param props - Tagline, link columns and legal row.
 * @returns The footer.
 */
export function SiteFooter ({ tagline, columns, legal, className }: SiteFooterProps) {
  return (
    <footer data-slot='site-footer' className={cn('border-t pt-14 pb-10', className)}>
      <div className='mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-8 px-6'>
        <div className='col-span-2 flex flex-col gap-3'>
          <span className='flex items-center gap-2'>
            <ProductLogo product='talogic' alt='' className='size-7' />
            <span className='font-display text-xl font-extrabold tracking-tight'>Talogic</span>
          </span>
          {tagline && <p className='m-0 max-w-[300px] text-[13px] text-muted-foreground'>{tagline}</p>}
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title} className='flex flex-col gap-2 text-[13px]'>
            <h2 className='m-0 type-h4'>{column.title}</h2>
            {column.links.map((link) => <a key={link.href} href={link.href} className='text-muted-foreground no-underline hover:text-foreground'>{link.label}</a>)}
          </nav>
        ))}
      </div>
      {legal && <div className='mx-auto mt-10 flex max-w-[1200px] flex-wrap justify-between gap-3 px-6 text-xs text-muted-foreground'>{legal}</div>}
    </footer>
  )
}
