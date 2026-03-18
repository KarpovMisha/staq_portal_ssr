import { NextRequest, NextResponse } from 'next/server';
import { buildLoginUrl, setPkceCookies, setReturnToCookie } from '@/auth/auth';

export async function GET(req: NextRequest) {
  const returnTo = req.nextUrl.searchParams.get('returnTo') || '/';

  const { url, state, codeVerifier } = buildLoginUrl();

  await setPkceCookies(state, codeVerifier);
  await setReturnToCookie(returnTo);

  return NextResponse.redirect(url);
}
