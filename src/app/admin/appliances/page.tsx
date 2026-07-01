'use client'
import Link from 'next/link'

const appliances = [
  { id: 1, name: 'Télévision 55" 4K', brand: 'Samsung', category: 'Télévision', price: '350 000', stock: 3 },
  { id: 2, name: 'Réfrigérateur 300 L', brand: 'Whirlpool', category: 'Réfrigérateur', price: '280 000', stock: 2 },
  { id: 3, name: 'Climatiseur 1.5 CV', brand: 'Daikin', category: 'Climatiseur', price: '220 000', stock: 8 },
  { id: 4, name: 'Lave-linge 7 kg', brand: 'LG', category: 'Lave-linge', price: '195 000', stock: 5 },
  { id: 5, name: 'Four micro-ondes', brand: 'Bosch', category: 'Micro-ondes', price: '85 000', stock: 10 },
  { id: 6, name: 'Home Cinéma 5.1', brand: 'Sony', category: 'Audio', price: '145 000', stock: 4 },
]

export default function AdminAppliances() {
  return (
    <div className="flex min-h-screen" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
      <aside className="w-56 flex-shrink-0" style={{ background: '#08111F' }}>
        <div className="px-5 py-5" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div className="text-base font-light tracking-widest uppercase" style={{ color: '#fff' }}>
            Sen<span style={{ color: '#C08A45' }}>Electro</span>
          </div>
          <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Administration</div>
        </div>
        <nav className="py-4">
          {[
            { label: 'Tableau de bord', href: '/admin', icon: '▦' },
            { label: 'Véhicules', href: '/admin/vehicles', icon: '🚗' },
            { label: 'Électroménager', href: '/admin/appliances', icon: '📦', active: true },
          ].map(item => (
            <Link key={item.label} href={item.href}
              className="flex items-center gap-3 px-5 py-3 text-sm"
              style={{
                color: item.active ? '#fff' : 'rgba(255,255,255,0.4)',
                background: item.active ? 'rgba(192,138,69,0.1)' : 'transparent',
                borderLeft: item.active ? '2px solid #C08A45' : '2px solid transparent',
              }}>
              <span>{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-5 py-4" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
          <Link href="/" className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>← Voir le site</Link>
        </div>
      </aside>

      <main className="flex-1" style={{ background: '#F4F5F7' }}>
        <div className="flex items-center justify-between px-8 h-14 bg-white"
          style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
          <div className="text-sm font-medium" style={{ color: '#08111F' }}>Électroménager</div>
          <Link href="/admin/appliances/new"
            className="text-white text-xs uppercase tracking-widest px-4 py-2"
            style={{ background: '#C08A45', letterSpacing: '1px' }}>
            + Ajouter
          </Link>
        </div>

        <div className="p-8">
          <div className="bg-white rounded" style={{ border: '0.5px solid rgba(0,0,0,0.07)' }}>
            <table className="w-full">
              <thead>
                <tr style={{ background: '#FAFAFA', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
                  {['Appareil', 'Marque', 'Catégorie', 'Prix (FCFA)', 'Stock restant', 'Actions'].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-xs uppercase font-normal"
                      style={{ color: '#aaa', letterSpacing: '1px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {appliances.map((a, i) => (
                  <tr key={i} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.05)' }}>
                    <td className="px-6 py-4 text-sm font-medium" style={{ color: '#08111F' }}>{a.name}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#888' }}>{a.brand}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#888' }}>{a.category}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#C08A45' }}>{a.price}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1"
                        style={{
                          background: a.stock <= 3 ? '#FDEAEA' : '#EAF3DE',
                          color: a.stock <= 3 ? '#E24B4A' : '#3B6D11',
                          fontSize: '9px'
                        }}>
                        {a.stock} restants
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-xs px-3 py-1.5" style={{ border: '0.5px solid rgba(0,0,0,0.1)', color: '#666' }}>✏️ Modifier</button>
                        <button className="text-xs px-3 py-1.5" style={{ border: '0.5px solid rgba(226,75,74,0.2)', color: '#E24B4A' }}>🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
