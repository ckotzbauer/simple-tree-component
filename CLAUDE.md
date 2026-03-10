# CLAUDE.md

## Project Overview

**simple-tree-component** is a zero-dependency, pure JavaScript/TypeScript UI tree component for modern browsers. It provides three modes of operation: a standalone tree view, a single-select dropdown, and a multi-select dropdown. The component is published on npm as `simple-tree-component` (current version: 1.3.2) under the MIT license. Author: Christian Kotzbauer.

The component supports hierarchical node data with features including search/filtering, keyboard navigation, checkboxes (with optional recursive selection), drag-and-drop reordering, read-only mode, custom styling, and an event-based API.

## Tech Stack

- **Language:** TypeScript 5.4.5 (strict mode, target ES2015)
- **Module bundler:** Rollup 4.59.0 with `@rollup/plugin-typescript`
- **Output format:** UMD bundle (`dist/simple-tree-component.js`)
- **Minification:** Terser 5.46.0
- **Styles:** Sass 1.97.3 (SCSS syntax) with PostCSS 8.5.8 + Autoprefixer 10.4.27
- **Testing:** Jest 29.7.0 with ts-jest 29.4.6, jsdom environment
- **Linting:** ESLint 8.57.1 with `@typescript-eslint/parser` 7.18.0 and `@typescript-eslint/eslint-plugin` 7.18.0
- **Formatting:** Prettier 3.8.1
- **Task runner:** npm-run-all2 8.0.4 (`run-s` for sequential script execution)
- **Dev utilities:** chokidar 5.0.0 (file watching in dev mode), ts-node 10.9.2
- **Documentation:** Docsify (served from `docs/out/`), TypeDoc 0.25.13 with typedoc-plugin-markdown 3.17.1
- **Dependency management:** Renovate (config in `renovate.json`)
- **Security scanning:** Snyk (weekly via GitHub Actions)
- **No runtime dependencies** -- all devDependencies only

## Project Structure

