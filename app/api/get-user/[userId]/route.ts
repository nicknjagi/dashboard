import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  const userId = params.userId;
  if (!userId) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }
  try {
    const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_API_KEY!}`
      }
    });

    if (response.ok) {
      const user = await response.json();
      return NextResponse.json({ user }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Failed to fetch user' }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}