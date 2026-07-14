'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AddAppliance() {
  const router = useRouter()
  const nameRef = useRef<HTMLInputElement>(null)
  const brandRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const stockRef = useRef<HTMLInputElement>(null)
  const descRef = useRef<HTMLTextAreaElement>(null)
  const [category, setCategory] = useState('television')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    const name = nameRef.current?.value || ''
    const brand = brandRef.current?.value || ''
    const price = priceRef.current?.value || ''
    const stock = stockRef.current?.value || ''
    const description = descRef.current?.value || ''

    if (!name || !brand || !price || !stock) {
      setError('Veuillez remplir tous les champs obligatoires (*)')
      return
    }
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/appliances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, brand, category,
          price: Number(price),
          stock_count: Number(stock),
          description,
          photos: [],
          is_available: true,
        }),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => router.push('/admin/appliances'), 1200)
      } else {
        setError('Erreur lors de la publication')
      }
    } catch {
      setError('Erreur de connexion')
    } finally {
      setSaving(false)
    }
  }

  const inp = {
    border: '0.5px solid rgba(0,0,0,0.12)',
    color: '#333', background: '#fff',
    outline: 'none', width: '100%',
    padding: '9px 12px', fontSize: '13px',
    fontFamily: 'inherit'
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
          <Link href="/admin/appliances" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: '#fff', background: 'rgba(192,138,69,0.1)', borderLeft: '2px solid #C08A45' }}>📦 Électroménager</Link>
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
            <span className="font-medium">Ajouter un appareil</span>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/appliances" className="text-xs px-4 py-2" style={{ border: '0.5px solid rgba(0,0,0,0.1)', color: '#666' }}>Annuler</Link>
            <button onClick={handleSave} disabled={saving || saved}
              className="text-white text-xs px-5 py-2"
              style={{ background: saved ? '#3B6D11' : '#C08A45', opacity: saving ? 0.7 : 1 }}>
              {saved ? '✅ Publié !' : saving ? 'Publication...' : 'Publier'}
            </button>
          </div>
        </div>

        <div className="p-8 max-w-2xl">
          {error && (
            <div className="mb-5 px-4 py-3 text-sm" style={{ background: '#FDEAEA', border: '0.5px solid rgba(226,75,74,0.3)', color: '#E24B4A' }}>
              {error}
            </div>
          )}

          <div className="bg-white rounded p-6" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <div className="text-sm font-medium mb-5 pb-4" style={{ color: '#08111F', borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
              Informations de l'appareil
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa', letterSpacing: '1px' }}>Nom *</label>
                <input ref={nameRef} type="text" placeholder="Télévision 55 pouces 4K" style={inp} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa', letterSpacing: '1px' }}>Marque *</label>
                <input ref={brandRef} type="text" placeholder="Samsung, LG, Sony..." style={inp} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa', letterSpacing: '1px' }}>Catégorie</label>
                <select value={category} onChange={e => setCategory(e.target.value)} style={inp}>
                  <option value="television">Télévision</option>
                  <option value="refrigerateur">Réfrigérateur</option>
                  <option value="climatiseur">Climatiseur</option>
                  <option value="lave-linge">Lave-linge</option>
                  <option value="micro-ondes">Micro-ondes</option>
                  <option value="audio">Audio</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa', letterSpacing: '1px' }}>Stock *</label>
                <input ref={stockRef} type="number" placeholder="5" min="0" style={inp} />
              </div>
              <div className="col-span-2">
                <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa', letterSpacing: '1px' }}>Prix (FCFA) *</label>
                <input ref={priceRef} type="number" placeholder="350000" style={inp} />
              </div>
              <div className="col-span-2">
                <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa', letterSpacing: '1px' }}>Description</label>
                <textarea ref={descRef} rows={3} placeholder="Décrivez l'appareil..." style={{ ...inp, resize: 'none' }} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