```
simple-tree-component/
├── src/                          # Main source code
│   ├── index.ts                  # Entry point - exports `simpleTree` factory function
│   ├── factory.ts                # Creates tree instances based on mode
│   ├── typings.d.ts              # Public type declarations (re-exports for consumers)
│   ├── test-utils.ts             # Shared test helper functions
│   ├── tsconfig.json             # Source-specific TS config (ES2015 modules)
│   ├── data/
│   │   └── data-service.ts       # Core data layer - node CRUD, filtering, selection logic
│   ├── event/
│   │   └── event-manager.ts      # Pub/sub event system (subscribe, subscribeOnce, publish)
│   ├── types/
│   │   ├── instance.ts           # TreeInstance interface (public API), TreeModeNameMap
│   │   ├── options.ts            # BaseOptions, TreeConfiguration, defaults
│   │   ├── tree-node.ts          # InitTreeNode, TreeNode interfaces and defaults
│   │   ├── subscription.ts       # Subscription interface (dispose pattern)
│   │   └── rects.ts              # Rect interface, overlay calculation declarations
│   ├── ui/
│   │   ├── base-tree.ts          # Core tree rendering, search, collapse, checkboxes, DnD
│   │   ├── common-tree-logic.ts  # Abstract base class implementing TreeInstance<K>
│   │   ├── common-dropdown-tree-logic.ts  # Dropdown open/close, overlay positioning
│   │   ├── single-select-dropdown.ts      # SingleSelectDropdown mode
│   │   ├── multi-select-dropdown.ts       # MultiSelectDropdown mode (pillbox UI)
│   │   ├── tree-view.ts                   # TreeView mode (inline tree, no dropdown)
│   │   ├── key-event-handler.ts           # Keyboard navigation (arrows, enter, escape)
│   │   ├── drag-and-drop-handler.ts       # Native HTML5 drag-and-drop for node reordering
│   │   ├── overlay-placement.ts           # Dropdown positioning calculation
│   │   ├── ui-constants.ts                # CSS class names and event name constants
│   │   └── utils.ts                       # DOM helper functions, HTML escaping
│   ├── validation/
│   │   └── validation.ts         # Tree node array validation, uniqueness checks
│   ├── style/
│   │   ├── index.scss            # Main stylesheet (all component styles)
│   │   ├── colors.scss           # Color variables (overridable with !default)
│   │   ├── defaults.scss         # Size/spacing variables (overridable with !default)
│   │   └── mixins.scss           # SCSS mixins (chevrons, cross icon, text-overflow)
│   └── __tests__/
│       ├── index.spec.ts         # Initialization tests
│       ├── data-service.spec.ts  # DataService unit tests
│       ├── event.spec.ts         # EventManager tests
│       ├── selection.spec.ts     # Selection behavior tests
│       ├── ui-event.spec.ts      # UI event integration tests
│       ├── utils.spec.ts         # Utility function tests
│       ├── validation.spec.ts    # Validation logic tests
│       └── ui/
│           ├── ui-component.spec.ts       # UI component integration tests
│           └── overlay-placement.spec.ts  # Overlay positioning tests
├── config/
│   ├── rollup.ts                 # Rollup configuration (UMD output)
│   └── jest.json                 # Jest configuration
├── dist/                         # Build output (committed)
├── demo/                         # Aurelia-based demo application
├── docs/                         # Docsify documentation site
│   ├── *.md                      # Documentation pages
│   ├── build-docs.ts             # Documentation build script
│   ├── typedoc.json              # TypeDoc configuration
│   └── out/                      # Built documentation output
├── build.ts                      # Custom build script (Rollup + Sass + Terser + watch)
├── build-post.ts                 # Post-build: moves .d.ts files, copies typings
├── .github/workflows/            # CI/CD workflows
├── tsconfig.json                 # Root TS config (CommonJS, for build scripts)
├── tsconfig.declarations.json    # TS config for generating .d.ts files
├── tsconfig.typecheck.json       # TS config for type-checking all src/**/*.ts
├── .eslintrc.js                  # ESLint configuration
├── .prettierrc.js                # Prettier configuration
├── .editorconfig                 # Editor settings
├── renovate.json                 # Renovate bot configuration
├── index.template.html           # Dev server HTML template
└── package.json
```

## Architecture & Patterns

### Class Hierarchy (UI Layer)

```
CommonTreeLogic<K> (abstract, implements TreeInstance<K>)
├── CommonDropdownTreeLogic<K> (abstract, adds dropdown open/close/positioning)
│   ├── SingleSelectDropdown ("singleSelectDropdown" mode)
│   └── MultiSelectDropdown ("multiSelectDropdown" mode)
└── TreeView ("tree" mode)
```

Each mode class composes a `BaseTree` instance which handles the actual DOM rendering, search input, node collapse/expand, checkbox toggling, and drag-and-drop setup.

### Key Design Patterns

- **Factory pattern:** `src/factory.ts` -- `createSimpleTree()` selects the correct class based on the `mode` string.
- **Pub/Sub event system:** `EventManager` provides internal and external events. Internal events (prefixed with `_`) like `_nodeSelected`, `_escapePressed`, `_hoverChanged` coordinate between UI components. Public events (`selectionChanged`, `selectionChanging`, `nodeIndexChanged`) are exposed to consumers via `subscribe()`/`subscribeOnce()`.
- **Dispose/Subscription pattern:** All subscriptions return a `Subscription` object with a `dispose()` method for cleanup.
- **TypeScript conditional types:** `TreeModeNameMap` maps mode names to their return types (`TreeNode | null` for single-select, `TreeNode[]` for multi-select, etc.).
- **Composition over inheritance:** `BaseTree` is composed into each mode class rather than inherited.
- **Immutable copies:** `DataService.getNode()` and `getSelected()` return copies of nodes (via spread), not internal references.

### Data Flow

