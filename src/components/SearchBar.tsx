'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const router = useRouter()
  const [category, setCategory] = useState('vehicles')
  const [brand, setBrand] = useState('')
  const [type, setType] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (brand) params.set('brand', brand)
    if (type) params.set('type', type)
    if (maxPrice) params.set('max_price', maxPrice)
    const path = category === 'vehicles' ? '/vehicles' : '/appliances'
    router.push(`${path}?${params.toString()}`)
  }

  return (
    <div className="flex items-stretch gap-0"
      style={{ background: '#0D1A2D', borderBottom: '2px solid #C08A45' }}>

      <div className="flex flex-col gap-1 flex-1 px-6 py-4"
        style={{ borderRight: '0.5px solid rgba(255,255,255,0.06)' }}>
        <label className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Catégorie
        </label>
        <select value={category} onChange={e => setCategory(e.target.value)}
          className="bg-transparent text-sm outline-none cursor-pointer"
          style={{ color: 'rgba(255,255,255,0.75)', border: 'none' }}>
          <option value="vehicles" style={{ background: '#0D1A2D' }}>Véhicules</option>
          <option value="appliances" style={{ background: '#0D1A2D' }}>Électroménager</option>
        </select>
      </div>

      <div className="flex flex-col gap-1 flex-1 px-6 py-4"
        style={{ borderRight: '0.5px solid rgba(255,255,255,0.06)' }}>
        <label className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Marque
        </label>
        <select value={brand} onChange={e => setBrand(e.target.value)}
          className="bg-transparent text-sm outline-none cursor-pointer"
          style={{ color: 'rgba(255,255,255,0.75)', border: 'none' }}>
          <option value="" style={{ background: '#0D1A2D' }}>Toutes marques</option>
          {['Toyota', 'Mercedes', 'Peugeot', 'BMW', 'Hyundai', 'Renault', 'Honda', 'Kia'].map(b => (
            <option key={b} value={b} style={{ background: '#0D1A2D' }}>{b}</option>
          ))}
        </select>
      </div>

      {category === 'vehicles' && (
        <div className="flex flex-col gap-1 flex-1 px-6 py-4"
          style={{ borderRight: '0.5px solid rgba(255,255,255,0.06)' }}>
          <label className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Type
          </label>
          <select value={type} onChange={e => setType(e.target.value)}
            className="bg-transparent text-sm outline-none cursor-pointer"
            style={{ color: 'rgba(255,255,255,0.75)', border: 'none' }}>
            <option value="" style={{ background: '#0D1A2D' }}>Tous types</option>
            {['Berline', 'SUV', '4x4', 'Utilitaire'].map(t => (
              <option key={t} value={t.toLowerCase()} style={{ background: '#0D1A2D' }}>{t}</option>
            ))}
          </select>
        </div>
      )}

      <div className="flex flex-col gap-1 flex-1 px-6 py-4">
        <label className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Budget maximum
        </label>
        <select value={maxPrice} onChange={e => setMaxPrice(e.target.value)}
          className="bg-transparent text-sm outline-none cursor-pointer"
          style={{ color: 'rgba(255,255,255,0.75)', border: 'none' }}>
          <option value="" style={{ background: '#0D1A2D' }}>Tous budgets</option>
          <option value="5000000" style={{ background: '#0D1A2D' }}>5 000 000 FCFA</option>
          <option value="10000000" style={{ background: '#0D1A2D' }}>10 000 000 FCFA</option>
          <option value="20000000" style={{ background: '#0D1A2D' }}>20 000 000 FCFA</option>
          <option value="50000000" style={{ background: '#0D1A2D' }}>50 000 000 FCFA</option>
        </select>
      </div>

      <button onClick={handleSearch}
        className="flex items-center gap-2 px-8 text-white text-xs tracking-widest uppercase"
        style={{ background: '#C08A45', letterSpacing: '2px', minWidth: '140px' }}>
        🔍 Rechercher
      </button>
    </div>
  )
}
