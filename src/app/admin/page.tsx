'use client'
import { useState } from 'react'
import Link from 'next/link'

const stats = [
  { label: 'Véhicules en stock', value: '34', sub: '+3 ce mois', subColor: '#3B6D11' },
  { label: 'Électroménager', value: '82', sub: '6 vendus ce mois', subColor: '#3B6D11' },
  { label: 'Demandes financement', value: '12', sub: '4 en attente', subColor: '#C08A45' },
  { label: 'Messages reçus', value: '7', sub: '3 non lus', subColor: '#E24B4A' },
]

const recentVehicles = [
  { id: 1, name: 'Mercedes C-Class 2020', type: 'Berline', price: '22 000 000', badge: 'nouveau', status: 'En ligne' },
  { id: 2, name: 'BMW Série 5 2019', type: 'Berline', price: '25 000 000', badge: 'promo', status: 'En ligne' },
  { id: 3, name: 'Audi A6 2020', type: 'Berline', price: '27 000 000', badge: null, status: 'En ligne' },
  { id: 4, name: 'BMW X5 2021', type: 'SUV', price: '38 000 000', badge: 'arrivage', status: 'En ligne' },
]

const recentRequests = [
  { name: 'Moussa Diallo', phone: '+221 77 123 45 67', vehicle: 'Mercedes C-Class 2020', budget: '730 000', status: 'pending', date: "Aujourd'hui 09:14" },
  { name: 'Awa Fall', phone: '+221 76 987 65 43', vehicle: 'BMW Série 5 2019', budget: '830 000', status: 'approved', date: 'Hier 14:32' },
  { name: 'Omar Sow', phone: '+221 78 456 78 90', vehicle: 'BMW X5 2021', budget: '1 260 000', status: 'pending', date: 'Hier 10:05' },
]

