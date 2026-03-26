'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'classnames';

// import HomeIcon from 'styles/icon/dashboard/home.svg';
import ArrowIcon from '@/ui/icons/arrow.svg';
import LogoIcon from '@/ui/icons/staq_app_logo.svg';
import DocsIcon from '@/ui/icons/developer_docs.svg';
import ApiIcon from '@/ui/icons/terminal.svg';
import ArrowDownIcon from '@/ui/icons/downArrow.svg';
import LogInIcon from '@/ui/icons/login.svg';
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
  const pathname = usePathname();
  const isApiReferencesPage = pathname.startsWith('/api-references');

  return (
    <div className={styles.docs_navigation}>
      <ActionsDropdown
        trigger={(open: boolean) => (
          <div className={styles.docs_navigation__trigger}>
            <div className={styles.docs_navigation__logo}>
              <LogoIcon />
            </div>
            <span>{isApiReferencesPage ? 'API References' : 'Docs'}</span>
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
            {isApiReferencesPage && (
              <div
                className={cn(
                  styles.docs_navigation__row,
                  styles['docs_navigation__row--devider'],
                )}
              >
                <NavItem href="/">
                  <div>
                    <DocsIcon /> <span>Developer Docs</span>
                  </div>
                  <div className={styles.docs_navigation__link}>
                    <ArrowDownIcon />
                  </div>
                </NavItem>
              </div>
            )}
            {!isApiReferencesPage && (
              <div
                className={cn(
                  styles.docs_navigation__row,
                  styles['docs_navigation__row--devider'],
                )}
              >
                <NavItem href="/api-references/api-overview">
                  <div>
                    <ApiIcon /> <span>API Reference</span>
                  </div>
                  <div className={styles.docs_navigation__link}>
                    <ArrowDownIcon />
                  </div>
                </NavItem>
              </div>
            )}

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
            <div
              className={cn(
                styles.docs_navigation__row,
                styles['docs_navigation__row--devider'],
              )}
            >
              <div
                className={styles.docs_navigation__item}
                onClick={() => {
                  window.location.href = '/api/auth/login';
                }}
              >
                <div>Log in</div>
                <LogInIcon />
              </div>
            </div>
            <div
              className={cn(
                styles.docs_navigation__row,
                styles['docs_navigation__row--create'],
              )}
            >
              <div
                className={styles.docs_navigation__item}
                onClick={() => {
                  window.location.href = `/api/auth/signup?returnTo=/`;
                }}
              >
                <div>
                  <span>Create account</span>
                </div>
                <div className={styles.docs_navigation__link}>
                  <ArrowDownIcon />
                </div>
              </div>
            </div>
          </div>
        )}
      />
      <div
        onClick={() =>
          dispatch(
            dashboardActions.setActiveModalDetails({ name: 'docs search' }),
          )
        }
        className={styles.docs_navigation__search}
      >
        <SearchIcon />
      </div>
    </div>
  );
}
