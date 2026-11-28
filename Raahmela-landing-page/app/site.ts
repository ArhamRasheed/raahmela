/**
 * Public HTTPS origin of the production site, e.g. https://example.com.
 * Drives canonical URLs, absolute social preview images, the sitemap and structured data.
 */
export const siteUrl = process.env.SITE_URL ? new URL(process.env.SITE_URL) : undefined
