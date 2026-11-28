# @talogic-automation/react

The Talogic design system in React: design tokens for Tailwind CSS v4 and shadcn/ui, the shadcn/ui primitives
drawn with those tokens, and patterns for each surface of the product family. The source design is the approved
"Talogic Component System" canvas.

**[Read the usage guide](docs/usage.md)** for the registry token, the install, the setup of a product, and how to
replace Chakra UI. The Storybook, with every component, is at https://talogic-automation.github.io/talogic-react/.

## Install and set up

The package is published to the GitHub Packages npm registry of the `talogic-automation` organisation, and products
install it under the alias `@talogic/react`:

```sh
npm install @talogic/react@npm:@talogic-automation/react
```

Until the first release, link a sibling checkout with `"@talogic/react": "file:../talogic-react/packages/react"`.

## Releases

Nobody sets a version or a tag by hand. On every merge to `main`, the CI pipeline that MonoSmith generates
(`.github/workflows/ci.yml`) runs `smith ci release`: it reads the conventional commits since the last release
(`feat:` gives a minor version, `fix:` a patch, a breaking change a major), sets the version, builds, publishes to
GitHub Packages, pushes the tag and writes the GitHub Release. A pull request shows the release it will make in a
comment. Squash-merge with a `feat:` or `fix:` title when the change must release; a `chore:` or `docs:` title
releases nothing. The same merge also deploys the Storybook to GitHub Pages (`.github/workflows/deploy-pages.yml`).

With Tailwind CSS v4 in the consuming app:

```css
@import "tailwindcss";
@import "@talogic/react/tokens.css";
@import "@talogic/react/fonts.css";
@source "../node_modules/@talogic/react";
```

Without Tailwind, import the compiled stylesheet and the fonts:

```ts
import '@talogic/react/styles.css'
import '@talogic/react/fonts.css'
```

## Theme switches

Every switch is an attribute or a class, on `<html>` for a whole app or on any element for a region.
`ThemeRoot` sets them for you.

| Switch | Values | Effect |
|---|---|---|
| `data-product` | `talogic`, `pargic`, `daygic`, `ingic`, `loregic`, `loomgic` | The product accent: `--brand`, `--primary`, `--ring`, `--brand-text`, `--brand-soft` |
| `data-hue` | the 12 family hues | An accent for a product with no name yet. It wins over `data-product` on the same element |
| `.dark` | present or not | The dark theme |
| `.d-web`, `.d-app`, `.d-desk`, `.d-mob` | one per surface | Control height 44, 36, 28 or 48 px, read by every component recipe |

```tsx
<ThemeRoot product='daygic' density='mob' scheme='dark'>…</ThemeRoot>
```

Menus, dialogs and toasts render in a portal under `<body>`, so they follow the switches on `<html>`.

Tokens use the shadcn/ui variable names (`--background`, `--primary`, `--muted-foreground`, `--sidebar-*`,
`--chart-1` to `--chart-5`) plus Talogic roles (`--brand`, `--brand-text`, `--brand-soft`, `--canvas`, the status
colours and their `-soft` backgrounds). The family palette replaces the default Tailwind colours, so `bg-pink-500`
and `text-orange-700` are family steps. Fonts: DM Sans for headlines (`font-display`, `type-display`, `type-h1`,
`type-h2`), Inter for content (`font-sans`), Fira Code for code (`font-mono`).

Labels on fills are never a fixed colour. The APCA contrast method (the WCAG 3 draft) picks, for every family
colour, the ink or white label that reads best on it. `npm run tokens:labels -w packages/react` writes the result
to `tokens.css` as `--color-on-<hue>-<step>` (so `bg-violet-500 text-on-violet-500` works), and a test fails when
the file and the rule disagree. `--primary-foreground`, `--sidebar-primary-foreground` and
`--destructive-foreground` point at these tokens. For a colour known only at run time, call `readableLabel(hex)`.

## What is in the package

| Slice | Contents |
|---|---|
| `tokens` | `tokens.css`, `fonts.css`, `ThemeRoot`, `themeAttributes`, product and hue lists, `PRODUCT_HUES`, `FAMILY_PALETTE`, `HUE_FILL` |
| `ui` | shadcn/ui primitives: button, badge, avatar, field (label, input, textarea, select), choice (checkbox, radio group, switch, slider, toggle group), navigation (tabs, breadcrumb, pagination, navigation menu, menubar), overlay (dialog, alert dialog, sheet, drawer, popover, tooltip), menu (dropdown menu, context menu, command), feedback (alert, toaster, progress, skeleton, spinner, empty state), layout (card, separator, scroll area, resizable, accordion, table, kbd) |
| `product` | `ProductLogo`, `ProductSwitcher`, `PRODUCT_CATALOGUE` |
| `status` | `StatusBadge` and the run statuses, with the same word and colour in every product |
| `web` | `SiteHeader`, `Hero`, `ProductCard`, `FeatureGrid`, `HowItWorks`, `PricingTable`, `Faq`, `CtaBand`, `SiteFooter` |
| `app` | `AppShell` (with the ⌘K palette), `PageHeader`, `StatCard`, `FilterBar`, `FilterChip`, `RecordsTable`, `FormSection` |
| `desktop` | `TitleBar` (Tauri drag region), `Inspector`, `FlowNode`, `TimelineLanes`, `StatusBar` |
| `mobile` | `BottomNav`, `RecordButton`, `CaptureFrame` |
| `class-names`, `timecode` | `cn` and `formatTimecode` |

## Work on the package

The repository is a MonoSmith workspace with two projects: the package in `packages/react` and the Storybook app
in `apps/storybook`, whose stories import the package's public API.

```sh
npm install
smith dev -p storybook   # http://localhost:6006, with Product, Hue, Theme and Density in the toolbar
smith verify             # what CI runs: deps check, lint, typecheck, tests and build of both projects
smith test -p react      # Jest and Testing Library, in jsdom
npm run format -w packages/react   # @monosmith/eslint-config, which also formats (eslint --fix)
smith release --dry-run  # the release the next merge to main makes
```

The package source follows vertical feature slices: each folder under `packages/react/src` is a slice with flat,
role-suffixed files (`.component.tsx`, `.recipe.ts`, `.hook.ts`, `.mapper.ts`, `.algorithm.ts`, `.policy.ts`,
`.contract.ts`, `.content.ts`, `.style.ts`) and an `index.ts` that is its only entry point. Tests sit beside the
code. Stories live in `apps/storybook/stories`, in folders that mirror the slices, because MonoSmith's dependency
check treats every file under the package's `src` as published code. `src/index.ts` re-exports the slices.
