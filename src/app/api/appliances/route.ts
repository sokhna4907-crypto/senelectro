import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const appliances = await query('SELECT * FROM appliances WHERE is_available = true ORDER BY created_at DESC')
    return NextResponse.json({ data: appliances })
  } catch { return NextResponse.json({ data: [] }) }
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, brand, category, price, stock_count, description, photos, is_available } = body
  const result = await query(
    'INSERT INTO appliances (name, brand, category, price, stock_count, description, photos, is_available) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
    [name, brand, category || 'autre', price, stock_count || 0, description || '', JSON.stringify(photos || []), is_available !== false]
  )
  return NextResponse.json({ data: result[0] }, { status: 201 })
}
