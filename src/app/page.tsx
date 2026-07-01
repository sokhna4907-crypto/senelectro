import Navbar from '@/components/Navbar'
import HeroSlider from '@/components/HeroSlider'
import Footer from '@/components/Footer'
import CarCard from '@/components/CarCard'
import ElecCard from '@/components/ElecCard'
import { Vehicle, Appliance } from '@/types'

// Données mock — seront remplacées par les vraies API
const mockVehicles: Vehicle[] = [
  { id: 1, name: 'Mercedes C-Class 2020', brand: 'Mercedes', model: 'C-Class', year: 2020, km: 48000, fuel: 'essence', transmission: 'automatique', type: 'berline', price: 22000000, monthly_price: 730000, badge: 'nouveau', photos: ['https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&q=80'], is_available: true, created_at: '' },
  { id: 2, name: 'BMW Serie 5 2019', brand: 'BMW', model: 'Serie 5', year: 2019, km: 62000, fuel: 'diesel', transmission: 'automatique', type: 'berline', price: 25000000, monthly_price: 830000, badge: 'promo', photos: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80'], is_available: true, created_at: '' },
  { id: 3, name: 'Audi A6 2020', brand: 'Audi', model: 'A6', year: 2020, km: 55000, fuel: 'diesel', transmission: 'automatique', type: 'berline', price: 27000000, monthly_price: 900000, badge: null, photos: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80'], is_available: true, created_at: '' },
  { id: 4, name: 'BMW X5 2021', brand: 'BMW', model: 'X5', year: 2021, km: 38000, fuel: 'diesel', transmission: 'automatique', type: 'suv', price: 38000000, monthly_price: 1260000, badge: 'arrivage', photos: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80'], is_available: true, created_at: '' },
  { id: 5, name: 'Mercedes GLE 2020', brand: 'Mercedes', model: 'GLE', year: 2020, km: 45000, fuel: 'essence', transmission: 'automatique', type: 'suv', price: 42000000, monthly_price: 1400000, badge: null, photos: ['https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&q=80'], is_available: true, created_at: '' },
  { id: 6, name: 'Audi Q7 2021', brand: 'Audi', model: 'Q7', year: 2021, km: 32000, fuel: 'diesel', transmission: 'automatique', type: 'suv', price: 45000000, monthly_price: 1500000, badge: 'top_vente', photos: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&q=80'], is_available: true, created_at: '' },
]

const mockAppliances: Appliance[] = [
  { id: 1, name: 'Télévision 55" 4K', brand: 'Samsung', category: 'television', price: 350000, stock_count: 3, photos: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&q=75'], is_available: true, created_at: '' },
  { id: 2, name: 'Réfrigérateur 300 L', brand: 'Whirlpool', category: 'refrigerateur', price: 280000, stock_count: 2, photos: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=75'], is_available: true, created_at: '' },
  { id: 3, name: 'Climatiseur 1.5 CV', brand: 'Daikin', category: 'climatiseur', price: 220000, stock_count: 8, photos: [], is_available: true, created_at: '' },
  { id: 4, name: 'Lave-linge 7 kg', brand: 'LG', category: 'lave-linge', price: 195000, stock_count: 5, photos: [], is_available: true, created_at: '' },
  { id: 5, name: 'Four micro-ondes', brand: 'Bosch', category: 'micro-ondes', price: 85000, stock_count: 10, photos: [], is_available: true, created_at: '' },
  { id: 6, name: 'Home Cinéma 5.1', brand: 'Sony', category: 'audio', price: 145000, stock_count: 4, photos: [], is_available: true, created_at: '' },
]

const brands = ['Mercedes', 'BMW', 'Audi', 'Porsche', 'Volkswagen', 'Volvo', 'Lexus', 'Land Rover']

export default function HomePage() {
  return (
    <main style={{ background: '#08111F' }}>
      <Navbar />

      {/* Hero */}
      <div className="pt-28">
        <HeroSlider />
      </div>

      {/* Marques */}
      <div className="px-12 py-8 flex items-center gap-0"
        style={{ borderBottom: '0.5px solid rgba(255,255,255,0.04)' }}>
        <span className="text-xs mr-12 whitespace-nowrap"
          style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '3px', textTransform: 'uppercase' }}>
          Nos marques
        </span>
        <div className="flex flex-1">
          {brands.map((brand, i) => (
            <div key={brand} className="flex-1 text-center py-2 text-xs uppercase tracking-widest cursor-pointer transition-colors"
              style={{
                color: 'rgba(255,255,255,0.22)',
                borderRight: i < brands.length - 1 ? '0.5px solid rgba(255,255,255,0.04)' : 'none',
                letterSpacing: '2px'
              }}>
              {brand}
            </div>
          ))}
        </div>
      </div>

      {/* Section Véhicules */}
      <section className="px-12 py-20">
        <div className="flex items-end justify-between mb-14">
          <div>
            <div className="text-xs mb-4 uppercase tracking-widest" style={{ color: '#C08A45', letterSpacing: '3px' }}>
              Inventaire
            </div>
            <h2 className="text-4xl font-light" style={{ color: '#fff', letterSpacing: '-0.5px' }}>
              Véhicules en stock
            </h2>
          </div>
          <a href="/vehicles" className="text-xs uppercase tracking-widest flex items-center gap-2 pb-1"
            style={{ color: '#C08A45', borderBottom: '0.5px solid rgba(192,138,69,0.3)', letterSpacing: '2px' }}>
            Tout voir →
          </a>
        </div>
        <div className="grid grid-cols-3 gap-px" style={{ background: '#1A2535' }}>
          {mockVehicles.map(v => <CarCard key={v.id} vehicle={v} />)}
        </div>
      </section>

      {/* Split Financement */}
      <div className="grid grid-cols-2">
        <div className="h-96 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1000&q=80')" }} />
        <div className="flex flex-col justify-center px-16 py-16" style={{ background: '#0D1A2D' }}>
          <div className="text-xs mb-5 uppercase tracking-widest" style={{ color: '#C08A45', letterSpacing: '3px' }}>
            Financement
          </div>
          <h2 className="text-3xl font-light mb-6" style={{ color: '#fff', lineHeight: 1.3 }}>
            Votre véhicule,<br />votre budget
          </h2>
          <p className="text-sm mb-8 font-light leading-7" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Obtenez une réponse rapide et un plan de financement adapté à votre situation.
          </p>
          <div className="flex flex-col gap-5 mb-10">
            {['Remplissez le formulaire — 2 minutes', 'Accord de principe sous 10 min', 'Récupérez votre véhicule dès le lendemain'].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-xs mt-1" style={{ color: '#C08A45', letterSpacing: '1px', minWidth: '20px' }}>
                  0{i + 1}
                </span>
                <span className="text-sm font-light" style={{ color: 'rgba(255,255,255,0.55)' }}>{step}</span>
              </div>
            ))}
          </div>
          <a href="/financing"
            className="text-white text-xs tracking-widest uppercase px-8 py-4 self-start"
            style={{ background: '#C08A45', letterSpacing: '2px' }}>
            Faire une demande
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4" style={{ background: '#C08A45' }}>
        {[
          { num: '340+', label: 'Véhicules en stock' },
          { num: '1 200+', label: 'Clients satisfaits' },
          { num: '10 min', label: 'Délai financement' },
          { num: '100%', label: 'Véhicules inspectés' },
        ].map((stat, i) => (
          <div key={i} className="text-center py-10 px-4"
            style={{ borderRight: i < 3 ? '0.5px solid rgba(255,255,255,0.2)' : 'none' }}>
            <div className="text-4xl font-light text-white mb-2" style={{ letterSpacing: '-1px' }}>{stat.num}</div>
            <div className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.65)', letterSpacing: '2px' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Section Électroménager */}
      <section className="px-12 py-20" style={{ background: '#F5F3EF' }}>
        <div className="flex items-end justify-between mb-6 pb-8"
          style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
          <div>
            <div className="text-xs mb-4 uppercase tracking-widest" style={{ color: '#C08A45', letterSpacing: '3px' }}>
              Déstockage
            </div>
            <h2 className="text-4xl font-light" style={{ color: '#08111F', letterSpacing: '-0.5px' }}>
              Électroménager
            </h2>
          </div>
          <p className="text-sm max-w-xs leading-7" style={{ color: '#888' }}>
            Liquidation avant renouvellement. Stock limité — premier arrivé, premier servi.
          </p>
        </div>
        <div className="grid grid-cols-6 gap-5">
          {mockAppliances.map(a => <ElecCard key={a.id} appliance={a} />)}
        </div>
      </section>

      <Footer />
    </main>
  )
}
