# Project context: Sairvan

Last updated 2026-11-27.

## What Sairvan is

Sairvan (سیروان) is an app in development. Travelers in Pakistan describe the trip they want: where, when, where they're leaving from, group size and budget. Local travel agencies and independent agents reply with plans that show the price in PKR and what's included. The traveler chooses who to talk to.

The project was previously called **Raahmela**. The code folder `Raahmela-landing-page/` still uses that name, but every other trace of the old brand has been removed.

## Current state

- A **pre-launch landing page** is built. It hasn't been committed, pushed or deployed.
- It was built from Figma file `BxttkshJNW9FUOZhms7set`:
  - desktop frame: node `80:787`, "Sairvan V5 / Pre-launch · Desktop 1440"
  - mobile frame: node `78:781`, "Sairvan V5 / Pre-launch · Mobile 390"
- Its goals are to collect:
  - traveler early-access emails
  - interest from partners (travel agencies and independent agents)
- Brand:
  - Urdu wordmark logo (raster only for now)
  - colours: deep green `#153e34`, cream `#f7f3ea`, gold `#c9a46a`
  - fonts: Instrument Serif for headings, DM Sans for body text
- Hero photos, in order:
  1. Passu Cones, Hunza
  2. Skardu
  3. Wazir Khan Mosque, Lahore

## Page sections

Hero (slideshow and early-access form) → What we're building → How it will work (with an example plan card) → Destinations (Hunza, Skardu, Lahore) → For agencies & agents (partner form) → FAQ → Final early-access CTA → Footer.

## Places where the page deliberately differs from the Figma design

- The H1 avoids the word "trusted", because no vetting process exists yet.
- App-store badges, QR codes and the "free app" claim were removed.
- The "We check every company" and trial-trip items were removed, and so was the refund/"If something goes wrong" section. These subjects are now covered by honest FAQ answers.
- The design had bracketed placeholders, sample-data tags, unconfirmed contact details, a legal-entity line and an EN/اردو toggle. All are removed.
- The Lahore caption was corrected from Badshahi Mosque to **Wazir Khan Mosque**, which is what the photo shows.
- Destination cards are not links.

## Decisions waiting on the owner

The prioritised list of open decisions is in [DECISIONS.md](DECISIONS.md). It covers the domain, signup storage, privacy and legal, photo credits, the payment model, partner review, policies, fees, contact details and assets. Until a decision is made, don't write copy that implies an answer.

## Signup payloads

Both forms send a JSON POST to the webhook:

```json
{ "type": "traveler", "email": "…", "source": "hero | final", "submittedAt": "ISO date" }
{ "type": "partner", "partnerType": "travel-agency | independent-agent", "name": "…", "business": "", "city": "…", "whatsapp": "", "email": "…", "submittedAt": "ISO date" }
```

## Owner preferences

- Do not deploy or push unless asked.
- Never fake a successful signup. If a backend isn't configured, say what's missing.
- Never invent reviews, partner logos, user counts or operational claims.
- Label illustrative prices and previews as examples.
