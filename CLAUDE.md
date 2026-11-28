# CLAUDE.md

Guidance for Claude Code in this repo. Product background is in [context.md](context.md), and open decisions are in [DECISIONS.md](DECISIONS.md). Read both before changing copy.

## Layout

- `Raahmela-landing-page/`: the Sairvan pre-launch landing page (Next.js). The folder keeps its old name; the product is now **Sairvan** (سیروان). Run every npm command from this folder.
- `design-reference/`: Figma exports (`desktop.png`, `mobile.png`), the logo source (`sairvan.jpg`) and notes. Use it for reference only; the app never imports from it.

## Commands (run in `Raahmela-landing-page/`)

```
npm ci
npm run build       # next build
npm start           # next start, http://localhost:3000
npm run dev         # preview.mjs: also runs `next start`, so build first
npm run typecheck   # tsc --noEmit
```

- There is no linter and no test suite. Verify changes with `npm run typecheck` and `npm run build`, then check the page in a browser at 390, 768, 1024 and 1440px.
- If type checking fails on stale `.next/types`, run a fresh build.
- `preview.mjs` is part of the existing deployment setup. Leave it in place.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript 7, Node 24.
- Next 16 has API changes. Before relying on an API, check the bundled docs in `node_modules/next/dist/docs`. For example, `priority` is deprecated in favour of `preload`, or `loading="eager"` with `fetchPriority="high"`.
- No CSS framework. All styles are in `app/style.css`, with design tokens on `:root`.
- Fonts are self-hosted with `next/font/local` from `app/fonts`: DM Sans (`--font-sans`) and Instrument Serif (`--font-serif`).

## Where things live

| File | Purpose |
| --- | --- |
| `app/page.tsx` | All page sections, plus JSON-LD (emitted only when `SITE_URL` is set) |
| `app/content.ts` | Copy and data: photos and credits, destinations, principles, steps, FAQs |
| `app/layout.tsx` | Metadata, fonts, viewport |
| `app/site.ts` | `siteUrl`, read from `SITE_URL` |
| `app/actions.ts` | Server actions for both forms; they POST JSON to `SIGNUP_WEBHOOK_URL` |
| `app/components/SignupForms.tsx` | Early-access and partner forms (`useActionState`) |
| `app/components/HeroSlideshow.tsx` | Hero photo crossfade: 6 s per slide, pause control, respects reduced motion |
| `app/robots.ts`, `app/sitemap.ts` | Both depend on `SITE_URL` |
| `app/icon.png`, `apple-icon.png`, `opengraph-image.jpg`, `twitter-image.jpg` | File-based metadata |

## Environment

See `Raahmela-landing-page/.env.example`.

- `SITE_URL` must be set before the production build.
- `SIGNUP_WEBHOOK_URL` and the optional `SIGNUP_WEBHOOK_SECRET` control signups. Without the webhook URL, forms show "Signup isn't open yet" and save nothing.
- Never commit `.env*` files other than `.env.example`.

## Rules for this project

- **Never simulate a successful signup.** Show success only when the webhook returns 2xx.
- **The app is pre-launch.** The primary CTA is "Join early access". Do not add app-store badges or QR codes, and do not say the app is available.
- **Partners include travel agencies and independent agents.** Company or business name stays optional.
- **Make no unsupported claims.** Do not invent reviews, partner logos, user counts, verification steps, trial trips, refund or customer-protection promises, or contact details. If copy needs a business decision, ask the user. Open decisions are listed in `DECISIONS.md`.
- **Label anything illustrative as an example.** This applies to prices, the phone mock-up and the plan card (use `<ExampleTag />`).
- **Photos must be licensed and credited.** Credits are in `content.ts` and render on the page. The Lahore photo is CC BY-SA 3.0 and must keep its credit and licence link.
- **Keep accessibility intact:**
  - one H1
  - visible focus (green on light backgrounds, gold on dark)
  - `aria-invalid` and `aria-describedby` on form fields
  - reduced-motion support (no autoplay, no reveal animations)
  - the hero copy comes before the slideshow in source order
- **Scroll reveals are CSS only** (`animation-timeline: view()` inside `@supports` and `prefers-reduced-motion: no-preference`). Content must stay visible when they are unsupported.
- **Do not commit, push or deploy unless the user asks.** Work on `main` only if the user says so; otherwise create a branch first.