1. Consumer calls `simpleTree(selector, mode, options)`.
2. Factory creates the appropriate mode class.
3. Mode class creates `DataService` (data layer) and `EventManager` (event bus).
4. `BaseTree` renders the DOM and wires up click/keyboard/drag events.
5. User interactions publish internal events; mode classes handle them and publish public events.

## Build & Development

### Build Pipeline (`npm run build`)

Runs sequentially via `run-s`:
1. `build:pre` -- Removes `dist/` directory (rimraf)
2. `build:build` -- Executes `build.ts` via ts-node:
   - Rollup bundles `src/index.ts` into `dist/simple-tree-component.js` (UMD format)
   - Terser minifies to `dist/simple-tree-component.min.js`
   - Sass compiles `src/style/index.scss` to `dist/simple-tree-component.css` and `.min.css`
   - Copies SCSS source files to `dist/scss/` for consumers who want to customize variables
3. `build:types` -- Generates TypeScript declaration files into `dist/types/`
4. `build:post` -- Moves `.d.ts` files into `dist/types/`, copies `src/typings.d.ts` to `dist/typings.d.ts`

### Dev Mode (`npm start`)

Runs `build.ts --dev` which:
- Enables Rollup watch mode with sourcemaps
- Watches SCSS files for changes and rebuilds styles
- Auto-formats changed files with Prettier
- Copies `index.template.html` to `index.html` on changes

### Build Output

```
dist/
├── simple-tree-component.js       # UMD bundle
├── simple-tree-component.min.js   # Minified UMD bundle
├── simple-tree-component.css      # Compiled CSS
├── simple-tree-component.min.css  # Minified CSS
├── scss/                          # Raw SCSS source files (for variable overrides)
├── types/                         # TypeScript declaration files
└── typings.d.ts                   # Main type declaration entry
```

## Testing

- **Framework:** Jest 29.7.0 with ts-jest 29.4.6
- **Environment:** jsdom (simulates browser DOM)
- **Config file:** `config/jest.json`
- **Test location:** `src/__tests__/` and `src/__tests__/ui/`
- **Test helpers:** `src/test-utils.ts` provides `initialize()`, `beforeEachTest()`, `createInstance()`, `createTreeNode()`, `simulate()`, and assertion helpers
- **Total test lines:** ~2,781 lines across 9 test files
- **Coverage:** Generated via `--coverage` flag, output to `coverage/` directory; reported to Codecov in CI

### Test Files

| File | Tests |
|------|-------|
| `index.spec.ts` | Initialization, default options, mode selection |
| `data-service.spec.ts` | Node CRUD, filtering, selection, collapse |
| `event.spec.ts` | EventManager pub/sub, subscribeOnce |
| `selection.spec.ts` | Selection behavior across modes, checkbox recursion |
| `ui-event.spec.ts` | UI event integration (keyboard, clicks) |
| `utils.spec.ts` | HTML escaping, regex escaping |
| `validation.spec.ts` | Node validation, uniqueness checks |
| `ui/ui-component.spec.ts` | Full UI component integration tests |
| `ui/overlay-placement.spec.ts` | Overlay positioning calculations |

### Running Tests

```bash
npm test                    # Runs typecheck + unit tests sequentially
npm run test:typecheck      # TypeScript type checking only (no emit)
npm run test:unit           # Jest unit tests with coverage
```

## Linting & Code Style

### ESLint (`.eslintrc.js`)

- Parser: `@typescript-eslint/parser` (ecmaVersion 2018, sourceType module)
- Extends: `plugin:@typescript-eslint/recommended`, `prettier`
- Key rules:
  - `@typescript-eslint/naming-convention`: enforces camelCase for variables (with eslint-disable comments used for exceptions like `DEV_MODE`)
  - `@typescript-eslint/no-explicit-any`: disabled (0)
  - `@typescript-eslint/explicit-function-return-type`: disabled (0)
- Ignores: `demo/`, `dist/`

