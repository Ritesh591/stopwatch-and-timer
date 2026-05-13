# ChronoLab — Stopwatch & Timer

A polished, responsive **Stopwatch and Countdown Timer** app built with React 19, TypeScript, Vite, and Tailwind CSS v4. Features a working light/dark theme toggle (persisted across reloads) and drift-free time tracking using `requestAnimationFrame` + timestamps.

## Features

- **Stopwatch**
  - Start, Pause, Resume, Reset
  - Centisecond precision (`MM:SS.cc`)
- **Countdown Timer**
  - Custom duration via hours / minutes / seconds inputs (validated, capped at 99h)
  - Start, Pause, Resume, Reset
  - Auto-stops at zero with a clear "Time's up!" state
  - Format adapts: `MM:SS` or `HH:MM:SS`
- **Theme**
  - Explicit light / dark toggle with smooth transitions
  - Persists via `localStorage`; respects `prefers-color-scheme` on first visit
  - No flash of unstyled content (inline pre-paint script in `index.html`)
- **UX**
  - Animated accent ring while running
  - `aria-live` time readouts for screen readers
  - Accessible tablist for switching modes
  - Fully responsive (mobile → desktop)

## Tech stack

| Layer       | Choice                                          |
| ----------- | ----------------------------------------------- |
| Framework   | [React 19](https://react.dev) + TypeScript      |
| Build tool  | [Vite 8](https://vite.dev)                      |
| Styling     | [Tailwind CSS v4](https://tailwindcss.com) (`@tailwindcss/vite`) |
| State       | Local React hooks (`useState` + `useRef` + rAF) |
| Linting     | ESLint + typescript-eslint                      |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) ≥ 20, or [Bun](https://bun.sh) ≥ 1.0

### Install

```bash
bun install
```

> Using npm or pnpm? Replace `bun` with `npm` / `pnpm` in any command below.

### Run the dev server

```bash
bun run dev
```

Vite will start on [http://localhost:5173](http://localhost:5173) (or the next free port).

### Production build

```bash
bun run build
```

Outputs static assets to `dist/`.

### Preview the production build

```bash
bun run preview
```

### Lint

```bash
bun run lint
```

## Project structure

```
stopwatch-and-timer/
├── index.html              # Anti-FOUC theme bootstrap script + root markup
├── vite.config.ts          # Vite + @tailwindcss/vite plugin
└── src/
    ├── main.tsx            # React entry
    ├── App.tsx             # Shell: header, hero, mode tabs, panels, footer
    ├── index.css           # Tailwind v4 import + @theme tokens (light + dark)
    ├── hooks/
    │   ├── useStopwatch.ts # idle | running | paused state machine
    │   ├── useTimer.ts     # idle | running | paused | finished countdown
    │   └── useTheme.ts     # localStorage-backed light/dark toggle
    ├── lib/
    │   └── formatTime.ts   # formatStopwatch / formatTimer helpers
    └── components/
        ├── ModeTabs.tsx       # Accessible Stopwatch/Timer tablist
        ├── StopwatchPanel.tsx
        ├── TimerPanel.tsx
        ├── TimeDisplay.tsx    # Large monospace tabular-nums display
        ├── ControlButton.tsx  # primary / secondary / danger variants
        └── ThemeToggle.tsx    # Sliding pill toggle with sun/moon icons
```

## How time tracking works

Rather than using `setInterval` (which drifts and can pause when the tab is inactive), both hooks anchor to wall-clock time:

```ts
// Conceptual
runStartedAt = Date.now();      // when current run segment began
baseElapsedMs = 0;              // accumulated time from prior segments

// On each animation frame
elapsedMs = baseElapsedMs + (Date.now() - runStartedAt);

// On pause
baseElapsedMs += Date.now() - runStartedAt;
// rAF loop is cancelled until resume
```

This keeps the display accurate even after the tab is backgrounded and re-foregrounded.

## Theme system

- `useTheme` toggles `class="dark"` on `<html>` and writes to `localStorage`.
- `src/index.css` defines two sets of CSS custom properties under `@theme` (light defaults) and `.dark` (overrides), so Tailwind utilities like `bg-(--color-surface)` automatically switch themes.
- An inline script in `index.html` reads the saved preference (or system preference) **before** React mounts, preventing a flash of the wrong theme.

## Customization

- **Accent color** — change `--color-accent` (and the dark-mode override) in [`src/index.css`](src/index.css).
- **Stopwatch precision** — edit `formatStopwatch` in [`src/lib/formatTime.ts`](src/lib/formatTime.ts) to show milliseconds instead of centiseconds.
- **Timer max** — adjust the `max` props on `DurationInput` instances in [`src/components/TimerPanel.tsx`](src/components/TimerPanel.tsx).

## License

MIT — free to use, modify, and distribute.
