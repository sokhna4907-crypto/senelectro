'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const slides = [
  {
    bg: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1600&q=85',
    tag: 'Véhicules premium — En stock',
    title: "L'excellence",
    titleAccent: 'automobile',
    titleEnd: "à votre portée",
    desc: "Des véhicules soigneusement sélectionnés, inspectés et certifiés. Qualité garantie, prix transparents.",
    cta: "Voir l'inventaire",
    ctaHref: '/vehicles',
    cta2: 'Financement rapide',
    cta2Href: '/financing',
  },
  {
    bg: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=85',
    tag: 'BMW — Collection disponible',
    title: "Le plaisir",
    titleAccent: "de conduire",
    titleEnd: 'redéfini',
    desc: "Une sélection de véhicules haut de gamme inspectés avec soin. Kilométrage certifié, état impeccable.",
    cta: 'Explorer la collection',
    ctaHref: '/vehicles?brand=BMW',
    cta2: 'Nous contacter',
    cta2Href: '/contact',
  },
  {
    bg: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1600&q=85',
    tag: 'Mercedes-Benz — Stock limité',
    title: "Le summum",
    titleAccent: "du raffinement",
    titleEnd: 'automobile',
    desc: "Des berlines et SUV d'exception, minutieusement contrôlés. Vivez l'expérience premium.",
    cta: 'Voir les Mercedes',
    ctaHref: '/vehicles?brand=Mercedes',
    cta2: 'Simulation crédit',
    cta2Href: '/financing',
  },
  {
    bg: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&q=85',
    tag: 'Déstockage — Électroménager',
    title: 'Électroménager',
    titleAccent: 'premium',
    titleEnd: 'à prix cassés',
    desc: "Une sélection d'appareils de qualité à des prix exceptionnels. Stock limité, offres exclusives.",
    cta: 'Voir les offres',
    ctaHref: '/appliances',
    cta2: 'En savoir plus',
    cta2Href: '/contact',
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[current]

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '92vh', minHeight: '560px' }}>

      {/* Background image */}
      {slides.map((s, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${s.bg}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === current ? 1 : 0,
          }} />
      ))}

      {/* Overlays */}
      <div className="absolute inset-0" style={{ background: 'rgba(8,17,31,0.52)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-72"
        style={{ background: 'linear-gradient(to top, rgba(8,17,31,0.95), transparent)' }} />

      {/* Content */}
      <div className="absolute inset-0 flex items-end pb-24 px-12 z-10">
        <div style={{ maxWidth: '640px' }}>
          <div className="text-xs mb-6 pb-2"
            style={{ color: '#C08A45', borderBottom: '0.5px solid rgba(192,138,69,0.4)', letterSpacing: '3px', display: 'inline-block' }}>
            {slide.tag}
          </div>
          <h1 className="text-white mb-4" style={{ fontSize: '48px', fontWeight: 200, lineHeight: 1.1, letterSpacing: '-0.5px' }}>
            {slide.title}<br />
            <span style={{ color: '#C08A45', fontStyle: 'italic' }}>{slide.titleAccent} </span>
            {slide.titleEnd}
          </h1>
          <p className="mb-8" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.8, maxWidth: '420px', fontWeight: 300 }}>
            {slide.desc}
          </p>
          <div className="flex items-center gap-8">
            <Link href={slide.ctaHref}
              className="text-white text-xs tracking-widest uppercase px-9 py-4"
              style={{ background: '#C08A45', letterSpacing: '2px' }}>
              {slide.cta}
            </Link>
            <Link href={slide.cta2Href}
              className="text-xs tracking-widest uppercase flex items-center gap-2"
              style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '2px' }}>
              → {slide.cta2}
            </Link>
          </div>
        </div>
      </div>

      {/* Dots verticaux */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className="transition-all duration-300"
            style={{
              width: '2px',
              height: i === current ? '40px' : '24px',
              background: i === current ? '#C08A45' : 'rgba(255,255,255,0.25)',
              border: 'none',
              cursor: 'pointer',
            }} />
        ))}
      </div>

      {/* Compteur */}
      <div className="absolute bottom-10 right-10 z-10 text-xs tracking-widest"
        style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '2px' }}>
        <span style={{ color: '#C08A45', fontSize: '18px', fontWeight: 200 }}>
          {String(current + 1).padStart(2, '0')}
        </span> / {String(slides.length).padStart(2, '0')}
      </div>

      {/* Stats */}
      <div className="absolute bottom-0 right-0 flex z-10"
        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
        {[
          { num: '340+', label: 'Véhicules' },
          { num: '1 200+', label: 'Clients' },
          { num: '10 min', label: 'Financement' },
        ].map((stat, i) => (
          <div key={i} className="px-6 py-4" style={{ borderLeft: i > 0 ? '0.5px solid rgba(255,255,255,0.1)' : 'none' }}>
            <div className="text-white text-xl font-light">{stat.num}</div>
            <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '1px' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
