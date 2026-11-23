# Raahmela landing page

Use desktop.png (1440 × 1528) and mobile.png (390 × 1780) as visual references. These previews were reconstructed from the approved frame measurements. Text rendering, icons and image crops may differ slightly from Figma. Implement the content as responsive, accessible HTML.

## Identity and assets

The headline is “Pakistan, in good company.” The product connects travellers in Pakistan with travel agencies and independent agents. Use cypress #153E34 for primary type and actions, limestone #FAF7EF for the canvas, antique brass #C9A76A for accents, #52665B for secondary text and #DCD8C8 for dividers. Use Instrument Serif regular and italic for headlines, DM Sans for UI, and the supplied outlined wordmarks for the logo. Font licences accompany the included fonts.

The three WebP files reproduce the imagery used in the approved design. Hunza and Hala are illustrative AI-generated scenes. Lahore is the photographic portion of the existing campaign image. Use the separate files for responsive images. Serve only the fonts actually used on a page.

## Layout and interaction

Desktop has 76px side gutters at 1440px. The full-width hero is 698px tall and has a dark overlay behind the left-aligned type. Its 1288 × 106 search panel begins at y=606. Below it is a two-column directory. On mobile use 20–22px gutters, a 506px hero, an overlapping destination field and search button, and a single-column directory. Scale fluidly between the references.

“Find a specialist” filters the two sample listings by destination and the filters available on screen. Link each card to its own profile with an accessible return link. Identify the agency or seller separately from the host. Use illustrative prices and clearly label the sample profiles.

| Profile | Experience | Hosted by | Languages | Duration | From |
| --- | --- | --- | --- | --- | --- |
| Old City Walks, travel agency | Inside the Walled City, Lahore | Ayesha and the Old City Walks team | English, Urdu | 3 hours | PKR 2,500 per person |
| Sana Malik, independent agent | Inside an ajrak workshop, Hala, Sindh | A local artisan in Hala | English, Urdu, Sindhi | 2 hours | PKR 4,500 per person |

## Implementation and SEO

Keep the existing project stack. In an empty repo use Next.js App Router and TypeScript. Include crawlable landing-page copy and real profile links in the initial HTML, semantic headings, a descriptive title and meta description, social preview metadata, responsive images, meaningful alt text and a configurable production site URL for canonical and sitemap generation. Keep sample profile URLs out of the sitemap and mark those profiles noindex. Reserve image dimensions and prioritise the hero image. Publish the “Pakistan’s first” claim only after verification.

Run the production build, test the search and both profiles, inspect the rendered HTML, and compare browser screenshots at 390px and 1440px. Frame identifiers for future comparison are desktop 3:22, mobile 5:143 and identity 3:64 in Figma file YLN9pTWbVOPbSO4jzSTt4H.
