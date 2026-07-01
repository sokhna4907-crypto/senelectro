import Link from 'next/link'
import Image from 'next/image'
import { Vehicle } from '@/types'

interface Props { vehicle: Vehicle }

const badgeStyles: Record<string, string> = {
  nouveau: 'background:#08111F;color:#fff',
  promo: 'background:transparent;border:0.5px solid #C08A45;color:#C08A45',
  arrivage: 'background:#08111F;color:#fff',
  top_vente: 'background:#C08A45;color:#fff',
}

export default function CarCard({ vehicle }: Props) {
  const photo = vehicle.photos?.[0]

  return (
    <Link href={`/vehicles/${vehicle.id}`}
      className="block group cursor-pointer"
      style={{ background: '#08111F' }}>

      {/* Photo */}
      <div className="relative overflow-hidden" style={{ height: '200px', background: '#1A2535' }}>
        {photo ? (
          <Image src={photo} alt={vehicle.name} fill
            className="object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl"
            style={{ color: 'rgba(255,255,255,0.08)' }}>🚗</div>
        )}
        {vehicle.badge && (
          <span className="absolute top-4 left-4 text-xs px-3 py-1"
            style={{ fontSize: '9px', letterSpacing: '1px', ...(Object.fromEntries((badgeStyles[vehicle.badge] || '').split(';').filter(Boolean).map(s => {const [k,v]=s.split(':');return [k.trim().replace(/-([a-z])/g,(_,l)=>l.toUpperCase()),v?.trim()]}))) }}>
            {vehicle.badge.toUpperCase()}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="text-white text-sm mb-2" style={{ fontWeight: 300, letterSpacing: '0.5px' }}>
          {vehicle.name}
        </div>
        <div className="flex gap-4 mb-5 text-xs uppercase tracking-wider"
          style={{ color: 'rgba(255,255,255,0.3)' }}>
          <span>{vehicle.km.toLocaleString()} km</span>
          <span>{vehicle.fuel}</span>
          <span>{vehicle.transmission}</span>
        </div>
        <div className="flex items-end justify-between pt-4"
          style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 200, color: '#C08A45', letterSpacing: '-0.3px' }}>
              {vehicle.price.toLocaleString('fr-FR')} FCFA
            </div>
            {vehicle.monthly_price && (
              <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '1px' }}>
                ou {vehicle.monthly_price.toLocaleString('fr-FR')} / mois
              </div>
            )}
          </div>
          <span className="text-xs uppercase tracking-widest flex items-center gap-1"
            style={{ color: 'rgba(255,255,255,0.3)' }}>
            Voir →
          </span>
        </div>
      </div>
    </Link>
  )
}
