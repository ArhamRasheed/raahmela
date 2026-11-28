'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { Photo } from '../content'

const INTERVAL = 6000

/**
 * Background photo slideshow for the hero. The headline and signup form are rendered by the
 * server outside this component, so they never move. Only the first photo loads up front; each
 * later photo is mounted (and so downloaded) one slide ahead of when it is shown.
 */
export function HeroSlideshow({ slides }: { slides: Photo[] }) {
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState(1)
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set())
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const playing = !paused && !reducedMotion && slides.length > 1

  // Once the current photo has loaded, fetch the next one while the current one is on screen.
  const currentLoaded = loaded.has(active)
  useEffect(() => {
    if (playing && currentLoaded) setMounted(m => Math.max(m, Math.min(active + 2, slides.length)))
  }, [active, playing, currentLoaded, slides.length])

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => {
      if (document.hidden) return
      setActive(current => {
        const next = (current + 1) % slides.length
        return loaded.has(next) ? next : current
      })
    }, INTERVAL)
    return () => window.clearInterval(timer)
  }, [playing, loaded, slides.length])

  const current = slides[active]

  return (
    <>
      <div className="hero-media">
        {slides.slice(0, mounted).map((slide, i) => (
          <Image
            key={slide.place}
            src={slide.src}
            alt={i === active ? slide.alt : ''}
            aria-hidden={i === active ? undefined : true}
            fill
            sizes="100vw"
            placeholder={i === 0 ? 'blur' : 'empty'}
            {...(i === 0 ? { loading: 'eager' as const, fetchPriority: 'high' as const } : {})}
            onLoad={() => setLoaded(prev => (prev.has(i) ? prev : new Set(prev).add(i)))}
            className={`hero-slide${i === active ? ' is-active' : ''}`}
            style={{ objectPosition: slide.position }}
          />
        ))}
        <div className="hero-shade" />
      </div>
      <div className="hero-meta">
        <p className="hero-credit">
          Photo: {current.place} · {current.credit}
          {current.license && <>, <a href={current.license.url} rel="license noopener" target="_blank">{current.license.name}</a></>}
        </p>
        {slides.length > 1 && !reducedMotion && (
          <button type="button" className="slide-toggle" onClick={() => setPaused(p => !p)}>
            <span aria-hidden="true" className={`slide-icon${paused ? ' is-play' : ''}`} />
            {paused ? 'Play slideshow' : 'Pause slideshow'}
          </button>
        )}
      </div>
    </>
  )
}
