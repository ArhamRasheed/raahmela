import Image from 'next/image'
import { HeroSlideshow } from './components/HeroSlideshow'
import { EarlyAccessForm, PartnerForm } from './components/SignupForms'
import { destinations, faqs, heroSlides, photos, principles, steps } from './content'
import { siteUrl } from './site'

const nav = [
  ['#about', 'What we’re building'],
  ['#how', 'How it works'],
  ['#partners', 'For agencies & agents'],
  ['#faq', 'FAQ'],
] as const

function Logo({ eager = false }: { eager?: boolean }) {
  return (
    <Image
      src="/assets/sairvan-logo.png"
      alt="Sairvan"
      width={420}
      height={241}
      className="logo"
      loading={eager ? 'eager' : 'lazy'}
      unoptimized
    />
  )
}

function Eyebrow({ children, tone = 'ink' }: { children: React.ReactNode; tone?: 'ink' | 'gold' }) {
  return <p className={`eyebrow eyebrow-${tone}`}>{children}</p>
}

function ExampleTag() {
  return <span className="example-tag">Example</span>
}

function PhonePreview() {
  const rows = [
    ['Where to?', 'Hunza & Skardu'],
    ['When?', '12–18 April'],
    ['Leaving from', 'Karachi'],
    ['Group', '2 adults, 2 kids'],
    ['Budget per person', 'PKR 60,000–80,000'],
  ]
  return (
    <figure className="phone" aria-labelledby="phone-caption">
      <div className="phone-screen">
        <div className="phone-head">
          <p className="phone-title">New trip request</p>
          <ExampleTag />
        </div>
        <dl>
          {rows.map(([label, value]) => (
            <div key={label} className="phone-field"><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
        <span className="phone-button" aria-hidden="true">Get plans</span>
      </div>
      <figcaption id="phone-caption">Example preview. The app is still in development.</figcaption>
    </figure>
  )
}

function jsonLd() {
  if (!siteUrl) return null
  const url = new URL('/', siteUrl).href
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${url}#organization`,
        name: 'Sairvan',
        alternateName: 'سیروان',
        url,
        logo: new URL('/assets/sairvan-logo.png', siteUrl).href,
      },
      {
        '@type': 'WebSite',
        '@id': `${url}#website`,
        name: 'Sairvan',
        url,
        inLanguage: 'en',
        publisher: { '@id': `${url}#organization` },
      },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

export default function Home() {
  return (
    <>
      {jsonLd()}
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="wrap header-inner">
          <a href="#top" className="logo-link" aria-label="Sairvan home"><Logo eager /></a>
          <nav aria-label="Main" className="main-nav">
            <ul>{nav.map(([href, label]) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
          </nav>
          <a href="#early-access" className="btn btn-primary btn-small">Join early access</a>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="wrap hero-inner">
            <div className="hero-copy">
              <Eyebrow tone="gold">Coming soon · For travelers in Pakistan</Eyebrow>
              <h1 id="hero-title">Plan your Pakistan trip with local travel experts</h1>
              <p className="hero-lead">
                Sairvan is a new app. Tell us where you want to go, and local travel agencies and independent agents
                send you plans with the price in PKR and what’s included. You choose who to talk to.
              </p>
              <EarlyAccessForm id="hero" source="hero" tone="dark" />
            </div>
            <PhonePreview />
          </div>
          {/* After the copy in source order so keyboard users reach the headline and form first. */}
          <HeroSlideshow slides={heroSlides} />
        </section>

        <section className="section about" id="about" aria-labelledby="about-title">
          <div className="wrap">
            <div className="section-head reveal">
              <Eyebrow>What we’re building</Eyebrow>
              <h2 id="about-title">One place to find the people who know where you’re going</h2>
            </div>
            <ol className="principles">
              {principles.map((p, i) => (
                <li key={p.title} className="card reveal">
                  <span className="card-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="aside-note reveal">
              We’re finalising how we’ll review agencies and agents before they can join. We’ll publish exactly what we
              check before the app opens.
            </p>
          </div>
        </section>

        <section className="section how" id="how" aria-labelledby="how-title">
          <div className="wrap how-grid">
            <div className="reveal">
              <Eyebrow>How it will work</Eyebrow>
              <h2 id="how-title">One request. Plans from local specialists.</h2>
              <ol className="steps">
                {steps.map((s, i) => (
                  <li key={s.title}>
                    <span className="step-number" aria-hidden="true">{i + 1}</span>
                    <div><h3>{s.title}</h3><p>{s.text}</p></div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="plan-column reveal">
              <h3 className="plan-heading">Every plan shows the price and what it covers</h3>
              <article className="plan-card" aria-labelledby="plan-title">
                <div className="plan-top">
                  <h4 id="plan-title">Hunza &amp; Skardu, 7 days</h4>
                  <ExampleTag />
                </div>
                <p className="plan-route">From Karachi · by air to Gilgit, then private car</p>
                <dl className="plan-facts">
                  {[['Transport', 'Flights + car'], ['Hotel', '6 nights, 3-star'], ['Meals', 'Breakfast + dinner'], ['Guide', 'Included']].map(([k, val]) => (
                    <div key={k}><dt>{k}</dt><dd>{val}</dd></div>
                  ))}
                </dl>
                <p className="plan-price"><span>PKR 145,000</span> per person</p>
              </article>
              <p className="plan-note">
                Illustrative example, not a real offer. Leaving from Islamabad instead? The same trip is usually shorter and
                cheaper, so plans always say where they start.
              </p>
            </div>
          </div>
        </section>

        <section className="section destinations" id="destinations" aria-labelledby="destinations-title">
          <div className="wrap">
            <div className="section-head reveal">
              <Eyebrow>Where to go</Eyebrow>
              <h2 id="destinations-title">Need ideas? Start here.</h2>
            </div>
            <ul className="destination-list reveal" tabIndex={0} aria-label="Destinations">
              {destinations.map(d => (
                <li key={d.name} className="destination">
                  <Image src={d.photo.src} alt={d.photo.alt} fill sizes="(max-width: 760px) 80vw, (max-width: 1440px) 32vw, 400px" style={{ objectPosition: d.photo.position }} />
                  <div className="destination-text">
                    <h3>{d.name}</h3>
                    <p>{d.note}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="credits">
              Photos: {photos.passu.credit} · {photos.skardu.credit} · {photos.lahore.credit},{' '}
              <a href={photos.lahore.license!.url} rel="license noopener" target="_blank">{photos.lahore.license!.name}</a>
            </p>
          </div>
        </section>

        <section className="section partners" id="partners" aria-labelledby="partners-title">
          <div className="wrap partners-grid">
            <div className="reveal">
              <Eyebrow tone="gold">For travel agencies &amp; independent agents</Eyebrow>
              <h2 id="partners-title">Reach travelers planning trips across Pakistan</h2>
              <p className="partners-lead">
                We’re inviting our first travel agencies and independent agents now. You don’t need a company name to
                register. Tell us about yourself and we’ll be in touch about next steps.
              </p>
              <ol className="partner-steps">
                <li><span aria-hidden="true">1</span>Register your interest</li>
                <li><span aria-hidden="true">2</span>We get in touch to talk through how Sairvan will work</li>
                <li><span aria-hidden="true">3</span>Receive trip requests once the app opens</li>
              </ol>
            </div>
            <div className="reveal"><PartnerForm /></div>
          </div>
        </section>

        <section className="section faq" id="faq" aria-labelledby="faq-title">
          <div className="wrap faq-grid">
            <div className="reveal">
              <h2 id="faq-title">Questions</h2>
              <p className="faq-lead">Sairvan is still being built. Here’s what we can tell you today.</p>
            </div>
            <div className="faq-list reveal">
              {faqs.map(f => (
                <details key={f.q}>
                  <summary><h3>{f.q}</h3><span className="faq-icon" aria-hidden="true" /></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section final" id="early-access" aria-labelledby="final-title">
          <div className="wrap final-inner reveal">
            <h2 id="final-title">Your next trip starts with one request</h2>
            <p>Sairvan is coming soon. Join early access and we’ll email you when the app opens.</p>
            <EarlyAccessForm id="final" source="final" />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <span className="logo-tile"><Logo /></span>
            <p>Local travel agencies and independent agents across Pakistan, in one app. Coming soon.</p>
          </div>
          <nav aria-label="Footer">
            <p className="footer-heading">Sairvan</p>
            <ul>{nav.map(([href, label]) => <li key={href}><a href={href}>{label}</a></li>)}<li><a href="#early-access">Join early access</a></li></ul>
          </nav>
        </div>
        <div className="wrap footer-bottom">
          <p>© {new Date().getFullYear()} Sairvan</p>
        </div>
      </footer>
    </>
  )
}
