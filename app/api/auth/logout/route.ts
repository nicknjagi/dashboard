import { NextRequest, NextResponse } from 'next/server';
import { pb } from '@/app/lib/utils'; 

export async function GET(req: NextRequest) {
  try {
    const response = NextResponse.json({ success: true });

    // Clear the auth cookie
    response.cookies.set('auth_token', '', { expires: new Date(0), httpOnly: true, secure: true });

    return response;
  } catch (error) {
    console.error('Error logging out:', error);
    return NextResponse.json({ success: false, message: 'Error logging out' }, { status: 500 });
  }
}
