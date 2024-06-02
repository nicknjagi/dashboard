import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken';
import {  generateUniqueToken } from '@/app/lib/auth';
import nodemailer from "nodemailer";
import { generateHtml } from '@/components/emailTemplates/email';

const JWT_SECRET = process.env.JWT_SECRET!;
const SMTP_EMAIL = process.env.SMTP_EMAIL!;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD!;

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  const email = req.nextUrl.searchParams.get('email');

  try {
    // Verify the token using the JWT secret
    const decoded= jwt.verify(token as string, JWT_SECRET) as{email:string};

    // check if token belongs to the right user
    if(decoded.email !== email) {
      return NextResponse.json({ message: 'Invalid token' });
    }
    else{
      const cookieName = 'jwt_token';
      const cookieValue = token as string;

      // Set the cookie to expire in 30 mins 
      const expiry = new Date();
      expiry.setTime(expiry.getTime() + 30 * 60 * 1000);

      const response = NextResponse.redirect(`${req.nextUrl.origin}/create-account?email=${email}`);

      // Set the cookie in the response
      response.cookies.set(cookieName, cookieValue, { expires: expiry, httpOnly: true });

      return response;
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 403 });
  }
}


export async function POST(req: NextRequest) {
  const body = await req.json(); // Parse the JSON body
  const {email} = body

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const token = generateUniqueToken(email)

  try {
    const html = generateHtml(email, token)
    
    const sendResult = await transporter.sendMail({
      from: SMTP_EMAIL,
      to:email,
      subject:'Create your account',
      html
    });
    return NextResponse.json({ message: 'success' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

