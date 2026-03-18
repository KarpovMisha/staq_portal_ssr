import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
import cn from 'classnames';

import { Switcher, ActionsDropdown } from '@/ui/components';
import { generateCompanyLogo } from '@/app/lib/helpers';
// import { useAuth } from '@/auth/AuthProvider';

import ArrowIcon from '@/ui/icons/arrow.svg';
import SettingsIcon from '@/ui/icons/account_settings.svg';
import SignalIcon from '@/ui/icons/signal.svg';
import DocsIcon from '@/ui/icons/docs.svg';
import ApiIcon from '@/ui/icons/terminal.svg';
import ArrowDownIcon from '@/ui/icons/downArrow.svg';
import LogOutIcon from '@/ui/icons/logout.svg';
import styles from './AccountSettings.module.scss';
import { useProfileQuery } from '@/hooks/useProfile';

interface UserInfo {
  firstName?: string;
  lastName?: string;
}

export default function AccountSettings({isDashboardPage}: { isDashboardPage: boolean }) {
  const { data: profile } = useProfileQuery();
  const [userName, setUserName] = useState<string>('');
  const userLogo = generateCompanyLogo(userName);
  // const router = useRouter();

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

  if (!isDashboardPage) {
    return <div className={styles.account_settings__logo}>{userLogo}</div>;
  }

  return (
    <ActionsDropdown
      offset={1}
      trigger={(open: boolean) => (
        <div className={styles.account_settings__trigger}>
          <div className={styles.account_settings__logo}>{userLogo}</div>
          <span>{userName}</span>
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
            <Link
              href="/get-started/create-application"
              className={styles.account_settings__item}
            >
              <div>
                <DocsIcon /> <span>Developer Docs</span>
              </div>
              <div className={styles.account_settings__link}>
                <ArrowDownIcon />
              </div>
            </Link>
            <div className={styles.account_settings__item}>
              <div>
                <ApiIcon /> <span>API Reference</span>
              </div>
              <div className={styles.account_settings__link}>
                <ArrowDownIcon />
              </div>
            </div>
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
