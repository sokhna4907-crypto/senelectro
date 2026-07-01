import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

// POST — soumettre une demande (public)
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { full_name, phone, budget_monthly, product_type, product_id } = body

  if (!full_name || !phone || !budget_monthly) {
    return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
  }

  const result = await query(
    `INSERT INTO financing_requests (full_name, phone, budget_monthly, product_type, product_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [full_name, phone, budget_monthly, product_type, product_id]
  )

  return NextResponse.json({ data: result[0] }, { status: 201 })
}

// GET — liste des demandes (admin uniquement)
export async function GET(req: NextRequest) {
  const user = requireAuth(req)
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const requests = await query(
    `SELECT * FROM financing_requests ORDER BY created_at DESC`
  )

  return NextResponse.json({ data: requests })
}
