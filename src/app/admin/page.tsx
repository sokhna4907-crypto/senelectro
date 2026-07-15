'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ vehicles: 0, appliances: 0, messages: 0 })
  const [vehicles, setVehicles] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/vehicles').then(r => r.json()),
      fetch('/api/appliances').then(r => r.json()),
      fetch('/api/contact').then(r => r.json()),
    ]).then(([v, a, m]) => {
      const vd = v.data || [], ad = a.data || [], md = m.data || []
      setStats({ vehicles: vd.length, appliances: ad.length, messages: md.filter((x: any) => !x.is_read).length })
      setVehicles(vd.slice(0, 4))
      setMessages(md.slice(0, 3))
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const Sidebar = () => (
    <aside className="w-56 flex-shrink-0 flex flex-col" style={{ background: '#08111F' }}>
      <div className="px-5 py-5" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
        <div className="text-base font-light tracking-widest uppercase" style={{ color: '#fff' }}>Sen<span style={{ color: '#C08A45' }}>Electro</span></div>
        <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Administration</div>
      </div>
      <nav className="py-4 flex-1">
        <Link href="/admin" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: '#fff', background: 'rgba(192,138,69,0.1)', borderLeft: '2px solid #C08A45' }}>▦ Tableau de bord</Link>
        <Link href="/admin/vehicles" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>🚗 Véhicules</Link>
        <Link href="/admin/appliances" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>📦 Électroménager</Link>
        <Link href="/admin/messages" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>✉️ Messages</Link>
      </nav>
      <div className="px-5 py-4" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>← Voir le site</Link>
      </div>
    </aside>
  )

  return (
    <div className="flex min-h-screen" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
      <Sidebar />
      <main className="flex-1" style={{ background: '#F4F5F7' }}>
        <div className="flex items-center justify-between px-8 h-14 bg-white" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
          <div className="text-sm font-medium" style={{ color: '#08111F' }}>Tableau de bord</div>
          <Link href="/admin/vehicles/new" className="text-white text-xs uppercase px-4 py-2" style={{ background: '#C08A45' }}>+ Ajouter un véhicule</Link>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Véhicules en stock', value: stats.vehicles, link: '/admin/vehicles' },
              { label: 'Électroménager', value: stats.appliances, link: '/admin/appliances' },
              { label: 'Messages non lus', value: stats.messages, link: '/admin/messages' },
            ].map((s, i) => (
              <Link key={i} href={s.link} className="bg-white p-5 rounded block" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
                <div className="text-xs mb-2 uppercase tracking-widest" style={{ color: '#aaa' }}>{s.label}</div>
                <div className="text-3xl font-light mb-1" style={{ color: '#08111F' }}>{loading ? '...' : s.value}</div>
                <div className="text-xs" style={{ color: '#C08A45' }}>→ Gérer</div>
              </Link>
            ))}
          </div>

          <div className="bg-white rounded mb-6" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
              <div className="text-sm font-medium" style={{ color: '#08111F' }}>Véhicules récents</div>
              <Link href="/admin/vehicles" className="text-xs" style={{ color: '#C08A45' }}>Voir tout →</Link>
            </div>
            {loading ? <div className="text-center py-8 text-sm" style={{ color: '#aaa' }}>Chargement...</div>
            : vehicles.length === 0 ? (
              <div className="text-center py-8 text-sm" style={{ color: '#aaa' }}>
                Aucun véhicule — <Link href="/admin/vehicles/new" style={{ color: '#C08A45' }}>Ajouter le premier</Link>
              </div>
            ) : (
              <table className="w-full">
                <thead><tr style={{ background: '#FAFAFA', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
                  {['Véhicule', 'Type', 'Prix (FCFA)', 'Actions'].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-xs uppercase font-normal" style={{ color: '#aaa' }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {vehicles.map((v: any, i: number) => (
                    <tr key={i} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.05)' }}>
                      <td className="px-6 py-4 text-sm font-medium" style={{ color: '#08111F' }}>{v.name}</td>
                      <td className="px-6 py-4 text-sm" style={{ color: '#888' }}>{v.type}</td>
                      <td className="px-6 py-4 text-sm" style={{ color: '#C08A45' }}>{v.price?.toLocaleString('fr-FR')}</td>
                      <td className="px-6 py-4">
                        <Link href={`/admin/vehicles/${v.id}`} className="text-xs px-3 py-1.5" style={{ border: '0.5px solid rgba(0,0,0,0.1)', color: '#666' }}>✏️ Modifier</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="bg-white rounded" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
              <div className="text-sm font-medium" style={{ color: '#08111F' }}>Messages récents</div>
              <Link href="/admin/messages" className="text-xs" style={{ color: '#C08A45' }}>Voir tout →</Link>
            </div>
            {loading ? <div className="text-center py-8 text-sm" style={{ color: '#aaa' }}>Chargement...</div>
            : messages.length === 0 ? <div className="text-center py-8 text-sm" style={{ color: '#aaa' }}>Aucun message</div>
            : messages.map((m: any, i: number) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4" style={{ borderBottom: i < messages.length - 1 ? '0.5px solid rgba(0,0,0,0.05)' : 'none' }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs text-white flex-shrink-0" style={{ background: '#08111F' }}>
                  {m.full_name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium" style={{ color: '#08111F' }}>{m.full_name}</div>
                  <div className="text-xs truncate" style={{ color: '#aaa', maxWidth: '400px' }}>{m.message}</div>
                </div>
                {!m.is_read && <span className="text-xs px-2 py-1" style={{ background: '#FAEEDA', color: '#854F0B', fontSize: '9px' }}>Non lu</span>}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
