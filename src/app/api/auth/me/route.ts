// app/api/auth/me/route.ts
import { NextResponse } from 'next/server';
import { getAuthState } from '@/auth/auth';

export async function GET() {
  const auth = await getAuthState();
  return NextResponse.json(auth, { status: 200 });
}
