# Use the Talogic components in a product

This guide sets up a product (pargic, daygic, ingic, loregic, loomgic or the website) to use the Talogic design
system. The last part replaces Chakra UI in an app that uses it today, such as the pargic Studio and portal.

The package is `@talogic-automation/react` on the GitHub Packages npm registry. GitHub Packages names a package by
the organisation that owns the repository, so the scope must be `@talogic-automation`. Products install it under
the alias `@talogic/react`, so code imports `@talogic/react` and the short name stays the same everywhere.

## 1. Get read access to the registry

GitHub Packages asks for a token on every install, also for reads.

1. Create a classic personal access token with the `read:packages` scope at
   <https://github.com/settings/tokens>. GitHub Packages does not accept fine-grained tokens for npm.
   If the organisation uses SSO, authorise the token for `talogic-automation`.
2. Put the token in your user `.npmrc` (`~/.npmrc` or `%USERPROFILE%\.npmrc`), never in the project:

   ```ini
   //npm.pkg.github.com/:_authToken=ghp_your_token
   ```

3. In the product repository, add the registry for the scope to the project `.npmrc`:

   ```ini
   @talogic-automation:registry=https://npm.pkg.github.com
   ```

**Warning:** do not put the GitHub token in `NODE_AUTH_TOKEN` in a repository whose `.npmrc` already reads
`NODE_AUTH_TOKEN` for `registry.npmjs.org` (pargic does). npm then sends the GitHub token to npmjs.org. Keep the
GitHub token in the user `.npmrc`, or use a separate variable such as `GH_PACKAGES_TOKEN`:

```ini
//npm.pkg.github.com/:_authToken=${GH_PACKAGES_TOKEN}
```

### In GitHub Actions

1. On the package page (talogic-automation > Packages > react > Package settings), under "Manage Actions access",
   add the product repository with the Read role.
2. Give the workflow `packages: read` and pass the built-in token:

   ```yaml
   permissions:
     contents: read
     packages: read
   steps:
     - uses: actions/setup-node@v5
       with:
         node-version: 24
         registry-url: https://npm.pkg.github.com
         scope: '@talogic-automation'
     - run: npm ci
       env:
         NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
   ```

   `setup-node` writes its own `.npmrc` for this step, so the npmjs.org token line of the repository does not apply.

## 2. Install

```sh
npm install @talogic/react@npm:@talogic-automation/react
```

This writes `"@talogic/react": "npm:@talogic-automation/react@^0.1.0"` to `package.json`. The package needs
React 19 and React DOM 19 as peers.

**Before the first release**, link the sibling checkout and build it once:

```jsonc
// package.json of the product
"@talogic/react": "file:../talogic-react/packages/react"
```

```sh
cd ../talogic-react && npm install && smith build -p react
```

Run `smith build -p react` in talogic-react again after each change you want the product to see.

## 3. Add the styles

### With Tailwind CSS v4 (recommended)

Install Tailwind and its Vite plugin, then add the plugin to `vite.config.ts`:

```sh
npm install -D tailwindcss @tailwindcss/vite
```

```ts
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({ plugins: [react(), tailwindcss()] })
```

Create the app stylesheet and import it once in `main.tsx`:

```css
/* src/app.css */
@import "tailwindcss";
@import "@talogic/react/tokens.css";
@import "@talogic/react/fonts.css";

/* Tailwind generates only the classes it finds. This line makes it read the component library too. */
@source "../node_modules/@talogic/react/dist";
```

```ts
// src/main.tsx
import './app.css'
```

Now the product's own code can use the same classes: `bg-background`, `text-muted-foreground`, `bg-brand`,
`text-brand-text`, `border-border`, the family palette (`bg-orange-500`, `text-pink-700`), `font-display`,
`type-h1` and `dark:` variants.

### Without Tailwind

```ts
import '@talogic/react/styles.css'
import '@talogic/react/fonts.css'
```

The compiled stylesheet holds every class the components use, but no more. Product code then styles itself with
the CSS variables (`var(--background)`, `var(--brand)`).

## 4. Set the product, theme and density

Set the switches on `<html>`, so menus, dialogs and toasts (which render in a portal under `<body>`) follow them.

```html
<!-- index.html of daygic -->
<html lang="en" data-product="daygic" class="d-mob">
```

