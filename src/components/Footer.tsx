import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#08111F' }}>
      <div className="px-6 md:px-12 pt-10 md:pt-16 pb-6 md:pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 pb-10" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div>
            <div className="text-base font-light tracking-widest uppercase mb-5" style={{ color: '#fff' }}>
              Sen<span style={{ color: '#C08A45' }}>Electro</span>
            </div>
            <p className="text-xs leading-7 font-light" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Voitures d'occasion inspectées et électroménager à prix déstockage.
            </p>
          </div>
          <div>
            <div className="text-xs mb-5 uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '3px' }}>Véhicules</div>
            {['Berlines', 'SUV & 4x4', 'Utilitaires', 'Nouveautés'].map(l => (
              <Link key={l} href="/vehicles" className="block text-xs mb-2 font-light" style={{ color: 'rgba(255,255,255,0.4)' }}>{l}</Link>
            ))}
          </div>
          <div>
            <div className="text-xs mb-5 uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '3px' }}>Électroménager</div>
            {['Télévisions', 'Réfrigérateurs', 'Climatiseurs', 'Tout le stock'].map(l => (
              <Link key={l} href="/appliances" className="block text-xs mb-2 font-light" style={{ color: 'rgba(255,255,255,0.4)' }}>{l}</Link>
            ))}
          </div>
          <div>
            <div className="text-xs mb-5 uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '3px' }}>Contact</div>
            {['+1 (514) 880-6161', 'info@senelectro.com', '676 lot. Serigne Mbacké, Madina Touba', 'Lun – Sam · 9h – 18h'].map(l => (
              <div key={l} className="block text-xs mb-2 font-light" style={{ color: 'rgba(255,255,255,0.4)' }}>{l}</div>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>© 2026 SenElectro · Tous droits réservés</div>
          <div className="flex gap-2">
            {['Wave', 'Orange Money'].map(p => (
              <span key={p} className="text-xs px-3 py-1 uppercase tracking-widest" style={{ border: '0.5px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.25)' }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
