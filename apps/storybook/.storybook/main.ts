import type { StorybookConfig } from '@storybook/react-vite'

/** Storybook for the Talogic design system: every `*.stories.tsx` under `src`, built with the library's Vite config. */
const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories:   ['../src/**/*.stories.@(ts|tsx)'],
  core:      { disableTelemetry: true },
}

export default config
