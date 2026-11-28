/**
 * The scrim under every modal (dialog, alert dialog, sheet, drawer, command palette): the page behind blurs 5 px,
 * drops to 50 % contrast and 30 % saturation, and turns lighter in light mode (brightness 130 %) or darker in dark
 * mode (70 %). It fades in and out.
 */
export const overlayClassName = [
  'fixed inset-0 z-50 backdrop-blur-[5px] backdrop-contrast-[.5] backdrop-saturate-[.3] backdrop-brightness-[1.3] dark:backdrop-brightness-[.7]',
  'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
].join(' ')

/**
 * The motion of floating content (dialogs, popovers, tooltips, menus, selects): it grows from its anchor while it
 * fades in, and shrinks back while it fades out. Reduced motion keeps only the fade.
 */
export const floatingMotionClassName = [
  'data-[state=open]:animate-zoom-in data-[state=delayed-open]:animate-zoom-in data-[state=instant-open]:animate-zoom-in data-[state=closed]:animate-zoom-out',
  'motion-reduce:data-[state=open]:animate-fade-in motion-reduce:data-[state=delayed-open]:animate-fade-in motion-reduce:data-[state=instant-open]:animate-fade-in motion-reduce:data-[state=closed]:animate-fade-out',
].join(' ')

/** The slide of a sheet from each edge, with a fade for reduced motion. */
export const sheetMotionClassName = {
  start:  'data-[state=open]:animate-sheet-in-start data-[state=closed]:animate-sheet-out-start motion-reduce:data-[state=open]:animate-fade-in motion-reduce:data-[state=closed]:animate-fade-out',
  end:    'data-[state=open]:animate-sheet-in-end data-[state=closed]:animate-sheet-out-end motion-reduce:data-[state=open]:animate-fade-in motion-reduce:data-[state=closed]:animate-fade-out',
  top:    'data-[state=open]:animate-sheet-in-top data-[state=closed]:animate-sheet-out-top motion-reduce:data-[state=open]:animate-fade-in motion-reduce:data-[state=closed]:animate-fade-out',
  bottom: 'data-[state=open]:animate-sheet-in-bottom data-[state=closed]:animate-sheet-out-bottom motion-reduce:data-[state=open]:animate-fade-in motion-reduce:data-[state=closed]:animate-fade-out',
} as const
