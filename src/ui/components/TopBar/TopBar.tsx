"use client";
import { usePathname, useRouter } from 'next/navigation';
import cn from 'classnames';

import { Breadcrumbs, Button } from '@/ui/elements';
import CloseIcon from '@/ui/icons/close.svg';
import TopBarAuthentication from './TopBarAuthentication';
import AccountSettings from './AccountSettings';
import DocsNavigation from './DocsNavigation';
import TopBarActions from './TopBarActions';
import PageTitle from './PageTitle';
import styles from './TopBar.module.scss';

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();

  const isPublicPages = !pathname.startsWith('/dashboard');
  const isProductionCertificatePage = pathname.startsWith('/dashboard/certificates/business-information');
  const isDashboardPages = pathname.startsWith('/dashboard') && !isProductionCertificatePage;

  return (
    <div className={styles.topBar}>
      <div className={cn(styles.topBar__left, [styles['topBar__left--isBreadcrumb']])}>
        {isPublicPages && <AccountSettings page={'docs'} />}
        {isDashboardPages && <AccountSettings page={'dashboard'} />}
        {isProductionCertificatePage && <PageTitle title="Production Access" />}
      </div>
      <div className={styles.topBar__middle}>
        <Breadcrumbs />
      </div>
      <div className={styles.topBar__right}>
        {isPublicPages  && <TopBarAuthentication isDashboardPage={isDashboardPages} />}
        {isDashboardPages && <TopBarActions />}
        {isProductionCertificatePage && (
          <Button
            onClick={() => router.push('/dashboard/certificates')}
          >
            <div className={styles.topBar__close}>
              Exit setup <CloseIcon />
            </div>
          </Button>

        )}
      </div>
    </div>
  );
}
