import { Slot } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../class-names'
import type { ThemeSettings } from './theme.contract'
import { themeAttributes } from './theme-attributes.mapper'

/** Props of {@link ThemeRoot}: the theme switches plus the props of a `div`. */
export interface ThemeRootProps extends ThemeSettings, ComponentProps<'div'> {
  /** Renders the child element in place of a `div`, with the theme attributes merged onto it. */
  asChild?: boolean
}

/**
 * Themes a region: product accent, hue, colour scheme and density. Regions nest, so a light card can sit
 * in a dark page. Content in a portal (menus, dialogs) follows `<html>`, so theme `<html>` for a whole app.
 *
 * @param props - The theme switches, `asChild`, and any `div` props.
 * @returns The themed element.
 */
export function ThemeRoot ({ product, hue, scheme, density, asChild = false, className, ...props }: ThemeRootProps) {
  const { className: themeClass, ...attributes } = themeAttributes({ product, hue, scheme, density })
  const Component = asChild ? Slot.Root : 'div'

  return <Component data-slot='theme-root' className={cn(themeClass, className)} {...attributes} {...props} />
}
