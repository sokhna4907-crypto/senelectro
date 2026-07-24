import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSlider from '@/components/HeroSlider'
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

      {/* Hero Slider */}
      <div className="pt-16 md:pt-28">
        <HeroSlider />
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

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4" style={{ background: '#C08A45' }}>
        {[{ num: vehicles.length + '+', label: 'Véhicules en stock' }, { num: '1 200+', label: 'Clients satisfaits' }, { num: '10 min', label: 'Réponse rapide' }, { num: '100%', label: 'Véhicules inspectés' }].map((stat, i) => (
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
          <Link href="/appliances" className="text-xs uppercase tracking-widest" style={{ color: '#C08A45', letterSpacing: '2px' }}>Tout voir →</Link>
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
