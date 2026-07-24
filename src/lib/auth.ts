import { NextRequest } from 'next/server'

export function requireAuth(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value ||
    req.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return null
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = JSON.parse(atob(parts[1]))
    if (payload.exp && payload.exp < Date.now() / 1000) return null
    return payload
  } catch {
    return null
  }
}
