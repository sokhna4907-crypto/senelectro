'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ElecCard from '@/components/ElecCard'
import { Appliance } from '@/types'

const allAppliances: Appliance[] = [
  { id: 1, name: 'Télévision 55" 4K', brand: 'Samsung', category: 'television', price: 350000, stock_count: 3, photos: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80'], is_available: true, created_at: '' },
  { id: 2, name: 'Réfrigérateur 300 L', brand: 'Whirlpool', category: 'refrigerateur', price: 280000, stock_count: 2, photos: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80'], is_available: true, created_at: '' },
  { id: 3, name: 'Climatiseur 1.5 CV', brand: 'Daikin', category: 'climatiseur', price: 220000, stock_count: 8, photos: [], is_available: true, created_at: '' },
  { id: 4, name: 'Lave-linge 7 kg', brand: 'LG', category: 'lave-linge', price: 195000, stock_count: 5, photos: [], is_available: true, created_at: '' },
  { id: 5, name: 'Four micro-ondes 25 L', brand: 'Bosch', category: 'micro-ondes', price: 85000, stock_count: 10, photos: [], is_available: true, created_at: '' },
  { id: 6, name: 'Home Cinéma 5.1', brand: 'Sony', category: 'audio', price: 145000, stock_count: 4, photos: [], is_available: true, created_at: '' },
  { id: 7, name: 'Télévision 65" OLED', brand: 'LG', category: 'television', price: 550000, stock_count: 2, photos: [], is_available: true, created_at: '' },
  { id: 8, name: 'Climatiseur 2 CV', brand: 'Mitsubishi', category: 'climatiseur', price: 310000, stock_count: 3, photos: [], is_available: true, created_at: '' },
]

const categories = ['Toutes', 'Télévisions', 'Réfrigérateurs', 'Climatiseurs', 'Lave-linge', 'Audio']
const catMap: Record<string, string> = {
  'Télévisions': 'television', 'Réfrigérateurs': 'refrigerateur',
  'Climatiseurs': 'climatiseur', 'Lave-linge': 'lave-linge', 'Audio': 'audio'
}

export default function AppliancesPage() {
  const [activecat, setActivecat] = useState('Toutes')

  const filtered = allAppliances.filter(a => {
    if (activecat === 'Toutes') return true
    return a.category === catMap[activecat]
  })

  return (
    <main style={{ background: '#F5F3EF', minHeight: '100vh' }}>
      <div style={{ background: '#08111F' }}><Navbar /></div>

      {/* Header */}
      <div className="pt-36 pb-12 px-12" style={{ background: '#08111F', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
        <div className="text-xs mb-4 uppercase tracking-widest" style={{ color: '#C08A45', letterSpacing: '3px' }}>
          Déstockage
        </div>
        <div className="flex items-end justify-between">
          <h1 className="text-4xl font-light text-white" style={{ letterSpacing: '-0.5px' }}>
            Électroménager
          </h1>
          <p className="text-sm max-w-sm text-right font-light" style={{ color: 'rgba(255,255,255,0.35)', lineHeight: 1.7 }}>
            Liquidation avant renouvellement. Stock limité — premier arrivé, premier servi.
          </p>
        </div>
      </div>

      {/* Bannière promo */}
      <div className="mx-12 mt-8 mb-10 px-8 py-6 flex items-center justify-between"
        style={{ background: '#08111F', border: '0.5px solid rgba(192,138,69,0.2)' }}>
        <div>
          <div className="text-white font-light text-lg mb-1">Offres de déstockage — Stock limité</div>
          <div className="text-sm font-light" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Des appareils de qualité à des prix bien en dessous du marché
          </div>
        </div>
        <div style={{ fontSize: '40px', fontWeight: 200, color: '#C08A45' }}>-40%</div>
      </div>

      <div className="px-12 pb-20">

        {/* Filtres catégories */}
        <div className="flex gap-3 mb-10 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActivecat(cat)}
              className="text-xs uppercase tracking-widest px-5 py-3 transition-all"
              style={{
                letterSpacing: '2px',
                background: activecat === cat ? '#08111F' : '#fff',
                color: activecat === cat ? '#fff' : '#666',
                border: activecat === cat ? '0.5px solid #C08A45' : '0.5px solid rgba(0,0,0,0.1)',
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grille */}
        <div className="grid grid-cols-4 gap-5">
          {filtered.map(a => <ElecCard key={a.id} appliance={a} />)}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">📦</div>
            <div className="text-lg font-light" style={{ color: '#08111F' }}>Aucun appareil dans cette catégorie</div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
