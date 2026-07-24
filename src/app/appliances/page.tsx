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
    fetch('/api/appliances').then(r => r.json()).then(data => { setAppliances(data.data || []); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const filtered = appliances.filter(a => activecat === 'Toutes' ? true : a.category === catMap[activecat])

  return (
    <main style={{ background: '#F0F0F0', minHeight: '100vh' }}>
      <div style={{ background: '#08111F' }}><Navbar /></div>

      <div className="pt-28 md:pt-36 pb-8 md:pb-12 px-4 md:px-12" style={{ background: '#08111F', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
        <div className="text-xs mb-4 uppercase tracking-widest" style={{ color: '#C08A45', letterSpacing: '3px' }}>Déstockage</div>
        <div className="flex items-end justify-between">
          <h1 className="text-2xl md:text-4xl font-light text-white" style={{ letterSpacing: '-0.5px' }}>Électroménager</h1>
          <p className="text-sm hidden md:block font-light" style={{ color: 'rgba(255,255,255,0.35)' }}>Liquidation avant renouvellement. Stock limité.</p>
        </div>
      </div>

      <div className="mx-4 md:mx-12 mt-8 mb-8 px-6 py-5 flex items-center justify-between"
        style={{ background: '#fff', border: '0.5px solid #D5D5D5', borderLeft: '3px solid #C08A45' }}>
        <div>
          <div className="font-light text-lg mb-1" style={{ color: '#08111F' }}>Offres de déstockage — Stock limité</div>
          <div className="text-sm font-light" style={{ color: '#999' }}>Des appareils de qualité à des prix bien en dessous du marché</div>
        </div>
        <div style={{ fontSize: '36px', fontWeight: 200, color: '#C08A45' }}>-40%</div>
      </div>

      <div className="px-4 md:px-12 pb-12 md:pb-20">
        <div className="flex gap-3 mb-8 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActivecat(cat)}
              className="text-xs uppercase tracking-widest px-5 py-3 transition-all"
              style={{ letterSpacing: '2px', background: activecat === cat ? '#08111F' : '#fff', color: activecat === cat ? '#fff' : '#666', border: activecat === cat ? '0.5px solid #08111F' : '0.5px solid #D5D5D5' }}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20"><div className="text-lg font-light" style={{ color: '#08111F' }}>Chargement...</div></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20"><div className="text-4xl mb-4">📦</div><div className="text-lg font-light" style={{ color: '#08111F' }}>Aucun appareil disponible</div></div>
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
