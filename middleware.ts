import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Getting cookies from the request using the `RequestCookies` API
  let cookie = request.cookies.get('auth_token')
  const jwtCookie = request.cookies.get('jwt_token');

  const url = request.nextUrl.clone();

  // Exclude /login and other public routes from the middleware
  if (url.pathname === '/login' || url.pathname.startsWith('/api') || url.pathname.startsWith('/_next') || url.pathname === '/favicon.ico') {
    return NextResponse.next();
  }

   // Check if the route is /create-account
   if (url.pathname === '/create-account') {
    if (!jwtCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else {
    // For all other routes
    if (!cookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher:[
    '/facilitators',
    '/create-account',
    '/profile',
    '/settings',
    '/workspaces',
    '/users',
    '/'
  ]
}