import monosmith from '@monosmith/eslint-config'

export default [
  ...monosmith({
    workspaceRoot:  import.meta.dirname,
    verticalSlices: {
      files: ['packages/*/src/**/*.{ts,tsx}'],
      roles: ['style', 'hook', 'content'],
    },
  }),
  {
    ignores: [
      '**/dist/**',
      '**/storybook-static/**',
      '**/coverage/**',
      '**/test-output/**',
      // @eslint/css parses standard CSS only; Tailwind v4 at-rules (@theme, @utility, @source, @custom-variant) fail to parse.
      '**/*.css',
    ],
  },
]
