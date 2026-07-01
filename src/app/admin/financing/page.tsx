'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface FinancingRequest {
  id: number
  full_name: string
  phone: string
  budget_monthly: number
  product_type: string
  status: string
  created_at: string
}

const statusStyle: Record<string, { bg: string; color: string; label: string }> = {
  pending: { bg: '#FAEEDA', color: '#854F0B', label: 'En attente' },
  approved: { bg: '#EAF3DE', color: '#3B6D11', label: 'Approuvée' },
  rejected: { bg: '#FDEAEA', color: '#E24B4A', label: 'Refusée' },
}

export default function AdminFinancing() {
  const [requests, setRequests] = useState<FinancingRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetch('/api/financing')
      .then(r => r.json())
      .then(data => { setRequests(data.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/financing/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r))
  }

  const filtered = requests.filter(r => filter === 'all' || r.status === filter)

  const SidebarLink = ({ label, href, icon, active }: { label: string; href: string; icon: string; active?: boolean }) => (
    <Link href={href} className="flex items-center gap-3 px-5 py-3 text-sm"
      style={{ color: active ? '#fff' : 'rgba(255,255,255,0.4)', background: active ? 'rgba(192,138,69,0.1)' : 'transparent', borderLeft: active ? '2px solid #C08A45' : '2px solid transparent' }}>
      <span>{icon}</span> {label}
    </Link>
  )

  return (
    <div className="flex min-h-screen" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
      <aside className="w-56 flex-shrink-0 flex flex-col" style={{ background: '#08111F' }}>
        <div className="px-5 py-5" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div className="text-base font-light tracking-widest uppercase" style={{ color: '#fff' }}>
            Sen<span style={{ color: '#C08A45' }}>Electro</span>
          </div>
          <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Administration</div>
        </div>
        <nav className="py-4 flex-1">
          <SidebarLink label="Tableau de bord" href="/admin" icon="▦" />
          <SidebarLink label="Véhicules" href="/admin/vehicles" icon="🚗" />
          <SidebarLink label="Électroménager" href="/admin/appliances" icon="📦" />
          <SidebarLink label="Financement" href="/admin/financing" icon="📋" active />
          <SidebarLink label="Messages" href="/admin/messages" icon="✉️" />
        </nav>
        <div className="px-5 py-4" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
          <Link href="/" className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>← Voir le site</Link>
        </div>
      </aside>

      <main className="flex-1" style={{ background: '#F4F5F7' }}>
        <div className="flex items-center justify-between px-8 h-14 bg-white" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
          <div className="text-sm font-medium" style={{ color: '#08111F' }}>Demandes de financement</div>
          <div className="text-xs px-3 py-1" style={{ background: '#FAEEDA', color: '#854F0B' }}>
            {requests.filter(r => r.status === 'pending').length} en attente
          </div>
        </div>

        <div className="p-8">
          {/* Filtres */}
          <div className="flex gap-3 mb-6">
            {[
              { key: 'all', label: `Toutes (${requests.length})` },
              { key: 'pending', label: `En attente (${requests.filter(r => r.status === 'pending').length})` },
              { key: 'approved', label: `Approuvées (${requests.filter(r => r.status === 'approved').length})` },
              { key: 'rejected', label: `Refusées (${requests.filter(r => r.status === 'rejected').length})` },
            ].map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)}
                className="text-xs px-4 py-2"
                style={{
                  background: filter === f.key ? '#08111F' : '#fff',
                  color: filter === f.key ? '#fff' : '#666',
                  border: '0.5px solid rgba(0,0,0,0.1)',
                }}>
                {f.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-sm" style={{ color: '#aaa' }}>Chargement...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">📋</div>
              <div className="text-sm" style={{ color: '#aaa' }}>Aucune demande pour l'instant</div>
            </div>
          ) : (
            <div className="bg-white rounded" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
              {filtered.map((r, i) => (
                <div key={r.id} className="flex items-center gap-6 px-6 py-4"
                  style={{ borderBottom: i < filtered.length - 1 ? '0.5px solid rgba(0,0,0,0.05)' : 'none' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0"
                    style={{ background: '#08111F' }}>
                    {r.full_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium" style={{ color: '#08111F' }}>{r.full_name}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#aaa' }}>{r.phone}</div>
                  </div>
                  <div className="text-sm font-medium" style={{ color: '#C08A45' }}>
                    {r.budget_monthly?.toLocaleString('fr-FR')} FCFA/mois
                  </div>
                  <span className="text-xs px-2 py-1"
                    style={{ background: statusStyle[r.status]?.bg, color: statusStyle[r.status]?.color, fontSize: '9px' }}>
                    {statusStyle[r.status]?.label}
                  </span>
                  <div className="text-xs" style={{ color: '#bbb' }}>
                    {new Date(r.created_at).toLocaleDateString('fr-FR')}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => updateStatus(r.id, 'approved')}
                      className="text-xs px-3 py-1.5" style={{ background: '#EAF3DE', color: '#3B6D11', border: 'none' }}>
                      ✓ Approuver
                    </button>
                    <button onClick={() => updateStatus(r.id, 'rejected')}
                      className="text-xs px-3 py-1.5" style={{ background: '#FDEAEA', color: '#E24B4A', border: 'none' }}>
                      ✕ Refuser
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
