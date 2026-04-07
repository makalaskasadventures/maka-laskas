import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

// Must match `useSecureCookies` in auth options: production uses the `__Secure-` cookie name.
// Middleware's default getToken() derives the name from NEXTAUTH_URL first; an http:// or wrong
// NEXTAUTH_URL on Vercel makes it look for `next-auth.session-token` while the API sets `__Secure-…`.
const sessionTokenName =
  process.env.NODE_ENV === 'production'
    ? '__Secure-next-auth.session-token'
    : 'next-auth.session-token'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdmin = token?.role === 'ADMIN'
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')

    // If trying to access admin routes without admin role
    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
        
        // Allow access to admin routes only if user is admin
        if (isAdminRoute) {
          return token?.role === 'ADMIN'
        }
        
        // Allow access to other routes
        return true
      },
    },
    cookies: {
      sessionToken: { name: sessionTokenName },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*']
}
