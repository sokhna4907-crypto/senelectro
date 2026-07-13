import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CarCard from '@/components/CarCard'
import ElecCard from '@/components/ElecCard'
import Link from 'next/link'
import { Vehicle, Appliance } from '@/types'
import { query } from '@/lib/db'

const brands = ['Mercedes', 'BMW', 'Audi', 'Porsche', 'Volkswagen', 'Volvo', 'Lexus', 'Land Rover']

async function getVehicles(): Promise<Vehicle[]> {
  try {
    const vehicles = await query('SELECT * FROM vehicles WHERE is_available = true ORDER BY created_at DESC LIMIT 6')
    return vehicles
  } catch {
    return []
  }
}

async function getAppliances(): Promise<Appliance[]> {
  try {
    const appliances = await query('SELECT * FROM appliances WHERE is_available = true AND stock_count > 0 ORDER BY created_at DESC LIMIT 6')
    return appliances
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [vehicles, appliances] = await Promise.all([getVehicles(), getAppliances()])

  return (
    <main style={{ background: '#08111F' }}>
      <Navbar />

      {/* Hero */}
      <div className="pt-16 md:pt-28">
        <div className="relative w-full overflow-hidden" style={{ height: '92vh', minHeight: '560px', background: '#08111F' }}>
          <div className="absolute inset-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1563720223185-11003d516935?w=1600&q=85')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.35)' }} />
          <div className="absolute inset-0" style={{ background: 'rgba(8,17,31,0.52)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-72" style={{ background: 'linear-gradient(to top, rgba(8,17,31,0.95), transparent)' }} />
          <div className="absolute inset-0 flex items-end pb-16 md:pb-24 px-6 md:px-12 z-10">
            <div style={{ maxWidth: '640px' }}>
              <div className="text-xs mb-6 pb-2 inline-block" style={{ color: '#C08A45', borderBottom: '0.5px solid rgba(192,138,69,0.4)', letterSpacing: '3px' }}>
                Véhicules premium — En stock
              </div>
              <h1 className="text-white mb-4 text-3xl md:text-5xl" style={{ fontWeight: 200, lineHeight: 1.1, letterSpacing: '-0.5px' }}>
                {"L'excellence"}<br />
                <span style={{ color: '#C08A45', fontStyle: 'italic' }}>automobile </span>
                {"à votre portée"}
              </h1>
              <p className="mb-6 hidden md:block" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.8, maxWidth: '420px', fontWeight: 300 }}>
                Des véhicules soigneusement sélectionnés, inspectés et certifiés. Qualité garantie, prix transparents.
              </p>
              <div className="flex items-center gap-8">
                <Link href="/vehicles" className="text-white text-xs tracking-widest uppercase px-9 py-4" style={{ background: '#C08A45', letterSpacing: '2px' }}>
                  {"Voir l'inventaire"}
                </Link>
                <Link href="/financing" className="text-xs tracking-widest uppercase flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '2px' }}>
                  → Financement rapide
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 flex z-10" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
            {[{ num: vehicles.length + '+', label: 'Véhicules' }, { num: '1 200+', label: 'Clients' }, { num: '10 min', label: 'Financement' }].map((stat, i) => (
              <div key={i} className="px-6 py-4" style={{ borderLeft: i > 0 ? '0.5px solid rgba(255,255,255,0.1)' : 'none' }}>
                <div className="text-white text-xl font-light">{stat.num}</div>
                <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '1px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marques */}
      <div className="px-4 md:px-12 py-6 flex items-center gap-0 overflow-x-auto" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.04)' }}>
        <span className="text-xs mr-12 whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '3px', textTransform: 'uppercase' }}>Nos marques</span>
        <div className="flex flex-1">
          {brands.map((brand, i) => (
            <div key={brand} className="flex-1 text-center py-2 text-xs uppercase tracking-widest cursor-pointer"
              style={{ color: 'rgba(255,255,255,0.22)', borderRight: i < brands.length - 1 ? '0.5px solid rgba(255,255,255,0.04)' : 'none', letterSpacing: '2px' }}>
              {brand}
            </div>
          ))}
        </div>
      </div>

      {/* Véhicules */}
      <section className="px-4 md:px-12 py-12 md:py-20">
        <div className="flex items-end justify-between mb-14">
          <div>
            <div className="text-xs mb-4 uppercase tracking-widest" style={{ color: '#C08A45', letterSpacing: '3px' }}>Inventaire</div>
            <h2 className="text-2xl md:text-4xl font-light" style={{ color: '#fff', letterSpacing: '-0.5px' }}>Véhicules en stock</h2>
          </div>
          <Link href="/vehicles" className="text-xs uppercase tracking-widest flex items-center gap-2 pb-1" style={{ color: '#C08A45', borderBottom: '0.5px solid rgba(192,138,69,0.3)', letterSpacing: '2px' }}>
            Tout voir →
          </Link>
        </div>
        {vehicles.length === 0 ? (
          <div className="text-center py-20" style={{ color: 'rgba(255,255,255,0.3)' }}>Aucun véhicule disponible pour le moment</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#1A2535' }}>
            {vehicles.map(v => <CarCard key={v.id} vehicle={v} />)}
          </div>
        )}
      </section>

      {/* Split Financement */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="h-64 md:h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1000&q=80')" }} />
        <div className="flex flex-col justify-center px-6 md:px-16 py-10 md:py-16" style={{ background: '#0D1A2D' }}>
          <div className="text-xs mb-5 uppercase tracking-widest" style={{ color: '#C08A45', letterSpacing: '3px' }}>Financement</div>
          <h2 className="text-3xl font-light mb-6" style={{ color: '#fff', lineHeight: 1.3 }}>Votre véhicule,<br />votre budget</h2>
          <p className="text-sm mb-8 font-light leading-7" style={{ color: 'rgba(255,255,255,0.4)' }}>Obtenez une réponse rapide et un plan de financement adapté à votre situation.</p>
          <div className="flex flex-col gap-5 mb-10">
            {['Remplissez le formulaire — 2 minutes', 'Accord de principe sous 10 min', 'Récupérez votre véhicule dès le lendemain'].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-xs mt-1" style={{ color: '#C08A45', letterSpacing: '1px', minWidth: '20px' }}>0{i + 1}</span>
                <span className="text-sm font-light" style={{ color: 'rgba(255,255,255,0.55)' }}>{step}</span>
              </div>
            ))}
          </div>
          <Link href="/financing" className="text-white text-xs tracking-widest uppercase px-8 py-4 self-start" style={{ background: '#C08A45', letterSpacing: '2px' }}>
            Faire une demande
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4" style={{ background: '#C08A45' }}>
        {[{ num: vehicles.length + '+', label: 'Véhicules en stock' }, { num: '1 200+', label: 'Clients satisfaits' }, { num: '10 min', label: 'Délai financement' }, { num: '100%', label: 'Véhicules inspectés' }].map((stat, i) => (
          <div key={i} className="text-center py-10 px-4" style={{ borderRight: i < 3 ? '0.5px solid rgba(255,255,255,0.2)' : 'none' }}>
            <div className="text-4xl font-light text-white mb-2" style={{ letterSpacing: '-1px' }}>{stat.num}</div>
            <div className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.65)', letterSpacing: '2px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Électroménager */}
      <section className="px-4 md:px-12 py-12 md:py-20" style={{ background: '#F5F3EF' }}>
        <div className="flex items-end justify-between mb-6 pb-8" style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
          <div>
            <div className="text-xs mb-4 uppercase tracking-widest" style={{ color: '#C08A45', letterSpacing: '3px' }}>Déstockage</div>
            <h2 className="text-2xl md:text-4xl font-light" style={{ color: '#08111F', letterSpacing: '-0.5px' }}>Électroménager</h2>
          </div>
          <Link href="/appliances" className="see-all text-xs uppercase tracking-widest" style={{ color: '#C08A45', letterSpacing: '2px' }}>Tout voir →</Link>
        </div>
        {appliances.length === 0 ? (
          <div className="text-center py-20" style={{ color: '#888' }}>Aucun appareil disponible pour le moment</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {appliances.map(a => <ElecCard key={a.id} appliance={a} />)}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
