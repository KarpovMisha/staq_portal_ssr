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

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function getNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

async function safeFetch(
  input: string | URL,
  init?: RequestInit,
  timeoutMs = 8000,
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
      cache: 'no-store',
    });
  } finally {
    clearTimeout(timeout);
  }
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

type AuthState =
  | {
      authenticated: true;
      user: NonNullable<SessionData['user']> | null;
    }
  | {
      authenticated: false;
      user: null;
    };

type RefreshResult =
  | { ok: true; session: SessionData }
  | { ok: false; reason: 'no_refresh_token' | 'invalid_grant' | 'network' | 'bad_response' };

type FreshSessionResult = {
  session: SessionData | null;
  authenticated: boolean;
  refreshed: boolean;
  shouldClear: boolean;
  updatedSession: SessionData | null;
};

const SESSION_COOKIE_NAME = 'session';
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const REFRESH_BUFFER_MS = 30_000;

export async function getSession(): Promise<SessionData | null> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE_NAME)?.value;

  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as unknown;

    if (!isObject(parsed)) return null;
    if (typeof parsed.access_token !== 'string') return null;
    if (typeof parsed.expires_at !== 'number') return null;

    return {
      access_token: parsed.access_token,
      refresh_token: getString(parsed.refresh_token),
      id_token: getString(parsed.id_token),
      expires_at: parsed.expires_at,
      user: isObject(parsed.user)
        ? {
            sub: getString(parsed.user.sub),
            name: getString(parsed.user.name),
            email: getString(parsed.user.email),
            preferred_username: getString(parsed.user.preferred_username),
          }
        : undefined,
    };
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
  res.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  });
}

// Используй только в route handlers / server actions.
// Не вызывай это из layout/page во время рендера.
export async function clearSessionCookie() {
  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  });
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
  res.cookies.set('kc_state', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  });

  res.cookies.set('kc_code_verifier', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  });
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

  const url = new URL(keycloak.authUrl());
  url.searchParams.set('client_id', keycloak.clientId);
  url.searchParams.set('redirect_uri', keycloak.redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', 'openid');
  url.searchParams.set('state', state);
  url.searchParams.set('code_challenge', codeChallenge);
  url.searchParams.set('code_challenge_method', 'S256');

  // Для Keycloak это надёжнее, чем replace(/\/auth$/, '/registrations')
  url.searchParams.set('prompt', 'create');

  return {
    url: url.toString(),
    state,
    codeVerifier,
  };
}

export function buildLoginUrl(options?: { forceLogin?: boolean }) {
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

function buildSessionFromTokens(
  tokens: Record<string, unknown>,
  fallbackUser?: SessionData['user'],
  fallbackRefreshToken?: string,
  fallbackIdToken?: string,
): SessionData | null {
  const accessToken = getString(tokens.access_token);
  if (!accessToken) return null;

  const idToken = getString(tokens.id_token) ?? fallbackIdToken;
  const refreshToken = getString(tokens.refresh_token) ?? fallbackRefreshToken;
  const expiresIn = getNumber(tokens.expires_in) ?? 300;

  let user = fallbackUser;

  if (idToken) {
    try {
      const payload = decodeJwt(idToken);

      user = {
        sub: typeof payload.sub === 'string' ? payload.sub : undefined,
        name: typeof payload.name === 'string' ? payload.name : undefined,
        email: typeof payload.email === 'string' ? payload.email : undefined,
        preferred_username:
          typeof payload.preferred_username === 'string'
            ? payload.preferred_username
            : undefined,
      };
    } catch (error) {
      console.warn('[auth] failed to decode id_token', error);
    }
  }

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    id_token: idToken,
    expires_at: Date.now() + expiresIn * 1000,
    user,
  };
}

async function readErrorBody(res: Response): Promise<string> {
  try {
    return await res.text();
  } catch {
    return '';
  }
}

function isInvalidGrant(status: number, errorText: string) {
  return status === 400 && errorText.includes('"error":"invalid_grant"');
}

export async function exchangeCodeForTokens(
  code: string,
  codeVerifier: string,
): Promise<SessionData | null> {
  try {
    const res = await safeFetch(keycloak.tokenUrl(), {
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
    });

    if (!res.ok) {
      const errorText = await readErrorBody(res);
      console.error('[auth] exchangeCodeForTokens failed:', res.status, errorText);
      return null;
    }

    const tokens = (await res.json()) as unknown;

    if (!isObject(tokens)) {
      console.error('[auth] exchangeCodeForTokens returned invalid JSON');
      return null;
    }

    return buildSessionFromTokens(tokens);
  } catch (error) {
    console.error('[auth] exchangeCodeForTokens fetch failed:', error);
    return null;
  }
}

export async function refreshSession(session: SessionData): Promise<RefreshResult> {
  if (!session.refresh_token) {
    return { ok: false, reason: 'no_refresh_token' };
  }

  try {
    const res = await safeFetch(keycloak.tokenUrl(), {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: keycloak.clientId,
        refresh_token: session.refresh_token,
      }),
    });

    if (!res.ok) {
      const errorText = await readErrorBody(res);

      if (isInvalidGrant(res.status, errorText)) {
        // Это нормальный logout state, не console.error
        console.warn('[auth] refresh token is no longer valid');
        return { ok: false, reason: 'invalid_grant' };
      }

      console.error('[auth] refreshSession failed:', res.status, errorText);
      return { ok: false, reason: 'network' };
    }

    const tokens = (await res.json()) as unknown;

    if (!isObject(tokens)) {
      console.error('[auth] refreshSession returned invalid JSON');
      return { ok: false, reason: 'bad_response' };
    }

    const nextSession = buildSessionFromTokens(
      tokens,
      session.user,
      session.refresh_token,
      session.id_token,
    );

    if (!nextSession) {
      return { ok: false, reason: 'bad_response' };
    }

    return {
      ok: true,
      session: nextSession,
    };
  } catch (error) {
    console.error('[auth] refreshSession fetch failed:', error);
    return { ok: false, reason: 'network' };
  }
}

export async function getFreshSession(): Promise<FreshSessionResult> {
  const session = await getSession();

  if (!session) {
    return {
      session: null,
      authenticated: false,
      refreshed: false,
      shouldClear: false,
      updatedSession: null,
    };
  }

  const shouldRefresh = Date.now() >= session.expires_at - REFRESH_BUFFER_MS;

  if (!shouldRefresh) {
    return {
      session,
      authenticated: true,
      refreshed: false,
      shouldClear: false,
      updatedSession: null,
    };
  }

  const refreshResult = await refreshSession(session);

  if (!refreshResult.ok) {
    return {
      session: null,
      authenticated: false,
      refreshed: false,
      shouldClear:
        refreshResult.reason === 'invalid_grant' ||
        refreshResult.reason === 'no_refresh_token',
      updatedSession: null,
    };
  }

  return {
    session: refreshResult.session,
    authenticated: true,
    refreshed: true,
    shouldClear: false,
    updatedSession: refreshResult.session,
  };
}

export async function getAuthState(): Promise<AuthState> {
  const { authenticated, session } = await getFreshSession();

  if (!authenticated || !session) {
    return {
      authenticated: false,
      user: null,
    };
  }

  return {
    authenticated: true,
    user: session.user ?? null,
  };
}
