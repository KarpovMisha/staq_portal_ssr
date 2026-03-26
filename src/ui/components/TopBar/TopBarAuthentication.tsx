import { Button } from '@/ui/elements';
// import { useAuth } from '@/auth/AuthProvider';
import styles from './TopBarAuthentication.module.scss';
import Link from 'next/link';
import AccountSettings from './AccountSettings';
import { useAuth } from '../auth-provider';
import { LoginButton } from '../login-button';

export default function TopBarAuthentication({isDashboardPage}: {isDashboardPage: boolean}) {
  const { authenticated } = useAuth();

  return (
    <div className={styles.topBarAuthentication}>
      {authenticated ? (
        <div
          className={styles.topBarAuthentication__loggedIn}
        >
          <Link href="/dashboard" style={{ color: 'white' }}>Dashboard</Link>
          <AccountSettings page="avatar" />
        </div>
      ) : (
        <ul className={styles.topBarAuthentication__buttons}>
          <li>
            <LoginButton />
          </li>
          <li>
            <Button
              name="Create account"
              onClick={() => {
                window.location.href = `/api/auth/signup?returnTo=/`;
              }}
              variant="gradient_primary"
            />
          </li>
        </ul>

      )}
    </div>
  );
}
