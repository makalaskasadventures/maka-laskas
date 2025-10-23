import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

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
  }
)

export const config = {
  matcher: ['/admin/:path*']
}
