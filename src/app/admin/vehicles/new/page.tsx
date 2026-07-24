'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AddVehicle() {
  const router = useRouter()
  const [form, setForm] = useState({
    brand: '', model: '', year: '', km: '', fuel: 'essence',
    transmission: 'automatique', type: 'berline',
    price: '', monthly_price: '', badge: '', description: ''
  })
  const [photos, setPhotos] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const update = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }))

  const handleSave = async () => {
    setSaving(true)
    // En prod: fetch('/api/vehicles', { method: 'POST', body: JSON.stringify({...form, photos}) })
    await new Promise(r => setTimeout(r, 800))
    setSaving(false)
    setSaved(true)
    setTimeout(() => router.push('/admin/vehicles'), 1200)
  }

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-xs uppercase tracking-widest mb-2"
        style={{ color: '#aaa', letterSpacing: '1px' }}>{label}</label>
      {children}
    </div>
  )

  const inputStyle = { border: '0.5px solid rgba(0,0,0,0.12)', color: '#333', background: '#fff', outline: 'none' }

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
        <div className="px-5 py-4" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
          <Link href="/" className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>← Voir le site</Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1" style={{ background: '#F4F5F7' }}>
        <div className="flex items-center justify-between px-8 h-14 bg-white"
          style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
          <div className="flex items-center gap-3 text-sm" style={{ color: '#08111F' }}>
            <Link href="/admin/vehicles" style={{ color: '#aaa' }}>Véhicules</Link>
            <span style={{ color: '#ddd' }}>/</span>
            <span className="font-medium">Ajouter un véhicule</span>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/vehicles"
              className="text-xs px-4 py-2"
              style={{ border: '0.5px solid rgba(0,0,0,0.1)', color: '#666' }}>
              Annuler
            </Link>
            <button onClick={handleSave} disabled={saving}
              className="text-white text-xs px-5 py-2 transition-opacity"
              style={{ background: saved ? '#3B6D11' : '#C08A45', opacity: saving ? 0.7 : 1 }}>
              {saved ? '✅ Publié !' : saving ? 'Publication...' : 'Publier le véhicule'}
            </button>
          </div>
        </div>

        <div className="p-8 max-w-4xl">

          {/* Infos véhicule */}
          <div className="bg-white rounded p-6 mb-5" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div className="text-sm font-medium mb-5 pb-4" style={{ color: '#08111F', borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
              Informations du véhicule
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Field label="Marque">
                <select value={form.brand} onChange={e => update('brand', e.target.value)}
                  className="w-full px-3 py-2 text-sm" style={inputStyle}>
                  <option value="">Sélectionner</option>
                  {['Mercedes', 'BMW', 'Audi', 'Porsche', 'Land Rover', 'Volkswagen', 'Volvo', 'Lexus'].map(b => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </Field>
              <Field label="Modèle">
                <input value={form.model} onChange={e => update('model', e.target.value)}
                  placeholder="ex: C-Class, X5, A6..." className="w-full px-3 py-2 text-sm" style={inputStyle} />
              </Field>
              <Field label="Année">
                <input type="number" value={form.year} onChange={e => update('year', e.target.value)}
                  placeholder="2020" autoComplete="off" className="w-full px-3 py-2 text-sm" style={inputStyle} />
              </Field>
              <Field label="Kilométrage">
                <input type="number" value={form.km} onChange={e => update('km', e.target.value)}
                  placeholder="48000" autoComplete="off" className="w-full px-3 py-2 text-sm" style={inputStyle} />
              </Field>
              <Field label="Carburant">
                <select value={form.fuel} onChange={e => update('fuel', e.target.value)}
                  className="w-full px-3 py-2 text-sm" style={inputStyle}>
                  <option value="essence">Essence</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybride">Hybride</option>
                  <option value="electrique">Électrique</option>
                </select>
              </Field>
              <Field label="Transmission">
                <select value={form.transmission} onChange={e => update('transmission', e.target.value)}
                  className="w-full px-3 py-2 text-sm" style={inputStyle}>
                  <option value="automatique">Automatique</option>
                  <option value="manuelle">Manuelle</option>
                </select>
              </Field>
              <Field label="Type de véhicule">
                <select value={form.type} onChange={e => update('type', e.target.value)}
                  className="w-full px-3 py-2 text-sm" style={inputStyle}>
                  <option value="berline">Berline</option>
                  <option value="suv">SUV</option>
                  <option value="4x4">4x4</option>
                  <option value="utilitaire">Utilitaire</option>
                </select>
              </Field>
              <Field label="Badge affiché">
                <select value={form.badge} onChange={e => update('badge', e.target.value)}
                  className="w-full px-3 py-2 text-sm" style={inputStyle}>
                  <option value="">Aucun</option>
                  <option value="nouveau">Nouveau</option>
                  <option value="promo">Promo</option>
                  <option value="arrivage">Arrivage</option>
                  <option value="top_vente">Top vente</option>
                </select>
              </Field>
            </div>
          </div>

          {/* Prix */}
          <div className="bg-white rounded p-6 mb-5" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div className="text-sm font-medium mb-5 pb-4" style={{ color: '#08111F', borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
              Prix & financement
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Field label="Prix de vente (FCFA)">
                <input type="number" value={form.price} onChange={e => update('price', e.target.value)}
                  placeholder="22000000" autoComplete="off" className="w-full px-3 py-2 text-sm" style={inputStyle} />
              </Field>
              <Field label="Mensualité estimée (FCFA)">
                <input type="number" value={form.monthly_price} onChange={e => update('monthly_price', e.target.value)}
                  placeholder="730000" autoComplete="off" className="w-full px-3 py-2 text-sm" style={inputStyle} />
              </Field>
            </div>
            <div className="mt-5">
              <Field label="Description">
                <textarea value={form.description} onChange={e => update('description', e.target.value)}
                  placeholder="Décrivez le véhicule — état, équipements, historique..."
                  rows={4} className="w-full px-3 py-2 text-sm resize-none" style={inputStyle} />
              </Field>
            </div>
          </div>

          {/* Photos */}
          <div className="bg-white rounded p-6" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div className="text-sm font-medium mb-5 pb-4" style={{ color: '#08111F', borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
              Photos du véhicule
            </div>
            <div className="border-2 border-dashed rounded p-8 text-center cursor-pointer transition-colors"
              style={{ borderColor: 'rgba(0,0,0,0.1)', background: '#FAFAFA' }}>
              <div className="text-3xl mb-3">☁️</div>
              <div className="text-sm font-light mb-1" style={{ color: '#666' }}>
                Glissez vos photos ici ou <span style={{ color: '#C08A45' }}>cliquez pour parcourir</span>
              </div>
              <div className="text-xs" style={{ color: '#bbb' }}>JPG, PNG · Max 5 Mo · 6 photos max</div>
            </div>
            <div className="flex gap-3 mt-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-16 h-12 rounded flex items-center justify-center text-lg"
                  style={{
                    background: i < photos.length ? '#C08A45' : '#F0F0F0',
                    border: '0.5px solid rgba(0,0,0,0.08)',
                  }}>
                  {i < photos.length ? '✓' : '+'}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
