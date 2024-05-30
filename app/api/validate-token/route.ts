import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  // Get the token from the query parameters
  const token = req.nextUrl.searchParams.get('token');
  const email = req.nextUrl.searchParams.get('email');
  const jwtSecret = process.env.JWT_SECRET!;
console.log(email);

  try {
    // Verify the token using the JWT secret
    const decoded= jwt.verify(token as string, jwtSecret) as{email:string};

    // check if token belongs to the right user
    if(decoded.email !== email) {
      return NextResponse.json({ message: 'Invalid token' });
    }
    else{
      return NextResponse.redirect(`${req.nextUrl.origin}/create-account`);
    }
  } catch (err) {
    // console.log(err);
    return NextResponse.json({ message: 'Invalid or expired token' });
  }
}

