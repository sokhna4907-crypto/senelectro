import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { query } from '@/lib/db'
import { Appliance } from '@/types'

async function getAppliance(id: string): Promise<Appliance | null> {
  try {
    const rows = await query('SELECT * FROM appliances WHERE id = $1', [id])
    return rows[0] || null
  } catch {
    return null
  }
}

export default async function ApplianceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const appliance = await getAppliance(id)

  if (!appliance) {
    return (
      <main style={{ background: '#08111F', minHeight: '100vh' }}>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="text-white text-2xl font-light mb-4">Appareil introuvable</div>
            <Link href="/appliances" className="text-xs uppercase tracking-widest" style={{ color: '#C08A45' }}>
              ← Retour
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const photos = Array.isArray(appliance.photos) ? appliance.photos : []
  const stockColor = appliance.stock_count <= 3 ? '#E24B4A' : '#3B6D11'
  const stockBg = appliance.stock_count <= 3 ? '#FDEAEA' : '#EAF3DE'

  return (
    <main style={{ background: '#08111F', minHeight: '100vh' }}>
      <Navbar />

      <div className="pt-28 md:pt-36 px-4 md:px-12 pb-12 md:pb-20">

        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-10 text-xs uppercase tracking-widest"
          style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '2px' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.25)' }}>Accueil</Link>
          <span>/</span>
          <Link href="/appliances" style={{ color: 'rgba(255,255,255,0.25)' }}>Électroménager</Link>
          <span>/</span>
          <span style={{ color: '#C08A45' }}>{appliance.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          {/* Photos */}
          <div>
            <div className="relative overflow-hidden mb-3 flex items-center justify-center"
              style={{ height: '320px', background: '#F0EDE7', borderRadius: '8px' }}>
              {photos[0] ? (
                <Image src={photos[0]} alt={appliance.name} fill className="object-contain p-8" />
              ) : (
                <div className="text-6xl" style={{ color: 'rgba(192,138,69,0.3)' }}>📦</div>
              )}
            </div>
            {photos.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {photos.slice(1).map((photo: string, i: number) => (
                  <div key={i} className="relative overflow-hidden" style={{ height: '80px', background: '#F0EDE7', borderRadius: '4px' }}>
                    <Image src={photo} alt={`${appliance.name} ${i + 2}`} fill className="object-contain p-2" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Infos */}
          <div>
            <div className="text-xs mb-3 uppercase tracking-widest" style={{ color: '#C08A45', letterSpacing: '3px' }}>
              {appliance.brand}
            </div>
            <h1 className="text-3xl md:text-4xl font-light text-white mb-6" style={{ letterSpacing: '-0.5px' }}>
              {appliance.name}
            </h1>

            <div className="flex items-baseline gap-3 mb-6 pb-6"
              style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '32px', fontWeight: 200, color: '#C08A45' }}>
                {appliance.price?.toLocaleString('fr-FR')} FCFA
              </span>
            </div>

            {/* Stock */}
            <div className="inline-block px-3 py-1 mb-6 text-sm"
              style={{ background: stockBg, color: stockColor, borderRadius: '4px' }}>
              {appliance.stock_count <= 0 ? '❌ Rupture de stock'
                : appliance.stock_count <= 3 ? `⚠️ Plus que ${appliance.stock_count} en stock !`
                : `✅ ${appliance.stock_count} en stock`}
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-px mb-8" style={{ background: 'rgba(255,255,255,0.04)' }}>
              {[
                { label: 'Marque', value: appliance.brand },
                { label: 'Catégorie', value: appliance.category },
                { label: 'Stock', value: `${appliance.stock_count} unités` },
              ].map((spec, i) => (
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
            {appliance.description && (
              <p className="text-sm leading-7 mb-8 font-light" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {appliance.description}
              </p>
            )}

            {/* CTAs */}
            <div className="flex gap-3">
              <Link href="/contact"
                className="flex-1 text-center text-white text-xs uppercase tracking-widest py-4"
                style={{ background: '#C08A45', letterSpacing: '2px' }}>
                Commander / Renseignement
              </Link>
              <a href="tel:+221766886161"
                className="flex-1 text-center text-xs uppercase tracking-widest py-4"
                style={{ border: '0.5px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', letterSpacing: '2px' }}>
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
