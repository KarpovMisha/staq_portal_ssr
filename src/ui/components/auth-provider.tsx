'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';

type AuthState = {
  loading: boolean;
  authenticated: boolean;
  user: {
    sub?: string;
    name?: string;
    email?: string;
    preferred_username?: string;
  } | null;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

type Props = {
  children: ReactNode;
  initialAuthenticated?: boolean;
  initialUser?: AuthState['user'];
};

export function AuthProvider({
  children,
  initialAuthenticated = false,
  initialUser = null,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [user, setUser] = useState(initialUser);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      const data = await res.json();
      setAuthenticated(Boolean(data.authenticated));
      setUser(data.user ?? null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const value = useMemo(
    () => ({ loading, authenticated, user, refresh }),
    [loading, authenticated, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
