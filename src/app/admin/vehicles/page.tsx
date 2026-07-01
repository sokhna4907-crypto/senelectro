'use client'
import { useState } from 'react'
import Link from 'next/link'

const vehicles = [
  { id: 1, name: 'Mercedes C-Class 2020', brand: 'Mercedes', type: 'Berline', km: '48 000', price: '22 000 000', badge: 'nouveau', status: 'online' },
  { id: 2, name: 'BMW Série 5 2019', brand: 'BMW', type: 'Berline', km: '62 000', price: '25 000 000', badge: 'promo', status: 'online' },
  { id: 3, name: 'Audi A6 2020', brand: 'Audi', type: 'Berline', km: '55 000', price: '27 000 000', badge: null, status: 'online' },
  { id: 4, name: 'BMW X5 2021', brand: 'BMW', type: 'SUV', km: '38 000', price: '38 000 000', badge: 'arrivage', status: 'online' },
  { id: 5, name: 'Mercedes GLE 2020', brand: 'Mercedes', type: 'SUV', km: '45 000', price: '42 000 000', badge: null, status: 'online' },
  { id: 6, name: 'Audi Q7 2021', brand: 'Audi', type: 'SUV', km: '32 000', price: '45 000 000', badge: 'top_vente', status: 'online' },
]

const badgeStyle: Record<string, { bg: string; color: string }> = {
  nouveau: { bg: '#E6F1FB', color: '#185FA5' },
  promo: { bg: '#FAEEDA', color: '#854F0B' },
  arrivage: { bg: '#E6F1FB', color: '#185FA5' },
  top_vente: { bg: '#FAEEDA', color: '#854F0B' },
}

export default function AdminVehicles() {
  const [search, setSearch] = useState('')

  const filtered = vehicles.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.brand.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex min-h-screen" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>

      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0" style={{ background: '#08111F' }}>
        <div className="px-5 py-5" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div className="text-base font-light tracking-widest uppercase" style={{ color: '#fff' }}>
            Sen<span style={{ color: '#C08A45' }}>Electro</span>
          </div>
          <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Administration</div>
        </div>
        <nav className="py-4">
          {[
            { label: 'Tableau de bord', href: '/admin', icon: '▦' },
            { label: 'Véhicules', href: '/admin/vehicles', icon: '🚗', active: true },
            { label: 'Électroménager', href: '/admin/appliances', icon: '📦' },
            { label: 'Financement', href: '/admin', icon: '📋' },
            { label: 'Messages', href: '/admin', icon: '✉️' },
          ].map(item => (
            <Link key={item.label} href={item.href}
              className="flex items-center gap-3 px-5 py-3 text-sm"
              style={{
                color: item.active ? '#fff' : 'rgba(255,255,255,0.4)',
                background: item.active ? 'rgba(192,138,69,0.1)' : 'transparent',
                borderLeft: item.active ? '2px solid #C08A45' : '2px solid transparent',
              }}>
              <span>{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-5 py-4 mt-auto" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
          <Link href="/" className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>← Voir le site</Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1" style={{ background: '#F4F5F7' }}>
        <div className="flex items-center justify-between px-8 h-14 bg-white"
          style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
          <div className="text-sm font-medium" style={{ color: '#08111F' }}>Véhicules</div>
          <Link href="/admin/vehicles/new"
            className="text-white text-xs uppercase tracking-widest px-4 py-2"
            style={{ background: '#C08A45', letterSpacing: '1px' }}>
            + Ajouter
          </Link>
        </div>

        <div className="p-8">
          <div className="bg-white rounded" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div className="flex items-center gap-4 px-6 py-4" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher un véhicule..."
                className="text-sm px-4 py-2 outline-none flex-1"
                style={{ border: '0.5px solid rgba(0,0,0,0.1)', color: '#333', maxWidth: '280px' }} />
              <span className="text-xs ml-auto" style={{ color: '#aaa' }}>{filtered.length} véhicule(s)</span>
            </div>

            <table className="w-full">
              <thead>
                <tr style={{ background: '#FAFAFA', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
                  {['Véhicule', 'Type', 'Kilométrage', 'Prix (FCFA)', 'Badge', 'Statut', 'Actions'].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-xs uppercase tracking-widest font-normal"
                      style={{ color: '#aaa', letterSpacing: '1px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((v, i) => (
                  <tr key={i} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.05)' }}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium" style={{ color: '#08111F' }}>{v.name}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#aaa' }}>{v.brand}</div>
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#888' }}>{v.type}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#888' }}>{v.km} km</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#C08A45' }}>{v.price}</td>
                    <td className="px-6 py-4">
                      {v.badge && (
                        <span className="text-xs px-2 py-1 uppercase"
                          style={{ ...badgeStyle[v.badge], fontSize: '9px', letterSpacing: '1px' }}>
                          {v.badge}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1" style={{ background: '#EAF3DE', color: '#3B6D11', fontSize: '9px' }}>
                        En ligne
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-xs px-3 py-1.5 transition-colors"
                          style={{ border: '0.5px solid rgba(0,0,0,0.1)', color: '#666' }}>✏️ Modifier</button>
                        <button className="text-xs px-3 py-1.5"
                          style={{ border: '0.5px solid rgba(226,75,74,0.2)', color: '#E24B4A' }}>🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
