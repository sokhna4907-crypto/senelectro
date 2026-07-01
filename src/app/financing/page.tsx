'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function FinancingPage() {
  const [form, setForm] = useState({ full_name: '', phone: '', budget_monthly: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!form.full_name || !form.phone || !form.budget_monthly) return
    // En prod : fetch('/api/financing', { method: 'POST', body: JSON.stringify(form) })
    setSubmitted(true)
  }

  return (
    <main style={{ background: '#08111F', minHeight: '100vh' }}>
      <Navbar />

      <div className="pt-28 md:pt-36 pb-12 md:pb-20 px-4 md:px-12">
        <div className="max-w-5xl mx-auto">

          <div className="text-xs mb-4 uppercase tracking-widest" style={{ color: '#C08A45', letterSpacing: '3px' }}>
            Financement
          </div>
          <h1 className="text-4xl font-light text-white mb-16" style={{ letterSpacing: '-0.5px' }}>
            Votre véhicule, votre budget
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

            {/* Infos gauche */}
            <div>
              <div className="flex flex-col gap-8 mb-12">
                {[
                  { num: '01', title: 'Remplissez le formulaire', desc: 'Indiquez vos coordonnées et votre budget mensuel en 2 minutes.' },
                  { num: '02', title: 'Réponse rapide', desc: "Recevez votre accord de principe sous 10 minutes par téléphone." },
                  { num: '03', title: 'Récupérez votre véhicule', desc: "Finalisez les démarches et repartez avec votre véhicule dès le lendemain." },
                ].map((step) => (
                  <div key={step.num} className="flex gap-5">
                    <span className="text-sm font-light flex-shrink-0 mt-1" style={{ color: '#C08A45', letterSpacing: '1px' }}>
                      {step.num}
                    </span>
                    <div>
                      <div className="text-white font-light mb-2">{step.title}</div>
                      <div className="text-sm font-light leading-6" style={{ color: 'rgba(255,255,255,0.4)' }}>{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6" style={{ background: '#0D1A2D', border: '0.5px solid rgba(255,255,255,0.06)' }}>
                <div className="text-xs uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '2px' }}>
                  Modes de paiement acceptés
                </div>
                <div className="flex gap-3">
                  {['Wave', 'Orange Money', 'Virement bancaire'].map(p => (
                    <span key={p} className="text-xs px-3 py-2 uppercase tracking-wider"
                      style={{ border: '0.5px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Formulaire droite */}
            <div>
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16"
                  style={{ background: '#0D1A2D', border: '0.5px solid rgba(192,138,69,0.2)' }}>
                  <div className="text-5xl mb-6">✅</div>
                  <div className="text-white text-xl font-light mb-3">Demande envoyée !</div>
                  <div className="text-sm font-light" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Nous vous contactons dans les 10 minutes.
                  </div>
                </div>
              ) : (
                <div className="p-8" style={{ background: '#0D1A2D', border: '0.5px solid rgba(255,255,255,0.06)' }}>
                  <div className="text-white font-light mb-8">Votre demande de financement</div>
                  <div className="flex flex-col gap-5">
                    {[
                      { label: 'Prénom & Nom', key: 'full_name', placeholder: 'Moussa Diallo', type: 'text' },
                      { label: 'Téléphone', key: 'phone', placeholder: '+221 77 000 00 00', type: 'tel' },
                      { label: 'Budget mensuel (FCFA)', key: 'budget_monthly', placeholder: '500 000', type: 'number' },
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
                        Véhicule souhaité (optionnel)
                      </label>
                      <textarea placeholder="Ex: BMW X5, Mercedes C-Class..."
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        rows={3}
                        className="w-full text-sm outline-none px-4 py-3 resize-none"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }} />
                    </div>
                    <button onClick={handleSubmit}
                      className="w-full text-white text-xs uppercase tracking-widest py-4 mt-2"
                      style={{ background: '#C08A45', letterSpacing: '2px' }}>
                      Envoyer ma demande
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
