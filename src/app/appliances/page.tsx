'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ElecCard from '@/components/ElecCard'
import { Appliance } from '@/types'

const categories = ['Toutes', 'Télévisions', 'Réfrigérateurs', 'Climatiseurs', 'Lave-linge', 'Audio']
const catMap: Record<string, string> = {
  'Télévisions': 'television', 'Réfrigérateurs': 'refrigerateur',
  'Climatiseurs': 'climatiseur', 'Lave-linge': 'lave-linge', 'Audio': 'audio'
}

export default function AppliancesPage() {
  const [appliances, setAppliances] = useState<Appliance[]>([])
  const [loading, setLoading] = useState(true)
  const [activecat, setActivecat] = useState('Toutes')

  useEffect(() => {
    fetch('/api/appliances')
      .then(r => r.json())
      .then(data => { setAppliances(data.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = appliances.filter(a => {
    if (activecat === 'Toutes') return true
    return a.category === catMap[activecat]
  })

  return (
    <main style={{ background: '#F5F3EF', minHeight: '100vh' }}>
      <div style={{ background: '#08111F' }}><Navbar /></div>

      <div className="pt-28 md:pt-36 pb-8 md:pb-12 px-4 md:px-12" style={{ background: '#08111F', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
        <div className="text-xs mb-4 uppercase tracking-widest" style={{ color: '#C08A45', letterSpacing: '3px' }}>Déstockage</div>
        <div className="flex items-end justify-between">
          <h1 className="text-2xl md:text-4xl font-light text-white" style={{ letterSpacing: '-0.5px' }}>Électroménager</h1>
          <p className="text-sm max-w-sm text-right font-light hidden md:block" style={{ color: 'rgba(255,255,255,0.35)', lineHeight: 1.7 }}>
            Liquidation avant renouvellement. Stock limité.
          </p>
        </div>
      </div>

      <div className="mx-4 md:mx-12 mt-8 mb-10 px-6 md:px-8 py-6 flex items-center justify-between"
        style={{ background: '#08111F', border: '0.5px solid rgba(192,138,69,0.2)' }}>
        <div>
          <div className="text-white font-light text-lg mb-1">Offres de déstockage — Stock limité</div>
          <div className="text-sm font-light" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Des appareils de qualité à des prix bien en dessous du marché
          </div>
        </div>
        <div style={{ fontSize: '40px', fontWeight: 200, color: '#C08A45' }}>-40%</div>
      </div>

      <div className="px-4 md:px-12 pb-12 md:pb-20">
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

        {loading ? (
          <div className="text-center py-20">
            <div className="text-lg font-light" style={{ color: '#08111F' }}>Chargement...</div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">📦</div>
            <div className="text-lg font-light" style={{ color: '#08111F' }}>Aucun appareil disponible</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(a => <ElecCard key={a.id} appliance={a} />)}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
