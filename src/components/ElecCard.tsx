import Link from 'next/link'
import Image from 'next/image'
import { Appliance } from '@/types'

export default function ElecCard({ appliance }: { appliance: Appliance }) {
  const photos = Array.isArray(appliance.photos) ? appliance.photos : []

  return (
    <Link href={`/appliances/${appliance.id}`} className="block group" style={{ background: '#fff', border: '0.5px solid #E0E0E0' }}>
      <div className="relative overflow-hidden flex items-center justify-center" style={{ height: '140px', background: '#F8F8F8' }}>
        {photos[0] ? (
          <Image src={photos[0]} alt={appliance.name} fill className="object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="text-4xl" style={{ color: '#D5D5D5' }}>📦</div>
        )}
        {appliance.stock_count <= 3 && appliance.stock_count > 0 && (
          <span className="absolute top-2 right-2 text-xs px-2 py-0.5" style={{ background: '#FAEEDA', color: '#854F0B', fontSize: '9px' }}>
            Plus que {appliance.stock_count}
          </span>
        )}
      </div>
      <div className="p-3">
        <div className="text-xs mb-1" style={{ color: '#999' }}>{appliance.brand}</div>
        <div className="text-sm font-medium mb-2 leading-tight" style={{ color: '#08111F' }}>{appliance.name}</div>
        <div className="text-sm font-light" style={{ color: '#C08A45' }}>
          {appliance.price?.toLocaleString('fr-FR')} <span className="text-xs" style={{ color: '#999' }}>FCFA</span>
        </div>
      </div>
    </Link>
  )
}
