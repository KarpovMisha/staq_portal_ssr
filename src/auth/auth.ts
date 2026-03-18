import 'server-only';
import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { decodeJwt } from 'jose';
import { NextResponse } from 'next/server';
import { keycloak } from './keycloak';

function base64url(input: Buffer | string) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function createState() {
  return base64url(crypto.randomBytes(32));
}

export function createCodeVerifier() {
  return base64url(crypto.randomBytes(32));
}

export function createCodeChallenge(codeVerifier: string) {
  return base64url(crypto.createHash('sha256').update(codeVerifier).digest());
}

export type SessionData = {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  expires_at: number;
  user?: {
    sub?: string;
    name?: string;
    email?: string;
    preferred_username?: string;
  };
};

const SESSION_COOKIE_NAME = 'session';
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const REFRESH_BUFFER_MS = 30_000;

export async function getSession(): Promise<SessionData | null> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE_NAME)?.value;

  if (!raw) return null;

  try {
    return JSON.parse(raw) as SessionData;
  } catch {
    return null;
  }
}

export function setSession(res: NextResponse, session: SessionData) {
  res.cookies.set(SESSION_COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_COOKIE_MAX_AGE,
  });
}

export function clearSession(res: NextResponse) {
  res.cookies.delete(SESSION_COOKIE_NAME);
}

export async function setPkceCookies(state: string, codeVerifier: string) {
  const store = await cookies();

  store.set('kc_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10,
  });

  store.set('kc_code_verifier', codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10,
  });
}

export async function getPkceCookies() {
  const store = await cookies();

  return {
    state: store.get('kc_state')?.value ?? null,
    codeVerifier: store.get('kc_code_verifier')?.value ?? null,
  };
}

export function clearPkceCookies(res: NextResponse) {
  res.cookies.delete('kc_state');
  res.cookies.delete('kc_code_verifier');
}

export async function setReturnToCookie(returnTo: string) {
  const store = await cookies();

  store.set('return_to', returnTo, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10,
  });
}

export function buildRegisterUrl() {
  const state = createState();
  const codeVerifier = createCodeVerifier();
  const codeChallenge = createCodeChallenge(codeVerifier);

  const authUrl = new URL(keycloak.authUrl());

  // меняем /auth -> /registrations
  const registerUrl = authUrl.toString().replace(/\/auth$/, '/registrations');
  const url = new URL(registerUrl);

  url.searchParams.set('client_id', keycloak.clientId);
  url.searchParams.set('redirect_uri', keycloak.redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', 'openid');
  url.searchParams.set('state', state);
  url.searchParams.set('code_challenge', codeChallenge);
  url.searchParams.set('code_challenge_method', 'S256');

  return {
    url: url.toString(),
    state,
    codeVerifier,
  };
}

export function buildLoginUrl(options?: {
  forceLogin?: boolean;
}) {
  const state = createState();
  const codeVerifier = createCodeVerifier();
  const codeChallenge = createCodeChallenge(codeVerifier);

  const url = new URL(keycloak.authUrl());
  url.searchParams.set('client_id', keycloak.clientId);
  url.searchParams.set('redirect_uri', keycloak.redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', 'openid');
  url.searchParams.set('state', state);
  url.searchParams.set('code_challenge', codeChallenge);
  url.searchParams.set('code_challenge_method', 'S256');

  if (options?.forceLogin) {
    url.searchParams.set('prompt', 'login');
  }

  return {
    url: url.toString(),
    state,
    codeVerifier,
  };
}

export async function exchangeCodeForTokens(
  code: string,
  codeVerifier: string
): Promise<SessionData> {
  const res = await fetch(keycloak.tokenUrl(), {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: keycloak.clientId,
      code,
      redirect_uri: keycloak.redirectUri,
      code_verifier: codeVerifier,
    }),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const tokens = await res.json();
  const payload = tokens.id_token ? decodeJwt(tokens.id_token) : {};

  return {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    id_token: tokens.id_token,
    expires_at: Date.now() + Number(tokens.expires_in ?? 300) * 1000,
    user: {
      sub: typeof payload.sub === 'string' ? payload.sub : undefined,
      name: typeof payload.name === 'string' ? payload.name : undefined,
      email: typeof payload.email === 'string' ? payload.email : undefined,
      preferred_username:
        typeof payload.preferred_username === 'string'
          ? payload.preferred_username
          : undefined,
    },
  };
}

// ВАЖНО:
// refresh failure тут не throw-ится наружу как "ошибка приложения".
// Мы возвращаем null и считаем пользователя разлогиненным.
export async function refreshSession(
  session: SessionData
): Promise<SessionData | null> {
  if (!session.refresh_token) {
    return null;
  }

  const res = await fetch(keycloak.tokenUrl(), {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: keycloak.clientId,
      refresh_token: session.refresh_token,
    }),
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  const tokens = await res.json();

  return {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token ?? session.refresh_token,
    id_token: tokens.id_token ?? session.id_token,
    expires_at: Date.now() + Number(tokens.expires_in ?? 300) * 1000,
    user: session.user,
  };
}

export async function getFreshSession(): Promise<{
  session: SessionData | null;
  refreshed: boolean;
  shouldClear: boolean;
}> {
  const session = await getSession();

  if (!session) {
    return {
      session: null,
      refreshed: false,
      shouldClear: false,
    };
  }

  const shouldRefresh = Date.now() >= session.expires_at - REFRESH_BUFFER_MS;

  if (!shouldRefresh) {
    return {
      session,
      refreshed: false,
      shouldClear: false,
    };
  }

  const refreshedSession = await refreshSession(session);

  if (!refreshedSession) {
    return {
      session: null,
      refreshed: false,
      shouldClear: true,
    };
  }

  return {
    session: refreshedSession,
    refreshed: true,
    shouldClear: false,
  };
}

export async function getAuthState() {
  const { session } = await getFreshSession();

  if (!session) {
    return {
      authenticated: false as const,
      user: null,
    };
  }

  return {
    authenticated: true as const,
    user: session.user ?? null,
  };
}
