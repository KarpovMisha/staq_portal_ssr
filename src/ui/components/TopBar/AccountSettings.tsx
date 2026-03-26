import { use, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import cn from 'classnames';

import { Switcher, ActionsDropdown } from '@/ui/components';
import { generateCompanyLogo } from '@/app/lib/helpers';
import { useProfileQuery } from '@/hooks/useProfile';
// import { useAuth } from '@/auth/AuthProvider';

import LogoIcon from '@/ui/icons/staq_app_logo.svg';
import ArrowIcon from '@/ui/icons/arrow.svg';
import SettingsIcon from '@/ui/icons/account_settings.svg';
import SignalIcon from '@/ui/icons/signal.svg';
import DocsIcon from '@/ui/icons/docs.svg';
import DashboardIcon from '@/ui/icons/dashboard-square.svg';
import ApiIcon from '@/ui/icons/terminal.svg';
import ArrowDownIcon from '@/ui/icons/downArrow.svg';
import LogOutIcon from '@/ui/icons/logout.svg';
import styles from './AccountSettings.module.scss';

interface UserInfo {
  firstName?: string;
  lastName?: string;
}

export default function AccountSettings({ page }: { page: string }) {
  const { data: profile } = useProfileQuery();
  const pathname = usePathname();
  const [userName, setUserName] = useState<string>('');
  const userLogo = generateCompanyLogo(userName);
  const isApiReferencesPage = pathname.startsWith('/api-references');

  useEffect(() => {
    if (profile) {
      const { firstName, lastName }: UserInfo = profile.data;
      setUserName(`${firstName || ''} ${lastName || ''}`.trim());
    }
  }, [profile?.data]);

  const logoutAction = async () => {
    // router.push('/');
    window.location.href = '/api/auth/logout';
  };

  if (page === 'avatar') {
    return <div className={styles.account_settings__logo}>{userLogo}</div>;
  }

  return (
    <ActionsDropdown
      offset={1}
      trigger={(open: boolean) => (
        <div className={styles.account_settings__trigger}>
          <div
            className={cn(styles.account_settings__logo, {
              [styles['account_settings__logo--docs']]: page === 'docs',
            })}
          >
            {page == 'docs' && <LogoIcon />}
            {page === 'dashboard' && <>{userName}</>}
          </div>
          {page === 'docs' && (
            <span>{isApiReferencesPage ? 'API References' : 'Docs'}</span>
          )}
          {page === 'dashboard' && <span>{userName}</span>}
          <div
            className={cn(styles.account_settings__arrow, {
              [styles['account_settings__arrow--open']]: open,
            })}
          >
            <ArrowIcon />
          </div>
        </div>
      )}
      content={
        <div className={styles.account_settings__body}>
          <div
            className={cn(
              styles.account_settings__row,
              styles['account_settings__row--devider'],
            )}
          >
            <div className={styles.account_settings__logo}>{userLogo}</div>
            <div>{userName}</div>
          </div>
          <div
            className={cn(
              styles.account_settings__row,
              styles['account_settings__row--devider'],
            )}
          >
            <Link
              href="/dashboard/settings"
              className={styles.account_settings__item}
            >
              <div>
                <SettingsIcon /> <span>Settings</span>
              </div>
            </Link>
            <div className={styles.account_settings__item}>
              <div>
                <SignalIcon /> <span>Switch to Production</span>
              </div>
            </div>
          </div>

          <div
            className={cn(
              styles.account_settings__row,
              styles['account_settings__row--devider'],
            )}
          >
            {/* Dashboard Links */}
            {page === 'dashboard' && (
              <Link href="/" className={styles.account_settings__item}>
                <div>
                  <DocsIcon /> <span>Developer Docs</span>
                </div>
                <div className={styles.account_settings__link}>
                  <ArrowDownIcon />
                </div>
              </Link>
            )}
            {page === 'dashboard' && (
              <Link
                href="/api-references/api-overview"
                className={styles.account_settings__item}
              >
                <div>
                  <ApiIcon /> <span>API Reference</span>
                </div>
                <div className={styles.account_settings__link}>
                  <ArrowDownIcon />
                </div>
              </Link>
            )}

            {/* Docs Links */}
            {page === 'docs' && !isApiReferencesPage && (
              <Link href="/dashboard" className={styles.account_settings__item}>
                <div>
                  <DashboardIcon /> <span>Dashboard</span>
                </div>
                <div className={styles.account_settings__link}>
                  <ArrowDownIcon />
                </div>
              </Link>
            )}
            {page === 'docs' && !isApiReferencesPage && (
              <Link
                href="/api-references/api-overview"
                className={styles.account_settings__item}
              >
                <div>
                  <ApiIcon /> <span>API Reference</span>
                </div>
                <div className={styles.account_settings__link}>
                  <ArrowDownIcon />
                </div>
              </Link>
            )}

            {/* Api references Links */}
            {page === 'docs' && isApiReferencesPage && (
              <Link href="/dashboard" className={styles.account_settings__item}>
                <div>
                  <DashboardIcon /> <span>Dashboard</span>
                </div>
                <div className={styles.account_settings__link}>
                  <ArrowDownIcon />
                </div>
              </Link>
            )}
            {page === 'docs' && isApiReferencesPage && (
              <Link href="/" className={styles.account_settings__item}>
                <div>
                  <DocsIcon /> <span>Developer Docs</span>
                </div>
                <div className={styles.account_settings__link}>
                  <ArrowDownIcon />
                </div>
              </Link>
            )}
          </div>
          <div
            className={cn(
              styles.account_settings__row,
              styles['account_settings__row--devider'],
            )}
          >
            <div className={styles.account_settings__item}>
              <div>Theme</div>
              <div className={styles.account_settings__switcher}>
                <Switcher />
              </div>
            </div>
          </div>
          <div className={styles.account_settings__row}>
            <div
              onClick={logoutAction}
              className={styles.account_settings__item}
            >
              <div>Logout</div>
              <LogOutIcon />
            </div>
          </div>
        </div>
      }
    />
  );
}
