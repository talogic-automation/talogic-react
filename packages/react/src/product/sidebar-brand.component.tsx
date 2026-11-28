import type { ReactNode } from 'react'
import { cn } from '../class-names'
import type { Product } from '../tokens'
import { fadingLabelClassName, useSidebar } from '../ui'
import { PRODUCT_CATALOGUE } from './product-catalogue.content'
import { ProductLogo } from './product-logo.component'

/** Props of {@link SidebarBrand}. */
export interface SidebarBrandProps {
  /** The product whose logo and name the sidebar shows. */
  product:    Product
  /** A short badge after the name, such as the environment ("Dev"). */
  badge?:     ReactNode
  className?: string
}

/**
 * The top of a `nav` sidebar, after pargic's portal: the product logo is a second collapse button and turns a third
 * of a circle as the sidebar collapses, and the product name fades in place beside it.
 *
 * @param props - The product, an optional badge and classes.
 * @returns The brand row.
 */
export function SidebarBrand ({ product, badge, className }: SidebarBrandProps) {
  const { collapsed, setCollapsed } = useSidebar()
  const name = PRODUCT_CATALOGUE[product].name

  return (
    <div data-slot='sidebar-brand' className={cn('flex h-8 items-center', className)}>
      <button
        type='button'
        aria-label={`${name}: ${collapsed ? 'expand' : 'collapse'} sidebar`}
        aria-expanded={!collapsed}
        onClick={() => setCollapsed(!collapsed)}
        className='grid size-10 shrink-0 cursor-pointer place-items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring'
      >
        <ProductLogo product={product} alt='' className={cn('size-6 transition-transform duration-300 ease-emphasised motion-reduce:transition-none', collapsed && 'rotate-120')} />
      </button>
      <span className={cn('ms-1 font-display text-lg font-extrabold text-brand-text italic', fadingLabelClassName)}>{name}</span>
      {badge && <span className={cn('ms-2 rounded-full bg-warning-soft px-2 text-xs font-medium text-warning', fadingLabelClassName)}>{badge}</span>}
    </div>
  )
}
