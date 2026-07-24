'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AddAppliance() {
  const router = useRouter()
  const nameRef = useRef<HTMLInputElement>(null)
  const brandRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const stockRef = useRef<HTMLInputElement>(null)
  const descRef = useRef<HTMLTextAreaElement>(null)
  const [category, setCategory] = useState('television')
  const [photos, setPhotos] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)
    try {
      const uploaded: string[] = []
      for (const file of files) {
        const reader = new FileReader()
        const base64 = await new Promise<string>(resolve => { reader.onload = () => resolve(reader.result as string); reader.readAsDataURL(file) })
        const res = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: base64, folder: 'appliances' }) })
        if (res.ok) uploaded.push((await res.json()).url)
      }
      setPhotos(prev => [...prev, ...uploaded])
    } catch { setError('Erreur upload') } finally { setUploading(false) }
  }

  const handleSave = async () => {
    const name = nameRef.current?.value || ''
    const brand = brandRef.current?.value || ''
    const price = priceRef.current?.value || ''
    const stock = stockRef.current?.value || ''
    if (!name || !brand || !price || !stock) { setError('Champs obligatoires manquants (*)'); return }
    setSaving(true); setError('')
    try {
      const res = await fetch('/api/appliances', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, brand, category, price: Number(price), stock_count: Number(stock), description: descRef.current?.value || '', photos, is_available: true }) })
      if (res.ok) { setSaved(true); setTimeout(() => router.push('/admin/appliances'), 1200) }
      else setError('Erreur lors de la publication')
    } catch { setError('Erreur de connexion') } finally { setSaving(false) }
  }

  const inp = { border: '0.5px solid rgba(0,0,0,0.12)', color: '#333', background: '#fff', outline: 'none', width: '100%', padding: '9px 12px', fontSize: '13px', fontFamily: 'inherit' }

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
          <Link href="/admin/appliances" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: '#fff', background: 'rgba(192,138,69,0.1)', borderLeft: '2px solid #C08A45' }}>📦 Électroménager</Link>
          <Link href="/admin/messages" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>✉️ Messages</Link>
          <Link href="/admin/slides" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>🖼️ Slider hero</Link>
        </nav>
        <div className="px-5 py-4" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}><Link href="/" className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>← Voir le site</Link></div>
      </aside>
      <main className="flex-1" style={{ background: '#F4F5F7' }}>
        <div className="flex items-center justify-between px-8 h-14 bg-white" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
          <div className="flex items-center gap-3 text-sm" style={{ color: '#08111F' }}><Link href="/admin/appliances" style={{ color: '#aaa' }}>Électroménager</Link><span style={{ color: '#ddd' }}>/</span><span className="font-medium">Ajouter</span></div>
          <div className="flex gap-3">
            <Link href="/admin/appliances" className="text-xs px-4 py-2" style={{ border: '0.5px solid rgba(0,0,0,0.1)', color: '#666' }}>Annuler</Link>
            <button onClick={handleSave} disabled={saving || saved || uploading} className="text-white text-xs px-5 py-2" style={{ background: saved ? '#3B6D11' : '#C08A45', opacity: saving ? 0.7 : 1 }}>
              {saved ? '✅ Publié !' : saving ? 'Publication...' : 'Publier'}
            </button>
          </div>
        </div>
        <div className="p-8 max-w-2xl">
          {error && <div className="mb-5 px-4 py-3 text-sm" style={{ background: '#FDEAEA', border: '0.5px solid rgba(226,75,74,0.3)', color: '#E24B4A' }}>{error}</div>}
          <div className="bg-white rounded p-6 mb-5" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div className="text-sm font-medium mb-5 pb-4" style={{ color: '#08111F', borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>Informations</div>
            <div className="grid grid-cols-2 gap-5">
              <div><label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Nom *</label><input ref={nameRef} type="text" placeholder="Télévision 55 pouces" style={inp} /></div>
              <div><label className="block text-xs uppercase tracking-widests mb-2" style={{ color: '#aaa' }}>Marque *</label><input ref={brandRef} type="text" placeholder="Samsung, LG..." style={inp} /></div>
              <div><label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Catégorie</label>
                <select value={category} onChange={e => setCategory(e.target.value)} style={inp}>
                  <option value="television">Télévision</option><option value="refrigerateur">Réfrigérateur</option><option value="climatiseur">Climatiseur</option><option value="lave-linge">Lave-linge</option><option value="micro-ondes">Micro-ondes</option><option value="audio">Audio</option><option value="autre">Autre</option>
                </select></div>
              <div><label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Stock *</label><input ref={stockRef} type="number" placeholder="5" style={inp} /></div>
              <div className="col-span-2"><label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Prix (FCFA) *</label><input ref={priceRef} type="number" placeholder="350000" style={inp} /></div>
              <div className="col-span-2"><label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Description</label><textarea ref={descRef} rows={3} placeholder="Décrivez l'appareil..." style={{ ...inp, resize: 'none' }} /></div>
            </div>
          </div>
          <div className="bg-white rounded p-6" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div className="text-sm font-medium mb-5 pb-4" style={{ color: '#08111F', borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>Photos ({photos.length})</div>
            <label className="flex flex-col items-center justify-center cursor-pointer rounded p-8 mb-5" style={{ border: '2px dashed rgba(0,0,0,0.12)', background: '#FAFAFA' }}>
              <div className="text-3xl mb-3">📷</div>
              <div className="text-sm font-medium mb-1" style={{ color: '#333' }}>{uploading ? 'Téléchargement...' : 'Cliquez pour ajouter des photos'}</div>
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
