import './preview.css'
import type { Decorator, Preview } from '@storybook/react-vite'
import { DENSITIES, type Density, HUES, PRODUCTS, themeAttributes, type ThemeSettings } from '@talogic-automation/react'

/** The toolbar value that leaves a switch to the story: no hue override, or the density the story asks for. */
const AUTO = 'auto'

/**
 * Applies the toolbar switches to `<html>`, so content in portals (menus, dialogs, toasts) follows them too.
 *
 * @param settings - The resolved theme switches.
 */
function applyToDocument (settings: ThemeSettings): void {
  const root = document.documentElement
  const { className, ...attributes } = themeAttributes(settings)
  root.classList.remove('dark', ...DENSITIES.map((density) => `d-${density}`))
  root.classList.add(...className.split(' ').filter(Boolean))
  for (const name of ['data-product', 'data-hue'] as const) {
    const value = attributes[name]
    root.removeAttribute(name)
    if (value) root.setAttribute(name, value)
  }
}

/**
 * Themes every story from the toolbar: product, hue, theme and density. A story's `parameters.density` is the
 * density used when the toolbar says Auto, so a web story is 44 px and a desktop story 28 px by default.
 */
const withTalogicTheme: Decorator = (Story, context) => {
  const { product, hue, theme, density } = context.globals as Record<string, string>
  const storyDensity = (context.parameters.density as Density | undefined) ?? 'app'
  applyToDocument({
    product: product as ThemeSettings['product'],
    hue:     hue === AUTO ? undefined : hue as ThemeSettings['hue'],
    scheme:  theme === 'dark' ? 'dark' : 'light',
    density: density === AUTO ? storyDensity : density as Density,
  })

  return (
    <div className='min-h-full bg-background font-sans text-sm text-foreground'>
      <Story />
    </div>
  )
}

const preview: Preview = {
  decorators:  [withTalogicTheme],
  globalTypes: {
    product: {
      description: 'Product accent (data-product)',
      toolbar:     { title: 'Product', icon: 'component', items: PRODUCTS.map((value) => ({ value, title: value })), dynamicTitle: true },
    },
    hue: {
      description: 'Family hue (data-hue), which wins over the product',
      toolbar:     { title: 'Hue', icon: 'paintbrush', items: [{ value: AUTO, title: 'Product hue' }, ...HUES.map((value) => ({ value, title: value }))], dynamicTitle: true },
    },
    theme: {
      description: 'Colour scheme (.dark)',
      toolbar:     { title: 'Theme', icon: 'contrast', items: [{ value: 'light', title: 'Light', icon: 'sun' }, { value: 'dark', title: 'Dark', icon: 'moon' }], dynamicTitle: true },
    },
    density: {
      description: 'Control density (.d-web, .d-app, .d-desk, .d-mob)',
      toolbar:     {
        title: 'Density',
        icon:  'ruler',
        items: [
          { value: AUTO, title: 'Surface default' },
          { value: 'web', title: 'Web · 44 px' },
          { value: 'app', title: 'App · 36 px' },
          { value: 'desk', title: 'Desktop · 28 px' },
          { value: 'mob', title: 'Mobile · 48 px' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { product: 'talogic', hue: AUTO, theme: 'light', density: AUTO },
  parameters:     {
    layout:   'padded',
    controls: { expanded: true },
    options:  {
      storySort: { order: ['Foundations', 'Primitives', 'Shared', 'Web', 'App', 'Desktop', 'Mobile'] },
    },
  },
}

export default preview
