import Link from 'next/link'
import Image from 'next/image'
import { Appliance } from '@/types'

interface Props { appliance: Appliance }

export default function ElecCard({ appliance }: Props) {
  const photo = appliance.photos?.[0]
  const stockColor = appliance.stock_count <= 3 ? '#E24B4A' : '#3B6D11'
  const stockBg = appliance.stock_count <= 3 ? '#FDEAEA' : '#EAF3DE'

  return (
    <Link href={`/appliances/${appliance.id}`}
      className="block group cursor-pointer"
      style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.07)' }}>

      <div className="relative overflow-hidden flex items-center justify-center"
        style={{ height: '130px', background: '#F0EDE7' }}>
        {photo ? (
          <Image src={photo} alt={appliance.name} fill
            className="object-contain p-4 transition-transform duration-400 group-hover:scale-105" />
        ) : (
          <div className="text-5xl" style={{ color: 'rgba(192,138,69,0.3)' }}>📦</div>
        )}
        <span className="absolute top-2 right-2 text-xs px-2 py-1"
          style={{ background: stockBg, color: stockColor, fontSize: '9px', letterSpacing: '1px' }}>
          {appliance.stock_count} restants
        </span>
      </div>

      <div className="p-3">
        <div className="text-sm font-medium mb-1" style={{ color: '#08111F' }}>{appliance.name}</div>
        <div className="text-xs mb-2 uppercase tracking-wider" style={{ color: '#bbb' }}>{appliance.brand}</div>
        <div style={{ fontSize: '15px', fontWeight: 300, color: '#C08A45' }}>
          {appliance.price.toLocaleString('fr-FR')} FCFA
        </div>
      </div>
    </Link>
  )
}
