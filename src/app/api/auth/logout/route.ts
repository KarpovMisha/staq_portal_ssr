import { NextRequest, NextResponse } from 'next/server';
import { clearSession, getSession } from '@/auth/auth';
import { keycloak } from '@/auth/keycloak';

export async function GET(req: NextRequest) {
  const session = await getSession();

  const postLogoutRedirectUri =
    process.env.NEXT_PUBLIC_APP_URL || new URL('/', req.url).toString();

  const logoutUrl = new URL(keycloak.logoutUrl());

  // куда вернуться после logout
  logoutUrl.searchParams.set(
    'post_logout_redirect_uri',
    postLogoutRedirectUri
  );

  // помогает Keycloak быстрее найти сессию
  if (session?.id_token) {
    logoutUrl.searchParams.set('id_token_hint', session.id_token);
  }

  const res = NextResponse.redirect(logoutUrl.toString());

  // очищаем local cookies
  clearSession(res);
  res.cookies.delete('return_to');
  res.cookies.delete('kc_state');
  res.cookies.delete('kc_code_verifier');

  return res;
}
