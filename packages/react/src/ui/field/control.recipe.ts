/**
 * The shared look of text controls (input, textarea, select trigger): the surface density height, the input border,
 * a brand focus ring, and a destructive ring when `aria-invalid` is set.
 */
export const controlClassName = [
  'w-full min-w-0 rounded-md border border-input bg-background text-(length:--control-fs) text-foreground shadow-xs',
  'outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground',
  'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/25',
  'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
  'disabled:cursor-not-allowed disabled:opacity-50',
].join(' ')
