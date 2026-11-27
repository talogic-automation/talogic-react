import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

/** The package source, so stories show component edits at once, without a package build first. */
const packageSource = fileURLToPath(new URL('../../../packages/react/src/index.ts', import.meta.url))

/** Storybook for the Talogic design system: every story under `stories`, against the package source. */
const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories:   ['../stories/**/*.stories.@(ts|tsx)'],
  core:      { disableTelemetry: true },
  viteFinal: (viteConfig) => ({
    ...viteConfig,
    plugins: [...(viteConfig.plugins ?? []), react(), tailwindcss()],
    resolve: {
      ...viteConfig.resolve,
      alias: [{ find: /^@talogic-automation\/react$/, replacement: packageSource }],
    },
  }),
}

export default config
