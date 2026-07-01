import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const brand = searchParams.get('brand')

  let sql = `SELECT * FROM appliances WHERE is_available = true AND stock_count > 0`
  const params: any[] = []
  let i = 1

  if (category) { sql += ` AND category = $${i++}`; params.push(category) }
  if (brand) { sql += ` AND brand ILIKE $${i++}`; params.push(`%${brand}%`) }

  sql += ` ORDER BY created_at DESC`

  const appliances = await query(sql, params)
  return NextResponse.json({ data: appliances })
}

export async function POST(req: NextRequest) {
  const user = requireAuth(req)
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const body = await req.json()
  const { name, brand, category, price, stock_count, description, photos } = body

  const result = await query(
    `INSERT INTO appliances (name, brand, category, price, stock_count, description, photos)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [name, brand, category, price, stock_count, description, JSON.stringify(photos)]
  )

  return NextResponse.json({ data: result[0] }, { status: 201 })
}
