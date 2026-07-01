'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [form, setForm] = useState({ full_name: '', phone: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!form.full_name || !form.phone || !form.message) return
    setSubmitted(true)
  }

  return (
    <main style={{ background: '#08111F', minHeight: '100vh' }}>
      <Navbar />

      <div className="pt-36 pb-20 px-12">
        <div className="max-w-5xl mx-auto">

          <div className="text-xs mb-4 uppercase tracking-widest" style={{ color: '#C08A45', letterSpacing: '3px' }}>
            Contact
          </div>
          <h1 className="text-4xl font-light text-white mb-16" style={{ letterSpacing: '-0.5px' }}>
            Parlons de votre projet
          </h1>

          <div className="grid grid-cols-2 gap-16">
            <div>
              {[
                { label: 'Téléphone', value: '+221 77 000 00 00' },
                { label: 'Email', value: 'contact@senelectro.com' },
                { label: 'Adresse', value: 'Dakar, Sénégal' },
                { label: 'Horaires', value: 'Lun – Sam · 9h – 18h' },
              ].map((info, i) => (
                <div key={i} className="py-6" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}>
                  <div className="text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '2px' }}>
                    {info.label}
                  </div>
                  <div className="text-white font-light">{info.value}</div>
                </div>
              ))}
            </div>

            <div className="p-8" style={{ background: '#0D1A2D', border: '0.5px solid rgba(255,255,255,0.06)' }}>
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="text-5xl mb-6">✅</div>
                  <div className="text-white text-xl font-light mb-3">Message envoyé !</div>
                  <div className="text-sm font-light" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Nous vous répondons dans les plus brefs délais.
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-white font-light mb-8">Envoyez-nous un message</div>
                  <div className="flex flex-col gap-5">
                    {[
                      { label: 'Prénom & Nom', key: 'full_name', placeholder: 'Votre nom', type: 'text' },
                      { label: 'Téléphone', key: 'phone', placeholder: '+221 77 000 00 00', type: 'tel' },
                      { label: 'Email (optionnel)', key: 'email', placeholder: 'votre@email.com', type: 'email' },
                    ].map(field => (
                      <div key={field.key}>
                        <label className="block text-xs uppercase tracking-widest mb-2"
                          style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '2px' }}>
                          {field.label}
                        </label>
                        <input type={field.type} placeholder={field.placeholder}
                          value={form[field.key as keyof typeof form]}
                          onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                          className="w-full text-sm outline-none px-4 py-3"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }} />
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-2"
                        style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '2px' }}>
                        Message
                      </label>
                      <textarea placeholder="Votre message..." rows={4}
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        className="w-full text-sm outline-none px-4 py-3 resize-none"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }} />
                    </div>
                    <button onClick={handleSubmit}
                      className="w-full text-white text-xs uppercase tracking-widest py-4"
                      style={{ background: '#C08A45', letterSpacing: '2px' }}>
                      Envoyer
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
