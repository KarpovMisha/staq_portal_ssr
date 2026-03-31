import 'server-only';
import http from 'node:http';
import https from 'node:https';
import { keycloak } from './keycloak';

/**
 * DEV-ONLY: Localized Keycloak self-signed certificate bypass.
 *
 * This module bypasses TLS certificate verification only for local Keycloak
 * requests when KEYCLOAK_URL is set to https://account.acme.com:8443.
 *
 * SETUP INSTRUCTIONS:
 * -------------------
 * 1. Add to your .env file:
 *    KEYCLOAK_URL=https://account.acme.com:8443
 *
 * 2. Restart your dev server:
 *    npm run dev
 *
 * 3. TLS verification will be bypassed only:
 *    - In development mode
 *    - For HTTPS requests to https://account.acme.com:8443
 *    - Not for any other HTTPS connections
 */

const ALLOW_INSECURE_KEYCLOAK_TLS =
  process.env.NODE_ENV !== 'production' && process.env.KEYCLOAK_URL === 'https://account.acme.com:8443';

/**
 * Determines if insecure TLS should be used for this URL.
 * Only returns true if:
 * 1. KEYCLOAK_URL=https://account.acme.com:8443
 * 2. We're not in production
 * 3. URL is HTTPS
 * 4. URL origin matches the Keycloak issuer origin
 */
export function shouldUseInsecureKeycloakTls(url: URL): boolean {
  if (!ALLOW_INSECURE_KEYCLOAK_TLS || url.protocol !== 'https:') {
    return false;
  }
  const issuer = `${keycloak.issuer}/${keycloak.realm}/${keycloak.clientId}`;
  const issuerUrl = new URL(issuer);
  return url.origin === issuerUrl.origin;
}

/**
 * Makes an HTTP/HTTPS request with optional insecure TLS for Keycloak.
 * Uses Node.js http/https modules directly to have fine-grained control
 * over the rejectUnauthorized option.
 */
export async function requestWithOptionalInsecureTls(
  url: URL,
  init?: RequestInit,
  timeoutMs = 8000,
): Promise<Response> {
  const headers = new Headers(init?.headers);
  const body =
    typeof init?.body === 'string'
      ? init.body
      : init?.body instanceof URLSearchParams
        ? init.body.toString()
        : undefined;

  return await new Promise<Response>((resolve, reject) => {
    const transport = url.protocol === 'https:' ? https : http;
    const req = transport.request(
      url,
      {
        method: init?.method ?? 'GET',
        headers: Object.fromEntries(headers.entries()),
        rejectUnauthorized: url.protocol === 'https:' ? false : undefined,
      },
      (res) => {
        const chunks: Buffer[] = [];

        res.on('data', (chunk) => {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        });

        res.on('end', () => {
          resolve(
            new Response(Buffer.concat(chunks), {
              status: res.statusCode ?? 500,
              statusText: res.statusMessage ?? '',
              headers: normalizeNodeHeaders(res.headers),
            }),
          );
        });
      },
    );

    req.on('error', reject);
    req.setTimeout(timeoutMs, () => {
      req.destroy(new Error(`Request timed out after ${timeoutMs}ms`));
    });

    if (body) {
      req.write(body);
    }

    req.end();
  });
}

/**
 * Converts Node.js http.IncomingHttpHeaders to a standard Headers object.
 */
function normalizeNodeHeaders(headers: http.IncomingHttpHeaders): Headers {
  const normalized = new Headers();

  for (const [key, value] of Object.entries(headers)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        normalized.append(key, item);
      }
      continue;
    }

    if (typeof value === 'string') {
      normalized.set(key, value);
    }
  }

  return normalized;
}
