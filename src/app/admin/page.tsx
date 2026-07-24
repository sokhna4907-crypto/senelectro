'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ vehicles: 0, appliances: 0, financing: 0, messages: 0, pending: 0, unread: 0 })
  const [recentVehicles, setRecentVehicles] = useState<any[]>([])
  const [recentRequests, setRecentRequests] = useState<any[]>([])

  useEffect(() => {
    Promise.all([
      fetch('/api/vehicles').then(r => r.json()),
      fetch('/api/appliances').then(r => r.json()),
      fetch('/api/financing').then(r => r.json()),
      fetch('/api/contact').then(r => r.json()),
    ]).then(([v, a, f, m]) => {
      const vehicles = v.data || []
      const appliances = a.data || []
      const financing = f.data || []
      const messages = m.data || []
      setStats({
        vehicles: vehicles.length,
        appliances: appliances.length,
        financing: financing.length,
        messages: messages.length,
        pending: financing.filter((r: any) => r.status === 'pending').length,
        unread: messages.filter((m: any) => !m.is_read).length,
      })
      setRecentVehicles(vehicles.slice(0, 4))
      setRecentRequests(financing.slice(0, 3))
    }).catch(() => {})
  }, [])

  const statusStyle: Record<string, { bg: string; color: string; label: string }> = {
    pending: { bg: '#FAEEDA', color: '#854F0B', label: 'En attente' },
    approved: { bg: '#EAF3DE', color: '#3B6D11', label: 'Approuvée' },
    rejected: { bg: '#FDEAEA', color: '#E24B4A', label: 'Refusée' },
  }

  const navItems = [
    { label: 'Tableau de bord', href: '/admin', icon: '▦', active: true },
    { label: 'Véhicules', href: '/admin/vehicles', icon: '🚗' },
    { label: 'Électroménager', href: '/admin/appliances', icon: '📦' },
    { label: 'Financement', href: '/admin/financing', icon: '📋' },
    { label: 'Messages', href: '/admin/messages', icon: '✉️' },
  ]

  return (
    <div className="flex min-h-screen" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
      <aside className="w-56 flex-shrink-0 flex flex-col" style={{ background: '#08111F' }}>
        <div className="px-5 py-5" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div className="text-base font-light tracking-widest uppercase" style={{ color: '#fff' }}>Sen<span style={{ color: '#C08A45' }}>Electro</span></div>
          <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Administration</div>
        </div>
        <nav className="py-4 flex-1">
          {navItems.map(item => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-5 py-3 text-sm"
              style={{ color: item.active ? '#fff' : 'rgba(255,255,255,0.4)', background: item.active ? 'rgba(192,138,69,0.1)' : 'transparent', borderLeft: item.active ? '2px solid #C08A45' : '2px solid transparent' }}>
              <span>{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-5 py-4" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
          <Link href="/" className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>← Voir le site</Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col" style={{ background: '#F4F5F7' }}>
        <div className="flex items-center justify-between px-8 h-14 bg-white" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
          <div className="text-sm font-medium" style={{ color: '#08111F' }}>Tableau de bord</div>
          <Link href="/admin/vehicles/new" className="text-white text-xs uppercase tracking-widest px-4 py-2" style={{ background: '#C08A45', letterSpacing: '1px' }}>
            + Ajouter un véhicule
          </Link>
        </div>

        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Véhicules en stock', value: stats.vehicles, sub: 'total', subColor: '#3B6D11' },
              { label: 'Électroménager', value: stats.appliances, sub: 'articles', subColor: '#3B6D11' },
              { label: 'Demandes financement', value: stats.financing, sub: `${stats.pending} en attente`, subColor: '#C08A45' },
              { label: 'Messages reçus', value: stats.messages, sub: `${stats.unread} non lus`, subColor: '#E24B4A' },
            ].map((s, i) => (
              <div key={i} className="bg-white p-5 rounded" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
                <div className="text-xs mb-2 uppercase tracking-widest" style={{ color: '#aaa', letterSpacing: '1px' }}>{s.label}</div>
                <div className="text-3xl font-light mb-1" style={{ color: '#08111F' }}>{s.value}</div>
                <div className="text-xs" style={{ color: s.subColor }}>↑ {s.sub}</div>
              </div>
            ))}
          </div>

          {/* Véhicules récents */}
          <div className="bg-white rounded mb-6" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
              <div className="text-sm font-medium" style={{ color: '#08111F' }}>Derniers véhicules</div>
              <Link href="/admin/vehicles" className="text-xs" style={{ color: '#C08A45' }}>Voir tout →</Link>
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ background: '#FAFAFA', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
                  {['Véhicule', 'Type', 'Prix (FCFA)', 'Statut', 'Actions'].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-xs uppercase tracking-widest font-normal" style={{ color: '#aaa', letterSpacing: '1px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentVehicles.map((v, i) => (
                  <tr key={i} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.05)' }}>
                    <td className="px-6 py-4 text-sm font-medium" style={{ color: '#08111F' }}>{v.name}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#888' }}>{v.type}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#C08A45' }}>{v.price?.toLocaleString('fr-FR')}</td>
                    <td className="px-6 py-4"><span className="text-xs px-2 py-1" style={{ background: '#EAF3DE', color: '#3B6D11', fontSize: '9px' }}>En ligne</span></td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/vehicles/${v.id}`} className="text-xs px-3 py-1.5" style={{ border: '0.5px solid rgba(0,0,0,0.1)', color: '#666' }}>✏️ Modifier</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Demandes récentes */}
          <div className="bg-white rounded" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
              <div className="text-sm font-medium" style={{ color: '#08111F' }}>Demandes de financement récentes</div>
              <Link href="/admin/financing" className="text-xs" style={{ color: '#C08A45' }}>Voir tout →</Link>
            </div>
            {recentRequests.length === 0 ? (
              <div className="text-center py-8 text-sm" style={{ color: '#aaa' }}>Aucune demande pour l'instant</div>
            ) : (
              <div className="divide-y" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                {recentRequests.map((r, i) => (
                  <div key={i} className="flex items-center gap-6 px-6 py-4">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0" style={{ background: '#08111F' }}>
                      {r.full_name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium" style={{ color: '#08111F' }}>{r.full_name}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#aaa' }}>{r.phone}</div>
                    </div>
                    <div className="text-sm" style={{ color: '#C08A45' }}>{r.budget_monthly?.toLocaleString('fr-FR')} FCFA/mois</div>
                    <span className="text-xs px-2 py-1"
                      style={{ background: statusStyle[r.status]?.bg, color: statusStyle[r.status]?.color, fontSize: '9px' }}>
                      {statusStyle[r.status]?.label}
                    </span>
                    <div className="text-xs" style={{ color: '#bbb' }}>{new Date(r.created_at).toLocaleDateString('fr-FR')}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
