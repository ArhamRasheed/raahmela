import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { siteUrl } from './site'
import './style.css'

const sans = localFont({
  src: [
    { path: './fonts/dmsans-400-normal.ttf', weight: '400', style: 'normal' },
    { path: './fonts/dmsans-500-normal.ttf', weight: '500', style: 'normal' },
    { path: './fonts/dmsans-600-normal.ttf', weight: '600', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
})

const serif = localFont({
  src: './fonts/instrumentserif-400-normal.ttf',
  weight: '400',
  variable: '--font-serif',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

const title = 'Plan your Pakistan trip with local travel experts | Sairvan'
const description =
  'Sairvan is a new app that connects travelers with local travel agencies and independent agents across Pakistan. Join early access to hear when it opens.'

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  applicationName: 'Sairvan',
  alternates: siteUrl ? { canonical: '/' } : undefined,
  openGraph: { type: 'website', siteName: 'Sairvan', title, description, ...(siteUrl && { url: '/' }) },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = { themeColor: '#153e34' }

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  )
}
