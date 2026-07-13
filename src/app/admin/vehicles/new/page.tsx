'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AddVehicle() {
  const router = useRouter()
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [km, setKm] = useState('')
  const [fuel, setFuel] = useState('essence')
  const [transmission, setTransmission] = useState('automatique')
  const [type, setType] = useState('berline')
  const [price, setPrice] = useState('')
  const [badge, setBadge] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (!brand || !model || !year || !price) {
      setError('Veuillez remplir tous les champs obligatoires (*)' )
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
          name: `${brand} ${model} ${year}`,
          brand, model,
          year: Number(year),
          km: Number(km) || 0,
          fuel, transmission, type,
          price: Number(price),
          monthly_price: 0,
          badge: badge || null,
          description,
          photos: [],
          is_available: true,
        }),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => router.push('/admin/vehicles'), 1200)
      } else {
        setError('Erreur lors de la publication')
      }
    } catch {
      setError('Erreur de connexion')
    } finally {
      setSaving(false)
    }
  }

  const sel = { border: '0.5px solid rgba(0,0,0,0.12)', color: '#333', background: '#fff', outline: 'none', width: '100%', padding: '9px 12px', fontSize: '13px' }

  return (
    <div className="flex min-h-screen" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>

      <aside className="w-56 flex-shrink-0 flex flex-col" style={{ background: '#08111F' }}>
        <div className="px-5 py-5" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div className="text-base font-light tracking-widest uppercase" style={{ color: '#fff' }}>Sen<span style={{ color: '#C08A45' }}>Electro</span></div>
          <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Administration</div>
        </div>
        <nav className="py-4 flex-1">
          <Link href="/admin" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>▦ Tableau de bord</Link>
          <Link href="/admin/vehicles" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: '#fff', background: 'rgba(192,138,69,0.1)', borderLeft: '2px solid #C08A45' }}>🚗 Véhicules</Link>
          <Link href="/admin/appliances" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>📦 Électroménager</Link>
          <Link href="/admin/messages" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>✉️ Messages</Link>
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
            <span className="font-medium">Ajouter un véhicule</span>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/vehicles" className="text-xs px-4 py-2" style={{ border: '0.5px solid rgba(0,0,0,0.1)', color: '#666' }}>Annuler</Link>
            <button onClick={handleSave} disabled={saving || saved}
              className="text-white text-xs px-5 py-2"
              style={{ background: saved ? '#3B6D11' : '#C08A45', opacity: saving ? 0.7 : 1 }}>
              {saved ? '✅ Publié !' : saving ? 'Publication...' : 'Publier'}
            </button>
          </div>
        </div>

        <div className="p-8 max-w-3xl">

          {error && (
            <div className="mb-5 px-4 py-3 text-sm" style={{ background: '#FDEAEA', border: '0.5px solid rgba(226,75,74,0.3)', color: '#E24B4A' }}>
              {error}
            </div>
          )}

          <div className="bg-white rounded p-6 mb-5" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div className="text-sm font-medium mb-5 pb-4" style={{ color: '#08111F', borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
              Informations du véhicule
            </div>

            {/* Formulaire sans autocomplétion */}
            <form autoComplete="off" onSubmit={e => e.preventDefault()}>
              {/* Champ piège pour tromper le navigateur */}
              <input type="text" name="fake_field" style={{ display: 'none' }} />
              <input type="password" name="fake_password" style={{ display: 'none' }} />

              <div className="grid grid-cols-2 gap-5">

                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa', letterSpacing: '1px' }}>Marque *</label>
                  <select value={brand} onChange={e => setBrand(e.target.value)} style={sel}>
                    <option value="">Sélectionner</option>
                    {['Mercedes', 'BMW', 'Audi', 'Porsche', 'Land Rover', 'Volkswagen', 'Volvo', 'Lexus', 'Toyota', 'Hyundai', 'Renault', 'Peugeot'].map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa', letterSpacing: '1px' }}>Modèle *</label>
                  <input
                    type="text"
                    name={`model_${Math.random()}`}
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    value={model}
                    onChange={e => setModel(e.target.value)}
                    placeholder="C-Class, X5, A6..."
                    style={sel}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa', letterSpacing: '1px' }}>Année *</label>
                  <input
                    type="number"
                    name={`year_${Math.random()}`}
                    autoComplete="new-password"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    placeholder="2022"
                    min="1990" max="2025"
                    style={sel}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa', letterSpacing: '1px' }}>Kilométrage</label>
                  <input
                    type="number"
                    name={`km_${Math.random()}`}
                    autoComplete="new-password"
                    value={km}
                    onChange={e => setKm(e.target.value)}
                    placeholder="50000"
                    style={sel}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa', letterSpacing: '1px' }}>Carburant</label>
                  <select value={fuel} onChange={e => setFuel(e.target.value)} style={sel}>
                    <option value="essence">Essence</option>
                    <option value="diesel">Diesel</option>
                    <option value="hybride">Hybride</option>
                    <option value="electrique">Électrique</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa', letterSpacing: '1px' }}>Transmission</label>
                  <select value={transmission} onChange={e => setTransmission(e.target.value)} style={sel}>
                    <option value="automatique">Automatique</option>
                    <option value="manuelle">Manuelle</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa', letterSpacing: '1px' }}>Type</label>
                  <select value={type} onChange={e => setType(e.target.value)} style={sel}>
                    <option value="berline">Berline</option>
                    <option value="suv">SUV</option>
                    <option value="4x4">4x4</option>
                    <option value="utilitaire">Utilitaire</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa', letterSpacing: '1px' }}>Badge</label>
                  <select value={badge} onChange={e => setBadge(e.target.value)} style={sel}>
                    <option value="">Aucun</option>
                    <option value="nouveau">Nouveau</option>
                    <option value="promo">Promo</option>
                    <option value="arrivage">Arrivage</option>
                    <option value="top_vente">Top vente</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa', letterSpacing: '1px' }}>Prix de vente (FCFA) *</label>
                  <input
                    type="number"
                    name={`price_${Math.random()}`}
                    autoComplete="new-password"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="22000000"
                    style={sel}
                  />
                </div>

              </div>

              <div className="mt-5">
                <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa', letterSpacing: '1px' }}>Description</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Décrivez le véhicule — état, équipements, historique..."
                  rows={4}
                  style={{ ...sel, resize: 'none' }}
                />
              </div>
            </form>
          </div>

          <div className="bg-white rounded p-5" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div className="text-sm font-medium mb-2" style={{ color: '#08111F' }}>Photos</div>
            <div className="text-sm" style={{ color: '#aaa' }}>📷 Ajoutez les photos après publication en cliquant sur Modifier.</div>
          </div>

        </div>
      </main>
    </div>
  )
}
