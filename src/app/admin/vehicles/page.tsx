'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Vehicle } from '@/types'

const badgeStyle: Record<string, { bg: string; color: string }> = {
  nouveau: { bg: '#E6F1FB', color: '#185FA5' },
  promo: { bg: '#FAEEDA', color: '#854F0B' },
  arrivage: { bg: '#E6F1FB', color: '#185FA5' },
  top_vente: { bg: '#FAEEDA', color: '#854F0B' },
}

export default function AdminVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/vehicles')
      .then(r => r.json())
      .then(data => { setVehicles(data.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer ce véhicule ?')) return
    setDeleting(id)
    const token = document.cookie.split('admin_token=')[1]?.split(';')[0]
    await fetch(`/api/vehicles/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    setVehicles(prev => prev.filter(v => v.id !== id))
    setDeleting(null)
  }

  const filtered = vehicles.filter(v =>
    v.name?.toLowerCase().includes(search.toLowerCase()) ||
    v.brand?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex min-h-screen" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
      <aside className="w-56 flex-shrink-0" style={{ background: '#08111F' }}>
        <div className="px-5 py-5" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div className="text-base font-light tracking-widest uppercase" style={{ color: '#fff' }}>
            Sen<span style={{ color: '#C08A45' }}>Electro</span>
          </div>
          <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Administration</div>
        </div>
        <nav className="py-4">
          <Link href="/admin" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>▦ Tableau de bord</Link>
          <Link href="/admin/vehicles" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: '#fff', background: 'rgba(192,138,69,0.1)', borderLeft: '2px solid #C08A45' }}>🚗 Véhicules</Link>
          <Link href="/admin/appliances" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>📦 Électroménager</Link>
          <Link href="/admin/messages" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>✉️ Messages</Link>
        </nav>
        <div className="px-5 py-4" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
          <Link href="/" className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>← Voir le site</Link>
        </div>
      </aside>

      <main className="flex-1" style={{ background: '#F4F5F7' }}>
        <div className="flex items-center justify-between px-8 h-14 bg-white" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
          <div className="text-sm font-medium" style={{ color: '#08111F' }}>Véhicules ({vehicles.length})</div>
          <Link href="/admin/vehicles/new" className="text-white text-xs uppercase tracking-widest px-4 py-2" style={{ background: '#C08A45', letterSpacing: '1px' }}>
            + Ajouter
          </Link>
        </div>

        <div className="p-8">
          <div className="bg-white rounded" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div className="flex items-center gap-4 px-6 py-4" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher un véhicule..."
                className="text-sm px-4 py-2 outline-none"
                style={{ border: '0.5px solid rgba(0,0,0,0.1)', color: '#333', maxWidth: '280px', width: '100%' }} />
              <span className="text-xs ml-auto" style={{ color: '#aaa' }}>{filtered.length} véhicule(s)</span>
            </div>

            {loading ? (
              <div className="text-center py-10 text-sm" style={{ color: '#aaa' }}>Chargement...</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr style={{ background: '#FAFAFA', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
                    {['Véhicule', 'Type', 'Km', 'Prix (FCFA)', 'Badge', 'Statut', 'Actions'].map(h => (
                      <th key={h} className="text-left px-6 py-3 text-xs uppercase tracking-widest font-normal" style={{ color: '#aaa', letterSpacing: '1px' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((v, i) => (
                    <tr key={v.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.05)' }}>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium" style={{ color: '#08111F' }}>{v.name}</div>
                        <div className="text-xs mt-0.5" style={{ color: '#aaa' }}>{v.brand}</div>
                      </td>
                      <td className="px-6 py-4 text-sm" style={{ color: '#888' }}>{v.type}</td>
                      <td className="px-6 py-4 text-sm" style={{ color: '#888' }}>{v.km?.toLocaleString('fr-FR')} km</td>
                      <td className="px-6 py-4 text-sm" style={{ color: '#C08A45' }}>{v.price?.toLocaleString('fr-FR')}</td>
                      <td className="px-6 py-4">
                        {v.badge && (
                          <span className="text-xs px-2 py-1 uppercase" style={{ ...badgeStyle[v.badge], fontSize: '9px', letterSpacing: '1px' }}>
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
                          <Link href={`/admin/vehicles/${v.id}`}
                            className="text-xs px-3 py-1.5 flex items-center gap-1"
                            style={{ border: '0.5px solid rgba(0,0,0,0.1)', color: '#666' }}>
                            ✏️ Modifier
                          </Link>
                          <button onClick={() => handleDelete(v.id)}
                            disabled={deleting === v.id}
                            className="text-xs px-3 py-1.5"
                            style={{ border: '0.5px solid rgba(226,75,74,0.2)', color: '#E24B4A', opacity: deleting === v.id ? 0.5 : 1 }}>
                            {deleting === v.id ? '...' : '🗑'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
