import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('perPage') || '10', 10);
  const offset = (page - 1) * perPage;

  try {
    const response = await fetch(`https://api.clerk.com/v1/users?limit=${perPage}&offset=${offset}&order_by=-created_at`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_API_KEY!}`
      }
    });

    if (response.ok) {
      const users = await response.json();
      return NextResponse.json({users}, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}