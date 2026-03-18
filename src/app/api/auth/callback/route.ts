import { NextRequest, NextResponse } from 'next/server';
import {
  clearPkceCookies,
  exchangeCodeForTokens,
  getPkceCookies,
  setSession,
} from '@/auth/auth';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const state = req.nextUrl.searchParams.get('state');

  const { state: savedState, codeVerifier } = await getPkceCookies();

  if (!code || !state || !savedState || state !== savedState || !codeVerifier) {
    return NextResponse.json({ error: 'Invalid callback state' }, { status: 400 });
  }

  try {
    const session = await exchangeCodeForTokens(code, codeVerifier);

    const returnTo = req.cookies.get('return_to')?.value || '/';
    const res = NextResponse.redirect(new URL(returnTo, req.url));

    setSession(res, session);
    clearPkceCookies(res);
    res.cookies.delete('return_to');

    return res;
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Token exchange failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
