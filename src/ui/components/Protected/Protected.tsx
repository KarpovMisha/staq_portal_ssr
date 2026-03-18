'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../auth-provider';

type ProtectedProps = {
  children: ReactNode;
};

export default function Protected({ children }: ProtectedProps) {
  const { authenticated, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return null;
  }

  if (!authenticated) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <h3>This section requires login</h3>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => router.push('/')}>
            Go Home
          </button>

          <button
            onClick={() => {
              const returnTo =
                window.location.pathname + window.location.search;

              window.location.href =
                '/api/auth/login?returnTo=' +
                encodeURIComponent(returnTo);
            }}
          >
            Log in
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
