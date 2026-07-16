import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const messages = await query('SELECT * FROM contact_messages ORDER BY created_at DESC')
    return NextResponse.json({ data: messages })
  } catch {
    return NextResponse.json({ data: [] })
  }
}

export async function POST(req: NextRequest) {
  const { full_name, phone, email, message } = await req.json()
  if (!full_name || !phone || !message) {
    return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
  }

  // Sauvegarder en base
  const result = await query(
    'INSERT INTO contact_messages (full_name, phone, email, message) VALUES ($1,$2,$3,$4) RETURNING *',
    [full_name, phone, email || null, message]
  )

  // Envoyer notification email
  try {
    if (process.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'SenElectro <noreply@senelectro.com>',
          to: ['info@senelectro.com'],
          subject: `📩 Nouveau message de ${full_name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: #08111F; padding: 20px; text-align: center; margin-bottom: 20px;">
                <h1 style="color: #fff; font-weight: 300; letter-spacing: 3px; margin: 0;">
                  Sen<span style="color: #C08A45;">Electro</span>
                </h1>
              </div>
              <div style="background: #f9f9f9; padding: 30px; border-left: 4px solid #C08A45;">
                <h2 style="color: #08111F; font-weight: 400; margin-top: 0;">Nouveau message reçu</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #888; width: 120px;">Nom</td><td style="padding: 8px 0; color: #333; font-weight: 500;">${full_name}</td></tr>
                  <tr><td style="padding: 8px 0; color: #888;">Téléphone</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #C08A45;">${phone}</a></td></tr>
                  ${email ? `<tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #C08A45;">${email}</a></td></tr>` : ''}
                  <tr><td style="padding: 8px 0; color: #888; vertical-align: top;">Message</td><td style="padding: 8px 0; color: #333;">${message}</td></tr>
                </table>
              </div>
              <div style="text-align: center; margin-top: 20px;">
                <a href="https://senelectro.com/admin/messages" style="background: #C08A45; color: #fff; padding: 12px 24px; text-decoration: none; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">
                  Voir dans l'admin
                </a>
              </div>
              <p style="color: #bbb; font-size: 11px; text-align: center; margin-top: 20px;">
                SenElectro · 676 lotissement Serigne Mbacké, Madina Touba
              </p>
            </div>
          `,
        }),
      })
    }
  } catch (e) {
    console.error('Erreur email:', e)
  }

  return NextResponse.json({ data: result[0] }, { status: 201 })
}
