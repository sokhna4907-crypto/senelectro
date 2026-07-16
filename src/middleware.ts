import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Protéger toutes les routes /admin sauf /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = req.cookies.get('admin_token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    // Vérifier que le token est valide (format JWT basique)
    try {
      const parts = token.split('.')
      if (parts.length !== 3) throw new Error('Invalid token')
      const payload = JSON.parse(atob(parts[1]))
      // Vérifier expiration
      if (payload.exp && payload.exp < Date.now() / 1000) {
        const response = NextResponse.redirect(new URL('/admin/login', req.url))
        response.cookies.delete('admin_token')
        return response
      }
    } catch {
      const response = NextResponse.redirect(new URL('/admin/login', req.url))
      response.cookies.delete('admin_token')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
