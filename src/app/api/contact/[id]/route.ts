import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { is_read } = await req.json()
  const result = await query('UPDATE contact_messages SET is_read=$1 WHERE id=$2 RETURNING *', [is_read, id])
  return NextResponse.json({ data: result[0] })
}
