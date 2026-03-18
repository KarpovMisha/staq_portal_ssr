'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { Link, Link, useMatch } from 'react-router';
import cn from 'classnames';

// import HomeIcon from 'styles/icon/dashboard/home.svg';
import ArrowIcon from '@/ui/icons/arrow.svg';
import LogoIcon from '@/ui/icons/staq_app_logo.svg';
import DocsIcon from '@/ui/icons/docs.svg';
import ApiIcon from '@/ui/icons/terminal.svg';
import ArrowDownIcon from '@/ui/icons/downArrow.svg';
import LogOutIcon from '@/ui/icons/logout.svg';
// import Switcher from 'components/Switcher';
import SearchIcon from '@/ui/icons/search.svg';
// import { useAppDispatch } from 'hooks/useRedux';
// import { dashboardActions } from '../../redux/reducers/dashboard';
import styles from './DocsNavigation.module.scss';
import ActionsDropdown from '../ActionsDropdown/ActionsDropdown';
import Switcher from '../Switcher/Switcher';
import { useAppDispatch } from '@/store/hooks';
import { dashboardActions } from '@/store/slices/dashboard';

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(styles.docs_navigation__item, {
        [styles['docs_navigation__item--active']]: isActive,
      })}
    >
      {children}
    </Link>
  );
}

export default function DocsNavigation() {
  const dispatch = useAppDispatch();
  // const isApiReferencesPage = useMatch('/api-references/*');

  return (
    <div className={styles.docs_navigation}>
      <ActionsDropdown
        trigger={(open: boolean) => (
          <div className={styles.docs_navigation__trigger}>
            <div className={styles.docs_navigation__logo}>
              <LogoIcon />
            </div>
            <span>Docs</span>
            {/* <span>{isApiReferencesPage ? 'API References' : 'Docs'}</span> */}
            <div
              className={cn(styles.docs_navigation__arrow, {
                [styles['docs_navigation__arrow--open']]: open,
              })}
            >
              <ArrowIcon />
            </div>
          </div>
        )}
        content={({ close }) => (
          <div className={styles.docs_navigation__body}>
            <div
              className={cn(
                styles.docs_navigation__row,
                styles['docs_navigation__row--devider'],
              )}
            >
              <NavItem
                href="/"
                // onClick={close}
              >
                <div>
                  <DocsIcon /> <span>Developer Docs</span>
                </div>
                <div className={styles.docs_navigation__link}>
                  <ArrowDownIcon />
                </div>
              </NavItem>
              <NavItem
                href="/api-references/api-overview"
                // onClick={close}
              >
                <div>
                  <ApiIcon /> <span>API Reference</span>
                </div>
                <div className={styles.docs_navigation__link}>
                  <ArrowDownIcon />
                </div>
              </NavItem>
            </div>
            <div
              className={cn(
                styles.docs_navigation__row,
                styles['docs_navigation__row--devider'],
              )}
            >
              <div className={styles.docs_navigation__item}>
                <div>Theme</div>
                <div className={styles.docs_navigation__switcher}>
                  <Switcher />
                </div>
              </div>
            </div>
            <div className={styles.account_settings__row}>
              <div
                onClick={() => {
                  window.location.href = '/api/auth/logout';
                }}
                className={styles.account_settings__item}
              >
                <div>Logout</div>
                <LogOutIcon />
              </div>
            </div>
          </div>
        )}
      />
      <div
        onClick={() => dispatch(dashboardActions.setActiveModalDetails({ name: 'docs search' }))}
        className={styles.docs_navigation__search}
      >
        <SearchIcon />
      </div>
    </div>
  );
}
