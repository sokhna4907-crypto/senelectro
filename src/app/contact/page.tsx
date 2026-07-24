'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [form, setForm] = useState({ full_name: '', phone: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!form.full_name || !form.phone || !form.message) { setError('Veuillez remplir tous les champs obligatoires'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) setSubmitted(true)
      else setError('Une erreur est survenue')
    } catch { setError('Erreur de connexion') }
    finally { setLoading(false) }
  }

  return (
    <main style={{ background: '#F0F0F0', minHeight: '100vh' }}>
      <div style={{ background: '#08111F' }}><Navbar /></div>

      <div className="pt-28 md:pt-36 pb-8 px-4 md:px-12" style={{ background: '#08111F' }}>
        <div className="text-xs mb-4 uppercase tracking-widest" style={{ color: '#C08A45', letterSpacing: '3px' }}>Contact</div>
        <h1 className="text-3xl md:text-4xl font-light text-white" style={{ letterSpacing: '-0.5px' }}>Parlons de votre projet</h1>
      </div>

      <div className="px-4 md:px-12 py-12 md:py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          <div>
            {[
              { label: 'Téléphone', value: '+1 (514) 880-6161' },
              { label: 'Email', value: 'info@senelectro.com' },
              { label: 'Adresse', value: '676 lotissement Serigne Mbacké, Madina Touba' },
              { label: 'Horaires', value: 'Lun – Sam · 9h – 18h' },
            ].map((info, i) => (
              <div key={i} className="py-6" style={{ borderBottom: '0.5px solid #D5D5D5' }}>
                <div className="text-xs uppercase tracking-widest mb-2" style={{ color: '#999', letterSpacing: '2px' }}>{info.label}</div>
                <div className="font-light" style={{ color: '#08111F' }}>{info.value}</div>
              </div>
            ))}
          </div>

          <div className="p-8 bg-white" style={{ border: '0.5px solid #D5D5D5' }}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="text-5xl mb-6">✅</div>
                <div className="text-xl font-light mb-3" style={{ color: '#08111F' }}>Message envoyé !</div>
                <div className="text-sm font-light" style={{ color: '#999' }}>Nous vous répondons dans les plus brefs délais.</div>
              </div>
            ) : (
              <>
                <div className="font-light mb-8" style={{ color: '#08111F' }}>Envoyez-nous un message</div>
                <div className="flex flex-col gap-5">
                  {[
                    { label: 'Prénom & Nom *', key: 'full_name', placeholder: 'Votre nom', type: 'text' },
                    { label: 'Téléphone *', key: 'phone', placeholder: '+1 (514) 000-0000', type: 'tel' },
                    { label: 'Email (optionnel)', key: 'email', placeholder: 'votre@email.com', type: 'email' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#999', letterSpacing: '2px' }}>{field.label}</label>
                      <input type={field.type} placeholder={field.placeholder}
                        value={form[field.key as keyof typeof form]}
                        onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                        className="w-full text-sm outline-none px-4 py-3"
                        style={{ background: '#F8F8F8', border: '0.5px solid #D5D5D5', color: '#08111F' }} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#999', letterSpacing: '2px' }}>Message *</label>
                    <textarea placeholder="Votre message..." rows={4} value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full text-sm outline-none px-4 py-3 resize-none"
                      style={{ background: '#F8F8F8', border: '0.5px solid #D5D5D5', color: '#08111F' }} />
                  </div>
                  {error && <div className="text-xs py-2 px-4" style={{ background: '#FDEAEA', border: '0.5px solid rgba(226,75,74,0.3)', color: '#E24B4A' }}>{error}</div>}
                  <button onClick={handleSubmit} disabled={loading}
                    className="w-full text-white text-xs uppercase tracking-widest py-4"
                    style={{ background: '#C08A45', letterSpacing: '2px', opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Envoi...' : 'Envoyer'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