### Prettier (`.prettierrc.js`)

- `trailingComma: 'es5'`
- `printWidth: 130`

### EditorConfig (`.editorconfig`)

- `indent_style: space`
- `indent_size: 4` (2 for JSON files)
- `end_of_line: lf`
- `charset: utf-8-bom`
- `trim_trailing_whitespace: true`
- `insert_final_newline: true`

### Observed Conventions

- 4-space indentation throughout TypeScript and SCSS
- Double quotes for strings in TypeScript
- No semicolons are omitted -- semicolons are always used
- CSS class names use kebab-case (e.g., `simple-tree-node-wrapper`)
- TypeScript class names use PascalCase, methods and variables use camelCase
- Internal event names are prefixed with `_` (e.g., `_nodeSelected`)
- `eslint-disable` comments are used sparingly and with specific rule names

## CI/CD

### GitHub Actions Workflows (`.github/workflows/`)

All workflows use reusable workflows from `ckotzbauer/actions-toolkit`.

#### `main.yml` -- Build (triggers on all pushes and PRs)
Three parallel jobs:
1. **build** -- `npm ci`, `npm run build`, `npm test`, reports coverage to Codecov
2. **docs** -- `npm ci`, `npm run build:docs` (validates documentation builds)
3. **lint** -- `npm ci`, `npm run lint`

#### `release.yml` -- Create Release (manual trigger via `workflow_dispatch`)
- Input: version number
- Runs: `npm ci`, build, build:docs, test
- Publishes to npm, creates GitHub release with `dist/` as artifact
- Triggers `deploy-docs` workflow after release

#### `deploy-docs.yml` -- Deploy Documentation (manual trigger)
- Builds documentation with `npm run build:docs`
- Deploys `docs/out/` to `gh-pages` branch via SSH

#### `update-snyk.yml` -- Snyk Security Scan
- Runs weekly (Monday at 12:00 UTC) and on manual trigger
- Executes `snyk monitor`

## Key Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Full production build (clean, bundle, types, post-process) |
| `npm start` | Dev mode with watch (Rollup watch + SCSS watch + auto-format) |
| `npm test` | Run typecheck and unit tests |
| `npm run test:unit` | Jest unit tests with coverage |
| `npm run test:typecheck` | TypeScript type checking only |
| `npm run lint` | ESLint on all TypeScript files |
| `npm run format` | Prettier formatting on all TypeScript files |
| `npm run build:docs` | Build documentation (TypeDoc API docs + Docsify) |
| `npm run docs:serve` | Serve documentation locally via Docsify |

## Important Conventions

- **No runtime dependencies:** The component must remain zero-dependency. All packages in `package.json` are devDependencies.
- **UMD output:** The bundle exports a single default export (`simpleTree` function) in UMD format, usable via script tags or module imports.
- **Three component modes:** `"tree"`, `"singleSelectDropdown"`, `"multiSelectDropdown"` -- the mode string determines the class instantiated and the type of `getSelected()` return value.
- **SCSS customization:** All SCSS variables use `!default` flags, allowing consumers to override colors, sizes, and spacing by importing the SCSS source from `dist/scss/` before the component styles.
- **Node values must be unique:** The `value` property on tree nodes serves as a unique identifier. Validation enforces this.
- **Copies on read:** Public API methods that return nodes (`getNode()`, `getSelected()`) return copies, not internal references.
- **Event naming:** Public events are `"selectionChanged"`, `"selectionChanging"`, `"nodeIndexChanged"`. Internal events are prefixed with `_`.
- **Branch:** Main branch is `main`.
- **Contributing:** Follows guidelines at `https://github.com/ckotzbauer/.github/blob/main/CONTRIBUTING.md`.
- **Releases:** Manual via GitHub Actions `workflow_dispatch` with a version input. Published to npm.
- **Dependency updates:** Managed by Renovate bot (weekly schedule, demo/ directory ignored).
