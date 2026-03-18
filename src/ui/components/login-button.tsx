'use client';

import { Button } from '../elements';

//you can Log in like this
{
  /* <a href="/api/auth/login">Log in</a> */
}

export function LoginButton() {
  const handleLogin = () => {
    const returnTo = window.location.pathname + window.location.search;
    window.location.href = `/api/auth/login?returnTo=${encodeURIComponent(returnTo)}`;
  };

  return <Button name="Log in" onClick={handleLogin} />;
}
