import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { requireAuth } from '@/lib/auth'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = requireAuth(req)
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id } = await params
  const { status } = await req.json()
  const result = await query(
    'UPDATE financing_requests SET status=$1 WHERE id=$2 RETURNING *',
    [status, id]
  )
  return NextResponse.json({ data: result[0] })
}
