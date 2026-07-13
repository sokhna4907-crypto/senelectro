import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { query } from '@/lib/db'
import { Vehicle } from '@/types'

async function getVehicle(id: string): Promise<Vehicle | null> {
  try {
    const rows = await query('SELECT * FROM vehicles WHERE id = $1', [id])
    return rows[0] || null
  } catch {
    return null
  }
}

const specs = (v: Vehicle) => [
  { label: 'Année', value: v.year?.toString() },
  { label: 'Kilométrage', value: `${v.km?.toLocaleString('fr-FR')} km` },
  { label: 'Carburant', value: v.fuel?.charAt(0).toUpperCase() + v.fuel?.slice(1) },
  { label: 'Transmission', value: v.transmission?.charAt(0).toUpperCase() + v.transmission?.slice(1) },
  { label: 'Type', value: v.type?.toUpperCase() },
  { label: 'Marque', value: v.brand },
]

export default async function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const vehicle = await getVehicle(id)

  if (!vehicle) {
    return (
      <main style={{ background: '#08111F', minHeight: '100vh' }}>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="text-white text-2xl font-light mb-4">Véhicule introuvable</div>
            <Link href="/vehicles" className="text-xs uppercase tracking-widest" style={{ color: '#C08A45' }}>← Retour à l'inventaire</Link>
          </div>
        </div>
      </main>
    )
  }

  const photos = Array.isArray(vehicle.photos) ? vehicle.photos : []

  return (
    <main style={{ background: '#08111F', minHeight: '100vh' }}>
      <Navbar />

      <div className="pt-28 md:pt-36 px-4 md:px-12 pb-12 md:pb-20">

        <div className="flex items-center gap-3 mb-10 text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '2px' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.25)' }}>Accueil</Link>
          <span>/</span>
          <Link href="/vehicles" style={{ color: 'rgba(255,255,255,0.25)' }}>Véhicules</Link>
          <span>/</span>
          <span style={{ color: '#C08A45' }}>{vehicle.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          <div>
            <div className="relative overflow-hidden mb-3" style={{ height: '260px', background: '#1A2535' }}>
              {photos[0] ? (
                <Image src={photos[0]} alt={vehicle.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl" style={{ color: 'rgba(255,255,255,0.08)' }}>🚗</div>
              )}
              {vehicle.badge && (
                <span className="absolute top-5 left-5 text-xs px-3 py-1 uppercase tracking-widest" style={{ background: '#C08A45', color: '#fff', letterSpacing: '1px' }}>
                  {vehicle.badge}
                </span>
              )}
            </div>
            {photos.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {photos.slice(1).map((photo: string, i: number) => (
                  <div key={i} className="relative overflow-hidden" style={{ height: '100px', background: '#1A2535' }}>
                    <Image src={photo} alt={`${vehicle.name} ${i + 2}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="text-xs mb-3 uppercase tracking-widest" style={{ color: '#C08A45', letterSpacing: '3px' }}>{vehicle.brand}</div>
            <h1 className="text-4xl font-light text-white mb-2" style={{ letterSpacing: '-0.5px' }}>{vehicle.name}</h1>
            <div className="flex items-baseline gap-3 mb-8 pb-8" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '32px', fontWeight: 200, color: '#C08A45', letterSpacing: '-0.5px' }}>
                {vehicle.price?.toLocaleString('fr-FR')} FCFA
              </span>
            </div>

            <div className="grid grid-cols-3 gap-px mb-8" style={{ background: 'rgba(255,255,255,0.04)' }}>
              {specs(vehicle).map((spec, i) => (
                <div key={i} className="px-4 py-4" style={{ background: '#08111F' }}>
                  <div className="text-xs mb-1 uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '1px' }}>{spec.label}</div>
                  <div className="text-sm text-white font-light">{spec.value}</div>
                </div>
              ))}
            </div>

            {vehicle.description && (
              <p className="text-sm leading-7 mb-8 font-light" style={{ color: 'rgba(255,255,255,0.45)' }}>{vehicle.description}</p>
            )}

            <div className="p-5 mb-6" style={{ background: '#0D1A2D', border: '0.5px solid rgba(255,255,255,0.06)' }}>
              <div className="text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '2px' }}>Financement estimé</div>
              <div style={{ fontSize: '24px', fontWeight: 200, color: '#C08A45' }}>
                {vehicle.monthly_price?.toLocaleString('fr-FR')} FCFA
                <span className="text-sm ml-2" style={{ color: 'rgba(255,255,255,0.3)' }}>/ mois</span>
              </div>
              <div className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.2)' }}>Pré-approbation en 10 minutes</div>
            </div>

            <div className="flex gap-3">
              <Link href="/financing" className="flex-1 text-center text-white text-xs uppercase tracking-widest py-4" style={{ background: '#C08A45', letterSpacing: '2px' }}>
                Demander un financement
              </Link>
              <Link href="/contact" className="flex-1 text-center text-xs uppercase tracking-widest py-4" style={{ border: '0.5px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', letterSpacing: '2px' }}>
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
