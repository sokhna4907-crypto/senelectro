'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CarCard from '@/components/CarCard'
import { Vehicle } from '@/types'

const types = ['Tous', 'Berline', 'SUV', '4x4', 'Utilitaire']
const brands = ['Toutes', 'Mercedes', 'BMW', 'Audi', 'Porsche', 'Land Rover', 'Volkswagen', 'Toyota', 'Hyundai']
const fuels = ['Tous', 'Essence', 'Diesel', 'Hybride', 'Electrique']

function VehiclesContent() {
  const searchParams = useSearchParams()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState(searchParams.get('q') || '')
  const [activeType, setActiveType] = useState('Tous')
  const [activeBrand, setActiveBrand] = useState('Toutes')
  const [activeFuel, setActiveFuel] = useState('Tous')
  const [maxPrice, setMaxPrice] = useState(0)
  const [sort, setSort] = useState('recent')

  useEffect(() => {
    const q = searchParams.get('q') || ''
    const brand = searchParams.get('brand') || ''
    const type = searchParams.get('type') || ''
    const maxP = searchParams.get('max_price') || ''
    if (q) setSearchText(q)
    if (brand) setActiveBrand(brand)
    if (type) setActiveType(type.charAt(0).toUpperCase() + type.slice(1))
    if (maxP) setMaxPrice(Number(maxP))
  }, [searchParams])

  useEffect(() => {
    fetch('/api/vehicles')
      .then(r => r.json())
      .then(data => { setVehicles(data.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = vehicles.filter(v => {
    if (searchText) {
      const q = searchText.toLowerCase()
      const match = v.name?.toLowerCase().includes(q) ||
        v.brand?.toLowerCase().includes(q) ||
        v.model?.toLowerCase().includes(q) ||
        v.type?.toLowerCase().includes(q)
      if (!match) return false
    }
    if (activeType !== 'Tous' && v.type !== activeType.toLowerCase()) return false
    if (activeBrand !== 'Toutes' && v.brand !== activeBrand) return false
    if (activeFuel !== 'Tous' && v.fuel !== activeFuel.toLowerCase()) return false
    if (maxPrice > 0 && v.price > maxPrice) return false
    return true
  }).sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    if (sort === 'km') return a.km - b.km
    return b.id - a.id
  })

  return (
    <main style={{ background: '#08111F', minHeight: '100vh' }}>
      <Navbar />
      <div className="pt-28 md:pt-36 pb-8 md:pb-12 px-4 md:px-12" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
        <div className="text-xs mb-4 uppercase tracking-widest" style={{ color: '#C08A45', letterSpacing: '3px' }}>Inventaire complet</div>
        <div className="flex items-end justify-between">
          <h1 className="text-2xl md:text-4xl font-light text-white" style={{ letterSpacing: '-0.5px' }}>
            {searchText ? `Résultats pour "${searchText}"` : 'Véhicules en stock'}
          </h1>
          <span className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {loading ? '...' : `${filtered.length} véhicule${filtered.length > 1 ? 's' : ''}`}
          </span>
        </div>
      </div>

      {/* Barre de recherche interne */}
      <div className="px-4 md:px-12 py-4" style={{ background: '#0D1A2D', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
        <input
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder="Rechercher par marque, modèle..."
          className="w-full text-sm outline-none px-4 py-3"
          style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', maxWidth: '400px' }}
        />
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="md:hidden flex gap-2 overflow-x-auto px-4 py-3" style={{ background: '#0D1A2D', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
          {types.slice(1).map(t => (
            <button key={t} onClick={() => setActiveType(t)}
              className="text-xs px-4 py-2 whitespace-nowrap flex-shrink-0"
              style={{ background: activeType === t ? '#C08A45' : 'rgba(255,255,255,0.06)', color: '#fff', border: 'none', borderRadius: '20px' }}>
              {t}
            </button>
          ))}
        </div>

        <aside className="hidden md:block w-64 flex-shrink-0 px-8 py-10 sticky top-28 self-start"
          style={{ borderRight: '0.5px solid rgba(255,255,255,0.05)', height: 'calc(100vh - 7rem)', overflowY: 'auto' }}>
          {[
            { title: 'Type', items: types, active: activeType, setActive: setActiveType },
            { title: 'Marque', items: brands, active: activeBrand, setActive: setActiveBrand },
            { title: 'Carburant', items: fuels, active: activeFuel, setActive: setActiveFuel },
          ].map(({ title, items, active, setActive }) => (
            <div key={title} className="mb-8">
              <div className="text-xs uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '2px' }}>{title}</div>
              <div className="flex flex-col gap-2">
                {items.map(item => (
                  <button key={item} onClick={() => setActive(item)}
                    className="text-left text-sm py-2 px-3 transition-all"
                    style={{ color: active === item ? '#fff' : 'rgba(255,255,255,0.35)', background: active === item ? 'rgba(192,138,69,0.12)' : 'transparent', borderLeft: active === item ? '2px solid #C08A45' : '2px solid transparent' }}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="mb-8">
            <div className="text-xs uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '2px' }}>Budget max</div>
            <div className="flex flex-col gap-2">
              {[{ label: 'Tous budgets', val: 0 }, { label: '20 000 000 FCFA', val: 20000000 }, { label: '30 000 000 FCFA', val: 30000000 }, { label: '40 000 000 FCFA', val: 40000000 }, { label: '50 000 000 FCFA', val: 50000000 }].map(p => (
                <button key={p.val} onClick={() => setMaxPrice(p.val)}
                  className="text-left text-sm py-2 px-3 transition-all"
                  style={{ color: maxPrice === p.val ? '#fff' : 'rgba(255,255,255,0.35)', background: maxPrice === p.val ? 'rgba(192,138,69,0.12)' : 'transparent', borderLeft: maxPrice === p.val ? '2px solid #C08A45' : '2px solid transparent' }}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => { setActiveType('Tous'); setActiveBrand('Toutes'); setActiveFuel('Tous'); setMaxPrice(0); setSearchText('') }}
            className="w-full text-xs uppercase tracking-widest py-3"
            style={{ border: '0.5px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px' }}>
            Réinitialiser
          </button>
        </aside>

        <div className="flex-1 p-4 md:p-10">
          <div className="flex items-center justify-end mb-8 gap-4">
            <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>Trier par</span>
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="text-sm px-4 py-2 outline-none"
              style={{ background: '#0D1A2D', border: '0.5px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
              <option value="recent">Plus récents</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="km">Kilométrage</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-24"><div className="text-white text-lg font-light">Chargement...</div></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-6" style={{ color: 'rgba(255,255,255,0.08)' }}>🚗</div>
              <div className="text-white text-lg font-light mb-2">Aucun véhicule trouvé</div>
              <div className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>Essayez d'autres mots-clés</div>
              <button onClick={() => { setSearchText(''); setActiveType('Tous'); setActiveBrand('Toutes'); setActiveFuel('Tous'); setMaxPrice(0) }}
                className="text-xs px-6 py-3 uppercase tracking-widest" style={{ border: '0.5px solid #C08A45', color: '#C08A45' }}>
                Voir tous les véhicules
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px" style={{ background: '#1A2535' }}>
              {filtered.map(v => <CarCard key={v.id} vehicle={v} />)}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default function VehiclesPage() {
  return (
    <Suspense fallback={<div style={{ background: '#08111F', minHeight: '100vh' }} />}>
      <VehiclesContent />
    </Suspense>
  )
}
