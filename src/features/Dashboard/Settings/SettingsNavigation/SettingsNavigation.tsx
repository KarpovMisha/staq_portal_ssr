'use client';
import Link from 'next/link';
import cn from 'classnames';

import { useIsLinkActive } from '@/hooks/useIsLinkActive';
import styles from './SettingsNavigation.module.scss';

export default function SettingsNavigation() {
  return (
    <div className={styles.settings}>
      <h1>Settings</h1>
      <div className={styles.settings__tabs}>
        <Link
          className={cn(styles.settings__tab, {
            [styles['settings__tab--active']]: useIsLinkActive(
              '/dashboard/settings/profile',
            ),
          })}
          href="/dashboard/settings/profile"
        >
          <span>Profile</span>
        </Link>
        <Link
          className={cn(styles.settings__tab, {
            [styles['settings__tab--active']]: useIsLinkActive(
              '/dashboard/settings/business',
            ),
          })}
          href="/dashboard/settings/business"
        >
          <span>Business</span>
        </Link>
        <Link
          className={cn(styles.settings__tab, {
            [styles['settings__tab--active']]: useIsLinkActive(
              '/dashboard/settings/notifications',
            ),
          })}
          href="/dashboard/settings/notifications"
        >
          <span>Notifications</span>
        </Link>
        <Link
          className={cn(styles.settings__tab, {
            [styles['settings__tab--active']]: useIsLinkActive(
              '/dashboard/settings/billing',
            ),
          })}
          href="/dashboard/settings/billing"
        >
          <span>Billing</span>
        </Link>
      </div>
    </div>
  );
}
