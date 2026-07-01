import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { Vehicle } from '@/types'

const allVehicles: Vehicle[] = [
  { id: 1, name: 'Mercedes C-Class 2020', brand: 'Mercedes', model: 'C-Class', year: 2020, km: 48000, fuel: 'essence', transmission: 'automatique', type: 'berline', price: 22000000, monthly_price: 730000, badge: 'nouveau', description: "La Mercedes C-Class 2020 incarne l'élégance et la sophistication à leur apogée. Ce véhicule soigneusement inspecté offre une expérience de conduite exceptionnelle avec ses finitions premium et sa technologie de pointe.", photos: ['https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&q=85', 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1200&q=85'], is_available: true, created_at: '' },
  { id: 2, name: 'BMW Série 5 2019', brand: 'BMW', model: 'Série 5', year: 2019, km: 62000, fuel: 'diesel', transmission: 'automatique', type: 'berline', price: 25000000, monthly_price: 830000, badge: 'promo', description: "La BMW Série 5 2019 représente le parfait équilibre entre performance et confort. Dotée d'un moteur diesel économique et d'une transmission automatique fluide, elle offre des sensations de conduite incomparables.", photos: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=85'], is_available: true, created_at: '' },
  { id: 3, name: 'Audi A6 2020', brand: 'Audi', model: 'A6', year: 2020, km: 55000, fuel: 'diesel', transmission: 'automatique', type: 'berline', price: 27000000, monthly_price: 900000, badge: null, description: "L'Audi A6 2020 redéfinit les standards de la berline premium. Son design avant-gardiste, ses technologies embarquées et son confort de conduite en font un choix d'exception.", photos: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85'], is_available: true, created_at: '' },
  { id: 4, name: 'BMW X5 2021', brand: 'BMW', model: 'X5', year: 2021, km: 38000, fuel: 'diesel', transmission: 'automatique', type: 'suv', price: 38000000, monthly_price: 1260000, badge: 'arrivage', description: "Le BMW X5 2021, l'expression ultime du SUV premium. Puissance, technologie et polyvalence réunies dans un seul véhicule d'exception.", photos: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=85'], is_available: true, created_at: '' },
  { id: 5, name: 'Mercedes GLE 2020', brand: 'Mercedes', model: 'GLE', year: 2020, km: 45000, fuel: 'essence', transmission: 'automatique', type: 'suv', price: 42000000, monthly_price: 1400000, badge: null, description: "Le Mercedes GLE 2020 combine le confort d'un grand SUV avec la sophistication emblématique de Mercedes-Benz.", photos: ['https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1200&q=85'], is_available: true, created_at: '' },
  { id: 6, name: 'Audi Q7 2021', brand: 'Audi', model: 'Q7', year: 2021, km: 32000, fuel: 'diesel', transmission: 'automatique', type: 'suv', price: 45000000, monthly_price: 1500000, badge: 'top_vente', description: "L'Audi Q7 2021, le SUV familial par excellence. Espace, luxe et performance au rendez-vous.", photos: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&q=85'], is_available: true, created_at: '' },
]

const specs = (v: Vehicle) => [
  { label: 'Année', value: v.year.toString() },
  { label: 'Kilométrage', value: `${v.km.toLocaleString('fr-FR')} km` },
  { label: 'Carburant', value: v.fuel.charAt(0).toUpperCase() + v.fuel.slice(1) },
  { label: 'Transmission', value: v.transmission.charAt(0).toUpperCase() + v.transmission.slice(1) },
  { label: 'Type', value: v.type.toUpperCase() },
  { label: 'Marque', value: v.brand },
]

export default async function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const vehicle = allVehicles.find(v => v.id === Number(id))

  if (!vehicle) {
    return (
      <main style={{ background: '#08111F', minHeight: '100vh' }}>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="text-white text-2xl font-light mb-4">Véhicule introuvable</div>
            <Link href="/vehicles" className="text-xs uppercase tracking-widest" style={{ color: '#C08A45' }}>
              ← Retour à l'inventaire
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main style={{ background: '#08111F', minHeight: '100vh' }}>
      <Navbar />

      <div className="pt-28 md:pt-36 px-4 md:px-12 pb-12 md:pb-20">

        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-10 text-xs uppercase tracking-widest"
          style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '2px' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.25)' }}>Accueil</Link>
          <span>/</span>
          <Link href="/vehicles" style={{ color: 'rgba(255,255,255,0.25)' }}>Véhicules</Link>
          <span>/</span>
          <span style={{ color: '#C08A45' }}>{vehicle.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          {/* Photos */}
          <div>
            <div className="relative overflow-hidden mb-3" className="relative overflow-hidden mb-3" style={{ height: '260px', background: '#1A2535' }}>
              {vehicle.photos[0] && (
                <Image src={vehicle.photos[0]} alt={vehicle.name} fill className="object-cover" />
              )}
              {vehicle.badge && (
                <span className="absolute top-5 left-5 text-xs px-3 py-1 uppercase tracking-widest"
                  style={{ background: '#C08A45', color: '#fff', letterSpacing: '1px' }}>
                  {vehicle.badge}
                </span>
              )}
            </div>
            {vehicle.photos.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {vehicle.photos.slice(1).map((photo, i) => (
                  <div key={i} className="relative overflow-hidden" style={{ height: '100px', background: '#1A2535' }}>
                    <Image src={photo} alt={`${vehicle.name} ${i + 2}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Infos */}
          <div>
            <div className="text-xs mb-3 uppercase tracking-widest" style={{ color: '#C08A45', letterSpacing: '3px' }}>
              {vehicle.brand}
            </div>
            <h1 className="text-4xl font-light text-white mb-2" style={{ letterSpacing: '-0.5px' }}>
              {vehicle.name}
            </h1>
            <div className="flex items-baseline gap-3 mb-8 pb-8"
              style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '32px', fontWeight: 200, color: '#C08A45', letterSpacing: '-0.5px' }}>
                {vehicle.price.toLocaleString('fr-FR')} FCFA
              </span>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-3 gap-px mb-8" style={{ background: 'rgba(255,255,255,0.04)' }}>
              {specs(vehicle).map((spec, i) => (
                <div key={i} className="px-4 py-4" style={{ background: '#08111F' }}>
                  <div className="text-xs mb-1 uppercase tracking-widest"
                    style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '1px' }}>
                    {spec.label}
                  </div>
                  <div className="text-sm text-white font-light">{spec.value}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            {vehicle.description && (
              <p className="text-sm leading-7 mb-8 font-light" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {vehicle.description}
              </p>
            )}

            {/* Financement */}
            <div className="p-5 mb-6" style={{ background: '#0D1A2D', border: '0.5px solid rgba(255,255,255,0.06)' }}>
              <div className="text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '2px' }}>
                Financement estimé
              </div>
              <div style={{ fontSize: '24px', fontWeight: 200, color: '#C08A45' }}>
                {vehicle.monthly_price?.toLocaleString('fr-FR')} FCFA
                <span className="text-sm ml-2" style={{ color: 'rgba(255,255,255,0.3)' }}>/ mois</span>
              </div>
              <div className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.2)' }}>
                Pré-approbation en 10 minutes
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3">
              <Link href="/financing"
                className="flex-1 text-center text-white text-xs uppercase tracking-widest py-4"
                style={{ background: '#C08A45', letterSpacing: '2px' }}>
                Demander un financement
              </Link>
              <Link href="/contact"
                className="flex-1 text-center text-xs uppercase tracking-widest py-4"
                style={{ border: '0.5px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', letterSpacing: '2px' }}>
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
