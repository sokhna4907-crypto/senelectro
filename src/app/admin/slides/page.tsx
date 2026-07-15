'use client'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Slide {
  id: number
  title: string
  title_accent: string
  description: string
  cta_label: string
  cta_href: string
  photo_url: string
  position: number
}

export default function AdminSlides() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)

  // Form fields
  const titleRef = useRef<HTMLInputElement>(null)
  const accentRef = useRef<HTMLInputElement>(null)
  const descRef = useRef<HTMLTextAreaElement>(null)
  const ctaLabelRef = useRef<HTMLInputElement>(null)
  const ctaHrefRef = useRef<HTMLInputElement>(null)
  const [photoUrl, setPhotoUrl] = useState('')

  useEffect(() => {
    fetch('/api/slides').then(r => r.json()).then(data => { setSlides(data.data || []); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const reader = new FileReader()
      const base64 = await new Promise<string>(resolve => { reader.onload = () => resolve(reader.result as string); reader.readAsDataURL(file) })
      const res = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: base64, folder: 'slides' }) })
      if (res.ok) setPhotoUrl((await res.json()).url)
    } catch { setError('Erreur upload') } finally { setUploading(false) }
  }

  const openEdit = (slide: Slide) => {
    setEditId(slide.id)
    setPhotoUrl(slide.photo_url)
    setShowForm(true)
    setTimeout(() => {
      if (titleRef.current) titleRef.current.value = slide.title
      if (accentRef.current) accentRef.current.value = slide.title_accent
      if (descRef.current) descRef.current.value = slide.description
      if (ctaLabelRef.current) ctaLabelRef.current.value = slide.cta_label
      if (ctaHrefRef.current) ctaHrefRef.current.value = slide.cta_href
    }, 100)
  }

  const openNew = () => {
    setEditId(null)
    setPhotoUrl('')
    setShowForm(true)
    setTimeout(() => {
      if (titleRef.current) titleRef.current.value = ''
      if (accentRef.current) accentRef.current.value = ''
      if (descRef.current) descRef.current.value = ''
      if (ctaLabelRef.current) ctaLabelRef.current.value = "Voir l'inventaire"
      if (ctaHrefRef.current) ctaHrefRef.current.value = '/vehicles'
    }, 100)
  }

  const handleSave = async () => {
    const title = titleRef.current?.value || ''
    const title_accent = accentRef.current?.value || ''
    const description = descRef.current?.value || ''
    const cta_label = ctaLabelRef.current?.value || ''
    const cta_href = ctaHrefRef.current?.value || ''
    if (!title || !photoUrl) { setError('Titre et photo obligatoires'); return }
    setSaving(true); setError('')
    try {
      const method = editId ? 'PUT' : 'POST'
      const url = editId ? `/api/slides/${editId}` : '/api/slides'
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, title_accent, description, cta_label, cta_href, photo_url: photoUrl, position: slides.length })
      })
      if (res.ok) {
        const data = await res.json()
        if (editId) setSlides(prev => prev.map(s => s.id === editId ? data.data : s))
        else setSlides(prev => [...prev, data.data])
        setShowForm(false)
        setSuccess('Slide sauvegardé ! Rechargez la page d\'accueil pour voir les changements.')
        setTimeout(() => setSuccess(''), 4000)
      }
    } catch { setError('Erreur') } finally { setSaving(false) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer ce slide ?')) return
    await fetch(`/api/slides/${id}`, { method: 'DELETE' })
    setSlides(prev => prev.filter(s => s.id !== id))
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
          <Link href="/admin/appliances" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>📦 Électroménager</Link>
          <Link href="/admin/messages" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>✉️ Messages</Link>
          <Link href="/admin/slides" className="flex items-center gap-3 px-5 py-3 text-sm" style={{ color: '#fff', background: 'rgba(192,138,69,0.1)', borderLeft: '2px solid #C08A45' }}>🖼️ Slider hero</Link>
        </nav>
        <div className="px-5 py-4" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}><Link href="/" className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>← Voir le site</Link></div>
      </aside>

      <main className="flex-1" style={{ background: '#F4F5F7' }}>
        <div className="flex items-center justify-between px-8 h-14 bg-white" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
          <div className="text-sm font-medium" style={{ color: '#08111F' }}>Slider Hero ({slides.length} slides)</div>
          <button onClick={openNew} className="text-white text-xs uppercase px-4 py-2" style={{ background: '#C08A45' }}>+ Ajouter un slide</button>
        </div>

        <div className="p-8">
          {success && <div className="mb-5 px-4 py-3 text-sm" style={{ background: '#EAF3DE', border: '0.5px solid rgba(59,109,17,0.3)', color: '#3B6D11' }}>{success}</div>}
          {error && <div className="mb-5 px-4 py-3 text-sm" style={{ background: '#FDEAEA', border: '0.5px solid rgba(226,75,74,0.3)', color: '#E24B4A' }}>{error}</div>}

          {/* Formulaire */}
          {showForm && (
            <div className="bg-white rounded p-6 mb-6" style={{ border: '0.5px solid rgba(192,138,69,0.3)' }}>
              <div className="flex items-center justify-between mb-5 pb-4" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.07)' }}>
                <div className="text-sm font-medium" style={{ color: '#08111F' }}>{editId ? 'Modifier le slide' : 'Nouveau slide'}</div>
                <button onClick={() => setShowForm(false)} className="text-xs px-4 py-2" style={{ border: '0.5px solid rgba(0,0,0,0.1)', color: '#666' }}>Annuler</button>
              </div>

              <div className="grid grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Titre *</label>
                  <input ref={titleRef} type="text" placeholder="Des voitures" style={inp} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Texte accentué (doré)</label>
                  <input ref={accentRef} type="text" placeholder="de qualité" style={inp} />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Description</label>
                  <textarea ref={descRef} rows={2} placeholder="Description courte..." style={{ ...inp, resize: 'none' }} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Texte du bouton</label>
                  <input ref={ctaLabelRef} type="text" placeholder="Voir l'inventaire" style={inp} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Lien du bouton</label>
                  <input ref={ctaHrefRef} type="text" placeholder="/vehicles" style={inp} />
                </div>
              </div>

              {/* Upload photo */}
              <div className="mb-5">
                <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#aaa' }}>Photo de fond *</label>
                <label className="flex items-center gap-4 cursor-pointer p-4 rounded" style={{ border: '2px dashed rgba(0,0,0,0.12)', background: '#FAFAFA' }}>
                  <div className="text-2xl">📷</div>
                  <div>
                    <div className="text-sm" style={{ color: '#333' }}>{uploading ? 'Téléchargement...' : 'Cliquer pour choisir une photo'}</div>
                    <div className="text-xs" style={{ color: '#aaa' }}>JPG, PNG recommandé (1600x900px)</div>
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} disabled={uploading} />
                  {photoUrl && <span className="ml-auto text-xs px-2 py-1" style={{ background: '#EAF3DE', color: '#3B6D11' }}>✓ Photo chargée</span>}
                </label>
                {photoUrl && (
                  <div className="relative mt-3 rounded overflow-hidden" style={{ height: '150px' }}>
                    <Image src={photoUrl} alt="Aperçu" fill className="object-cover" />
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button onClick={handleSave} disabled={saving || uploading}
                  className="text-white text-xs px-6 py-3"
                  style={{ background: '#C08A45', opacity: saving ? 0.7 : 1 }}>
                  {saving ? 'Sauvegarde...' : '✓ Sauvegarder le slide'}
                </button>
              </div>
            </div>
          )}

          {/* Liste des slides */}
          {loading ? (
            <div className="text-center py-10 text-sm" style={{ color: '#aaa' }}>Chargement...</div>
          ) : slides.length === 0 ? (
            <div className="bg-white rounded p-10 text-center" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
              <div className="text-4xl mb-4">🖼️</div>
              <div className="text-sm mb-2" style={{ color: '#08111F' }}>Aucun slide personnalisé</div>
              <div className="text-xs mb-4" style={{ color: '#aaa' }}>Le slider utilise actuellement les photos par défaut. Ajoutez des slides pour les personnaliser.</div>
              <button onClick={openNew} className="text-white text-xs px-5 py-2" style={{ background: '#C08A45' }}>+ Ajouter le premier slide</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {slides.map((slide, i) => (
                <div key={slide.id} className="bg-white rounded overflow-hidden" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
                  <div className="relative" style={{ height: '160px', background: '#1A2535' }}>
                    {slide.photo_url && <Image src={slide.photo_url} alt={slide.title} fill className="object-cover" style={{ opacity: 0.7 }} />}
                    <div className="absolute inset-0 flex items-end p-4">
                      <div>
                        <div className="text-white text-base font-light">{slide.title} <span style={{ color: '#C08A45', fontStyle: 'italic' }}>{slide.title_accent}</span></div>
                        <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{slide.description?.substring(0, 60)}...</div>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 text-xs px-2 py-1" style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }}>Slide {i + 1}</div>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between">
                    <div className="text-xs" style={{ color: '#aaa' }}>→ {slide.cta_label}</div>
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(slide)} className="text-xs px-3 py-1.5" style={{ border: '0.5px solid rgba(0,0,0,0.1)', color: '#666' }}>✏️ Modifier</button>
                      <button onClick={() => handleDelete(slide.id)} className="text-xs px-3 py-1.5" style={{ border: '0.5px solid rgba(226,75,74,0.2)', color: '#E24B4A' }}>🗑</button>
                    </div>
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
