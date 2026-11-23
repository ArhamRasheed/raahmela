import type { Metadata } from 'next'
import './style.css'

const site = process.env.SITE_URL ? new URL(process.env.SITE_URL) : undefined
const title = 'Find Travel Agencies and Local Travel Agents in Pakistan | Raahmela'
const description = 'Discover travel agencies and independent agents across Pakistan. Compare experiences, hosts, languages and prices with Raahmela.'
export const metadata: Metadata = {
  metadataBase: site, title, description,
  alternates: site ? { canonical: '/' } : undefined,
  openGraph: { title, description, type: 'website', ...(site && { url: '/', images: ['/assets/hunza.webp'] }) },
  twitter: { card: 'summary_large_image' },
  icons: '/assets/doorway.svg',
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
