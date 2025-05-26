import { NextResponse } from 'next/server';
import { auth } from '../../../firebase';

export async function GET() {
  const user = auth.currentUser;
  if (user) {
    return NextResponse.json({ uid: user.uid, email: user.email });
  }
  return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, action } = body;

  // Placeholder logic for authentication
  if (email && password) {
    if (action === 'signup') {
      return NextResponse.json({ message: 'User signed up successfully', user: { email } }, { status: 201 });
    } else if (action === 'login') {
      return NextResponse.json({ message: 'User logged in successfully', user: { email } });
    }
  }
  return NextResponse.json({ error: 'Invalid credentials or action' }, { status: 400 });
} 