'use client'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function EditVehicle({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const modelRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLInputElement>(null)
  const kmRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const descRef = useRef<HTMLTextAreaElement>(null)
  const [id, setId] = useState('')
  const [brand, setBrand] = useState('')
  const [fuel, setFuel] = useState('essence')
  const [transmission, setTransmission] = useState('automatique')
  const [type, setType] = useState('berline')
  const [badge, setBadge] = useState('')
  const [photos, setPhotos] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    params.then(async p => {
      setId(p.id)
      if (p.id === 'new') { setLoading(false); return }
      try {
        const res = await fetch(`/api/vehicles/${p.id}`)
        const data = await res.json()
        const v = data.data
        if (v) {
          setBrand(v.brand || '')
          setFuel(v.fuel || 'essence')
          setTransmission(v.transmission || 'automatique')
          setType(v.type || 'berline')
          setBadge(v.badge || '')
          setPhotos(Array.isArray(v.photos) ? v.photos : [])
          setTimeout(() => {
            if (modelRef.current) modelRef.current.value = v.model || ''
            if (yearRef.current) yearRef.current.value = v.year?.toString() || ''
            if (kmRef.current) kmRef.current.value = v.km?.toString() || ''
            if (priceRef.current) priceRef.current.value = v.price?.toString() || ''
            if (descRef.current) descRef.current.value = v.description || ''
          }, 100)
        }
      } catch {}
      setLoading(false)
    })
  }, [params])

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)
    try {
      const uploaded: string[] = []
      for (const file of files) {
        const reader = new FileReader()
        const base64 = await new Promise<string>(resolve => { reader.onload = () => resolve(reader.result as string); reader.readAsDataURL(file) })
        const res = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: base64, folder: 'vehicles' }) })
        if (res.ok) uploaded.push((await res.json()).url)
      }
      setPhotos(prev => [...prev, ...uploaded])
    } catch { setError('Erreur upload') } finally { setUploading(false) }
  }

  const handleSave = async () => {
    const model = modelRef.current?.value || ''
    const year = yearRef.current?.value || ''
    const price = priceRef.current?.value || ''
    if (!brand || !model || !year || !price) { setError('Champs obligatoires manquants'); return }
    setSaving(true); setError('')
    try {
      const res = await fetch(`/api/vehicles/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `${brand} ${model} ${year}`, brand, model, year: Number(year), km: Number(kmRef.current?.value) || 0, fuel, transmission, type, price: Number(price), monthly_price: 0, badge: badge || null, description: descRef.current?.value || '', photos, is_available: true }),
      })
      if (res.ok) { setSaved(true); setTimeout(() => router.push('/admin/vehicles'), 1200) }
      else setError('Erreur sauvegarde')
    } catch { setError('Erreur connexion') } finally { setSaving(false) }
  }

  const inp = { border: '0.5px solid rgba(0,0,0,0.12)', color: '#333', background: '#fff', outline: 'none', width: '100%', padding: '9px 12px', fontSize: '13px', fontFamily: 'inherit' }

  if (loading) return <div className="flex min-h-screen items-center justify-center" style={{ background: '#F4F5F7' }}><div style={{ color: '#aaa' }}>Chargement...</div></div>

  return (
    <div className="flex min-h-screen" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
      <aside className="w-56 flex-shrink-0 flex flex-col" style={{ background: '#08111F' }}>
        <div className="px-5 py-5" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div className="text-base font-light tracking-widest uppercase" style={{ color: '#fff' }}>Sen<span style={{ color: '#C08A45' }}>Electro</span></div>
        </div>
        <nav className="py-4 flex-1">
          <Link href="/admin" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>▦ Dashboard</Link>
          <Link href="/admin/vehicles" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: '#fff', background: 'rgba(192,138,69,0.1)', borderLeft: '2px solid #C08A45' }}>🚗 Véhicules</Link>
          <Link href="/admin/appliances" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>📦 Électroménager</Link>
          <Link href="/admin/messages" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>✉️ Messages</Link>
        </nav>
        <div className="px-5 py-4" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}><Link href="/" className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>← Voir le site</Link></div>
      </aside>
      <main className="flex-1" style={{ background: '#F4F5F7' }}>
        <div className="flex items-center justify-between px-8 h-14 bg-white" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
          <div className="flex items-center gap-3 text-sm" style={{ color: '#08111F' }}>
            <Link href="/admin/vehicles" style={{ color: '#aaa' }}>Véhicules</Link><span style={{ color: '#ddd' }}>/</span><span className="font-medium">Modifier</span>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/vehicles" className="text-xs px-4 py-2" style={{ border: '0.5px solid rgba(0,0,0,0.1)', color: '#666' }}>Annuler</Link>
            <button onClick={handleSave} disabled={saving || saved || uploading} className="text-white text-xs px-5 py-2" style={{ background: saved ? '#3B6D11' : '#C08A45', opacity: saving ? 0.7 : 1 }}>
              {saved ? '✅ Sauvegardé !' : saving ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </div>
        </div>
        <div className="p-8 max-w-3xl">
          {error && <div className="mb-5 px-4 py-3 text-sm" style={{ background: '#FDEAEA', border: '0.5px solid rgba(226,75,74,0.3)', color: '#E24B4A' }}>{error}</div>}
          <div className="bg-white rounded p-6 mb-5" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div className="text-sm font-medium mb-5 pb-4" style={{ color: '#08111F', borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>Informations du véhicule</div>
            <div className="grid grid-cols-2 gap-5">
              <div><label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Marque *</label>
                <select value={brand} onChange={e => setBrand(e.target.value)} style={inp}>
                  <option value="">Sélectionner</option>
                  {['Mercedes','BMW','Audi','Porsche','Land Rover','Volkswagen','Volvo','Lexus','Toyota','Hyundai','Renault','Peugeot'].map(b => <option key={b} value={b}>{b}</option>)}
                </select></div>
              <div><label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Modèle *</label><input ref={modelRef} type="text" placeholder="C-Class, X5..." style={inp} /></div>
              <div><label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Année *</label><input ref={yearRef} type="number" placeholder="2022" style={inp} /></div>
              <div><label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Kilométrage</label><input ref={kmRef} type="number" placeholder="50000" style={inp} /></div>
              <div><label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Carburant</label>
                <select value={fuel} onChange={e => setFuel(e.target.value)} style={inp}><option value="essence">Essence</option><option value="diesel">Diesel</option><option value="hybride">Hybride</option><option value="electrique">Électrique</option></select></div>
              <div><label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Transmission</label>
                <select value={transmission} onChange={e => setTransmission(e.target.value)} style={inp}><option value="automatique">Automatique</option><option value="manuelle">Manuelle</option></select></div>
              <div><label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Type</label>
                <select value={type} onChange={e => setType(e.target.value)} style={inp}><option value="berline">Berline</option><option value="suv">SUV</option><option value="4x4">4x4</option><option value="utilitaire">Utilitaire</option></select></div>
              <div><label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Badge</label>
                <select value={badge} onChange={e => setBadge(e.target.value)} style={inp}><option value="">Aucun</option><option value="nouveau">Nouveau</option><option value="promo">Promo</option><option value="arrivage">Arrivage</option><option value="top_vente">Top vente</option></select></div>
              <div className="col-span-2"><label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Prix (FCFA) *</label><input ref={priceRef} type="number" placeholder="22000000" style={inp} /></div>
              <div className="col-span-2"><label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Description</label><textarea ref={descRef} rows={4} placeholder="Décrivez le véhicule..." style={{ ...inp, resize: 'none' }} /></div>
            </div>
          </div>
          <div className="bg-white rounded p-6" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div className="text-sm font-medium mb-5 pb-4" style={{ color: '#08111F', borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>Photos ({photos.length})</div>
            <label className="flex flex-col items-center justify-center cursor-pointer rounded p-8 mb-5" style={{ border: '2px dashed rgba(0,0,0,0.12)', background: '#FAFAFA' }}>
              <div className="text-3xl mb-3">📷</div>
              <div className="text-sm font-medium mb-1" style={{ color: '#333' }}>{uploading ? 'Téléchargement...' : 'Ajouter des photos'}</div>
              <div className="text-xs" style={{ color: '#aaa' }}>JPG, PNG — Autant que vous voulez</div>
              <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoUpload} disabled={uploading} />
            </label>
            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {photos.map((url, i) => (
                  <div key={i} className="relative group rounded overflow-hidden" style={{ height: '120px' }}>
                    <Image src={url} alt={`Photo ${i+1}`} fill className="object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,0,0,0.5)' }}>
                      <button onClick={() => setPhotos(prev => prev.filter((_,j) => j !== i))} className="text-white text-xs px-3 py-1 rounded" style={{ background: '#E24B4A' }}>✕ Supprimer</button>
                    </div>
                    {i === 0 && <span className="absolute top-2 left-2 text-xs px-2 py-0.5" style={{ background: '#C08A45', color: '#fff', fontSize: '9px' }}>Principale</span>}
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
