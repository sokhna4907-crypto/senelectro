import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { query } from '@/lib/db'

async function getVehicle(id: string) {
  try {
    const rows = await query('SELECT * FROM vehicles WHERE id = $1', [id])
    return rows[0] || null
  } catch { return null }
}

export default async function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const vehicle = await getVehicle(id)

  if (!vehicle) {
    return (
      <main style={{ background: '#F0F0F0', minHeight: '100vh' }}>
        <div style={{ background: '#08111F' }}><Navbar /></div>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="text-2xl font-light mb-4" style={{ color: '#08111F' }}>Véhicule introuvable</div>
            <Link href="/vehicles" className="text-xs uppercase tracking-widest" style={{ color: '#C08A45' }}>← Retour</Link>
          </div>
        </div>
      </main>
    )
  }

  const photos = Array.isArray(vehicle.photos) ? vehicle.photos : []

  return (
    <main style={{ background: '#F0F0F0', minHeight: '100vh' }}>
      <div style={{ background: '#08111F' }}><Navbar /></div>

      <div className="pt-28 md:pt-36 pb-8 px-4 md:px-12" style={{ background: '#08111F' }}>
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.25)' }}>Accueil</Link>
          <span>/</span>
          <Link href="/vehicles" style={{ color: 'rgba(255,255,255,0.25)' }}>Véhicules</Link>
          <span>/</span>
          <span style={{ color: '#C08A45' }}>{vehicle.name}</span>
        </div>
      </div>

      <div className="px-4 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          <div>
            <div className="relative overflow-hidden mb-3" style={{ height: '320px', background: '#fff', border: '0.5px solid #E0E0E0' }}>
              {photos[0] ? (
                <Image src={photos[0]} alt={vehicle.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl" style={{ color: '#D5D5D5' }}>🚗</div>
              )}
              {vehicle.badge && (
                <span className="absolute top-4 left-4 text-xs px-3 py-1 uppercase" style={{ background: '#C08A45', color: '#fff', fontSize: '9px' }}>
                  {vehicle.badge}
                </span>
              )}
            </div>
            {photos.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {photos.slice(1).map((photo: string, i: number) => (
                  <div key={i} className="relative overflow-hidden" style={{ height: '80px', background: '#fff', border: '0.5px solid #E0E0E0' }}>
                    <Image src={photo} alt={`${vehicle.name} ${i + 2}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="text-xs mb-2 uppercase tracking-widest" style={{ color: '#C08A45', letterSpacing: '3px' }}>{vehicle.brand}</div>
            <h1 className="text-3xl md:text-4xl font-light mb-6" style={{ color: '#08111F', letterSpacing: '-0.5px' }}>{vehicle.name}</h1>

            <div className="flex items-baseline gap-3 mb-8 pb-8" style={{ borderBottom: '0.5px solid #E0E0E0' }}>
              <span style={{ fontSize: '32px', fontWeight: 200, color: '#C08A45' }}>
                {vehicle.price?.toLocaleString('fr-FR')} FCFA
              </span>
            </div>

            <div className="grid grid-cols-3 gap-px mb-8" style={{ background: '#E0E0E0' }}>
              {[
                { label: 'Année', value: vehicle.year },
                { label: 'Kilométrage', value: `${vehicle.km?.toLocaleString('fr-FR')} km` },
                { label: 'Carburant', value: vehicle.fuel },
                { label: 'Transmission', value: vehicle.transmission },
                { label: 'Type', value: vehicle.type?.toUpperCase() },
                { label: 'Marque', value: vehicle.brand },
              ].map((spec, i) => (
                <div key={i} className="px-4 py-4" style={{ background: '#fff' }}>
                  <div className="text-xs mb-1 uppercase" style={{ color: '#999', letterSpacing: '1px' }}>{spec.label}</div>
                  <div className="text-sm font-medium" style={{ color: '#08111F', textTransform: 'capitalize' }}>{spec.value}</div>
                </div>
              ))}
            </div>

            {vehicle.description && (
              <p className="text-sm leading-7 mb-8 font-light" style={{ color: '#666' }}>{vehicle.description}</p>
            )}

            <div className="flex gap-3">
              <Link href="/contact" className="flex-1 text-center text-white text-xs uppercase tracking-widest py-4" style={{ background: '#C08A45', letterSpacing: '2px' }}>
                Nous contacter
              </Link>
              <a href="tel:+15148806161" className="flex-1 text-center text-xs uppercase tracking-widest py-4" style={{ border: '0.5px solid #E0E0E0', color: '#08111F', letterSpacing: '2px' }}>
                📞 Appeler
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
