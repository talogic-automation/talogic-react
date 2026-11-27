/** Jest runs the component tests in jsdom, with Babel for TypeScript and JSX and a stub for static assets. */
module.exports = {
  preset:             '@monosmith/jest-preset',
  testEnvironment:    'jsdom',
  roots:              ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/testing/jest.setup.ts'],
  transform:          {
    '^(?!.*[.](js|jsx|ts|tsx|cjs|mjs|css|json)$)': '@monosmith/jest-preset/asset-transform',
    '^.+[.][cm]?[tj]sx?$':                         ['babel-jest', { presets: [['@babel/preset-env', { targets: { node: 'current' }, loose: true }], '@babel/preset-typescript', ['@babel/preset-react', { runtime: 'automatic' }]] }],
  },
  moduleNameMapper:     { '[.]css$': '@monosmith/jest-preset/style-stub' },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'cjs', 'mjs', 'json'],
  coverageDirectory:    'test-output/jest/coverage',
}
