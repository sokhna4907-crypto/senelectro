'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function EditVehicle({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [id, setId] = useState('')
  const [form, setForm] = useState({
    brand: '', model: '', year: '', km: '', fuel: 'essence',
    transmission: 'automatique', type: 'berline',
    price: '', monthly_price: '', badge: '', description: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    params.then(p => {
      setId(p.id)
      fetch(`/api/vehicles/${p.id}`)
        .then(r => r.json())
        .then(data => {
          const v = data.data
          if (v) {
            setForm({
              brand: v.brand || '',
              model: v.model || '',
              year: v.year?.toString() || '',
              km: v.km?.toString() || '',
              fuel: v.fuel || 'essence',
              transmission: v.transmission || 'automatique',
              type: v.type || 'berline',
              price: v.price?.toString() || '',
              monthly_price: v.monthly_price?.toString() || '',
              badge: v.badge || '',
              description: v.description || '',
            })
          }
          setLoading(false)
        })
    })
  }, [params])

  const update = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }))

  const handleSave = async () => {
    setSaving(true)
    const token = document.cookie.split('admin_token=')[1]?.split(';')[0]
    await fetch(`/api/vehicles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        ...form,
        name: `${form.brand} ${form.model} ${form.year}`,
        year: Number(form.year),
        km: Number(form.km),
        price: Number(form.price),
        monthly_price: Number(form.monthly_price),
        photos: [],
        is_available: true,
      }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => router.push('/admin/vehicles'), 1000)
  }

  const inputStyle = { border: '0.5px solid rgba(0,0,0,0.12)', color: '#333', background: '#fff', outline: 'none' }

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa', letterSpacing: '1px' }}>{label}</label>
      {children}
    </div>
  )

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center" style={{ background: '#F4F5F7' }}>
      <div className="text-sm" style={{ color: '#aaa' }}>Chargement...</div>
    </div>
  )

  return (
    <div className="flex min-h-screen" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
      <aside className="w-56 flex-shrink-0" style={{ background: '#08111F' }}>
        <div className="px-5 py-5" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div className="text-base font-light tracking-widest uppercase" style={{ color: '#fff' }}>
            Sen<span style={{ color: '#C08A45' }}>Electro</span>
          </div>
        </div>
        <nav className="py-4">
          <Link href="/admin" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>▦ Dashboard</Link>
          <Link href="/admin/vehicles" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: '#fff', background: 'rgba(192,138,69,0.1)', borderLeft: '2px solid #C08A45' }}>🚗 Véhicules</Link>
          <Link href="/admin/appliances" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>📦 Électroménager</Link>
        </nav>
        <div className="px-5 py-4" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
          <Link href="/" className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>← Voir le site</Link>
        </div>
      </aside>

      <main className="flex-1" style={{ background: '#F4F5F7' }}>
        <div className="flex items-center justify-between px-8 h-14 bg-white" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
          <div className="flex items-center gap-3 text-sm" style={{ color: '#08111F' }}>
            <Link href="/admin/vehicles" style={{ color: '#aaa' }}>Véhicules</Link>
            <span style={{ color: '#ddd' }}>/</span>
            <span className="font-medium">Modifier</span>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/vehicles" className="text-xs px-4 py-2" style={{ border: '0.5px solid rgba(0,0,0,0.1)', color: '#666' }}>Annuler</Link>
            <button onClick={handleSave} disabled={saving}
              className="text-white text-xs px-5 py-2"
              style={{ background: saved ? '#3B6D11' : '#C08A45', opacity: saving ? 0.7 : 1 }}>
              {saved ? '✅ Sauvegardé !' : saving ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </div>
        </div>

        <div className="p-8 max-w-4xl">
          <div className="bg-white rounded p-6 mb-5" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div className="text-sm font-medium mb-5 pb-4" style={{ color: '#08111F', borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>Informations</div>
            <div className="grid grid-cols-2 gap-5">
              <Field label="Marque">
                <select value={form.brand} onChange={e => update('brand', e.target.value)} className="w-full px-3 py-2 text-sm" style={inputStyle}>
                  {['Mercedes', 'BMW', 'Audi', 'Porsche', 'Land Rover', 'Volkswagen', 'Toyota', 'Hyundai'].map(b => <option key={b}>{b}</option>)}
                </select>
              </Field>
              <Field label="Modèle"><input value={form.model} onChange={e => update('model', e.target.value)} className="w-full px-3 py-2 text-sm" style={inputStyle} /></Field>
              <Field label="Année"><input type="number" value={form.year} onChange={e => update('year', e.target.value)} className="w-full px-3 py-2 text-sm" style={inputStyle} /></Field>
              <Field label="Kilométrage"><input type="number" value={form.km} onChange={e => update('km', e.target.value)} className="w-full px-3 py-2 text-sm" style={inputStyle} /></Field>
              <Field label="Carburant">
                <select value={form.fuel} onChange={e => update('fuel', e.target.value)} className="w-full px-3 py-2 text-sm" style={inputStyle}>
                  {['essence', 'diesel', 'hybride', 'electrique'].map(f => <option key={f}>{f}</option>)}
                </select>
              </Field>
              <Field label="Transmission">
                <select value={form.transmission} onChange={e => update('transmission', e.target.value)} className="w-full px-3 py-2 text-sm" style={inputStyle}>
                  <option value="automatique">Automatique</option>
                  <option value="manuelle">Manuelle</option>
                </select>
              </Field>
              <Field label="Type">
                <select value={form.type} onChange={e => update('type', e.target.value)} className="w-full px-3 py-2 text-sm" style={inputStyle}>
                  {['berline', 'suv', '4x4', 'utilitaire'].map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Badge">
                <select value={form.badge} onChange={e => update('badge', e.target.value)} className="w-full px-3 py-2 text-sm" style={inputStyle}>
                  <option value="">Aucun</option>
                  {['nouveau', 'promo', 'arrivage', 'top_vente'].map(b => <option key={b}>{b}</option>)}
                </select>
              </Field>
              <Field label="Prix (FCFA)"><input type="number" value={form.price} onChange={e => update('price', e.target.value)} className="w-full px-3 py-2 text-sm" style={inputStyle} /></Field>
              <Field label="Mensualité (FCFA)"><input type="number" value={form.monthly_price} onChange={e => update('monthly_price', e.target.value)} className="w-full px-3 py-2 text-sm" style={inputStyle} /></Field>
            </div>
            <div className="mt-5">
              <Field label="Description">
                <textarea value={form.description} onChange={e => update('description', e.target.value)} rows={3} className="w-full px-3 py-2 text-sm resize-none" style={inputStyle} />
              </Field>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
