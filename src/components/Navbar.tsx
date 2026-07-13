'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchCategory, setSearchCategory] = useState('Véhicules')
  const router = useRouter()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50"
      style={{ background: 'rgba(8,17,31,0.95)', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>

      {/* Ligne principale */}
      <div className="flex items-center justify-between px-8 h-16">

        {/* Logo */}
        <Link href="/" className="text-white text-lg font-light tracking-widest uppercase flex-shrink-0">
          Sen<span style={{ color: '#C08A45' }}>Electro</span>
        </Link>

        {/* Links desktop */}
        <div className="hidden md:flex gap-10">
          {[
            { label: 'Accueil', href: '/' },
            { label: 'Véhicules', href: '/vehicles' },
            { label: 'Électroménager', href: '/appliances' },
                    { label: 'Contact', href: '/contact' },
          ].map((link) => (
            <Link key={link.href} href={link.href}
              className="text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.55)', letterSpacing: '2px' }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Téléphone + CTA */}
        <div className="hidden md:flex items-center gap-5">
          <span className="text-xs tracking-wider" style={{ color: 'rgba(255,255,255,0.35)' }}>
            +221 76 688 6161
          </span>
          <Link href="/contact"
            className="text-xs tracking-widest uppercase px-5 py-2 transition-colors"
            style={{ border: '0.5px solid rgba(192,138,69,0.6)', color: '#C08A45', letterSpacing: '2px' }}>
            Devis gratuit
          </Link>
        </div>

        {/* Burger mobile */}
        <button className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Barre de recherche intégrée dans la nav */}
      <div className="hidden md:flex items-stretch"
        style={{ background: '#0A1628', borderTop: '0.5px solid rgba(255,255,255,0.04)', borderBottom: '2px solid #C08A45' }}>

        {[
          {
            label: 'Catégorie',
            content: (
              <select id="nav-category" value={searchCategory} onChange={e => setSearchCategory(e.target.value)} className="bg-transparent text-sm outline-none cursor-pointer w-full"
                style={{ color: 'rgba(255,255,255,0.75)', border: 'none' }}>
                <option value="Véhicules" style={{ background: '#0A1628' }}>Véhicules</option>
                <option value="Électroménager" style={{ background: '#0A1628' }}>Électroménager</option>
              </select>
            )
          },
          {
            label: 'Marque',
            content: (
              <select id="nav-brand" className="bg-transparent text-sm outline-none cursor-pointer w-full"
                style={{ color: 'rgba(255,255,255,0.75)', border: 'none' }}>
                <option style={{ background: '#0A1628' }}>Toutes marques</option>
                {['Toyota', 'Mercedes', 'Peugeot', 'BMW', 'Hyundai', 'Renault', 'Honda', 'Kia'].map(b => (
                  <option key={b} style={{ background: '#0A1628' }}>{b}</option>
                ))}
              </select>
            )
          },
          {
            label: 'Type',
            content: (
              <select id="nav-type" className="bg-transparent text-sm outline-none cursor-pointer w-full"
                style={{ color: 'rgba(255,255,255,0.75)', border: 'none' }}>
                <option style={{ background: '#0A1628' }}>Tous types</option>
                {['Berline', 'SUV', '4x4', 'Utilitaire'].map(t => (
                  <option key={t} style={{ background: '#0A1628' }}>{t}</option>
                ))}
              </select>
            )
          },
          {
            label: 'Budget maximum',
            content: (
              <select id="nav-budget" className="bg-transparent text-sm outline-none cursor-pointer w-full"
                style={{ color: 'rgba(255,255,255,0.75)', border: 'none' }}>
                <option style={{ background: '#0A1628' }}>Tous budgets</option>
                <option style={{ background: '#0A1628' }}>5 000 000 FCFA</option>
                <option style={{ background: '#0A1628' }}>10 000 000 FCFA</option>
                <option style={{ background: '#0A1628' }}>20 000 000 FCFA</option>
                <option style={{ background: '#0A1628' }}>50 000 000 FCFA</option>
              </select>
            )
          },
        ].map((field, i) => (
          <div key={i} className="flex flex-col gap-1 flex-1 px-6 py-3"
            style={{ borderRight: '0.5px solid rgba(255,255,255,0.06)' }}>
            <label className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              {field.label}
            </label>
            {field.content}
          </div>
        ))}

        <button onClick={() => {
            const brand = (document.getElementById('nav-brand') as HTMLSelectElement)?.value
            const type = (document.getElementById('nav-type') as HTMLSelectElement)?.value
            const budget = (document.getElementById('nav-budget') as HTMLSelectElement)?.value
            const path = searchCategory === 'Électroménager' ? '/appliances' : '/vehicles'
            const params = new URLSearchParams()
            if (brand && brand !== 'Toutes marques') params.set('brand', brand)
            if (type && type !== 'Tous types') params.set('type', type.toLowerCase())
            if (budget && budget !== 'Tous budgets') params.set('max_price', budget)
            window.location.href = `${path}?${params.toString()}`
          }}
          className="flex items-center gap-2 px-8 text-white text-xs tracking-widest uppercase flex-shrink-0"
          style={{ background: '#C08A45', letterSpacing: '2px', minWidth: '130px' }}>
          🔍 Rechercher
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 flex flex-col gap-0 md:hidden"
          style={{ background: '#08111F', borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
          {[
            { label: 'Accueil', href: '/' },
            { label: 'Véhicules', href: '/vehicles' },
            { label: 'Électroménager', href: '/appliances' },
                    { label: 'Contact', href: '/contact' },
          ].map((link) => (
            <Link key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-8 py-4 text-xs tracking-widest uppercase"
              style={{ color: 'rgba(255,255,255,0.6)', borderBottom: '0.5px solid rgba(255,255,255,0.04)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
