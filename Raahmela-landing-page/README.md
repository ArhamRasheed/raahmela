# Sairvan pre-launch landing page

Next.js App Router site for Sairvan (سیروان), a travel app that will connect travelers with local travel agencies and independent agents in Pakistan. Built from the Figma frames "Sairvan V5 / Pre-launch · Desktop 1440" and "· Mobile 390", adapted for pre-launch: the primary action is "Join early access", not app downloads.

## Run

```
npm ci
npm run build
npm start          # http://localhost:3000
npm run typecheck
```

## Configuration

Copy `.env.example` and set:

| Variable | Required | Purpose |
| --- | --- | --- |
| `SITE_URL` | Before the production build | Canonical URL, absolute Open Graph and Twitter images, `robots.txt` sitemap line, `sitemap.xml` and JSON-LD. Without it the page has no canonical URL and the sitemap is empty. |
| `SIGNUP_WEBHOOK_URL` | To accept signups | Server-side endpoint that stores signups. Both forms post JSON to it. Without it, submissions are rejected with a visible "Signup isn't open yet" message. Success is never shown unless the webhook returns 2xx. |
| `SIGNUP_WEBHOOK_SECRET` | Optional | Sent as `Authorization: Bearer …`. |

Any receiver that accepts a JSON POST works, for example a Google Apps Script web app writing to a Sheet, Zapier or Make, or your own API. Payloads:

```json
{ "type": "traveler", "email": "…", "source": "hero | final", "submittedAt": "ISO date" }
{ "type": "partner", "partnerType": "travel-agency | independent-agent", "name": "…", "business": "", "city": "…", "whatsapp": "", "email": "…", "submittedAt": "ISO date" }
```

## Structure

- `app/page.tsx` – page sections and JSON-LD (Organization and WebSite, only when `SITE_URL` is set)
- `app/content.ts` – photos, credits, destinations, steps and FAQ copy
- `app/components/HeroSlideshow.tsx` – crossfading hero photos (6 s, pause control, no autoplay with reduced motion; later photos load only when needed)
- `app/components/SignupForms.tsx` and `app/actions.ts` – early-access and partner forms (server actions, validation, honeypot)
- `app/icon.png`, `app/apple-icon.png`, `app/opengraph-image.jpg`, `app/twitter-image.jpg` – favicon and social previews
- `public/assets/sairvan-logo.png` – Urdu wordmark with transparent background, from the supplied logo

## Photo credits

Shown on the page next to each photo. The Lahore photo is CC BY-SA 3.0 and must keep its attribution and licence link.

- Passu Cones, Hunza – Hasnain Ayaz / Unsplash
- Skardu – Moez Mustafa / Unsplash
- Wazir Khan Mosque, Lahore – Aymenrizwan, CC BY-SA 3.0 (cropped)
