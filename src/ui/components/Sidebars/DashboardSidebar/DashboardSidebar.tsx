'use client';
import cn from 'classnames';
import Link from 'next/link';

import HomeIcon from '@/ui/icons/home.svg';
import ApplicationsIcon from '@/ui/icons/applications.svg';
import CertificateIcon from '@/ui/icons/certificates.svg';
import ProductIcon from '@/ui/icons/products.svg';
import SettingsIcon from '@/ui/icons/settings.svg';
import ApiIcon from '@/ui/icons/api_reference.svg';
import DocsIcon from '@/ui/icons/docs.svg';

import { useAuth } from '../../auth-provider';
import styles from './DashboardSidebar.module.scss';

export default function DashboardSidebar() {
  const { authenticated } = useAuth();
  return (
    <div className={styles.dashboardSidebar}>
      <div className={styles.dashboardSidebar__links}>
        <Link
          // className={({ isActive }) =>
          //   cn(styles.dashboardSidebar__link, {
          //     [styles['dashboardSidebar__link--active']]: isActive,
          //   })
          // }
          href="/dashboard"
        >
          <HomeIcon />
          Home
        </Link>
        {!!authenticated && (
          <>
            <Link
              // className={({ isActive }) =>
              //   cn(styles.dashboardSidebar__link, {
              //     [styles['dashboardSidebar__link--active']]: isActive,
              //   })
              // }
              href="/dashboard/apps"
            >
              <ApplicationsIcon />
              Applications
            </Link>
            <Link
              // className={({ isActive }) =>
              //   cn(styles.dashboardSidebar__link, {
              //     [styles['dashboardSidebar__link--active']]: isActive,
              //   })
              // }
              href="/dashboard/certificates"
            >
              <CertificateIcon />
              Certificates
            </Link>
            <Link
              // className={({ isActive }) =>
              //   cn(styles.dashboardSidebar__link, {
              //     [styles['dashboardSidebar__link--active']]: isActive,
              //   })
              // }
              href="/dashboard/products"
            >
              <ProductIcon />
              Products
            </Link>
            <Link
              // className={({ isActive }) =>
              //   cn(styles.dashboardSidebar__link, {
              //     [styles['dashboardSidebar__link--active']]: isActive,
              //   })
              // }
              href="/dashboard/settings/profile"
            >
              <SettingsIcon />
              Settings
            </Link>
          </>
        )}
      </div>

      <div className={styles.dashboardSidebar__actions}>
        <Link
          href="/api-references/api-overview"
          className={styles.dashboardSidebar__bottom_link}
        >
          <ApiIcon />
          <span>API Reference</span>
        </Link>
        <Link href="/" className={styles.dashboardSidebar__bottom_link}>
          <DocsIcon /> <span>Docs</span>
        </Link>
      </div>
    </div>
  );
}
