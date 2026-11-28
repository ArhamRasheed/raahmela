# Open decisions and priorities

Last updated 2026-11-27. These are the things the owner still has to decide or supply. Each one says why it matters, what the page does now, and what changes once it's settled. When you settle one, record the answer here and move it to **Decided** at the bottom.

## P0: needed before the page goes live

### 1. Production domain
- **Why:** the canonical URL, social preview images, `robots.txt`, `sitemap.xml` and structured data all need an absolute URL.
- **Now:** without `SITE_URL`, the page has no canonical URL, the sitemap is empty and no JSON-LD is output. The Figma design hints at sairvan.com, but that hasn't been confirmed.
- **When decided:** set `SITE_URL=https://…` in the hosting environment and rebuild.

### 2. Where signups are stored
- **Why:** until this is set, nobody can join early access or register as a partner.
- **Now:** both forms show "Signup isn't open yet" and save nothing.
- **Options:**
  - Google Sheet through Apps Script (free, quickest)
  - Zapier or Make into a CRM or sheet
  - Your own API
- **When decided:**
  - Set `SIGNUP_WEBHOOK_URL`, and optionally `SIGNUP_WEBHOOK_SECRET`.
  - The receiver must accept a JSON POST and return a 2xx status.
  - The data format is in `context.md`.

### 3. Privacy policy and legal entity
- **Why:** the forms collect emails, names, cities and WhatsApp numbers. They promise to use these only to contact people about Sairvan.
- **Now:** there is no privacy page, no terms and no entity name in the footer.
- **Decide:**
  - Is that use-of-data promise accurate?
  - Who is the data controller, by legal name?
  - Should a privacy page be linked from the forms and footer?

### 4. Confirm the photo sources and licences
- **Why:** using an image without the right licence is a legal risk. CC BY-SA requires correct attribution.
- **Now:** these credits are shown on the page, but none could be verified online:

  | Photo | Credit shown | Source and licence |
  | --- | --- | --- |
  | Passu | Hasnain Ayaz | Unsplash |
  | Skardu | Moez Mustafa | Unsplash |
  | Lahore | Aymenrizwan | Wikimedia Commons, CC BY-SA 3.0 |

- **When decided:** confirm each source page, or swap in photos you own. Update `app/content.ts`.

## P1: unlocks stronger marketing copy

Until each of these is decided, the page avoids saying anything about it. The FAQ says it's still being worked out.

### 5. Payment model
- **Question:** do travelers pay through Sairvan, or directly to the agency or agent?
- **Affects:** the FAQ, the how-it-works steps, and any customer-protection wording.

### 6. Free for travelers?
- **Question:** is the app free for travelers?
- **Now:** the design said it was, but I removed that claim because it isn't confirmed.

### 7. Partner review process
- **Question:** what checks will agencies and agents actually pass before they can join? Examples: identity, business registration, references, a trial trip.
- **Now:** the page says only that the process is being finalised and will be published before launch.
- **When decided:** the word "trusted" or "verified" can go back into the H1 and the trust section, but only if the checks really happen.

### 8. Refunds, cancellations and disputes
- **Question:** what happens when a trip goes wrong, and who is responsible?
- **Now:** the design's "If something goes wrong" section was all placeholders, so it was removed. The FAQ says policies will be published before launch.

### 9. Partner fee or commission
- **Question:** what will agencies and agents pay, and when?
- **Affects:** the partner section and partner onboarding emails.

### 10. Public contact details
- **Question:** which email, WhatsApp number and social handles should be published, if any?
- **Now:** all are omitted because none were confirmed.

## P2: assets and polish

### 11. Real app screenshots
- **Why:** the hero phone and plan card are mock-ups labelled "Example". Swap them for real screens once the app's UI is final.

### 12. Vector logo
- **Why:** the Urdu wordmark is a raster PNG cut from `design-reference/sairvan.jpg`. An SVG would stay sharp at every size, and the favicon and social images could be regenerated from it.

### 13. Urdu version of the page
- **Why:** the design had an EN/اردو toggle. It was removed because no Urdu copy exists yet.
- **Decide:** is an Urdu version wanted for launch or later? Who will write or translate it?

### 14. Rename the code folder
- **Why:** the code still lives in `Raahmela-landing-page/`.
- **Decide:** rename it to match the brand? First check that the hosting or deployment setup doesn't depend on the path.

## Decided

_None yet._
