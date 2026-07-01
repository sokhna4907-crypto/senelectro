'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CarCard from '@/components/CarCard'
import { Vehicle } from '@/types'

const allVehicles: Vehicle[] = [
  { id: 1, name: 'Mercedes C-Class 2020', brand: 'Mercedes', model: 'C-Class', year: 2020, km: 48000, fuel: 'essence', transmission: 'automatique', type: 'berline', price: 22000000, monthly_price: 730000, badge: 'nouveau', photos: ['https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&q=80'], is_available: true, created_at: '' },
  { id: 2, name: 'BMW Série 5 2019', brand: 'BMW', model: 'Série 5', year: 2019, km: 62000, fuel: 'diesel', transmission: 'automatique', type: 'berline', price: 25000000, monthly_price: 830000, badge: 'promo', photos: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80'], is_available: true, created_at: '' },
  { id: 3, name: 'Audi A6 2020', brand: 'Audi', model: 'A6', year: 2020, km: 55000, fuel: 'diesel', transmission: 'automatique', type: 'berline', price: 27000000, monthly_price: 900000, badge: null, photos: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80'], is_available: true, created_at: '' },
  { id: 4, name: 'BMW X5 2021', brand: 'BMW', model: 'X5', year: 2021, km: 38000, fuel: 'diesel', transmission: 'automatique', type: 'suv', price: 38000000, monthly_price: 1260000, badge: 'arrivage', photos: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80'], is_available: true, created_at: '' },
  { id: 5, name: 'Mercedes GLE 2020', brand: 'Mercedes', model: 'GLE', year: 2020, km: 45000, fuel: 'essence', transmission: 'automatique', type: 'suv', price: 42000000, monthly_price: 1400000, badge: null, photos: ['https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&q=80'], is_available: true, created_at: '' },
  { id: 6, name: 'Audi Q7 2021', brand: 'Audi', model: 'Q7', year: 2021, km: 32000, fuel: 'diesel', transmission: 'automatique', type: 'suv', price: 45000000, monthly_price: 1500000, badge: 'top_vente', photos: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&q=80'], is_available: true, created_at: '' },
  { id: 7, name: 'Porsche Cayenne 2020', brand: 'Porsche', model: 'Cayenne', year: 2020, km: 40000, fuel: 'essence', transmission: 'automatique', type: 'suv', price: 55000000, monthly_price: 1830000, badge: null, photos: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80'], is_available: true, created_at: '' },
  { id: 8, name: 'Land Rover Discovery 2019', brand: 'Land Rover', model: 'Discovery', year: 2019, km: 58000, fuel: 'diesel', transmission: 'automatique', type: '4x4', price: 35000000, monthly_price: 1160000, badge: null, photos: ['https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=600&q=80'], is_available: true, created_at: '' },
  { id: 9, name: 'Volkswagen Passat 2021', brand: 'Volkswagen', model: 'Passat', year: 2021, km: 28000, fuel: 'essence', transmission: 'automatique', type: 'berline', price: 18000000, monthly_price: 600000, badge: 'nouveau', photos: ['https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80'], is_available: true, created_at: '' },
]

const types = ['Tous', 'Berline', 'SUV', '4x4', 'Utilitaire']
const brands = ['Toutes', 'Mercedes', 'BMW', 'Audi', 'Porsche', 'Land Rover', 'Volkswagen']
const fuels = ['Tous', 'Essence', 'Diesel', 'Hybride']

export default function VehiclesPage() {
  const [activeType, setActiveType] = useState('Tous')
  const [activeBrand, setActiveBrand] = useState('Toutes')
  const [activeFuel, setActiveFuel] = useState('Tous')
  const [maxPrice, setMaxPrice] = useState(0)
  const [sort, setSort] = useState('recent')

  const filtered = allVehicles.filter(v => {
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

      {/* Header */}
      <div className="pt-36 pb-12 px-12" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
        <div className="text-xs mb-4 uppercase tracking-widest" style={{ color: '#C08A45', letterSpacing: '3px' }}>
          Inventaire complet
        </div>
        <div className="flex items-end justify-between">
          <h1 className="text-4xl font-light text-white" style={{ letterSpacing: '-0.5px' }}>
            Véhicules en stock
          </h1>
          <span className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {filtered.length} véhicule{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="flex">

        {/* Sidebar filtres */}
        <aside className="w-64 flex-shrink-0 px-8 py-10 sticky top-28 self-start"
          style={{ borderRight: '0.5px solid rgba(255,255,255,0.05)', height: 'calc(100vh - 7rem)', overflowY: 'auto' }}>

          {/* Type */}
          <div className="mb-8">
            <div className="text-xs uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '2px' }}>
              Type
            </div>
            <div className="flex flex-col gap-2">
              {types.map(t => (
                <button key={t} onClick={() => setActiveType(t)}
                  className="text-left text-sm py-2 px-3 transition-all"
                  style={{
                    color: activeType === t ? '#fff' : 'rgba(255,255,255,0.35)',
                    background: activeType === t ? 'rgba(192,138,69,0.12)' : 'transparent',
                    borderLeft: activeType === t ? '2px solid #C08A45' : '2px solid transparent',
                  }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Marque */}
          <div className="mb-8">
            <div className="text-xs uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '2px' }}>
              Marque
            </div>
            <div className="flex flex-col gap-2">
              {brands.map(b => (
                <button key={b} onClick={() => setActiveBrand(b)}
                  className="text-left text-sm py-2 px-3 transition-all"
                  style={{
                    color: activeBrand === b ? '#fff' : 'rgba(255,255,255,0.35)',
                    background: activeBrand === b ? 'rgba(192,138,69,0.12)' : 'transparent',
                    borderLeft: activeBrand === b ? '2px solid #C08A45' : '2px solid transparent',
                  }}>
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Carburant */}
          <div className="mb-8">
            <div className="text-xs uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '2px' }}>
              Carburant
            </div>
            <div className="flex flex-col gap-2">
              {fuels.map(f => (
                <button key={f} onClick={() => setActiveFuel(f)}
                  className="text-left text-sm py-2 px-3 transition-all"
                  style={{
                    color: activeFuel === f ? '#fff' : 'rgba(255,255,255,0.35)',
                    background: activeFuel === f ? 'rgba(192,138,69,0.12)' : 'transparent',
                    borderLeft: activeFuel === f ? '2px solid #C08A45' : '2px solid transparent',
                  }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="mb-8">
            <div className="text-xs uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '2px' }}>
              Budget max
            </div>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Tous budgets', val: 0 },
                { label: '20 000 000 FCFA', val: 20000000 },
                { label: '30 000 000 FCFA', val: 30000000 },
                { label: '40 000 000 FCFA', val: 40000000 },
                { label: '50 000 000 FCFA', val: 50000000 },
              ].map(p => (
                <button key={p.val} onClick={() => setMaxPrice(p.val)}
                  className="text-left text-sm py-2 px-3 transition-all"
                  style={{
                    color: maxPrice === p.val ? '#fff' : 'rgba(255,255,255,0.35)',
                    background: maxPrice === p.val ? 'rgba(192,138,69,0.12)' : 'transparent',
                    borderLeft: maxPrice === p.val ? '2px solid #C08A45' : '2px solid transparent',
                  }}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reset */}
          <button onClick={() => { setActiveType('Tous'); setActiveBrand('Toutes'); setActiveFuel('Tous'); setMaxPrice(0) }}
            className="w-full text-xs uppercase tracking-widest py-3 transition-colors"
            style={{ border: '0.5px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px' }}>
            Réinitialiser
          </button>
        </aside>

        {/* Grille véhicules */}
        <div className="flex-1 p-10">

          {/* Tri */}
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

          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-6" style={{ color: 'rgba(255,255,255,0.08)' }}>🚗</div>
              <div className="text-white text-lg font-light mb-2">Aucun véhicule trouvé</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>Modifiez vos filtres</div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-px" style={{ background: '#1A2535' }}>
              {filtered.map(v => <CarCard key={v.id} vehicle={v} />)}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
