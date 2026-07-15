'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminAppliances() {
  const [appliances, setAppliances] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/appliances').then(r => r.json()).then(data => { setAppliances(data.data || []); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cet appareil ?')) return
    setDeleting(id)
    await fetch(`/api/appliances/${id}`, { method: 'DELETE' })
    setAppliances(prev => prev.filter(a => a.id !== id))
    setDeleting(null)
  }

  return (
    <div className="flex min-h-screen" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
      <aside className="w-56 flex-shrink-0 flex flex-col" style={{ background: '#08111F' }}>
        <div className="px-5 py-5" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div className="text-base font-light tracking-widest uppercase" style={{ color: '#fff' }}>Sen<span style={{ color: '#C08A45' }}>Electro</span></div>
          <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Administration</div>
        </div>
        <nav className="py-4 flex-1">
          <Link href="/admin" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>▦ Tableau de bord</Link>
          <Link href="/admin/vehicles" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>🚗 Véhicules</Link>
          <Link href="/admin/appliances" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: '#fff', background: 'rgba(192,138,69,0.1)', borderLeft: '2px solid #C08A45' }}>📦 Électroménager</Link>
          <Link href="/admin/messages" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>✉️ Messages</Link>
        </nav>
        <div className="px-5 py-4" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}><Link href="/" className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>← Voir le site</Link></div>
      </aside>
      <main className="flex-1" style={{ background: '#F4F5F7' }}>
        <div className="flex items-center justify-between px-8 h-14 bg-white" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
          <div className="text-sm font-medium" style={{ color: '#08111F' }}>Électroménager ({appliances.length})</div>
          <Link href="/admin/appliances/new" className="text-white text-xs uppercase px-4 py-2" style={{ background: '#C08A45' }}>+ Ajouter</Link>
        </div>
        <div className="p-8">
          <div className="bg-white rounded" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            {loading ? <div className="text-center py-10 text-sm" style={{ color: '#aaa' }}>Chargement...</div>
            : appliances.length === 0 ? <div className="text-center py-10"><div className="text-3xl mb-3">📦</div><div className="text-sm" style={{ color: '#aaa' }}>Aucun appareil — <Link href="/admin/appliances/new" style={{ color: '#C08A45' }}>Ajouter</Link></div></div>
            : (
              <table className="w-full">
                <thead><tr style={{ background: '#FAFAFA', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
                  {['Appareil', 'Marque', 'Catégorie', 'Prix (FCFA)', 'Stock', 'Actions'].map(h => <th key={h} className="text-left px-6 py-3 text-xs uppercase font-normal" style={{ color: '#aaa' }}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {appliances.map((a: any) => (
                    <tr key={a.id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.05)' }}>
                      <td className="px-6 py-4 text-sm font-medium" style={{ color: '#08111F' }}>{a.name}</td>
                      <td className="px-6 py-4 text-sm" style={{ color: '#888' }}>{a.brand}</td>
                      <td className="px-6 py-4 text-sm" style={{ color: '#888' }}>{a.category}</td>
                      <td className="px-6 py-4 text-sm" style={{ color: '#C08A45' }}>{a.price?.toLocaleString('fr-FR')}</td>
                      <td className="px-6 py-4"><span className="text-xs px-2 py-1" style={{ background: a.stock_count <= 3 ? '#FDEAEA' : '#EAF3DE', color: a.stock_count <= 3 ? '#E24B4A' : '#3B6D11', fontSize: '9px' }}>{a.stock_count} restants</span></td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link href={`/admin/appliances/${a.id}`} className="text-xs px-3 py-1.5" style={{ border: '0.5px solid rgba(0,0,0,0.1)', color: '#666' }}>✏️ Modifier</Link>
                          <button onClick={() => handleDelete(a.id)} disabled={deleting === a.id} className="text-xs px-3 py-1.5" style={{ border: '0.5px solid rgba(226,75,74,0.2)', color: '#E24B4A', opacity: deleting === a.id ? 0.5 : 1 }}>{deleting === a.id ? '...' : '🗑'}</button>
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
