import { cva, type VariantProps } from 'class-variance-authority'

/**
 * The Button recipe. Sizes read the surface density (`--control-h`, `--control-px`, `--control-fs`), so the same
 * button is 44 px on the web, 36 px in an app, 28 px on desktop and 48 px on mobile.
 */
export const buttonVariants = cva(
  [
    'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent font-medium no-underline',
    'transition-[background-color,border-color,box-shadow,color] duration-150 ease-out outline-none motion-reduce:transition-none',
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50 aria-busy:cursor-progress',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        default:     'bg-primary text-primary-foreground shadow-xs hover:bg-[color-mix(in_oklab,var(--primary)_88%,var(--foreground))]',
        secondary:   'bg-secondary text-secondary-foreground hover:bg-accent',
        outline:     'border-input bg-background text-foreground shadow-xs hover:bg-accent',
        ghost:       'bg-transparent text-foreground hover:bg-accent',
        destructive: 'bg-destructive text-destructive-foreground shadow-xs hover:bg-[color-mix(in_oklab,var(--destructive)_88%,var(--foreground))]',
        link:        'bg-transparent text-brand-text underline underline-offset-3',
      },
      size: {
        'default': 'h-(--control-h) px-(--control-px) text-(length:--control-fs)',
        'sm':      'h-[calc(var(--control-h)-6px)] px-[calc(var(--control-px)-4px)] text-[13px]',
        'lg':      'h-[calc(var(--control-h)+8px)] px-[calc(var(--control-px)+6px)] text-base',
        'icon':    'size-(--control-h)',
        'icon-sm': 'size-[calc(var(--control-h)-6px)]',
      },
    },
    compoundVariants: [{ variant: 'link', class: 'h-auto px-0' }],
    defaultVariants:  { variant: 'default', size: 'default' },
  },
)

/** The variant and size options of {@link buttonVariants}. */
export type ButtonVariants = VariantProps<typeof buttonVariants>
