import { NextRequest, NextResponse } from 'next/server';
import { clearSession, getFreshSession, setSession } from '@/auth/auth';

const PUBLIC_PATHS = ['/api/v1/scope/information'];

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.includes(pathname);
}

async function handler(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const API_BASE_URL = process.env.API_BASE_URL;

    if (!API_BASE_URL) {
      return NextResponse.json(
        { error: 'Missing API_BASE_URL' },
        { status: 500 }
      );
    }

    const { path } = await context.params;
    const pathname = `/${path.join('/')}`;
    const publicPath = isPublicPath(pathname);

    let session: Awaited<ReturnType<typeof getFreshSession>>['session'] | undefined;
    let refreshed = false;
    let shouldClear = false;

    if (!publicPath) {
      const freshSessionResult = await getFreshSession();
      session = freshSessionResult.session;
      refreshed = freshSessionResult.refreshed;
      shouldClear = freshSessionResult.shouldClear;

      if (!session?.access_token) {
        const res = NextResponse.json(
          { error: 'Unauthorized: no session' },
          { status: 401 }
        );

        if (shouldClear) {
          clearSession(res);
        }

        return res;
      }
    }

    const targetUrl = new URL(`${API_BASE_URL}/${path.join('/')}`);
    targetUrl.search = req.nextUrl.search;

    const headers = new Headers();

    const contentType = req.headers.get('content-type');
    if (contentType) {
      headers.set('content-type', contentType);
    }

    if (session?.access_token) {
      headers.set('authorization', `Bearer ${session.access_token}`);
    }

    const body =
      req.method === 'GET' || req.method === 'HEAD'
        ? undefined
        : await req.text();

    const backendResponse = await fetch(targetUrl.toString(), {
      method: req.method,
      headers,
      body,
      cache: 'no-store',
    });

    const text = await backendResponse.text();

    const res = new NextResponse(text, {
      status: backendResponse.status,
      headers: {
        'content-type':
          backendResponse.headers.get('content-type') ?? 'application/json',
      },
    });

    if (refreshed && session) {
      setSession(res, session);
    }

    return res;
  } catch (error) {
    const res = NextResponse.json(
      {
        error: 'Proxy failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );

    clearSession(res);
    return res;
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
