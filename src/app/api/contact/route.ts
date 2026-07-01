import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { full_name, phone, email, message } = body

  if (!full_name || !phone || !message) {
    return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
  }

  const result = await query(
    `INSERT INTO contact_messages (full_name, phone, email, message)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [full_name, phone, email, message]
  )

  return NextResponse.json({ data: result[0] }, { status: 201 })
}

export async function GET(req: NextRequest) {
  const user = requireAuth(req)
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const messages = await query(
    `SELECT * FROM contact_messages ORDER BY created_at DESC`
  )

  return NextResponse.json({ data: messages })
}
