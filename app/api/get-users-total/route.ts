import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch('https://api.clerk.com/v1/users/count', {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_API_KEY!}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: response.status });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
