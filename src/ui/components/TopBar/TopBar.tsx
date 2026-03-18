"use client";
// import { useMatches,useNavigate } from 'react-router';
import cn from 'classnames';

// import { Breadcrumbs, Button } from 'elements/index';
// import CloseIcon from 'styles/icon/dashboard/close.svg?react';
import AccountSettings from './AccountSettings';
import DocsNavigation from './DocsNavigation';
import TopBarActions from './TopBarActions';
// import PageTitle from './PageTitle';
import styles from './TopBar.module.scss';
import TopBarAuthentication from './TopBarAuthentication';
import { Breadcrumbs } from '@/ui/elements';
// import { useAuth } from '@/auth/AuthProvider';

// type BreadcrumbHandle = {
//   breadcrumb?: (match: any) => React.ReactNode;
//   section?: 'dashboard' | 'production-certificate' | 'home';
// };

// type BreadcrumbMatch = {
//   handle?: BreadcrumbHandle;
// };

export default function TopBar({ page }: { page: string }) {
  // const { authenticated } = useAuth();
  const isHomePages = page === 'home';
  const isDashboardPages = page === 'dashboard';

  // const navigate = useNavigate();
  // const matches = useMatches() as BreadcrumbMatch[];
  // const crumbs = matches.filter(
  //   (match) => !!match.handle && typeof match.handle.breadcrumb === 'function'
  // );
  // const isHomePages = matches.some((m) => m.handle?.section === 'home');
  // const isProductionCertificatePage = matches.some((m) => m.handle?.section === 'production-certificate');
  // const isDashboardPages = matches.some((m) => m.handle?.section === 'dashboard') && !isProductionCertificatePage;

  return (
    <div className={styles.topBar}>
      <div className={cn(styles.topBar__left, [styles['topBar__left--isBreadcrumb']])}>
        {isHomePages && <DocsNavigation />}
        {isDashboardPages && <AccountSettings isDashboardPage={isDashboardPages} />}
        {/* {isProductionCertificatePage && <PageTitle title="Production Access" />} */}
      </div>
      <div className={styles.topBar__middle}>
        <Breadcrumbs />
      </div>
      <div className={styles.topBar__right}>
        {isHomePages  && <TopBarAuthentication isDashboardPage={isDashboardPages} />}
        {isDashboardPages && <TopBarActions />}
        {/* {isProductionCertificatePage && (
          <Button
            onClick={() => navigate('/dashboard/certificates')}
          >
            <div className={styles.topBar__close}>
              Exit setup <CloseIcon />
            </div>
          </Button>

        )} */}
      </div>
    </div>
  );
}
