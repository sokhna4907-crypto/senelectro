import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const vehicles = await query('SELECT * FROM vehicles WHERE id = $1', [id])
  if (!vehicles.length) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
  return NextResponse.json({ data: vehicles[0] })
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = requireAuth(req)
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const { name, brand, model, year, km, fuel, transmission, type, price, monthly_price, badge, description, photos, is_available } = body
  const result = await query(
    `UPDATE vehicles SET name=$1, brand=$2, model=$3, year=$4, km=$5, fuel=$6,
     transmission=$7, type=$8, price=$9, monthly_price=$10, badge=$11,
     description=$12, photos=$13, is_available=$14 WHERE id=$15 RETURNING *`,
    [name, brand, model, year, km, fuel, transmission, type, price, monthly_price, badge, description, JSON.stringify(photos), is_available, id]
  )
  return NextResponse.json({ data: result[0] })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = requireAuth(req)
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id } = await params
  await query('DELETE FROM vehicles WHERE id = $1', [id])
  return NextResponse.json({ message: 'Supprimé' })
}
