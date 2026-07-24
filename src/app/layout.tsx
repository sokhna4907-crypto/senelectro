import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SenElectro — Véhicules & Électroménager à Dakar',
  description: 'Plateforme de vente de voitures d\'occasion et d\'électroménager au Sénégal. Prix transparents, financement rapide.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
