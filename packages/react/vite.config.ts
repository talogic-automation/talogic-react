import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import packageJson from './package.json' with { type: 'json' }

/** Every runtime and peer dependency stays external, so the consumer's bundler resolves one copy of each. */
const external = [...Object.keys(packageJson.dependencies), ...Object.keys(packageJson.peerDependencies)]

/**
 * Library build: ES modules for the components. The compiled stylesheet is a separate Tailwind CLI step
 * (`build:css`). Storybook reuses this config, so it keeps the React and Tailwind plugins.
 */
export default defineConfig(({ command }) => {
  // A NODE_ENV left in the shell (for example `local`) would make the build ship React's development JSX runtime.
  if (command === 'build') process.env.NODE_ENV = 'production'

  return {
    plugins: [react(), tailwindcss()],
    build:   {
      lib: {
        entry:    'src/index.ts',
        formats:  ['es'],
        fileName: 'index',
      },
      emptyOutDir:   false,
      sourcemap:     true,
      rollupOptions: {
        external: (id) => external.some((name) => id === name || id.startsWith(`${name}/`)),
      },
    },
  }
})
