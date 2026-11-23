import Image from 'next/image'
import Link from 'next/link'
import { providers } from './providers'

type Query = Record<string, string | string[] | undefined>
export default async function Home({ searchParams }: { searchParams: Promise<Query> }) {
  const query = await searchParams
  const value = (key: string) => typeof query[key] === 'string' ? query[key].trim() : ''
  const destination = value('destination')
  const interest = value('interest')
  const language = value('language')
  const filtered = providers.filter(p => [p.place, p.region, 'Pakistan'].some(place => place.toLowerCase().includes(destination.toLowerCase())) && (!interest || p.interest === interest) && (!language || p.languages.includes(language)))
  const nav = <><a href="#explore">Explore Pakistan</a><a href="#search">Find a specialist</a><a href="#partners">For partners</a></>
  return <>
    <main>
      <section className="hero" id="explore">
        <picture><source media="(max-width: 700px)" srcSet="/assets/hunza-mobile.webp" /><img src="/assets/hunza.webp" alt="Illustrated view of the mountains and valley around Passu, Hunza" width="1536" height="864" fetchPriority="high" className="cover" /></picture>
        <div className="shade" />
        <div className="wrap hero-content">
          <header><Link href="/" aria-label="Raahmela home"><Image src="/assets/raahmela-ivory.svg" alt="Raahmela" width={204} height={48} unoptimized /></Link><nav className="desktop-nav" aria-label="Main">{nav}</nav><span className="locale">English / PKR</span><a className="top-cta" href="#trip">Post a trip brief</a><details className="mobile-nav"><summary aria-label="Open navigation"><span /></summary><nav aria-label="Mobile">{nav}<a href="#trip">Post a trip brief</a></nav></details></header>
          <div className="hero-copy"><p className="eyebrow">Journeys with local experts</p><h1>Pakistan,<br /><em>in good company.</em></h1><p className="intro">Find the agency or independent agent who knows the places you want to go.</p></div>
          <p className="location">♧ &nbsp; Passu, Hunza Valley</p>
        </div>
      </section>
      <form className="wrap search" id="search" method="get" action="/#specialists">
        <label className="destination"><span>Destination</span><input name="destination" defaultValue={destination} placeholder="Where would you like to go?" /></label>
        <label className="filter"><span>Your interests</span><select name="interest" defaultValue={interest}><option value="">All experiences</option>{providers.map(p => <option key={p.id}>{p.interest}</option>)}</select></label>
        <label className="filter"><span>Preferred language</span><select name="language" defaultValue={language}><option value="">Any language</option>{['English', 'Urdu', 'Sindhi'].map(l => <option key={l}>{l}</option>)}</select></label>
        <button>Find a specialist <span aria-hidden="true">↗</span></button>
      </form>
      <section className="wrap directory" id="specialists" aria-labelledby="directory-heading">
        <p className="eyebrow">The specialist directory</p>
        <div className="section-head"><h2 id="directory-heading">Meet your local experts.</h2><p>Explore agencies and independent agents by speciality.</p></div>
        {(destination || interest || language) && <p className="results">{filtered.length} {filtered.length === 1 ? 'specialist' : 'specialists'} found. <Link href="/#specialists">Clear filters</Link></p>}
        <div className="cards">{filtered.map(p => <article key={p.id}>
          <Link className="photo" aria-label={`View ${p.name} profile`} href={`/specialists/${p.id}`}><Image src={`/assets/${p.image}.webp`} alt={p.alt} fill sizes="(max-width: 700px) calc(100vw - 44px), (max-width: 1440px) 45vw, 628px" /><span className="eyebrow tag">{p.place}</span></Link>
          <p className="eyebrow role">{p.role} &nbsp; / &nbsp; {p.region}</p>
          <h3><Link href={`/specialists/${p.id}`}>{p.name}<span aria-hidden="true">↗</span></Link></h3>
          <p>{p.interest} &nbsp;·&nbsp; {p.languages.join(', ')}</p><p className="hosting">{p.id === 'old-city-walks' ? 'Led' : 'Hosted'} by {p.host}.</p><p className="price">From PKR {p.price} per person</p>
        </article>)}</div>
        {!filtered.length && <p>Try a different destination, experience or language.</p>}
      </section>
    </main>
    <footer id="trip"><div className="wrap foot"><h2>Have a particular trip in mind?</h2><p>Tell local specialists what you’re looking for.</p><details><summary>Post a trip brief &nbsp; ↗</summary><p>Trip enquiries are coming soon.</p></details><details id="partners" open={false}><summary>For partners</summary><p>Agency and independent agent registration is coming soon.</p></details></div></footer>
  </>
}
