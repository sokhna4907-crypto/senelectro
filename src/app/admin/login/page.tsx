'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) { setError('Remplissez tous les champs'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (res.ok) { router.push('/admin') }
      else setError('Identifiants incorrects')
    } catch { setError('Erreur de connexion') }
    finally { setLoading(false) }
  }

  return (
    <main className="min-h-screen flex items-center justify-center" style={{ background: '#08111F' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <div className="text-xl font-light tracking-widest uppercase mb-2" style={{ color: '#fff' }}>
            Sen<span style={{ color: '#C08A45' }}>Electro</span>
          </div>
          <div className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '3px' }}>Administration</div>
        </div>
        <div className="p-8" style={{ background: '#0D1A2D', border: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div className="text-white font-light mb-8 text-center">Connexion</div>
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '2px' }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="admin@senelectro.com" onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="w-full text-sm outline-none px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '2px' }}>Mot de passe</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="w-full text-sm outline-none px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }} />
            </div>
            {error && <div className="text-xs text-center py-2 px-4" style={{ background: 'rgba(226,75,74,0.1)', border: '0.5px solid rgba(226,75,74,0.3)', color: '#E24B4A' }}>{error}</div>}
            <button onClick={handleLogin} disabled={loading}
              className="w-full text-white text-xs uppercase tracking-widest py-4 mt-2"
              style={{ background: '#C08A45', letterSpacing: '2px', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
