import { ChevronsUpDown } from 'lucide-react'
import { cn } from '../class-names'
import { PRODUCTS, type Product } from '../tokens'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '../ui'
import { PRODUCT_CATALOGUE } from './product-catalogue.content'
import { ProductLogo } from './product-logo.component'

/** Props of {@link ProductSwitcher}. */
export interface ProductSwitcherProps {
  /** The product the user is in. */
  product:          Product
  /** The workspace under the product name, such as "Acme Finance workspace". */
  workspace?:       string
  /** The products the user can switch to. Default every product. */
  products?:        readonly Product[]
  /** Called with the product the user picks. */
  onProductChange?: (product: Product) => void
  className?:       string
}

/**
 * The ProductSwitcher pattern: the product logo, name and workspace at the top of a sidebar, opening a menu
 * of the other products.
 *
 * @param props - The current product, workspace, choices and change handler.
 * @returns The switcher.
 */
export function ProductSwitcher ({ product, workspace, products = PRODUCTS, onProductChange, className }: ProductSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className={cn('h-12 w-full justify-start gap-2.5 px-2', className)} aria-label={`${PRODUCT_CATALOGUE[product].name}, switch product`}>
          <ProductLogo product={product} alt='' className='size-7' />
          <span className='flex min-w-0 flex-col items-start leading-tight'>
            <span className='font-display text-[17px] font-extrabold italic text-brand-text'>{PRODUCT_CATALOGUE[product].name}</span>
            {workspace && <span className='truncate text-xs font-normal text-muted-foreground'>{workspace}</span>}
          </span>
          <ChevronsUpDown className='ms-auto text-muted-foreground' aria-hidden='true' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='w-60'>
        <DropdownMenuLabel>Products</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={product} onValueChange={(value) => onProductChange?.(value as Product)}>
          {products.map((item) => (
            <DropdownMenuRadioItem key={item} value={item}>
              <ProductLogo product={item} alt='' className='size-4' />
              {PRODUCT_CATALOGUE[item].name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
