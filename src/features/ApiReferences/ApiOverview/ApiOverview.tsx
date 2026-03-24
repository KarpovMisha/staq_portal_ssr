import Link from 'next/link';

import { PrevNextNavigation } from '@/ui/components';

export default function OApiOverview() {
  return (
    <>
      <div className="typography">
        <h1 data-typography="Create application">API Overview</h1>
        <p>
          The Staq API gives developers secure, programmatic access to the entire Staq financial
          platform.
        </p>
        <p>
          It’s designed to help you build, test, and launch embedded financial experiences — from
          payments and accounts to identity, lending, and data services — all through a unified API
          surface.
        </p>
        <p>
          Our APIs follow consistent conventions and standards to make integration straightforward,
          predictable, and scalable. Whether you’re sending transfers, verifying users, or analysing
          transactions, each endpoint behaves in a consistent, REST-based pattern with
          JSON-formatted requests and responses.
        </p>
        <h2 data-typography="Environments">Environments</h2>
        <p>
          All Staq integrations begin in the Sandbox environment, a safe space to test and simulate
          real scenarios using non-live data.
        </p>
        <p>
          When your integration is ready, you can request access to the Production environment
          directly from your developer dashboard.
        </p>
        <p>Sandbox base URL:</p>
        <h2 data-typography="Authentication">Authentication</h2>
        <p>
          All API requests are authenticated using mutual TLS (mTLS) combined with OAuth 2.0 Client
          Credentials.
        </p>
        <p>
          You’ll generate your app credentials and signed client certificate in the developer
          dashboard, then exchange them for short-lived access tokens to make secure API calls.
        </p>
        <p>
          Learn more in <Link href="/api-references/authentication">Authentication</Link>
        </p>
        <h2 data-typography="Versioning & Format">Versioning & Format</h2>
        <ul>
          <li>Protocol: REST over HTTPS</li>
          <li>Format: JSON</li>
          <li>Versioning: via base path (e.g. /v1/...)</li>
          <li>Character encoding: UTF-8</li>
        </ul>
        <p>
          Each endpoint response includes standard HTTP status codes and structured error messages
          to make debugging consistent across all services.
        </p>
        <h2 data-typography="Explore & Build">Explore & Build</h2>
        <p>You can explore and test every endpoint in three ways:</p>
        <ul>
          <li><Link href="/api-references/postman-collection">Postman Collection</Link> — import our ready-made collection and try endpoints instantly in your browser.</li>
          <li><Link href="/api-references/sdks">SDKs</Link> — integrate quickly in your preferred language with pre-configured clients.</li>
          <li><Link href="/api-references/webhooks">Webhooks</Link> — subscribe to real-time events as they occur in your Staq environment.</li>
        </ul>
        <h2>Next steps</h2>
        <p>Start with <Link href="/api-references/authentication">Authentication</Link> to learn how to connect securely.</p>
        <p>Browse the API Reference categories to explore endpoints for Payments, Accounts, Identity, and more.</p>
        <p>Visit the <Link href="/api-references/go-live">Go Live guide</Link> when you’re ready to move to production.</p>
        <PrevNextNavigation
          nextSlag={{
            slug: '/api-references/authentication',
            title: 'Authentication',
          }}
        />
      </div>
    </>
  );
}
