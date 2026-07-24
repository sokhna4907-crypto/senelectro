import Link from 'next/link'
import Image from 'next/image'
import { Vehicle } from '@/types'

const badgeLabels: Record<string, string> = {
  nouveau: 'NOUVEAU', promo: 'PROMO', arrivage: 'ARRIVAGE', top_vente: 'TOP VENTE'
}

export default function CarCard({ vehicle }: { vehicle: Vehicle }) {
  const photos = Array.isArray(vehicle.photos) ? vehicle.photos : []

  return (
    <Link href={`/vehicles/${vehicle.id}`} className="block group" style={{ background: '#fff', border: '0.5px solid #E0E0E0' }}>
      <div className="relative overflow-hidden" style={{ height: '200px', background: '#F5F5F5' }}>
        {photos[0] ? (
          <Image src={photos[0]} alt={vehicle.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl" style={{ color: '#D5D5D5' }}>🚗</div>
        )}
        {vehicle.badge && (
          <span className="absolute top-3 left-3 text-xs px-3 py-1 uppercase tracking-widest"
            style={{ background: '#C08A45', color: '#fff', fontSize: '9px', letterSpacing: '1px' }}>
            {badgeLabels[vehicle.badge] || vehicle.badge}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="text-xs mb-1 uppercase tracking-widest" style={{ color: '#999', letterSpacing: '2px' }}>{vehicle.brand}</div>
        <div className="text-base font-medium mb-3" style={{ color: '#08111F' }}>{vehicle.name}</div>
        <div className="flex items-center gap-4 mb-4 text-xs" style={{ color: '#999' }}>
          <span>{vehicle.year}</span>
          <span>·</span>
          <span>{vehicle.km?.toLocaleString('fr-FR')} km</span>
          <span>·</span>
          <span style={{ textTransform: 'capitalize' }}>{vehicle.fuel}</span>
        </div>
        <div className="flex items-center justify-between pt-4" style={{ borderTop: '0.5px solid #E8E8E8' }}>
          <span className="text-lg font-light" style={{ color: '#C08A45' }}>
            {vehicle.price?.toLocaleString('fr-FR')} <span className="text-xs" style={{ color: '#999' }}>FCFA</span>
          </span>
          <span className="text-xs uppercase tracking-widest" style={{ color: '#C08A45', letterSpacing: '1px' }}>Voir →</span>
        </div>
      </div>
    </Link>
  )
}
