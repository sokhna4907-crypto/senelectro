import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const rows = await query('SELECT * FROM appliances WHERE id = $1', [id])
  if (!rows.length) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
  return NextResponse.json({ data: rows[0] })
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const { name, brand, category, price, stock_count, description, photos, is_available } = body
  const result = await query(
    `UPDATE appliances SET name=$1, brand=$2, category=$3, price=$4,
     stock_count=$5, description=$6, photos=$7, is_available=$8 WHERE id=$9 RETURNING *`,
    [name, brand, category, price, stock_count, description, JSON.stringify(photos), is_available, id]
  )
  return NextResponse.json({ data: result[0] })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await query('DELETE FROM appliances WHERE id = $1', [id])
  return NextResponse.json({ message: 'Supprimé' })
}
