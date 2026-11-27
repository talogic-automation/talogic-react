import { cva, type VariantProps } from 'class-variance-authority'

/**
 * The Badge recipe. Status variants (success, warning, danger, info) are the same in every product.
 * A status badge always has a word beside the colour, because some product accents share a hue with a status.
 */
export const badgeVariants = cva(
  'inline-flex h-[22px] shrink-0 items-center gap-[5px] whitespace-nowrap rounded-full border border-transparent px-2 text-xs font-medium [&_svg]:size-3',
  {
    variants: {
      variant: {
        default:   'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        outline:   'border-border text-foreground',
        brand:     'bg-brand-soft text-brand-text',
        success:   'bg-success-soft text-success',
        warning:   'bg-warning-soft text-warning',
        danger:    'bg-destructive-soft text-destructive',
        info:      'bg-info-soft text-info',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

/** The variant option of {@link badgeVariants}. */
export type BadgeVariants = VariantProps<typeof badgeVariants>

/** A badge variant. */
export type BadgeVariant = NonNullable<BadgeVariants['variant']>
