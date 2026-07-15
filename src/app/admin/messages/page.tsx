'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<any>(null)

  useEffect(() => {
    fetch('/api/contact').then(r => r.json()).then(data => { setMessages(data.data || []); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const markRead = async (id: number) => {
    await fetch(`/api/contact/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_read: true }) })
    setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m))
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
          <Link href="/admin/appliances" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>📦 Électroménager</Link>
          <Link href="/admin/messages" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: '#fff', background: 'rgba(192,138,69,0.1)', borderLeft: '2px solid #C08A45' }}>✉️ Messages</Link>
        </nav>
        <div className="px-5 py-4" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}><Link href="/" className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>← Voir le site</Link></div>
      </aside>
      <main className="flex-1 flex flex-col" style={{ background: '#F4F5F7' }}>
        <div className="flex items-center justify-between px-8 h-14 bg-white" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
          <div className="text-sm font-medium" style={{ color: '#08111F' }}>Messages ({messages.filter(m => !m.is_read).length} non lus)</div>
        </div>
        <div className="flex flex-1">
          <div className="w-80 flex-shrink-0 bg-white" style={{ borderRight: '0.5px solid rgba(0,0,0,0.07)', minHeight: 'calc(100vh - 56px)', overflowY: 'auto' }}>
            {loading ? <div className="text-center py-10 text-sm" style={{ color: '#aaa' }}>Chargement...</div>
            : messages.length === 0 ? <div className="text-center py-10"><div className="text-3xl mb-3">✉️</div><div className="text-sm" style={{ color: '#aaa' }}>Aucun message</div></div>
            : messages.map((m: any) => (
              <div key={m.id} onClick={() => { setSelected(m); if (!m.is_read) markRead(m.id) }} className="px-4 py-4 cursor-pointer"
                style={{ borderBottom: '0.5px solid rgba(0,0,0,0.05)', background: selected?.id === m.id ? '#F0EDE7' : !m.is_read ? '#FAFCFF' : '#fff' }}>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium" style={{ color: '#08111F' }}>
                    {!m.is_read && <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ background: '#C08A45' }}></span>}
                    {m.full_name}
                  </div>
                  <div className="text-xs" style={{ color: '#bbb' }}>{new Date(m.created_at).toLocaleDateString('fr-FR')}</div>
                </div>
                <div className="text-xs" style={{ color: '#aaa' }}>{m.phone}</div>
                <div className="text-xs mt-1 truncate" style={{ color: '#888' }}>{m.message}</div>
              </div>
            ))}
          </div>
          <div className="flex-1 p-8">
            {selected ? (
              <div className="bg-white rounded p-6" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
                <div className="flex items-start justify-between mb-6 pb-6" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
                  <div>
                    <div className="text-lg font-medium mb-1" style={{ color: '#08111F' }}>{selected.full_name}</div>
                    <div className="text-sm" style={{ color: '#aaa' }}>{selected.phone}</div>
                    {selected.email && <div className="text-sm" style={{ color: '#aaa' }}>{selected.email}</div>}
                  </div>
                  <div className="text-xs" style={{ color: '#bbb' }}>{new Date(selected.created_at).toLocaleString('fr-FR')}</div>
                </div>
                <div className="text-sm leading-7 mb-6" style={{ color: '#444' }}>{selected.message}</div>
                <div className="flex gap-3 pt-6" style={{ borderTop: '0.5px solid rgba(0,0,0,0.07)' }}>
                  <a href={`tel:${selected.phone}`} className="text-xs px-5 py-3 text-white uppercase tracking-widest" style={{ background: '#C08A45' }}>📞 Appeler</a>
                  {selected.email && <a href={`mailto:${selected.email}`} className="text-xs px-5 py-3 uppercase" style={{ border: '0.5px solid rgba(0,0,0,0.1)', color: '#666' }}>✉️ Répondre</a>}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center"><div><div className="text-4xl mb-4">✉️</div><div className="text-sm" style={{ color: '#aaa' }}>Sélectionnez un message</div></div></div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
