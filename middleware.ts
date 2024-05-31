import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Getting cookies from the request using the `RequestCookies` API
  let cookie = request.cookies.get('jwt_token')

  if(!cookie){
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher:'/create-account'
}