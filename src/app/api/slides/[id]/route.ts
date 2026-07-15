import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const { title, title_accent, description, cta_label, cta_href, photo_url, position } = body
  const result = await query(
    'UPDATE slides SET title=$1, title_accent=$2, description=$3, cta_label=$4, cta_href=$5, photo_url=$6, position=$7 WHERE id=$8 RETURNING *',
    [title, title_accent, description, cta_label, cta_href, photo_url, position, id]
  )
  return NextResponse.json({ data: result[0] })
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await query('DELETE FROM slides WHERE id=$1', [id])
  return NextResponse.json({ message: 'Supprimé' })
}
