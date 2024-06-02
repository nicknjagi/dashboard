import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { pb } from '@/app/lib/utils'
import { isClientResponseError, TLoginSchema } from '@/types'

export async function POST(request: NextRequest) {
  const body = await request.json()

  try {
    const { email, password } = body.user as TLoginSchema
    const authData = await pb.collection('users').authWithPassword(email, password)
    const response = NextResponse.json({ data:authData })
    response.cookies.set('auth_token', authData.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3 * 24 * 60 * 60, // 3 days
    })
    return response
  } catch (error) {
    if (isClientResponseError(error)) {
      return NextResponse.json({ error: error.response.message }, { status: error?.status })
    }
    return NextResponse.json({ success: false }, { status: 401 })
  }
}
