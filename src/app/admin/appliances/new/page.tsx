'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AddAppliance() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '', brand: '', category: 'television',
    price: '', stock_count: '', description: ''
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const update = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }))

  const handleSave = async () => {
    if (!form.name || !form.brand || !form.price) { setError('Remplissez tous les champs obligatoires'); return }
    setSaving(true)
    setError('')
    const token = document.cookie.split('admin_token=')[1]?.split(';')[0]
    const res = await fetch('/api/appliances', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock_count: Number(form.stock_count) || 0,
        photos: [],
      }),
    })
    setSaving(false)
    if (res.ok) { setSaved(true); setTimeout(() => router.push('/admin/appliances'), 1000) }
    else setError('Erreur lors de la sauvegarde')
  }

  const inputStyle = { border: '0.5px solid rgba(0,0,0,0.12)', color: '#333', background: '#fff', outline: 'none' }
  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa', letterSpacing: '1px' }}>{label}</label>
      {children}
    </div>
  )

  return (
    <div className="flex min-h-screen" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
      <aside className="w-56 flex-shrink-0" style={{ background: '#08111F' }}>
        <div className="px-5 py-5" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div className="text-base font-light tracking-widest uppercase" style={{ color: '#fff' }}>Sen<span style={{ color: '#C08A45' }}>Electro</span></div>
        </div>
        <nav className="py-4">
          <Link href="/admin" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>▦ Dashboard</Link>
          <Link href="/admin/vehicles" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>🚗 Véhicules</Link>
          <Link href="/admin/appliances" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: '#fff', background: 'rgba(192,138,69,0.1)', borderLeft: '2px solid #C08A45' }}>📦 Électroménager</Link>
          <Link href="/admin/financing" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>📋 Financement</Link>
          <Link href="/admin/messages" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>✉️ Messages</Link>
        </nav>
        <div className="px-5 py-4" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
          <Link href="/" className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>← Voir le site</Link>
        </div>
      </aside>

      <main className="flex-1" style={{ background: '#F4F5F7' }}>
        <div className="flex items-center justify-between px-8 h-14 bg-white" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
          <div className="flex items-center gap-3 text-sm" style={{ color: '#08111F' }}>
            <Link href="/admin/appliances" style={{ color: '#aaa' }}>Électroménager</Link>
            <span style={{ color: '#ddd' }}>/</span>
            <span className="font-medium">Ajouter</span>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/appliances" className="text-xs px-4 py-2" style={{ border: '0.5px solid rgba(0,0,0,0.1)', color: '#666' }}>Annuler</Link>
            <button onClick={handleSave} disabled={saving}
              className="text-white text-xs px-5 py-2"
              style={{ background: saved ? '#3B6D11' : '#C08A45', opacity: saving ? 0.7 : 1 }}>
              {saved ? '✅ Publié !' : saving ? 'Publication...' : 'Publier'}
            </button>
          </div>
        </div>

        <div className="p-8 max-w-3xl">
          {error && <div className="mb-4 px-4 py-3 text-sm" style={{ background: '#FDEAEA', color: '#E24B4A', border: '0.5px solid rgba(226,75,74,0.3)' }}>{error}</div>}
          <div className="bg-white rounded p-6" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div className="text-sm font-medium mb-5 pb-4" style={{ color: '#08111F', borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>Informations de l'appareil</div>
            <div className="grid grid-cols-2 gap-5">
              <Field label="Nom de l'appareil *">
                <input value={form.name} onChange={e => update('name', e.target.value)} autoComplete="off"
                  placeholder="ex: Télévision 55 pouces 4K" className="w-full px-3 py-2 text-sm" style={inputStyle} />
              </Field>
              <Field label="Marque *">
                <input value={form.brand} onChange={e => update('brand', e.target.value)} autoComplete="off"
                  placeholder="ex: Samsung, LG, Sony" className="w-full px-3 py-2 text-sm" style={inputStyle} />
              </Field>
              <Field label="Catégorie">
                <select value={form.category} onChange={e => update('category', e.target.value)} className="w-full px-3 py-2 text-sm" style={inputStyle}>
                  <option value="television">Télévision</option>
                  <option value="refrigerateur">Réfrigérateur</option>
                  <option value="climatiseur">Climatiseur</option>
                  <option value="lave-linge">Lave-linge</option>
                  <option value="micro-ondes">Micro-ondes</option>
                  <option value="audio">Audio</option>
                  <option value="autre">Autre</option>
                </select>
              </Field>
              <Field label="Stock restant">
                <input type="number" value={form.stock_count} onChange={e => update('stock_count', e.target.value)} autoComplete="off"
                  placeholder="10" className="w-full px-3 py-2 text-sm" style={inputStyle} />
              </Field>
              <Field label="Prix (FCFA) *">
                <input type="number" value={form.price} onChange={e => update('price', e.target.value)} autoComplete="off"
                  placeholder="350000" className="w-full px-3 py-2 text-sm" style={inputStyle} />
              </Field>
            </div>
            <div className="mt-5">
              <Field label="Description">
                <textarea value={form.description} onChange={e => update('description', e.target.value)}
                  placeholder="Décrivez l'appareil..." rows={3} className="w-full px-3 py-2 text-sm resize-none" style={inputStyle} />
              </Field>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
