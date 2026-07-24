import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const vehicles = await query('SELECT * FROM vehicles WHERE is_available = true ORDER BY created_at DESC')
    return NextResponse.json({ data: vehicles })
  } catch { return NextResponse.json({ data: [] }) }
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, brand, model, year, km, fuel, transmission, type, price, monthly_price, badge, description, photos, is_available } = body
  const result = await query(
    'INSERT INTO vehicles (name, brand, model, year, km, fuel, transmission, type, price, monthly_price, badge, description, photos, is_available) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *',
    [name, brand, model, year, km, fuel, transmission, type, price, monthly_price || 0, badge || null, description || '', JSON.stringify(photos || []), is_available !== false]
  )
  return NextResponse.json({ data: result[0] }, { status: 201 })
}