| Product | Surface | `<html>` |
|---|---|---|
| Website | web | `data-product="talogic" class="d-web"` |
| pargic portal and Studio | app | `data-product="pargic" class="d-app"` |
| loomgic studio (Tauri) | desktop | `data-product="loomgic" class="d-desk dark"` |
| daygic and ingic apps | mobile | `data-product="daygic" class="d-mob"` |

Toggle the dark theme with the `dark` class:

```ts
document.documentElement.classList.toggle('dark', prefersDark)
```

For one region with other settings, such as a light card in a dark page or a product card in another accent, wrap
it in `ThemeRoot`:

```tsx
import { ThemeRoot } from '@talogic/react'

<ThemeRoot product='ingic' scheme='light' density='app'>…</ThemeRoot>
```

## 5. Use the components

```tsx
import { Button, Field, Input, PageHeader, StatusBadge } from '@talogic/react'

export function RecipeHeader () {
  return (
    <PageHeader
      title='Supplier invoices'
      description='Every run of this recipe.'
      actions={<Button>Run now</Button>}
    />
  )
}
```

Browse every component, its props and full example screens in the Storybook at
<https://talogic-automation.github.io/talogic-react/>, or run it locally with `smith dev -p storybook` in
talogic-react. Each story has the code that renders it.

## 6. Replace Chakra UI

pargic Studio uses Chakra UI v3 in about 375 files, with its own theme in `src/shared/pargic-theme`. Replace it
slice by slice, not in one change. Chakra and the Talogic components can run side by side while you move.

### Step 1: run both side by side

1. Install Tailwind and the package (sections 1 to 3), but import Tailwind without its preflight, because Chakra
   already resets the page:

   ```css
   /* src/app.css while Chakra is still in the app */
   @layer theme, base, components, utilities;
   @import "tailwindcss/theme.css" layer(theme);
   @import "tailwindcss/utilities.css" layer(utilities);
   @import "@talogic/react/tokens.css";
   @import "@talogic/react/fonts.css";
   @source "../node_modules/@talogic/react/dist";
   ```

2. Set `data-product="pargic" class="d-app"` on `<html>`. Chakra already uses the `dark` class for its dark mode,
   so one class switches both.
3. Keep `ChakraProvider` at the root until the last Chakra import is gone.

### Step 2: move a slice at a time

Move one feature slice per pull request, leaf components first, then pages, then the app shell. In each slice,
change only the imports and markup, and keep behaviour and tests the same. Testing Library queries by role and
label, so most tests stay as they are. Remove the `ChakraProvider` wrapper from a test once its subject has no
Chakra left.

| Chakra UI | Talogic |
|---|---|
| `Box`, `Flex`, `Stack`, `HStack`, `VStack`, `Grid`, `SimpleGrid`, `Group`, `ButtonGroup` | A `div` (or a semantic element) with Tailwind classes: `flex gap-2`, `flex flex-col gap-4`, `grid grid-cols-3 gap-4` |
| `Text`, `Heading`, `Code`, `List` | `p`, `span`, `h1` to `h4`, `code`, `ul` with `type-h1` to `type-h4`, `type-lead`, `text-[13px]`, `font-mono` |
| `Button` | `Button` (variants `default`, `secondary`, `outline`, `ghost`, `destructive`, `link`) |
| `IconButton` | `Button size='icon'` with `aria-label` |
| `CloseButton` | `Button variant='ghost' size='icon-sm' aria-label='Close'` with the lucide `X` icon |
| `Badge`, `Tag` | `Badge` (variants `brand`, `success`, `warning`, `danger`, `info`, `outline`, `secondary`); for a run status, `StatusBadge` |
| `Input`, `InputGroup` | `Input`, with `startIcon` for a leading icon |
| `Textarea` | `Textarea` |
| `Field.Root`, `Field.Label`, `Field.HelperText`, `Field.ErrorText` | `<Field label hint error>` around the control; it wires the id and ARIA |
| `Fieldset` | `fieldset` and `legend` around several `Field`s |
| `NativeSelect`, `Select` with `createListCollection` | `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem` |
| `Checkbox`, `Switch`, `RadioGroup` | `Checkbox`, `Switch`, `RadioGroup` and `RadioGroupItem`, labelled with `Label` |
| `SegmentGroup` | `ToggleGroup type='single'` |
| `Tabs` | `Tabs`, `TabsList` (`variant='pill'` in a panel, `'underline'` in a header), `TabsTrigger`, `TabsContent` |
| `Menu` | `DropdownMenu`; a right-click menu is `ContextMenu` |
| `Popover` | `Popover` |
| `Dialog` | `Dialog`; a confirmation that needs an answer is `AlertDialog` |
| `Drawer` | `Sheet` from a side; on mobile, the bottom-sheet `Drawer` |
| `Portal` | Remove it: the overlays portal themselves |
| `Alert` | `Alert tone='info'`, `'success'`, `'warning'` or `'danger'` |
| `Spinner` | `Spinner`, or `Skeleton` blocks shaped like the content |
| Chakra toaster (`createToaster`) | Mount `Toaster` once and call `toast()` from `sonner` |
| `Card` | `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` |
| `Table` | `Table` parts, or `RecordsTable` for rows with selection and row actions |
| `Splitter` | `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle` |
| `Kbd`, `Avatar` | `Kbd`, `Avatar` and `AvatarFallback` |
| `Image`, `Link` | `img`, `a`, or `Button asChild variant='link'` around a router link |
| `VisuallyHidden` | the `sr-only` class |
| `chakra()` factory, `defineRecipe`, `defineSlotRecipe`, `useSlotRecipe` | A `cva` recipe in a `.recipe.ts` file, applied with `cn()` |

