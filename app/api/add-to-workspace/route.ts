import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function PATCH(request: NextRequest) {
  const {userId} = await request.json()
  console.log(userId);

  try {

    return NextResponse.json({ user:userId as string }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false }, { status: 401 })
  }
//   if (response.ok) {
//     const user = await response.json();
//     return NextResponse.json({ user:userId }, { status: 200 });
//   } else {
//     return NextResponse.json({ error: 'Failed to fetch user' }, { status: response.status });
//   }
// } catch (error) {
//   return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
// }
}
