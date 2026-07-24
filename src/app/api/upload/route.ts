import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { uploadImage } from '@/lib/cloudinary'

export async function POST(req: NextRequest) {
  const user = requireAuth(req)
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { image, folder } = await req.json()

  if (!image) return NextResponse.json({ error: 'Image requise' }, { status: 400 })

  const url = await uploadImage(image, folder || 'general')
  return NextResponse.json({ url })
}
