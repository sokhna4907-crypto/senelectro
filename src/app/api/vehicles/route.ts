import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

// GET /api/vehicles — liste avec filtres
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const brand = searchParams.get('brand')
  const type = searchParams.get('type')
  const max_price = searchParams.get('max_price')
  const fuel = searchParams.get('fuel')

  let sql = `SELECT * FROM vehicles WHERE is_available = true`
  const params: any[] = []
  let i = 1

  if (brand) { sql += ` AND brand ILIKE $${i++}`; params.push(`%${brand}%`) }
  if (type) { sql += ` AND type = $${i++}`; params.push(type) }
  if (max_price) { sql += ` AND price <= $${i++}`; params.push(Number(max_price)) }
  if (fuel) { sql += ` AND fuel = $${i++}`; params.push(fuel) }

  sql += ` ORDER BY created_at DESC`

  const vehicles = await query(sql, params)
  return NextResponse.json({ data: vehicles })
}

// POST /api/vehicles — créer (admin)
export async function POST(req: NextRequest) {

  const body = await req.json()
  const { name, brand, model, year, km, fuel, transmission, type, price, monthly_price, badge, description, photos } = body

  const result = await query(
    `INSERT INTO vehicles (name, brand, model, year, km, fuel, transmission, type, price, monthly_price, badge, description, photos)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
    [name, brand, model, year, km, fuel, transmission, type, price, monthly_price, badge, description, JSON.stringify(photos)]
  )

  return NextResponse.json({ data: result[0] }, { status: 201 })
}
