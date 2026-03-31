import { NextRequest, NextResponse } from 'next/server';
import { clearSession, getSession } from '@/auth/auth';
import { keycloak } from '@/auth/keycloak';

function expireCookie(res: NextResponse, name: string) {
  res.cookies.set(name, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  });
}

export async function GET(req: NextRequest) {
  const session = await getSession();

  const postLogoutRedirectUri =
    process.env.NEXT_APP_URL || new URL('/', req.url).toString();

  const logoutUrl = new URL(keycloak.logoutUrl());
  logoutUrl.searchParams.set('post_logout_redirect_uri', postLogoutRedirectUri);

  if (session?.id_token) {
    logoutUrl.searchParams.set('id_token_hint', session.id_token);
  }

  const res = NextResponse.redirect(logoutUrl.toString());

  clearSession(res);
  expireCookie(res, 'return_to');
  expireCookie(res, 'kc_state');
  expireCookie(res, 'kc_code_verifier');

  return res;
}
