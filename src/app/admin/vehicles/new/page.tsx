'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AddVehicle() {
  const router = useRouter()
  const [form, setForm] = useState({
    brand: '', model: '', year: '', km: '',
    fuel: 'essence', transmission: 'automatique', type: 'berline',
    price: '', monthly_price: '', badge: '', description: ''
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const update = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }))

  const handleSave = async () => {
    if (!form.brand || form.brand === '' || !form.model || !form.year || !form.price) {
      setError('Veuillez remplir tous les champs obligatoires')
      return
    }
    setSaving(true)
    setError('')
    try {
      const token = document.cookie.split('admin_token=')[1]?.split(';')[0]
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: `${form.brand} ${form.model} ${form.year}`,
          brand: form.brand,
          model: form.model,
          year: Number(form.year),
          km: Number(form.km) || 0,
          fuel: form.fuel,
          transmission: form.transmission,
          type: form.type,
          price: Number(form.price),
          monthly_price: Number(form.monthly_price) || 0,
          badge: form.badge || null,
          description: form.description,
          photos: [],
          is_available: true,
        }),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => router.push('/admin/vehicles'), 1000)
      } else {
        setError('Erreur lors de la publication')
      }
    } catch {
      setError('Erreur de connexion')
    } finally {
      setSaving(false)
    }
  }

  const inputStyle = {
    border: '0.5px solid rgba(0,0,0,0.12)',
    color: '#333', background: '#fff',
    outline: 'none', fontFamily: 'inherit'
  }

  const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
    <div>
      <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa', letterSpacing: '1px' }}>
        {label}{required && <span style={{ color: '#E24B4A' }}> *</span>}
      </label>
      {children}
    </div>
  )

  return (
    <div className="flex min-h-screen" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>

      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 flex flex-col" style={{ background: '#08111F' }}>
        <div className="px-5 py-5" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div className="text-base font-light tracking-widest uppercase" style={{ color: '#fff' }}>
            Sen<span style={{ color: '#C08A45' }}>Electro</span>
          </div>
          <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Administration</div>
        </div>
        <nav className="py-4 flex-1">
          <Link href="/admin" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>▦ Tableau de bord</Link>
          <Link href="/admin/vehicles" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: '#fff', background: 'rgba(192,138,69,0.1)', borderLeft: '2px solid #C08A45' }}>🚗 Véhicules</Link>
          <Link href="/admin/appliances" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>📦 Électroménager</Link>
          <Link href="/admin/financing" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>📋 Financement</Link>
          <Link href="/admin/messages" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>✉️ Messages</Link>
        </nav>
        <div className="px-5 py-4" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
          <Link href="/" className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>← Voir le site</Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1" style={{ background: '#F4F5F7' }}>
        <div className="flex items-center justify-between px-8 h-14 bg-white" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
          <div className="flex items-center gap-3 text-sm" style={{ color: '#08111F' }}>
            <Link href="/admin/vehicles" style={{ color: '#aaa' }}>Véhicules</Link>
            <span style={{ color: '#ddd' }}>/</span>
            <span className="font-medium">Ajouter un véhicule</span>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/vehicles" className="text-xs px-4 py-2" style={{ border: '0.5px solid rgba(0,0,0,0.1)', color: '#666' }}>Annuler</Link>
            <button onClick={handleSave} disabled={saving || saved}
              className="text-white text-xs px-5 py-2 transition-all"
              style={{ background: saved ? '#3B6D11' : '#C08A45', opacity: saving ? 0.7 : 1 }}>
              {saved ? '✅ Publié !' : saving ? 'Publication...' : 'Publier le véhicule'}
            </button>
          </div>
        </div>

        <div className="p-8 max-w-3xl">

          {error && (
            <div className="mb-5 px-4 py-3 text-sm" style={{ background: '#FDEAEA', border: '0.5px solid rgba(226,75,74,0.3)', color: '#E24B4A' }}>
              {error}
            </div>
          )}

          {/* Infos véhicule */}
          <div className="bg-white rounded p-6 mb-5" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div className="text-sm font-medium mb-5 pb-4" style={{ color: '#08111F', borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
              Informations du véhicule
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Field label="Marque" required>
                <select value={form.brand} onChange={e => update('brand', e.target.value)}
                  className="w-full px-3 py-2 text-sm" style={inputStyle}>
                  <option value="">Sélectionner</option>
                  {['Mercedes', 'BMW', 'Audi', 'Porsche', 'Land Rover', 'Volkswagen', 'Volvo', 'Lexus', 'Toyota', 'Hyundai', 'Renault', 'Peugeot'].map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </Field>

              <Field label="Modèle" required>
                <input
                  value={form.model}
                  onChange={e => update('model', e.target.value)}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="ex: C-Class, X5, A6..."
                  className="w-full px-3 py-2 text-sm"
                  style={inputStyle}
                />
              </Field>

              <Field label="Année" required>
                <input
                  type="number"
                  value={form.year}
                  onChange={e => update('year', e.target.value)}
                  autoComplete="off"
                  placeholder="2022"
                  min="1990" max="2025"
                  className="w-full px-3 py-2 text-sm"
                  style={inputStyle}
                />
              </Field>

              <Field label="Kilométrage">
                <input
                  type="number"
                  value={form.km}
                  onChange={e => update('km', e.target.value)}
                  autoComplete="off"
                  placeholder="50000"
                  className="w-full px-3 py-2 text-sm"
                  style={inputStyle}
                />
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

              <Field label="Prix de vente (FCFA)" required>
                <input
                  type="number"
                  value={form.price}
                  onChange={e => update('price', e.target.value)}
                  autoComplete="off"
                  placeholder="22000000"
                  className="w-full px-3 py-2 text-sm"
                  style={inputStyle}
                />
              </Field>

              <Field label="Mensualité estimée (FCFA)">
                <input
                  type="number"
                  value={form.monthly_price}
                  onChange={e => update('monthly_price', e.target.value)}
                  autoComplete="off"
                  placeholder="730000"
                  className="w-full px-3 py-2 text-sm"
                  style={inputStyle}
                />
              </Field>
            </div>

            <div className="mt-5">
              <Field label="Description">
                <textarea
                  value={form.description}
                  onChange={e => update('description', e.target.value)}
                  placeholder="Décrivez le véhicule — état, équipements, historique..."
                  rows={4}
                  className="w-full px-3 py-2 text-sm resize-none"
                  style={inputStyle}
                />
              </Field>
            </div>
          </div>

          {/* Note photos */}
          <div className="bg-white rounded p-6" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div className="text-sm font-medium mb-3" style={{ color: '#08111F' }}>Photos</div>
            <div className="text-sm" style={{ color: '#aaa' }}>
              📷 Les photos peuvent être ajoutées après la publication en modifiant le véhicule.
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
