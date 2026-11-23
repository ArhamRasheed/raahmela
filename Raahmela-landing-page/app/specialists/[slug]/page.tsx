import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { providers } from '../../providers'

type Props = { params: Promise<{ slug: string }> }
export const generateStaticParams = () => providers.map(p => ({ slug: p.id }))
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const provider = providers.find(p => p.id === slug)
  return { title: `${provider?.name ?? 'Specialist'} | Raahmela`, robots: { index: false, follow: true }, alternates: { canonical: null } }
}
export default async function Profile({ params }: Props) {
  const { slug } = await params
  const provider = providers.find(p => p.id === slug)
  if (!provider) notFound()
  const p = provider
  return <main className="wrap profile">
    <Link href="/"><Image src="/assets/raahmela-cypress.svg" alt="Raahmela" width={204} height={48} unoptimized /></Link>
    <p><Link href="/#specialists">← All specialists</Link></p>
    <div className="profile-grid"><div className="photo"><Image src={`/assets/${p.image}.webp`} alt={p.alt} fill sizes="(max-width: 700px) 90vw, 48vw" /></div>
    <div><p className="eyebrow">{p.role} / {p.place}</p><h1>{p.name}</h1><h2>{p.experience}</h2><p>{p.description}</p>
    <dl><div><dt>Arranged by</dt><dd>{p.name}</dd></div><div><dt>Your host</dt><dd>{p.host}</dd></div><div><dt>Languages</dt><dd>{p.languages.join(', ')}</dd></div><div><dt>Duration</dt><dd>{p.duration}</dd></div><div><dt>From, per person</dt><dd>PKR {p.price}</dd></div></dl>
    <p className="hosting">Illustrative profile and pricing</p></div></div>
  </main>
}