const statusStyle: Record<string, { bg: string; color: string; label: string }> = {
  pending: { bg: '#FAEEDA', color: '#854F0B', label: 'En attente' },
  approved: { bg: '#EAF3DE', color: '#3B6D11', label: 'Approuvée' },
  rejected: { bg: '#FDEAEA', color: '#E24B4A', label: 'Refusée' },
}

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState('dashboard')

  const navItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: '▦' },
    { id: 'vehicles', label: 'Véhicules', icon: '🚗', href: '/admin/vehicles' },
    { id: 'appliances', label: 'Électroménager', icon: '📦', href: '/admin/appliances' },
    { id: 'financing', label: 'Financement', icon: '📋', href: '/admin/financing' },
    { id: 'messages', label: 'Messages', icon: '✉️', href: '/admin/messages' },
    { id: 'settings', label: 'Paramètres', icon: '⚙️' },
  ]

  return (
    <div className="flex min-h-screen" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>

      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 flex flex-col" style={{ background: '#08111F' }}>
        <div className="px-5 py-5 mb-2" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div className="text-base font-light tracking-widest uppercase" style={{ color: '#fff' }}>
            Sen<span style={{ color: '#C08A45' }}>Electro</span>
          </div>
          <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '1px' }}>Administration</div>
        </div>

        <nav className="flex-1 py-4">
          <div className="text-xs px-5 mb-3 uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '2px' }}>
            Général
          </div>
          {navItems.slice(0, 5).map(item => (
            item.href ? (
              <Link key={item.id} href={item.href}
                className="flex items-center gap-3 px-5 py-3 text-sm transition-all"
                style={{
                  color: activeNav === item.id ? '#fff' : 'rgba(255,255,255,0.4)',
                  background: activeNav === item.id ? 'rgba(192,138,69,0.1)' : 'transparent',
                  borderLeft: activeNav === item.id ? '2px solid #C08A45' : '2px solid transparent',
                }}
                onClick={() => setActiveNav(item.id)}>
                <span>{item.icon}</span> {item.label}
              </Link>
            ) : (
              <button key={item.id}
                className="w-full flex items-center gap-3 px-5 py-3 text-sm transition-all text-left"
                style={{
                  color: activeNav === item.id ? '#fff' : 'rgba(255,255,255,0.4)',
                  background: activeNav === item.id ? 'rgba(192,138,69,0.1)' : 'transparent',
                  borderLeft: activeNav === item.id ? '2px solid #C08A45' : '2px solid transparent',
                }}
                onClick={() => setActiveNav(item.id)}>
                <span>{item.icon}</span> {item.label}
              </button>
            )
          ))}


        </nav>

        <div className="px-5 py-4" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white"
              style={{ background: '#C08A45' }}>AD</div>
            <div>
              <div className="text-xs text-white">Admin</div>
              <Link href="/" className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>← Voir le site</Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col" style={{ background: '#F4F5F7' }}>

        {/* Topbar */}
        <div className="flex items-center justify-between px-8 h-14 bg-white"
          style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
          <div className="text-sm font-medium" style={{ color: '#08111F' }}>Tableau de bord</div>
          <div className="flex items-center gap-3">
            <Link href="/admin/vehicles/new"
              className="flex items-center gap-2 text-white text-xs uppercase tracking-widest px-4 py-2"
              style={{ background: '#C08A45', letterSpacing: '1px' }}>
              + Ajouter un véhicule
            </Link>
          </div>
        </div>

        <div className="p-8">

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {stats.map((s, i) => (
              <div key={i} className="bg-white p-5 rounded" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
                <div className="text-xs mb-2 uppercase tracking-widest" style={{ color: '#aaa', letterSpacing: '1px' }}>{s.label}</div>
                <div className="text-3xl font-light mb-1" style={{ color: '#08111F' }}>{s.value}</div>
                <div className="text-xs flex items-center gap-1" style={{ color: s.subColor }}>↑ {s.sub}</div>
              </div>
            ))}
          </div>

          {/* Véhicules récents */}
          <div className="bg-white rounded mb-6" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
              <div className="text-sm font-medium" style={{ color: '#08111F' }}>Derniers véhicules ajoutés</div>
              <Link href="/admin/vehicles" className="text-xs" style={{ color: '#C08A45' }}>Voir tout →</Link>
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ background: '#FAFAFA', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
                  {['Véhicule', 'Type', 'Prix (FCFA)', 'Badge', 'Statut', 'Actions'].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-xs uppercase tracking-widest font-normal"
                      style={{ color: '#aaa', letterSpacing: '1px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentVehicles.map((v, i) => (
                  <tr key={i} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.05)' }}>
                    <td className="px-6 py-4 text-sm font-medium" style={{ color: '#08111F' }}>{v.name}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#888' }}>{v.type}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#C08A45' }}>{v.price}</td>
                    <td className="px-6 py-4">
                      {v.badge && (
                        <span className="text-xs px-2 py-1 uppercase tracking-wider"
                          style={{ background: '#E6F1FB', color: '#185FA5', fontSize: '9px', letterSpacing: '1px' }}>
                          {v.badge}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1"
                        style={{ background: '#EAF3DE', color: '#3B6D11', fontSize: '9px' }}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-xs px-3 py-1.5" style={{ border: '0.5px solid rgba(0,0,0,0.1)', color: '#666' }}>✏️</button>
                        <button className="text-xs px-3 py-1.5" style={{ border: '0.5px solid rgba(226,75,74,0.2)', color: '#E24B4A' }}>🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Demandes financement */}
          <div className="bg-white rounded" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
              <div className="text-sm font-medium" style={{ color: '#08111F' }}>Demandes de financement récentes</div>
            </div>
            <div className="divide-y" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
              {recentRequests.map((r, i) => (
                <div key={i} className="flex items-center gap-6 px-6 py-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0"
                    style={{ background: '#08111F' }}>
                    {r.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium" style={{ color: '#08111F' }}>{r.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#aaa' }}>{r.phone} · {r.vehicle}</div>
                  </div>
                  <div className="text-sm" style={{ color: '#C08A45' }}>{r.budget} FCFA/mois</div>
                  <span className="text-xs px-2 py-1"
                    style={{ background: statusStyle[r.status].bg, color: statusStyle[r.status].color, fontSize: '9px' }}>
                    {statusStyle[r.status].label}
                  </span>
                  <div className="text-xs" style={{ color: '#bbb' }}>{r.date}</div>
                  <button className="text-xs px-3 py-1.5" style={{ border: '0.5px solid rgba(0,0,0,0.1)', color: '#666' }}>👁</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
