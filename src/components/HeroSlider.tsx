'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const defaultSlides = [
  { id: 0, title: "L'excellence", title_accent: 'automobile', description: "Des véhicules soigneusement sélectionnés, inspectés et certifiés. Qualité garantie, prix transparents.", cta_label: "Voir l'inventaire", cta_href: '/vehicles', photo_url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1600&q=85' },
  { id: 1, title: 'Le plaisir', title_accent: 'de conduire', description: "Une sélection de véhicules haut de gamme inspectés avec soin.", cta_label: 'Explorer', cta_href: '/vehicles', photo_url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=85' },
  { id: 2, title: 'Électroménager', title_accent: 'à prix cassés', description: "Stock limité, offres exclusives.", cta_label: 'Voir les offres', cta_href: '/appliances', photo_url: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&q=85' },
]

export default function HeroSlider() {
  const [slides, setSlides] = useState(defaultSlides)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    fetch('/api/slides').then(r => r.json()).then(data => { if (data.data?.length > 0) setSlides(data.data) }).catch(() => {})
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setCurrent(prev => (prev + 1) % slides.length), 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const slide = slides[current]

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '92vh', minHeight: '560px' }}>
      {slides.map((s, i) => (
        <div key={s.id} className="absolute inset-0 transition-opacity duration-1000"
          style={{ backgroundImage: `url('${s.photo_url}')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: i === current ? 1 : 0 }} />
      ))}
      <div className="absolute inset-0" style={{ background: 'rgba(8,17,31,0.52)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-72" style={{ background: 'linear-gradient(to top, rgba(8,17,31,0.95), transparent)' }} />
      <div className="absolute inset-0 flex items-end pb-16 md:pb-24 px-6 md:px-12 z-10">
        <div style={{ maxWidth: '640px' }}>
          <div className="text-xs mb-6 pb-2 inline-block" style={{ color: '#C08A45', borderBottom: '0.5px solid rgba(192,138,69,0.4)', letterSpacing: '3px' }}>
            Véhicules premium — En stock
          </div>
          <h1 className="text-white mb-4 text-3xl md:text-5xl" style={{ fontWeight: 200, lineHeight: 1.1 }}>
            {slide.title}<br />
            <span style={{ color: '#C08A45', fontStyle: 'italic' }}>{slide.title_accent}</span>
          </h1>
          <p className="mb-6 hidden md:block" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.8, maxWidth: '420px', fontWeight: 300 }}>
            {slide.description}
          </p>
          <div className="flex items-center gap-8">
            <Link href={slide.cta_href} className="text-white text-xs tracking-widest uppercase px-9 py-4" style={{ background: '#C08A45', letterSpacing: '2px' }}>
              {slide.cta_label}
            </Link>
            <Link href="/contact" className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '2px' }}>
              → Nous contacter
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute right-10 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{ width: '2px', height: i === current ? '40px' : '24px', background: i === current ? '#C08A45' : 'rgba(255,255,255,0.25)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
        ))}
      </div>
      <div className="absolute bottom-10 right-10 z-10 text-xs" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '2px' }}>
        <span style={{ color: '#C08A45', fontSize: '18px', fontWeight: 200 }}>{String(current + 1).padStart(2, '0')}</span> / {String(slides.length).padStart(2, '0')}
      </div>
      <div className="absolute bottom-0 right-0 flex z-10" style={{ background: 'rgba(0,0,0,0.5)' }}>
        {[{ num: '340+', label: 'Véhicules' }, { num: '1 200+', label: 'Clients' }, { num: '10 min', label: 'Financement' }].map((stat, i) => (
          <div key={i} className="px-6 py-4" style={{ borderLeft: i > 0 ? '0.5px solid rgba(255,255,255,0.1)' : 'none' }}>
            <div className="text-white text-xl font-light">{stat.num}</div>
            <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
