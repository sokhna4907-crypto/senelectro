import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import bcrypt from 'bcryptjs'

function createJWT(payload: object, secret: string): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const data = btoa(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + 86400 * 7 })) // 7 jours
  const signature = btoa(`${header}.${data}.${secret}`)
  return `${header}.${data}.${signature}`
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 })

    const admins = await query('SELECT * FROM admins WHERE email = $1', [email])
    if (admins.length === 0) return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 })

    const admin = admins[0]
    const valid = await bcrypt.compare(password, admin.password_hash)
    if (!valid) return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 })

    const secret = process.env.JWT_SECRET || 'senelectro_secret'
    const token = createJWT({ id: admin.id, email: admin.email }, secret)

    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400 * 7, // 7 jours
      path: '/',
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
