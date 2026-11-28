// Copies the token and font stylesheets into dist, the folder the release publishes, so the package exports resolve.
import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
mkdirSync(join(root, 'dist'), { recursive: true })
for (const file of ['tokens.css', 'fonts.css']) {
  copyFileSync(join(root, 'src', 'tokens', file), join(root, 'dist', file))
}
