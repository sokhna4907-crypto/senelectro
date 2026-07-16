'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchCategory, setSearchCategory] = useState('vehicles')
  const router = useRouter()

  const navLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'Véhicules', href: '/vehicles' },
    { label: 'Électroménager', href: '/appliances' },
    { label: 'Contact', href: '/contact' },
  ]

  const handleSearch = () => {
    const brand = (document.getElementById('nav-brand') as HTMLSelectElement)?.value
    const type = (document.getElementById('nav-type') as HTMLSelectElement)?.value
    const budget = (document.getElementById('nav-budget') as HTMLSelectElement)?.value
    const path = searchCategory === 'appliances' ? '/appliances' : '/vehicles'
    const params = new URLSearchParams()
    if (brand && brand !== '') params.set('brand', brand)
    if (type && type !== '') params.set('type', type)
    if (budget && budget !== '') params.set('max_price', budget)
    router.push(`${path}?${params.toString()}`)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50"
      style={{ background: 'rgba(8,17,31,0.95)', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>

      {/* Ligne principale */}
      <div className="flex items-center justify-between px-8 h-16">
        <Link href="/" className="text-white text-lg font-light tracking-widest uppercase flex-shrink-0">
          Sen<span style={{ color: '#C08A45' }}>Electro</span>
        </Link>

        <div className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className="text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.55)', letterSpacing: '2px' }}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-5">
          <a href="tel:+15148806161" className="text-xs tracking-wider" style={{ color: 'rgba(255,255,255,0.35)' }}>
            +1 (514) 880-6161
          </a>
          <Link href="/contact"
            className="text-xs tracking-widest uppercase px-5 py-2"
            style={{ border: '0.5px solid rgba(192,138,69,0.6)', color: '#C08A45', letterSpacing: '2px' }}>
            Devis gratuit
          </Link>
        </div>

        <button className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="hidden md:flex items-stretch"
        style={{ background: '#0A1628', borderTop: '0.5px solid rgba(255,255,255,0.04)', borderBottom: '2px solid #C08A45' }}>

        <div className="flex flex-col gap-1 flex-1 px-6 py-3" style={{ borderRight: '0.5px solid rgba(255,255,255,0.06)' }}>
          <label className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '2px', textTransform: 'uppercase' }}>Catégorie</label>
          <select value={searchCategory} onChange={e => setSearchCategory(e.target.value)}
            className="bg-transparent text-sm outline-none cursor-pointer" style={{ color: 'rgba(255,255,255,0.75)', border: 'none' }}>
            <option value="vehicles" style={{ background: '#0A1628' }}>Véhicules</option>
            <option value="appliances" style={{ background: '#0A1628' }}>Électroménager</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 flex-1 px-6 py-3" style={{ borderRight: '0.5px solid rgba(255,255,255,0.06)' }}>
          <label className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '2px', textTransform: 'uppercase' }}>Marque</label>
          <select id="nav-brand" className="bg-transparent text-sm outline-none cursor-pointer" style={{ color: 'rgba(255,255,255,0.75)', border: 'none' }}>
            <option value="" style={{ background: '#0A1628' }}>Toutes marques</option>
            {['Mercedes', 'BMW', 'Audi', 'Porsche', 'Land Rover', 'Volkswagen', 'Volvo', 'Lexus', 'Toyota', 'Hyundai'].map(b => (
              <option key={b} value={b} style={{ background: '#0A1628' }}>{b}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1 flex-1 px-6 py-3" style={{ borderRight: '0.5px solid rgba(255,255,255,0.06)' }}>
          <label className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '2px', textTransform: 'uppercase' }}>Type</label>
          <select id="nav-type" className="bg-transparent text-sm outline-none cursor-pointer" style={{ color: 'rgba(255,255,255,0.75)', border: 'none' }}>
            <option value="" style={{ background: '#0A1628' }}>Tous types</option>
            {['Berline', 'SUV', '4x4', 'Utilitaire'].map(t => (
              <option key={t} value={t.toLowerCase()} style={{ background: '#0A1628' }}>{t}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1 flex-1 px-6 py-3">
          <label className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '2px', textTransform: 'uppercase' }}>Budget maximum</label>
          <select id="nav-budget" className="bg-transparent text-sm outline-none cursor-pointer" style={{ color: 'rgba(255,255,255,0.75)', border: 'none' }}>
            <option value="" style={{ background: '#0A1628' }}>Tous budgets</option>
            <option value="5000000" style={{ background: '#0A1628' }}>5 000 000 FCFA</option>
            <option value="10000000" style={{ background: '#0A1628' }}>10 000 000 FCFA</option>
            <option value="20000000" style={{ background: '#0A1628' }}>20 000 000 FCFA</option>
            <option value="50000000" style={{ background: '#0A1628' }}>50 000 000 FCFA</option>
          </select>
        </div>

        <button onClick={handleSearch}
          className="flex items-center gap-2 px-8 text-white text-xs tracking-widest uppercase flex-shrink-0"
          style={{ background: '#C08A45', letterSpacing: '2px', minWidth: '130px' }}>
          🔍 Rechercher
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="absolute left-0 right-0 flex flex-col gap-0 md:hidden"
          style={{ top: '64px', background: '#08111F', borderTop: '0.5px solid rgba(255,255,255,0.06)', zIndex: 100 }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-8 py-4 text-xs tracking-widest uppercase"
              style={{ color: 'rgba(255,255,255,0.6)', borderBottom: '0.5px solid rgba(255,255,255,0.04)' }}>
              {link.label}
            </Link>
          ))}
          <a href="tel:+15148806161" className="px-8 py-4 text-xs tracking-widest" style={{ color: '#C08A45', borderBottom: '0.5px solid rgba(255,255,255,0.04)' }}>
            +1 (514) 880-6161
          </a>
        </div>
      )}
    </nav>
  )
}
