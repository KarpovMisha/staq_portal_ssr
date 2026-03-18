import { NextRequest, NextResponse } from 'next/server';
import { buildRegisterUrl, setPkceCookies, setReturnToCookie } from '@/auth/auth';

export async function GET(req: NextRequest) {
  const returnTo = req.nextUrl.searchParams.get('returnTo') || '/';

  const { url, state, codeVerifier } = buildRegisterUrl();

  await setPkceCookies(state, codeVerifier);
  await setReturnToCookie(returnTo);

  return NextResponse.redirect(url);
}
