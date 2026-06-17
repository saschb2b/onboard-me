# CLAUDE.md

Guidance for agents working in this repo. Read it before making changes.

## What this is

onboard-me explains an unfamiliar field through one the reader already knows ("I am a React Developer and I want to know about Android Development"). It renders structured translation guides: a Rosetta table of concept mappings, mental-model shifts, gotchas, a first-run walkthrough, packages, and resources.

The core design bet: the UI is field-agnostic. Components render a `Guide` object and know nothing about React or Android specifically. Adding a field or a guide is a data change, not a component change.

## Stack

- React 19 (React Compiler era), TypeScript in strict mode, Base UI for interactive primitives, Vite 8.
- No CSS framework. Styling is hand-written CSS driven by design tokens.
- Requires Node 20+.

## Commands

```bash
npm run dev        # dev server at http://localhost:5173
npm run build      # tsc -b (typecheck) then vite build
npm run preview    # serve the production build
npm run typecheck  # types only, no emit
```

## Architecture

- `src/data/types.ts` is the contract. `Guide` is the shape everything renders from. Change it and the renderer and all guides follow.
- `src/data/fields.ts` holds the selectable `FIELDS` catalog and `FIELD_ITEMS` (the value-to-label map Base UI's `Select` expects).
- `src/data/guides/` holds one curated `Guide` per file. `index.ts` is the registry, keyed `source__target`, with `getGuide()` lookup.
- `src/components/` is presentational. `FieldSelect` wraps Base UI's `Select`; `Landing` is the two-select opener; `GuideView` renders a `Guide`; `GuideMissing` is the not-yet-curated state and the seam where generated guides would later stream in.
- `src/App.tsx` owns hash routing (`#/source/target`) and the view switch. Guides are shareable by URL.
- `src/styles/`: `tokens.css` (design tokens), `global.css` (base and the `.glass` surface), `components.css` (everything else).

### Conventions that bite if ignored

- Base UI ships unstyled. Style its parts through their data attributes (`data-popup-open`, `data-highlighted`, `data-selected`, `data-starting-style`). Do not reach into internals.
- `verbatimModuleSyntax` is on. Type-only imports must use `import type`.
- CSS is imported for side effects, so `src/vite-env.d.ts` (the `vite/client` reference) must stay.
- The source field renders on light glass and the target field on the dark indigo surface. That contrast is meaningful ("where you are" vs "where you're going"), not decorative. Keep it.

## Adding a guide

1. Make sure both fields exist in `src/data/fields.ts`.
2. Copy `src/data/guides/react-to-android.ts` and fill every section from the source field's point of view. The reader is fluent there, so map to what they already know.
3. Register the guide in `src/data/guides/index.ts`.

It then appears as a chip on the landing page and resolves at `/#/<source>/<target>`.

## Skills

Six skills are installed under `.claude/skills/`. Use them, do not reinvent what they cover.

- **javascript-ecosystem**: before adding or upgrading a dependency, or when scaffolding. Check the installed version first; the training-data default is usually stale. This repo already pins current-stable majors.
- **react-compiler**: when writing or reviewing any component. The compiler handles memoization. Do not add `useMemo`, `useCallback`, or `React.memo` by reflex, and flag existing manual memoization as suspect.
- **react-stinky**: when reviewing a component, hook, or module for maintainability (prop and API design, state and effects, structure, a11y, TypeScript discipline). Defers memoization to react-compiler and color literals to the token rule below.
- **no-slop**: for any human-facing text. That includes the README, the rendered guide strings in `src/data/`, UI copy, code comments, and commit and PR messages. No em dashes, lead with the point, plain words.
- **agent-browser**: to verify a UI change by launching the app and taking a screenshot, rather than asserting it works. The preferred tool for any visual check.
- **autopilot**: for open-ended "keep improving this" sessions where you pick the work yourself.

Color discipline: every color must resolve to a token in `src/styles/tokens.css` (referenced via `var(...)`, with `rgb(... / alpha)` for transparency). No hex, `rgba()`, or named colors in component or CSS files. This matches the theme-colors practice; `tokens.css` is the single source of truth.

## Quality gates

Run these before considering a change done. They are ordered cheapest-first.

**Every change**

- [ ] `npm run typecheck` is clean (strict mode, no `any` escape hatches).
- [ ] `npm run build` succeeds.

**Touched a component, hook, or style**

- [ ] react-compiler: no manual memoization added; existing manual memoization reviewed.
- [ ] react-stinky pass on the changed component or hook.
- [ ] Every color resolves to a `tokens.css` token. No literals.
- [ ] agent-browser: launch the app and screenshot the affected view. Confirm it renders and the glass-and-gradient look holds. For an interactive change, drive the interaction (open the select, follow a guide link).

**Touched prose** (README, guide content in `src/data/`, UI copy, comments)

- [ ] no-slop pass. No em dashes, no throat-clearing, no slop vocabulary.

**Touched dependencies**

- [ ] javascript-ecosystem: versions are current stable, and the change follows the current paradigm for that library.

Do not report a change as working on the strength of a clean build alone. A UI change is verified when it has been seen rendering, not when it compiles.
