'use client';
import Link from 'next/link';
import cn from 'classnames';

import { useIsLinkActive } from '@/hooks/useIsLinkActive';
import { SidebarMenu } from '@/ui/components';
import ApiIcon from '@/ui/icons/api_reference.svg';
import RocketIcon from '@/ui/icons/rocket.svg';
import HomeIcon from '@/ui/icons/home.svg';
import styles from './HomeSidebar.module.scss';

export default function HomeSidebar() {

  return (
    <div className={styles.home_sidebar}>
      <div className={styles.home_sidebar__links}>
        <Link
          href="/"
          className={cn(styles.home_sidebar__link, {
            [styles['home_sidebar__link--active']]: useIsLinkActive('/'),
          })}
        >
          <HomeIcon />
          Home
        </Link>

        <SidebarMenu
          items={[
            {
              id: 'get-started',
              label: 'Get Started',
              icon: RocketIcon,
              path: '/get-started',
              children: [
                {
                  label: 'Create application',
                  path: '/get-started/create-application',
                },
                {
                  label: 'Generate CSR certificate',
                  path: '/get-started/generate-csr-certificate',
                },
                {
                  label: 'Make first API call',
                  path: '/get-started/make-first-api-call',
                },
              ],
            },
            {
              id: 'apis',
              label: 'API',
              icon: ApiIcon,
              path: '/api',
              children: [{ label: 'Identity', path: '/api/identity' }],
            },
          ]}
        />
      </div>
      <div className={styles.home_sidebar__actions}>
        <Link
          href="/api-references/api-overview"
          className={styles.home_sidebar__bottom_link}
        >
          <ApiIcon />
          <span>API Reference</span>
        </Link>
      </div>
    </div>
  );
}
