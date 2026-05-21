# LawdMemory

Landing page and documentation site for a hypothetical product called **LawdMemory** — a "persistent memory layer for AI engineering teams." This is a **frontend-only demo**. There is no backend, no actual memory layer, and no real product behind the UI.

The repo exists to demonstrate a polished monochrome marketing site built with the current Next.js + Tailwind v4 stack.

## Stack

- **Next.js 16** (App Router, React Server Components)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** (no `tailwind.config.ts` — uses `@theme inline` in `globals.css`)
- **Framer Motion 12** — section reveals, modal transitions, floating animations
- **@xyflow/react 12** — interactive memory graph
- **Recharts 3** — analytics charts
- **Lucide React** — icons

## Routes

| Path     | What it is                                                         |
| -------- | ------------------------------------------------------------------ |
| `/`      | Landing page (hero, problem, how-it-works, graph, demo, features, analytics, API, CTA) |
| `/docs`  | Single-page documentation with sidebar nav, scroll-spy, and search filter |

## Project layout

```
app/
  globals.css          design tokens (@theme, @layer base/components/utilities)
  layout.tsx           root layout, mounts <Toaster /> and <SignupDialog />
  page.tsx             landing page (composes section components)
  docs/page.tsx        documentation page (sidebar + content + TOC)

components/
  Navbar.tsx           sticky top nav with mobile menu
  Footer.tsx           multi-column footer with grouped links
  Logo.tsx             inline SVG logo
  docs/
    CodeBlock.tsx      code block with chrome + copy button
  sections/            landing-page sections, one per file
    Hero.tsx
    Marquee.tsx
    Problem.tsx
    HowItWorks.tsx
    MemoryGraph.tsx    React Flow graph with custom node component
    QueryDemo.tsx      animated terminal with typewriter
    Features.tsx
    Analytics.tsx      Recharts area/bar/line charts
    ApiSection.tsx     tabbed code-snippet browser
    FinalCTA.tsx
  ui/
    Background.tsx     <Spotlight />, <GridLayer />, <ParticleField /> (canvas)
    CopyCommand.tsx    clickable terminal command, copies to clipboard
    SectionHeader.tsx  reusable section header (eyebrow + title + description)
    SignupDialog.tsx   modal with email/org form; singleton openSignup() API
    Toast.tsx          pub-sub toast system; call toast("msg") from anywhere

lib/
  utils.ts             cn() — clsx + tailwind-merge
```

## Design system

Defined in [`app/globals.css`](app/globals.css):

- **Palette** — pure black background, white text, grayscale only. No colored gradients.
- **Component classes** — `.glass`, `.glass-strong`, `.card-matte`, `.btn-primary`, `.btn-secondary`, `.eyebrow`, `.window-chrome`, `.shimmer`
- **Utilities** — `.glow-soft` / `.glow-mid` / `.glow-strong`, `.grid-bg`, `.dot-bg`, `.mask-radial`, `.text-grad`, `.cursor-blink`, `.pulse-soft`, `.marquee-track`
- **Prose styles** (`.doc-body`) for the docs page

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build (Turbopack)
npm run start        # serve production build
npm run lint         # eslint
```

Requires Node `>=20.19` (the included `eslint-visitor-keys` peer warns on 20.17).

## What is real vs. mocked

| Element                          | Behavior                                                        |
| -------------------------------- | --------------------------------------------------------------- |
| Signup form                      | Fake 700 ms delay, then closes modal and fires a success toast. No data is sent anywhere. |
| "Deploy" / "Get Access" buttons  | Open the signup modal (same fake flow).                         |
| Install commands (`npx create-lawdmemory@latest …`) | Copy to clipboard. The package does not exist on npm. |
| Stats (`142K memories indexed`, `48 repos`, `3ms`, `99.9%`) | Hardcoded display values.                          |
| Marquee logos                    | Text-only list of integration names; not real integrations.     |
| Memory graph                     | Static React Flow nodes/edges. Drag/zoom/pan work; data does not change. |
| Query demo                       | Pre-scripted typewriter responses keyed to each sample query.   |
| Analytics charts                 | Static seed data, no API.                                       |
| API code snippets                | Display-only examples. The described endpoints do not exist.    |
| Docs page                        | All content is written for the demo; not generated from an API. |
| Footer placeholder links         | Fire a toast explaining the link is a placeholder.              |
| GitHub icon                      | Fires a toast. No repo is linked yet.                           |

## Notes & gotchas

- **Tailwind v4** — there is no `tailwind.config.ts`. Theme tokens live in `globals.css` under `@theme inline`. Custom classes are scoped with `@layer components` / `@layer utilities` so Tailwind utilities can still override them.
- **`background-color` vs `background`** — `.glass` uses `background-color` (not the shorthand) so `bg-gradient-*` and other utilities still apply on top.
- **`lucide-react@^1.16.0`** is older and does **not** export `Github` or `Twitter` icons. The codebase uses `GitFork`, `ExternalLink`, and `Share2` as substitutes.
- **Toast and SignupDialog** use a tiny pub-sub pattern (no React context). Mount each component once near the root, then call `toast("msg")` or `openSignup()` from anywhere.
- **Scroll-spy** in `/docs` uses `IntersectionObserver` with `rootMargin: "-100px 0px -65% 0px"` to pick the active section.
- **Mobile docs nav** is a sticky native `<select>` with `<optgroup>` per section group (sidebar is hidden on `<lg`).

## License

No `LICENSE` file is currently included. The site's UI copy mentions MIT, but until a license file is added the repo is effectively all-rights-reserved.
