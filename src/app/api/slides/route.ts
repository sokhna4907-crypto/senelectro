import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const slides = await query('SELECT * FROM slides ORDER BY position ASC')
    return NextResponse.json({ data: slides })
  } catch {
    return NextResponse.json({ data: [] })
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title, title_accent, description, cta_label, cta_href, photo_url, position } = body
  const result = await query(
    'INSERT INTO slides (title, title_accent, description, cta_label, cta_href, photo_url, position) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
    [title, title_accent, description, cta_label, cta_href, photo_url, position || 0]
  )
  return NextResponse.json({ data: result[0] }, { status: 201 })
}