Style props map to Tailwind classes. The spacing scales are the same (Chakra `4` and Tailwind `4` are both 16 px),
so the numbers carry over.

| Chakra prop | Tailwind class |
|---|---|
| `gap='4'`, `p='6'`, `px='3'` | `gap-4`, `p-6`, `px-3` |
| `color='fg.muted'` | `text-muted-foreground` |
| `bg='bg.canvas'`, `bg='bg.panel'` | `bg-canvas`, `bg-card` |
| `borderColor='border'`, `borderWidth='1px'` | `border` |
| `colorPalette='brand'` | Nothing: the accent comes from `data-product` |
| `_dark={{ … }}` | `dark:` classes |
| `{{ base: 'column', md: 'row' }}` | `flex-col md:flex-row` |
| `textStyle='sm'`, `fontWeight='semibold'` | `text-[13px]`, `font-semibold` |

Example:

```tsx
// Before
<HStack gap='2' justify='space-between'>
  <Text color='fg.muted' textStyle='sm'>2 selected</Text>
  <Button size='sm' colorPalette='brand'>Run now</Button>
</HStack>

// After
<div className='flex items-center justify-between gap-2'>
  <span className='text-[13px] text-muted-foreground'>2 selected</span>
  <Button size='sm'>Run now</Button>
</div>
```

### Step 3: move the theme and the shell

1. Replace the pargic theme tokens with the Talogic tokens. pargic takes the family orange; `tokens.css` already
   holds it, so `pargic-theme` has nothing left to own except Studio-only parts (such as the canvas colours).
   Keep those as a `.style.ts` file in the slice that draws the canvas.
2. Replace the portal shell with `AppShell` and `ProductSwitcher`, and the Studio window chrome with `TitleBar`,
   `Inspector`, `TimelineLanes` and `StatusBar` where they fit.
3. Replace the JetBrains Mono font with Fira Code: remove `@fontsource-variable/jetbrains-mono`, because
   `@talogic/react/fonts.css` loads Inter, DM Sans and Fira Code.
4. In Storybook, replace the `withPargicTheme` decorator with one that sets `data-product`, `dark` and the density
   class on `document.documentElement`. The decorator in talogic-react's `apps/storybook/.storybook/preview.tsx` is a template.

### Step 4: remove Chakra

When a search for `@chakra-ui` in `src` finds nothing:

1. Remove `ChakraProvider` from the root and from test wrappers.
2. Switch the stylesheet to the full Tailwind import from section 3, with the preflight.
3. Uninstall the packages and the type generation step:

   ```sh
   npm uninstall @chakra-ui/react @chakra-ui/cli @emotion/react
   ```

   Then delete the `theme:typegen` script and the `postinstall` that runs it.
4. Delete the unused files of `src/shared/pargic-theme`. Move each file as its own commit if a slice still needs it.
5. Run the typecheck, lint, tests and the Storybook build of the app.

## 7. Get help from the source

- Components and props: the Storybook, and the TSDoc on every export (your editor shows it on hover).
- Tokens: `packages/react/src/tokens/tokens.css` in talogic-react.
- A component you need and do not find: add it to talogic-react, in the slice it belongs to, with tests and a
  story, and merge it with a `feat:` title. The merge releases a new version.
